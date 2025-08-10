import bcrypt from "bcryptjs";

const BASE_64 = "base64";
const UTF_8 = "utf-8";

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString(BASE_64); // avoids special characters so it can be used on local.env file
  return base64;
}

export async function verifyPassword(password: string, base64hash: string) {
  const hash = Buffer.from(base64hash, BASE_64).toString(UTF_8);
  return await bcrypt.compare(password, hash);
}

/*
TEST:

(async () => {
  const hash = await hashPassword("admin#password#1");
  console.log({ hash });
})();

(async () => {
  const isPasswordValid = await verifyPassword(
    "admin#password#1",
    "JDJiJDEwJDFrUldPR0VQOUh5UFc2d3ZmMmZhamVZR2Zma1JZUC9MOTNteDlVd2N6VnVMakd0WDU1dDVH"
  );
  console.log(isPasswordValid);
})();*/
