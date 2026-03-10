import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page always
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // Get user session from cookies (set by regular auth)
  const userSession = request.cookies.get('user_session')?.value;
  
  // If no session, redirect to login
  if (!userSession) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  // Parse user data from session
  let userRole = '';
  
  try {
    const userData = JSON.parse(userSession);
    userRole = userData.role;
  } catch {
    // Invalid session, clear cookies and redirect to login
    const response = NextResponse.next();
    response.cookies.delete('user_session');
    response.cookies.delete('session_token');
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return response;
  }

  // Protect routes based on role
  if (pathname.startsWith('/admin')) {
    // Main dashboard - only super_admin
    if (pathname === '/admin' || pathname === '/admin/') {
      if (userRole !== 'super_admin') {
        // Redirect moderators to their allowed pages
        if (userRole === 'moderator') {
          return NextResponse.redirect(new URL('/admin/engagement', request.url));
        }
        // Other roles go to home
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    }

    // Super admin only routes
    const superAdminRoutes = [
      '/admin/user-approvals',
      '/admin/users',
      '/admin/settings',
      '/admin/audit-logs',
      '/admin/governance',
      '/admin/global-presence',
      '/admin/content',
      '/admin/research',
      '/admin/quotes',
    ];

    if (superAdminRoutes.some(route => pathname.startsWith(route))) {
      if (userRole !== 'super_admin') {
        return NextResponse.redirect(new URL('/admin/engagement', request.url));
      }
      return NextResponse.next();
    }

    // Moderator accessible routes
    const moderatorRoutes = [
      '/admin/engagement',
      '/admin/registrations',
      '/admin/contributions',
      '/admin/tasks',
      '/admin/members',
      '/admin/programs',
    ];

    if (moderatorRoutes.some(route => pathname.startsWith(route))) {
      if (!['super_admin', 'moderator'].includes(userRole)) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    }

    // Default: allow if authenticated
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
