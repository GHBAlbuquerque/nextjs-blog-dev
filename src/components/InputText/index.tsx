import clsx from "clsx";
import { useId } from "react";

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export function InputText({ labelText = "", ...props }: InputTextProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        className={clsx(
          "bg-white",
          "outline-0",
          "ring-2",
          "ring-slate-400",
          "rounded",
          "py-2",
          "px-2",
          "transition",
          "focus:ring-blue-600",
          "placeholder-slate-300",
          "disabled:bg-slate-200",
          "disabled:cursor-not-allowed",
          "read-only:bg-slate-200",
          "read-only:cursor-not-allowed",
          "read-only:focus:ring-slate-400",
          "dark:bg-slate-800",
          "dark:text-slate-50",
          "dark:read-only:bg-slate-900",
          "dark:read-only:text-slate-400",
          props.className
        )}
        {...props}
        id={id}
      />
    </div>
  );
}
