import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "terciary" | "alert" | "text";

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

function LinkBtn({ href, className, variant, ...rest }: CustomLinkProps) {
  const base =
    "px-6 py-2.5 rounded-full font-medium transition-all duration-300 hover:shadow-[inset_1px_1px_10px_rgba(0,0,0,0.25)]";

  const style: Record<string, string> = {
    primary:
      base +
      " bg-primary shadow-[1px_1px_10px_rgba(0,0,0,0.25)] text-white hover:bg-terciary",
    secondary:
      base +
      " bg-secondary shadow-[1px_1px_10px_rgba(0,0,0,0.25)] text-primary hover:text-white hover:bg-primary",
    terciary: base + " border border-primary text-primary hover:bg-secondary",
    alert: "font-semibold text-terciary",
    text: "font-semibold text-primary",
  };

  return (
    <Link
      href={href ?? "/"}
      className={`${style[variant as string]} ${className ? className : ""}`}
      {...rest}
    ></Link>
  );
}

export default LinkBtn;
