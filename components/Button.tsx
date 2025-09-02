import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

type Variant = "primary" | "secondary" | "terciary";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

function Button({ className, variant, ...rest }: CustomButtonProps) {
  const { pending } = useFormStatus();

  const base =
    "px-6 py-2 cursor-pointer rounded-full font-medium transition-all duration-300 hover:shadow-[inset_1px_1px_10px_rgba(0,0,0,0.25)]";

  const style: Record<string, string> = {
    primary:
      base +
      " bg-primary shadow-[1px_1px_10px_rgba(0,0,0,0.25)] text-white hover:bg-terciary",
    secondary:
      base +
      " bg-secondary shadow-[1px_1px_10px_rgba(0,0,0,0.25)] text-primary hover:text-white hover:bg-primary",
    terciary: base + " border border-primary text-primary hover:bg-secondary",
  };

  return (
    <button
      className={`${style[variant as string]} ${className ? className : ""}`}
      disabled={rest.disabled ?? pending}
      {...rest}
    >
      {rest.disabled || pending ? "..." : rest.children}
    </button>
  );
}

export default Button;
