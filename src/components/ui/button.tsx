import React from "react";

type ButtonVariant = "default" | "outline" | "ghost";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className = "",
  variant = "default",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 text-sm transition focus:outline-none";

  const styles =
    variant === "outline"
      ? "border border-black/20 bg-transparent hover:bg-black/5"
      : variant === "ghost"
      ? "bg-transparent hover:bg-black/5"
      : "bg-black text-white hover:bg-black/90";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
