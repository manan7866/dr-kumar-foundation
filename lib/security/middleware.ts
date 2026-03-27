/**
 * Reusable Middleware Wrappers for API Routes
 * Non-destructive security hardening
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  rateLimitConfigs,
  getClientIP,
  validateTurnstileToken,
  logRateLimitViolation,
  logBotVerificationFailure,
  createSafeErrorResponse,
  sanitizeText,
} from './utils';

// ============================================================================
// RATE LIMITING MIDDLEWARE
// ============================================================================

export interface RateLimitOptions {
  configKey: keyof typeof rateLimitConfigs;
  identifier?: string; // Optional custom identifier (defaults to IP)
}

/**
 * Create rate limiting wrapper for API route handlers
 * @param handler - The original route handler function
 * @param options - Rate limit configuration
 */
export function withRateLimit<T extends (...args: any[]) => Promise<Response>>(
  handler: T,
  options: RateLimitOptions
): T {
  return (async (request: NextRequest) => {
    const identifier = options.identifier || getClientIP(request);
    const config = rateLimitConfigs[options.configKey] || rateLimitConfigs.default;
    
    const limit = checkRateLimit(identifier, config);
    
    // Add rate limit headers to response
    const headers = new Headers({
      'X-RateLimit-Limit': config.maxRequests.toString(),
      'X-RateLimit-Remaining': limit.remaining.toString(),
      'X-RateLimit-Reset': Math.ceil(limit.resetTime / 1000).toString(),
    });
    
    if (!limit.allowed) {
      logRateLimitViolation(identifier, request.nextUrl.pathname);
      
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: config.message,
        }),
        {
          status: 429,
          headers: {
            ...Object.fromEntries(headers),
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((limit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }
    
    // Call original handler
    const response = await handler(request);
    
    // Add rate limit headers to response
    headers.forEach((value, key) => {
      response.headers.set(key, value);
    });
    
    return response;
  }) as T;
}

// ============================================================================
// BOT VERIFICATION MIDDLEWARE
// ============================================================================

export interface BotVerificationOptions {
  enabled?: boolean; // Allow disabling via env flag
  tokenField?: string; // Form field name for token (default: 'turnstile-token')
}

/**
 * Create bot verification wrapper for API route handlers
 * @param handler - The original route handler function
 * @param options - Bot verification configuration
 */
export function withBotVerification<T extends (...args: any[]) => Promise<Response>>(
  handler: T,
  options: BotVerificationOptions = {}
): T {
  return (async (request: NextRequest) => {
    // Skip if disabled
    if (options.enabled === false || process.env.DISABLE_BOT_VERIFICATION === 'true') {
      return handler(request);
    }
    
    const tokenField = options.tokenField || 'turnstile-token';
    
    // Get token from form data or headers
    let token: string | undefined;
    
    try {
      const contentType = request.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        const body = await request.json();
        token = body[tokenField];
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const formData = await request.formData();
        token = formData.get(tokenField) as string;
      }
    } catch {
      // If we can't parse the body, continue without token
      token = undefined;
    }
    
    // Also check header
    if (!token) {
      token = request.headers.get('cf-turnstile-response') || undefined;
    }
    
    const validation = await validateTurnstileToken(token);
    
    if (!validation.valid) {
      logBotVerificationFailure(getClientIP(request), request.nextUrl.pathname, validation.error || 'Unknown error');
      
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Bot verification failed. Please try again.',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return handler(request);
  }) as T;
}

// ============================================================================
// COMBINED PROTECTION MIDDLEWARE
// ============================================================================

export interface ProtectionOptions {
  rateLimit?: RateLimitOptions;
  botVerification?: BotVerificationOptions;
}

/**
 * Apply multiple protections to a route handler
 * @param handler - The original route handler function
 * @param options - Protection configuration
 */
export function withProtection<T extends (...args: any[]) => Promise<Response>>(
  handler: T,
  options: ProtectionOptions
): T {
  let wrappedHandler = handler;
  
  // Apply bot verification first (if enabled)
  if (options.botVerification) {
    wrappedHandler = withBotVerification(wrappedHandler, options.botVerification);
  }
  
  // Apply rate limiting
  if (options.rateLimit) {
    wrappedHandler = withRateLimit(wrappedHandler, options.rateLimit);
  }
  
  return wrappedHandler;
}

// ============================================================================
// REQUEST BODY PARSER WITH SANITIZATION
// ============================================================================

/**
 * Safely parse and sanitize request body
 * @param request - Next.js request object
 * @param maxLength - Maximum total body length
 */
export async function parseAndSanitizeBody(
  request: Request,
  maxLength: number = 100000
): Promise<{ success: boolean; data?: Record<string, any>; error?: string }> {
  try {
    const contentLength = request.headers.get('content-length');
    
    if (contentLength && parseInt(contentLength) > maxLength) {
      return {
        success: false,
        error: 'Request body too large',
      };
    }
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const body = await request.json();
      
      // Sanitize string values
      const sanitized: Record<string, any> = {};
      for (const [key, value] of Object.entries(body)) {
        if (typeof value === 'string') {
          sanitized[key] = sanitizeText(value, 5000);
        } else {
          sanitized[key] = value;
        }
      }
      
      return { success: true, data: sanitized };
    }
    
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      const sanitized: Record<string, any> = {};
      
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') {
          sanitized[key] = sanitizeText(value, 5000);
        } else {
          sanitized[key] = value;
        }
      }
      
      return { success: true, data: sanitized };
    }
    
    return {
      success: false,
      error: 'Unsupported content type',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to parse request body',
    };
  }
}

// ============================================================================
// SAFE ERROR HANDLER
// ============================================================================

/**
 * Wrap a handler with safe error handling
 * Prevents internal errors from leaking to clients
 */
export function withSafeErrors<T extends (...args: any[]) => Promise<Response>>(
  handler: T
): T {
  return (async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error('[API Error]', error);
      
      return createSafeErrorResponse(
        'An error occurred processing your request',
        500
      );
    }
  }) as T;
}
