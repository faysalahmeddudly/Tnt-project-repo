import React from "react";

type StatusDotVariant = "online" | "offline" | "away" | "busy" | "default";
type StatusDotSize = "sm" | "default" | "lg";

interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: StatusDotVariant;
  size?: StatusDotSize;
  pulse?: boolean;
  label?: string;
}

const baseStyles = "inline-flex items-center gap-1.5";

const dotBaseStyles = "relative inline-flex rounded-full";

const variantStyles: Record<StatusDotVariant, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500",
  busy: "bg-red-500",
  default: "bg-gray-300",
};

const sizeStyles: Record<StatusDotSize, string> = {
  sm: "h-1.5 w-1.5",
  default: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

const labelSizeStyles: Record<StatusDotSize, string> = {
  sm: "text-xs",
  default: "text-sm",
  lg: "text-base",
};

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const StatusDot = ({
  className,
  variant = "default",
  size = "default",
  pulse = false,
  label,
  ...props
}: StatusDotProps) => {
  return (
    <span className={cn(baseStyles, className)} {...props}>
      <span className={cn(dotBaseStyles, sizeStyles[size])}>
        {pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              variantStyles[variant],
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full",
            sizeStyles[size],
            variantStyles[variant],
          )}
        />
      </span>
      {label && (
        <span className={cn("text-gray-700", labelSizeStyles[size])}>
          {label}
        </span>
      )}
    </span>
  );
};

export type { StatusDotProps, StatusDotVariant, StatusDotSize };
