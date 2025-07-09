import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pb-16 text-center font-light">
      <p>
        <span>Copyright &copy; {new Date().getFullYear()} - </span>
        <Link href="/">The Planet Blog</Link>
      </p>

      <p>
        <span>Done by </span>
        <Link
          href="https://github.com/GHBAlbuquerque"
          className="hover:text-slate-500"
        >
          @GHBAlbuquerque
        </Link>
      </p>
    </footer>
  );
}
