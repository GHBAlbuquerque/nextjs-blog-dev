"use client";

import clsx from "clsx";
import Button from "../Button";

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
};

export default function Dialog({
  isVisible = false,
  title,
  content,
  onConfirm,
  onCancel,
  disabled = false
}: DialogProps) {
  if (isVisible === false) return null;

  return (
    <div
      className={clsx(
        "fixed",
        "top-0",
        "bottom-0",
        "left-0",
        "right-0",
        "bg-slate-900/50",
        "backdrop-blur-xs",
        "flex",
        "items-center",
        "justify-center"
      )}
      onClick={onCancel}
    >
      <div
        className={clsx(
          "bg-slate-100",
          "p-6",
          "rounded-lg",
          "max-w-2xl",
          "mx-6",
          "dark:text-slate-900",
          "flex",
          "flex-col",
          "gap-6",
          "shadow-lg",
          "shadow-black/30",
          "text-center"
        )}
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClick={e => e.stopPropagation}
      >
        <h3 id="dialog-title" className="text-xl font-extrabold">
          {title}
        </h3>
        <div id="dialog-description"> {content}</div>
        <div className={clsx("flex", "items-center", "justify-around")}>
          <Button
            variant="ghost"
            size="md"
            onClick={onCancel}
            disabled={disabled}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="md"
            onClick={onConfirm}
            disabled={disabled}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
