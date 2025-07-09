import clsx from "clsx";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className={clsx("py-8", "sm:py-10", "md:py-11", "lg:py-12")}>
        <h1
          className={clsx(
            "text-4xl/tight",
            "font-extrabold",
            "sm:text-5xl/tight",
            "md:text-6xl/tight",
            "lg:text-7xl/tight"
          )}
        >
          <Link href="" className="href">
            The Planet Blog
          </Link>
        </h1>
        <h2
          className={clsx(
            "text-md/tight",
            "font-thin",
            "sm:text-lg/tight",
            "md:text-xl/tight",
            "lg:text-2xl/tight"
          )}
        >
          Discover new worlds and galaxies
        </h2>
      </header>
    </>
  );
}
