import fs from 'fs';
import path from 'path';

const OTP_CACHE_FILE = path.join(process.cwd(), '.otp-cache.json');

interface OTPData {
  otp: string;
  expiresAt: number;
  userData: {
    full_name: string;
    email: string;
    password: string;
  };
  lastSent?: number;
}

// Load cache from file
function loadCache(): Map<string, OTPData> {
  try {
    if (fs.existsSync(OTP_CACHE_FILE)) {
      const data = fs.readFileSync(OTP_CACHE_FILE, 'utf-8');
      const obj = JSON.parse(data);
      return new Map(Object.entries(obj));
    }
  } catch (error) {
    console.error('[OTP Cache] Failed to load cache:', error);
  }
  return new Map();
}

// Save cache to file
function saveCache(cache: Map<string, OTPData>) {
  try {
    const obj = Object.fromEntries(cache);
    fs.writeFileSync(OTP_CACHE_FILE, JSON.stringify(obj, null, 2));
  } catch (error) {
    console.error('[OTP Cache] Failed to save cache:', error);
  }
}

// Get OTP from cache
export function getOTP(email: string): OTPData | undefined {
  const cache = loadCache();
  return cache.get(email);
}

// Set OTP in cache
export function setOTP(email: string, data: OTPData) {
  const cache = loadCache();
  cache.set(email, data);
  saveCache(cache);
}

// Delete OTP from cache
export function deleteOTP(email: string) {
  const cache = loadCache();
  cache.delete(email);
  saveCache(cache);
}

// Clean up expired OTPs (optional, can be run periodically)
export function cleanupExpiredOTPs() {
  const cache = loadCache();
  const now = Date.now();
  let changed = false;

  for (const [email, data] of cache.entries()) {
    if (now > data.expiresAt) {
      cache.delete(email);
      changed = true;
    }
  }

  if (changed) {
    saveCache(cache);
  }
}
