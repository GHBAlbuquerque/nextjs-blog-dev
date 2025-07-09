import clsx from "clsx";

export default function NotFoundPage() {
  return (
    <>
      <title>Not Found</title>
      <div
        className={clsx(
          "min-h-[320px]",
          "bg-slate-900",
          "text-slate-100",
          "mb-16",
          "p-8",
          "rounded-xl",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "text-center"
        )}
      >
        <h1 className="text-7xl/tight mb-4 font-extrabold">404</h1>
        <p>Error 404 - The page you`re trying to reach does not exist.</p>
      </div>
    </>
  );
}
