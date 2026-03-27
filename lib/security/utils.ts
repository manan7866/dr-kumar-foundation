/**
 * Security Utilities for Form Validation and Protection
 * Non-destructive, production-safe security hardening
 */

import { z } from 'zod';

// ============================================================================
// RATE LIMITING CONFIGURATION
// ============================================================================

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  message: string;
}

export const rateLimitConfigs: Record<string, RateLimitConfig> = {
  // Strict limits for email-sending endpoints
  contact: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5,
    message: 'Too many contact form submissions. Please try again later.',
  },
  engagement: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10,
    message: 'Too many submissions. Please try again later.',
  },
  registration: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    message: 'Too many registration attempts. Please try again later.',
  },
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10,
    message: 'Too many authentication attempts. Please try again later.',
  },
  contribution: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 20,
    message: 'Too many contribution submissions. Please try again later.',
  },
  // Default fallback
  default: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    message: 'Too many requests. Please slow down.',
  },
};

// In-memory rate limit store (for single-instance deployments)
// For multi-instance, use Redis or similar
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Check rate limit for a given identifier
 * @param identifier - Unique identifier (IP, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns { allowed: boolean; remaining: number; resetTime: number }
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = `${identifier}:${config.windowMs}`;
  
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    // New window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }
  
  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }
  
  record.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Clean up expired rate limit entries (call periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Clean up every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);

// ============================================================================
// INPUT SANITIZATION
// ============================================================================

/**
 * Sanitize text input to prevent XSS and injection attacks
 * Preserves legitimate content while removing dangerous characters
 */
export function sanitizeText(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Trim and limit length
  let sanitized = input.trim().slice(0, maxLength);
  
  // Remove null bytes and control characters (except newlines/tabs for messages)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Normalize line endings
  sanitized = sanitized.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  return sanitized;
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') {
    return '';
  }
  
  // Trim, lowercase, and remove dangerous characters
  return email.trim().toLowerCase().replace(/[^\w@.+_-]/g, '').slice(0, 254);
}

/**
 * Sanitize phone number (allow only digits, +, -, (), spaces)
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') {
    return '';
  }
  
  return phone.replace(/[^\d+\-\s()]/g, '').slice(0, 20);
}

/**
 * Remove potential email header injection
 */
export function sanitizeForEmailHeader(input: string): string {
  return input.replace(/[\r\n]/g, ' ').slice(0, 500);
}

// ============================================================================
// VALIDATION SCHEMAS (REUSABLE)
// ============================================================================

// Common field validators
export const validators = {
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[\p{L}\p{M}\s.'-]+$/u, 'Name contains invalid characters'),
  
  email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email address too long'),
  
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must not exceed 5000 characters'),
  
  phone: z
    .string()
    .max(20, 'Phone number too long')
    .optional()
    .or(z.literal('')),
  
  country: z
    .string()
    .min(2, 'Country is required')
    .max(100, 'Country name too long'),
  
  city: z
    .string()
    .min(1, 'City is required')
    .max(100, 'City name too long'),
  
  organization: z
    .string()
    .max(200, 'Organization name too long')
    .optional()
    .or(z.literal('')),
  
  gender: z
    .enum(['male', 'female'])
    .refine(val => val === 'male' || val === 'female', {
      message: 'Please select a valid gender option',
    }),
  
  consent: z
    .boolean()
    .refine(val => val === true, {
      message: 'You must consent to proceed',
    }),
};

// ============================================================================
// CSRF PROTECTION
// ============================================================================

/**
 * Simple CSRF token generation and validation
 * For production, consider using a more robust CSRF library
 */
export function generateCSRFToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function validateCSRFToken(token: string | undefined, expectedToken: string): boolean {
  if (!token || !expectedToken) {
    return false;
  }
  
  // Constant-time comparison to prevent timing attacks
  if (token.length !== expectedToken.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i);
  }
  
  return result === 0;
}

// ============================================================================
// BOT PROTECTION HELPERS
// ============================================================================

/**
 * Validate Cloudflare Turnstile token
 * Requires CLOUDFLARE_TURNSTILE_SECRET_KEY in environment
 */
export async function validateTurnstileToken(
  token: string | undefined
): Promise<{ valid: boolean; error?: string }> {
  if (!token) {
    return { valid: false, error: 'Bot verification token missing' };
  }
  
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    // If no secret key configured, skip validation (development mode)
    console.warn('[Turnstile] Secret key not configured, skipping validation');
    return { valid: true };
  }
  
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      return {
        valid: false,
        error: data['error-codes']?.[0] || 'Bot verification failed',
      };
    }
    
    return { valid: true };
  } catch (error) {
    console.error('[Turnstile] Validation error:', error);
    return { valid: false, error: 'Bot verification service unavailable' };
  }
}

// ============================================================================
// IP ADDRESS EXTRACTION
// ============================================================================

/**
 * Extract client IP from request headers
 * Handles proxied requests (Cloudflare, load balancers, etc.)
 */
export function getClientIP(request: Request): string {
  const headers = request.headers;
  
  // Check various headers for client IP (in order of preference)
  const ipHeaders = [
    'cf-connecting-ip', // Cloudflare
    'x-forwarded-for', // Standard proxy header
    'x-real-ip', // Nginx
    'true-client-ip', // Akamai
    'x-client-ip',
  ];
  
  for (const header of ipHeaders) {
    const value = headers.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs, take the first
      const ip = value.split(',')[0].trim();
      if (ip && ip !== 'unknown') {
        return ip;
      }
    }
  }
  
  // Fallback to remote address (may not be available in all environments)
  return 'unknown';
}

// ============================================================================
// LOGGING HELPERS
// ============================================================================

export interface SecurityLogEntry {
  eventType: string;
  identifier: string;
  details?: Record<string, unknown>;
  severity: 'info' | 'warning' | 'error';
}

/**
 * Log security events
 * In production, integrate with your logging service
 */
export function logSecurityEvent(entry: SecurityLogEntry): void {
  const logEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  };
  
  // In production, send to your logging service
  // For now, log to console with appropriate level
  switch (entry.severity) {
    case 'error':
      console.error('[SECURITY]', JSON.stringify(logEntry));
      break;
    case 'warning':
      console.warn('[SECURITY]', JSON.stringify(logEntry));
      break;
    default:
      console.log('[SECURITY]', JSON.stringify(logEntry));
  }
}

/**
 * Log rate limit violation
 */
export function logRateLimitViolation(identifier: string, endpoint: string): void {
  logSecurityEvent({
    eventType: 'RATE_LIMIT_VIOLATION',
    identifier,
    details: { endpoint },
    severity: 'warning',
  });
}

/**
 * Log validation failure
 */
export function logValidationFailure(
  identifier: string,
  endpoint: string,
  field: string,
  error: string
): void {
  logSecurityEvent({
    eventType: 'VALIDATION_FAILURE',
    identifier,
    details: { endpoint, field, error },
    severity: 'warning',
  });
}

/**
 * Log bot verification failure
 */
export function logBotVerificationFailure(identifier: string, endpoint: string, error: string): void {
  logSecurityEvent({
    eventType: 'BOT_VERIFICATION_FAILURE',
    identifier,
    details: { endpoint, error },
    severity: 'warning',
  });
}

// ============================================================================
// RESPONSE HELPERS
// ============================================================================

/**
 * Create a safe error response (no internal details exposed)
 */
export function createSafeErrorResponse(
  message: string,
  status: number,
  includeDetails: boolean = false
): Response {
  return new Response(
    JSON.stringify({
      success: false,
      error: message,
      ...(includeDetails && process.env.NODE_ENV === 'development' ? { details: message } : {}),
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
