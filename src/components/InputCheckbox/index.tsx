import clsx from "clsx";
import { useId } from "react";

type InputCheckboxProps = {
  labelText?: string;
  type : 'checkbox';
} & React.ComponentProps<"input">;

export function InputCheckbox({ labelText = "", type, ...props }: InputCheckboxProps) {
  const id = useId();

  return (
    <div className="flex gap-3">
      <input
        className={clsx(
          "w-4 h-4",
          "outline-none",
          props.className
        )}
        {...props}
        id={id} 
        type={type}
      />
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
}
