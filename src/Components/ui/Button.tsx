import React from "react";

type ButtonVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "xl" | "full" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-primary text-white hover:bg-primary-hover",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
  ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
  link: "bg-transparent text-blue-600 underline-offset-4 hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-10 px-6",
  xl: "h-12 px-8 text-base",
  full: "w-full h-10 px-6",
  icon: "h-9 w-9 p-0",
};

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const Button = ({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export type { ButtonProps, ButtonVariant, ButtonSize };