import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from "jose";
// This function can be marked `async` if using `await` inside

const jwtConfig = {
  secret: new TextEncoder().encode('geJo7WBbBPq2OCz11fMqyyXeTKDZ7bT6'),
}

export async function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  try {
    if (token) {
      const { payload } = await jwtVerify(token, jwtConfig.secret, { typ: "JWT" });
      console.log(payload);
    }

    if (request.nextUrl.pathname.startsWith('/user') && token) {
      return;
    }

    else if (pathname === "/signin" && token) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    else if (pathname === "/signup" && token) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    else if (request.nextUrl.pathname.startsWith('/user') && !token) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

  } catch (error: any) {
    console.log("ERROR: ", error.message);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/user/:path*', '/signin', '/signup'],
}