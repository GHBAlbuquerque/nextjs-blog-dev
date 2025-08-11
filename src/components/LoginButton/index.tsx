import { UserIcon } from "lucide-react";
import Link from "next/link";

export default function LoginButton() {
  return (
    <Link href="/admin/login" className="p-2 rounded-full hover:bg-slate-200">
      <UserIcon />
    </Link>
  );
}
