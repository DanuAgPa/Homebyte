import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const role = request.cookies.get('user_role')?.value;
  const path = request.nextUrl.pathname;

  // Allow static assets, strictly internal routes, API
  if (
    path.startsWith('/_next') || 
    path.startsWith('/api') || 
    path.includes('.')
  ) {
    return NextResponse.next();
  }

  if (role === 'ADMIN') {
    // Enforce Dashboard Lock: Admin cannot visit public UI routes
    if (!path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  } else {
    // Normal User / Guest: Block Admin Panel
    if (path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
