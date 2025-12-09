import React from "react";

type BadgeVariant = "secondary" | "outline";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({
  className = "",
  variant = "secondary",
  ...props
}: Props) {
  const styles =
    variant === "outline"
      ? "border border-black/20 text-black/70"
      : "bg-black/5 text-black";

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs ${styles} ${className}`}
      {...props}
    />
  );
}
