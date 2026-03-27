# Backend Security Hardening Documentation

## Overview

This document describes the security measures implemented to protect all public form and submission endpoints on the Dr. Kumar Foundation website.

**Implementation Date:** 2026
**Approach:** Non-destructive, production-safe, backward-compatible

---

## Security Measures Implemented

### 1. Rate Limiting

**Purpose:** Prevent abuse, spam, and DoS attacks through excessive submissions

**Configuration:**
```typescript
// Rate limits per endpoint
contact: 5 requests per hour
engagement: 10 requests per hour
registration: 3 requests per hour
contribution: 20 requests per hour
auth: 10 requests per 15 minutes
```

**Implementation:**
- In-memory store (single-instance deployments)
- IP-based limiting with header support for proxied requests
- Returns 429 status with `Retry-After` header
- Logs violations for monitoring

**Files:**
- `lib/security/utils.ts` - Core rate limiting logic
- Applied in all hardened endpoints

---

### 2. Input Validation & Sanitization

**Purpose:** Prevent injection attacks, malformed data, and ensure data integrity

**Validation Rules:**
- **Names:** 2-100 chars, letters/spaces/punctuation only
- **Email:** Valid format, max 254 chars, lowercased
- **Messages:** 10-5000 chars, control characters removed
- **Dates:** Strict format validation (YYYY-MM-DD)
- **Numbers:** Range validation where applicable
- **Enums:** Strict allow-listing for fixed options

**Sanitization:**
- Trim whitespace
- Remove null bytes and control characters
- Normalize line endings
- Email header injection protection
- Length enforcement

**Files:**
- `lib/security/utils.ts` - Sanitization functions
- `lib/form-schemas.ts` - Zod validation schemas
- All hardened endpoints

---

### 3. Bot Protection (Cloudflare Turnstile)

**Purpose:** Prevent automated spam and bot submissions

**Implementation:**
- Server-side token verification
- Optional in development (requires secret key in production)
- Returns 403 on verification failure
- Logs bot verification failures

**Environment Variable Required:**
```
CLOUDFLARE_TURNSTILE_SECRET_KEY=your_secret_key
```

**Frontend Integration:**
Add Turnstile widget to forms:
```html
<div class="cf-turnstile" data-sitekey="your_sitekey"></div>
```

**Files:**
- `lib/security/utils.ts` - Turnstile validation
- Applied in all hardened endpoints

---

### 4. CSRF Protection

**Purpose:** Prevent cross-site request forgery attacks

**Implementation:**
- Token generation and validation utilities
- Constant-time comparison to prevent timing attacks
- Ready for integration with form submissions

**Note:** Current implementation relies on Next.js built-in protections and same-site cookies. For enhanced protection, integrate CSRF tokens in forms.

**Files:**
- `lib/security/utils.ts` - CSRF utilities

---

### 5. Security Logging

**Purpose:** Monitor and detect suspicious activity

**Logged Events:**
- Rate limit violations
- Bot verification failures
- Validation failures
- Security errors

**Log Format:**
```json
{
  "timestamp": "ISO-8601",
  "eventType": "RATE_LIMIT_VIOLATION|BOT_VERIFICATION_FAILURE|VALIDATION_FAILURE",
  "identifier": "client-ip",
  "details": { "endpoint": "...", "field": "...", "error": "..." },
  "severity": "info|warning|error"
}
```

**Files:**
- `lib/security/utils.ts` - Logging functions

---

## Hardened Endpoints

### Server Actions

| Endpoint | Rate Limit | Bot Protection | Validation |
|----------|-----------|----------------|------------|
| `submitContactForm` | 5/hour | Yes | Full schema |
| `submitEngagement` | 10/hour | Yes | Extended schemas |

### API Routes

| Endpoint | Rate Limit | Bot Protection | Validation |
|----------|-----------|----------------|------------|
| POST `/api/registrations` | 3/hour | Yes | Full schema |
| POST `/api/contributions` | 20/hour | Yes | Full schema |
| GET `/api/contributions` | - | No | User ID check |

---

## Files Modified

### New Files Created
```
lib/security/
├── index.ts          # Module exports
├── utils.ts          # Core utilities (rate limiting, validation, sanitization, logging)
└── middleware.ts     # Reusable middleware wrappers
```

### Files Hardened
```
app/actions/
├── submit-contact.ts     # Contact form with full protection
└── submit-engagement.ts  # Engagement forms with full protection

app/api/
├── registrations/route.ts    # Registration with full protection
└── contributions/route.ts    # Contributions with full protection
```

---

## Backward Compatibility

### Preserved Behaviors
- ✅ All existing form fields work unchanged
- ✅ Success response format unchanged
- ✅ Error handling maintains existing patterns
- ✅ Email sending behavior preserved
- ✅ Database schema unchanged
- ✅ Frontend integration unchanged (except optional Turnstile)

### Breaking Changes
- ❌ None - all changes are additive

### Optional Features
- Bot verification gracefully skips if `CLOUDFLARE_TURNSTILE_SECRET_KEY` not set
- Rate limiting uses in-memory store (upgrade to Redis for multi-instance)

---

## Deployment Checklist

### Required Environment Variables
```bash
# Bot Protection (optional but recommended)
CLOUDFLARE_TURNSTILE_SECRET_KEY=your_secret_key

# For multi-instance deployments (recommended)
# Configure Redis for rate limiting (future enhancement)
```

### Recommended Infrastructure
- [ ] Cloudflare Turnstile configured (sitekey + secretkey)
- [ ] Redis configured for rate limiting (multi-instance)
- [ ] Logging service integrated (production monitoring)
- [ ] HTTPS enforced (should already be configured)

---

## Testing

### Manual Testing
1. Submit valid forms - should succeed
2. Submit invalid data - should get validation errors
3. Submit rapidly (exceed rate limit) - should get 429
4. Submit without bot token (if enabled) - should get 403

### Automated Testing
```bash
# Run existing test suite to ensure no regressions
npm test

# Build to ensure TypeScript compilation
npm run build
```

---

## Monitoring & Alerts

### What to Monitor
- Rate limit hits (spikes indicate attack)
- Bot verification failures (high rate indicates bot attack)
- Validation failures (unusual patterns)
- 429/403 response rates

### Recommended Alerts
- >100 rate limit violations per hour from single IP
- >50 bot verification failures per hour
- Unusual validation failure patterns

---

## Future Enhancements

### Recommended (Not Implemented)
1. **Redis-backed rate limiting** - For multi-instance deployments
2. **CSRF tokens in forms** - Enhanced CSRF protection
3. **Request signing** - For API integrity
4. **WAF rules** - Cloudflare/AWS WAF for additional layer
5. **Email verification** - For critical submissions
6. **Admin dashboard** - For monitoring submissions and abuse

### Nice to Have
1. **Geographic rate limiting** - Different limits by region
2. **Behavioral analysis** - Detect suspicious patterns
3. **Honeypot fields** - Additional bot detection
4. **Time-based throttling** - Stricter limits at night

---

## Security Contact

For security issues or concerns:
- Email: info@dkf.sufisciencecenter.info
- Admin: admin@dkf.sufisciencecenter.info

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-27 | Initial security hardening implementation |

---

## References

- [OWASP Form Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Form_Security_Cheat_Sheet.html)
- [Cloudflare Turnstile Documentation](https://www.cloudflare.com/products/turnstile/)
- [Zod Documentation](https://zod.dev/)
- [Next.js Security Best Practices](https://nextjs.org/docs/pages/building-your-application/authentication)
