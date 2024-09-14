import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from "jose";
// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  try {
    if (token) {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET_KEY!));

      if (payload.id) {
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
      }
    }
    else {
      if (pathname !== "/signin") {
        return NextResponse.redirect(new URL('/signin', request.url));
      }
    }

  } catch (error: any) {
    console.log("ERROR: ", error.message);
    if (pathname !== "/signin") {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/user/:path*', '/signin', '/signup'],
}