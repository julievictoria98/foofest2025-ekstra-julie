"use client";
import Link from "next/link";
function CtaButton({ text, action, href }) {
  return (
    <Link
      href={href}
      className=" button font-rethink text-main-2 font-sm bg-accent-1 hover:text-main-1 uppercase font-bold max-w-[100%] "
      onClick={action}
    >
      {text}
    </Link>
  );
}

export default CtaButton;
