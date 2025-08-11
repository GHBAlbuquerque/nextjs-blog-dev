"use server";

import { deleteLoginSession } from "@/lib/login/manage-login";
import simulateWait from "@/utils/simulate-wait";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await simulateWait();
  await deleteLoginSession();
  redirect("/");
}
