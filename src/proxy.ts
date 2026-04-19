import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.has('auth_session');
  // Ambil user_role dari cookie, jika tidak ada asumsikan string kosong
  const userRoleCookie = request.cookies.get('user_role');
  const userRole = userRoleCookie ? userRoleCookie.value : '';

  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  const isRegisterPage = request.nextUrl.pathname.startsWith('/register');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');

  // Izinkan halaman auth bebas diakses jika belum login
  const isAuthPage = isLoginPage || isRegisterPage;

  if (!isLoggedIn && !isAuthPage) {
    // Jika belum login dan mencoba akses selain auth, arahkan ke login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoggedIn && isAuthPage) {
    // Jika sudah login, cegah masuk ke halaman login/register
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAdminPage && userRole !== 'ADMIN') {
    // Apabila bukan Admin namun mencoba akses /admin, lemparkan ke Home
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
