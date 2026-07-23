import React from "react";
import { X } from "lucide-react";

type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "success"
  | "outline";
type BadgeSize = "sm" | "default" | "lg";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  onRemove?: () => void;
}

const baseStyles =
  "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap transition-colors";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary text-white",
  secondary: "bg-gray-200 text-gray-900",
  destructive: "bg-red-100 text-red-700",
  success: "bg-green-100 text-green-700",
  outline: "border border-gray-300 bg-transparent text-gray-700",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "h-5 px-2 text-[10px]",
  default: "h-6 px-2.5 text-xs",
  lg: "h-7 px-3 text-sm",
};

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const Badge = ({
  className,
  variant = "default",
  size = "default",
  onRemove,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 rounded-full outline-none hover:opacity-70 focus-visible:ring-1 focus-visible:ring-blue-500"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

export type { BadgeProps, BadgeVariant, BadgeSize };
