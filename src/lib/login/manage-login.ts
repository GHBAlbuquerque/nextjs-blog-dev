import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

const BASE_64 = "base64";
const UTF_8 = "utf-8";

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

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, "", { expires: new Date(0) });

  cookieStore.delete(loginCookieName);
}
