import React from "react";
import { cn } from "../../utils/cn";

type ProgressVariant = "default" | "success" | "warning" | "destructive";
type ProgressSize = "sm" | "default" | "lg";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 - 100
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  label?: string;
  indeterminate?: boolean;
}

const trackSizeStyles: Record<ProgressSize, string> = {
  sm: "h-1.5",
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
  ...props
}: ProgressProps) => {
  // value ke 0 theke max er moddhe clamp kora hocche (safety)
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = (clampedValue / max) * 100;

  return (
    <div className="flex flex-col gap-1.5 w-full">
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
          "w-full overflow-hidden rounded-full bg-gray-200",
          trackSizeStyles[size],
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            variantStyles[variant],
            indeterminate &&
              "w-1/3 animate-[progress-indeterminate_1.2s_ease-in-out_infinite]",
          )}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export type { ProgressProps, ProgressVariant, ProgressSize };
