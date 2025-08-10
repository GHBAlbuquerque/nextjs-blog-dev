"use server";

import simulateWait from "@/utils/simulate-wait";

type LoginActionState = {
  username: string;
  errors: string[];
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await simulateWait();

  if (!(formData instanceof FormData)) {
    return {
      username: "",
      errors: ["InvalidData"],
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
  const isUsernameValid = (username === process.env.LOGIN_USER);
  const isPasswordValid = (password === process.env.LOGIN_PASS);

  return {
    username: "",
    errors: [],
  };
}

