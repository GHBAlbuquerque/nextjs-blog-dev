import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";

const BASE_64 = "base64";
const UTF_8 = "utf-8";

const adminUsername = process.env.LOGIN_USER;

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 3600;
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || "1h";
const loginCookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

type JwtPayload = {
  username: string;
  expiresAt: Date;
};

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString(BASE_64); // avoids special characters so it can be used on local.env file
  return base64;
}

export async function verifyPassword(password: string, base64hash: string) {
  const hash = Buffer.from(base64hash, BASE_64).toString(UTF_8);
  return await bcrypt.compare(password, hash);
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = await signJwt({ username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true, //stops browser from being able to read the cookie
    secure: true,
    sameSite: "strict", // “Only send this cookie when the request comes from the same site that set it, never send it with cross-site requests, not even when following a link.”
    expires: expiresAt,
  });
}

export async function signJwt(jwtPayload: JwtPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey);
}

// Checks if JWT exists and is valid
export async function getLoginSession() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;

  if (jwt!) return false; // user not logged in

  return verifyJwt(jwt); // validates jwt
}

// Checks if logged user is the Admin user
export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession();

  if (!jwtPayload) return false;

  return jwtPayload?.username === adminUsername;
}

// Checks if JWT is valid, if not, redirects to login page
export async function requireLoginSessionOrRedirect() {
  const isAuthenticated = await getLoginSession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }
}

export async function verifyJwt(jwt: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    console.log("invalid token");
    return false;
  }
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, "", { expires: new Date(0) });

  cookieStore.delete(loginCookieName);
}
