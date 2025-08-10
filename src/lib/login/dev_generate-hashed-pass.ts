/*TEST:*/

import { hashPassword, verifyPassword } from "./manage-login";

(async () => {
  const hash = await hashPassword("admin#password#1");
  console.log({ hash });
})();

(async () => {
  const isPasswordValid = await verifyPassword(
    "admin#password#1",
    "JDJiJDEwJDk3ZXM1MmI0VUNIRHRyS3FpUjllSWVIVXA2WWFTRG1kaXlpMWpDQU8xWHBMcGE1SWRSSXZh"
  );
  console.log(isPasswordValid);
})();
