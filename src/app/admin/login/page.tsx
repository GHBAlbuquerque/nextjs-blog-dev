import DisplayErrorMessage from "@/components/DisplayErrorMessage";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
};

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return (
      <DisplayErrorMessage
        pageTitle={"Login not allowed"}
        contentTitle={"403"}
        content={
          "You don't have permission to access the site. Allow login by changing values in the env.local config file."
        }
      />
    );
  }

  return <LoginForm />;
}
