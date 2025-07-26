// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

//   // If no token or no role, redirect to sign-in
//   if (!token || !token.role) {
//     console.log('Middleware: No valid session or role, redirecting to /sign-in');
//     return NextResponse.redirect(new URL('/sign-in', request.url));
//   }

//   const role = token.role;
//   const { pathname } = request.nextUrl;

//   // Protect /admin routes
//   if (pathname.startsWith('/admin')) {
//     if (role !== 'admin') {
//       console.log(`Middleware: User with role ${role} denied access to ${pathname}, redirecting to /`);
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   }

//   // Protect /instructor routes
//   if (pathname.startsWith('/instructor')) {
//     if (role !== 'instructor') {
//       console.log(`Middleware: User with role ${role} denied access to ${pathname}, redirecting to /`);
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   }

//   // Protect /student routes
//   if (pathname.startsWith('/student')) {
//     if (role !== 'student') {
//       console.log(`Middleware: User with role ${role} denied access to ${pathname}, redirecting to /`);
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   }

//   // Allow access if role matches or route is not protected
//   console.log(`Middleware: User with role ${role} allowed access to ${pathname}`);
//   return NextResponse.next();
// }

// // Define protected routes
// export const config = {
//   matcher: ['/admin/:path*', '/instructor/:path*', '/student/:path*'],
// };













import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // ✅ Public marketing page (accessible to all)
  if (pathname === '/' || pathname.startsWith('/sign-in')) {
    return NextResponse.next();
  }

  // 🔒 Not authenticated: redirect to sign-in
  if (!token || !token.role) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const role = token.role;

  // 🔁 If user tries to access another role's route, redirect to their dashboard
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
  }

  if (pathname.startsWith('/instructor') && role !== 'instructor') {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
  }

  if (pathname.startsWith('/student') && role !== 'student') {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
  }
console.log("✅ Middleware is running for:", pathname);
  // ✅ If everything matches, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/instructor/:path*',
    '/student/:path*',
    '/sign-in',
  ],
};
