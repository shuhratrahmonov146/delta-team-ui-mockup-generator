import Link from "next/link";

export default function FreeBtnComponent() {
  return (
    <Link
      href="http://localhost:3001"
      className="text-xs sm:text-[12px] md:text-[16px] font-[600] whitespace-nowrap py-3 px-6 text-center bg-slate-100 text-[#070129] rounded-3xl"
    >
      FREE TECH CONSULTATION
    </Link>
  );
}
