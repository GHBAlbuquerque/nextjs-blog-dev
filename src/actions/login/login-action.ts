"use server";

import { createLoginSession, verifyPassword } from "@/lib/login/manage-login";
import simulateWait from "@/utils/simulate-wait";
import { redirect } from "next/navigation";

type LoginActionState = {
  username: string;
  errors: string[];
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await simulateWait();

  if (!(formData instanceof FormData)) {
    return {
      username: "",
      errors: ["Invalid data"],
    };
  }

  const username = formData.get("username")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!username || !password) {
    return {
      username: "",
      errors: ["All fields must be completed"],
    };
  }

  // if there was a database, I'd check if user exists, returning its pass hash
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS?.toString() || ""
  );

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username: username,
      errors: ["User or password invalid"],
    };
  }

  // Create cookie
  await createLoginSession(username);

  // Redirect page
  redirect("/admin/posts");
}
