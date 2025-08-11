import clsx from "clsx";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    //<div className="text-slate-900 bg-slate-100 min-h-screen dark:text-slate-100 dark:bg-slate-900">
    <div
      className={clsx(
        "min-h-screen",
        "text-slate-900",
        "bg-gradient-to-b",
        "from-slate-100",
        "to-slate-400",
        "dark:text-slate-100",
        "dark:from-slate-700",
        "dark:to-slate-900"
      )}
    >
      <div className="max-w-screen-lg mx-auto px-8 text-justify">
        {children}
      </div>
    </div>
  );
}
