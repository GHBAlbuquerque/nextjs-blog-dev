import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/login/manage-login";

// use this middleware to intercept requests and do validations
export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.startsWith("/admin/login");
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin/login");
  const isGetRequest = request.method === "GET";

  const shouldBeAuthenticated = isAdminPage && !isLoginPage;
  const shouldRedirect = shouldBeAuthenticated && isGetRequest;

  // redirects if the user should be authenticated and is a Get request
  if (!shouldRedirect) {
    return NextResponse.next();
  }

  const jwtSession = request.cookies.get(
    process.env.LOGIN_COOKIE_NAME || "loginSession"
  )?.value;

  const isAuthenticated = await verifyJwt(jwtSession);

  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url); //if not authenticated, middlware redirects
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
