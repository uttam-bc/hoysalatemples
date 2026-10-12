import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-lamp-500 text-night-950 shadow-carved-out hover:bg-lamp-400 focus-visible:shadow-lamp",
  ghost:
    "bg-transparent text-bone border border-soapstone-400/40 shadow-carved-in hover:border-lamp-400 hover:text-lamp-400",
};

/** Carved stone button — primary (lamp) or ghost (incised). */
export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-chisel px-5 py-2.5 min-h-[44px] text-sm tracking-wide transition-colors duration-carved ease-carved disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
