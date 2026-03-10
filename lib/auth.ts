import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export interface AuthenticatedUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  approval_status: string;
}

export async function authenticateAdmin(
  request: NextRequest,
  requiredRoles?: string[]
): Promise<{ user: AuthenticatedUser | null; response: NextResponse | null }> {
  try {
    // Get user session from cookies
    const userSession = request.cookies.get('user_session')?.value;
    
    if (!userSession) {
      return {
        user: null,
        response: NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 }
        ),
      };
    }

    // Parse user data from session
    let userData;
    try {
      userData = JSON.parse(userSession);
    } catch {
      return {
        user: null,
        response: NextResponse.json(
          { error: 'Invalid session' },
          { status: 401 }
        ),
      };
    }

    const userId = userData.id;

    // Validate user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        full_name: true,
        role: true,
        is_active: true,
        approval_status: true,
      },
    });

    if (!user) {
      return {
        user: null,
        response: NextResponse.json(
          { error: 'User not found' },
          { status: 401 }
        ),
      };
    }

    if (!user.is_active) {
      return {
        user: null,
        response: NextResponse.json(
          { error: 'Account is not active' },
          { status: 403 }
        ),
      };
    }

    if (user.approval_status === 'rejected') {
      return {
        user: null,
        response: NextResponse.json(
          { error: 'Account was rejected' },
          { status: 403 }
        ),
      };
    }

    // Check if user has required role
    if (requiredRoles && requiredRoles.length > 0) {
      if (!requiredRoles.includes(user.role)) {
        return {
          user: null,
          response: NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          ),
        };
      }
    }

    return {
      user: user as AuthenticatedUser,
      response: null,
    };
  } catch (error) {
    console.error('[Auth] Error:', error);
    return {
      user: null,
      response: NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      ),
    };
  }
}
