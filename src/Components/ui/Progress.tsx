import React from "react";
import { cn } from "../../utils/cn";

type ProgressVariant = "default" | "success" | "warning" | "destructive";
type ProgressSize = "sm" | "default" | "lg";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; 
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  label?: string;
  indeterminate?: boolean;


  rounded?: boolean;


  trackClassName?: string;


  indicatorClassName?: string;
}

const trackSizeStyles: Record<ProgressSize, string> = {
  sm: "h-1",
  default: "h-2.5",
  lg: "h-4",
};

const variantStyles: Record<ProgressVariant, string> = {
  default: "bg-primary",
  success: "bg-green-600",
  warning: "bg-yellow-500",
  destructive: "bg-red-600",
};

export const Progress = ({
  className,
  value,
  max = 100,
  variant = "default",
  size = "default",
  showLabel = false,
  label,
  indeterminate = false,
  rounded = true,
  trackClassName,
  indicatorClassName,
  ...props
}: ProgressProps) => {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = (clampedValue / max) * 100;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>{label}</span>
          {showLabel && <span>{Math.round(percentage)}%</span>}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          "relative w-full overflow-hidden bg-gray-200",
          trackSizeStyles[size],
          rounded && "rounded-full",
          trackClassName,
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full transition-[width] duration-300 ease-out",
            rounded && "rounded-full",
            variantStyles[variant],
            indeterminate &&
              "absolute left-0 top-0 w-1/3 animate-[progress-indeterminate_1.2s_ease-in-out_infinite]",
            indicatorClassName,
          )}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export type { ProgressProps, ProgressVariant, ProgressSize };