import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-neutral-200"
      : "border border-white/10 bg-white/5 text-white hover:bg-white/10";

  return (
    <button
      {...props}
      className={`rounded-full px-6 py-3 font-semibold transition ${styles} ${className}`}
    >
      {children}
    </button>
  );
}