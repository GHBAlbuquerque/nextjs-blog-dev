"use client";

import { loginAction } from "@/actions/login/login-action";
import Button from "@/components/Button";
import { InputText } from "@/components/InputText";
import clsx from "clsx";
import { LogInIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const initialState = {
    username: "",
    errors: [],
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
  }, [state.errors]);

  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "text-center max-w-sm mt-16 mb-32 mx-auto"
      )}
    >
      <form action={action} className="flex-1 flex flex-col gap-6">
        <InputText
          type="text"
          name="username"
          labelText="Username"
          placeholder="your username"
          disabled={isPending}
          defaultValue={state.username}
        />

        <InputText
          type="password"
          name="password"
          labelText="Password"
          placeholder="your password"
          disabled={isPending}
        />

        <Button disabled={isPending} type="submit" className="mt-4">
          <LogInIcon />
          Login
        </Button>

        {state.errors && <p className="text-red-500">{state.errors}</p>}
      </form>
    </div>
  );
}
