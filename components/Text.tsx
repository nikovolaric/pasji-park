import { HTMLAttributes } from "react";

export function H1({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={`font-ibm text-2xl font-semibold text-black lg:text-[32px] ${className ?? ""}`}
      {...rest}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`text-lg text-black lg:text-2xl ${className ?? ""}`}
      {...rest}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-ibm text-primary text-xl font-semibold ${className ?? ""}`}
      {...rest}
    >
      {children}
    </h3>
  );
}

export function H4({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={`font-ibm font-medium text-black lg:text-xl ${className ?? ""}`}
      {...rest}
    >
      {children}
    </h4>
  );
}
