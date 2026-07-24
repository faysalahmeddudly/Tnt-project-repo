import React from "react";
import { cn } from "../../utils/cn";

type ToggleVariant = "default" | "destructive" | "success";
type ToggleSize = "sm" | "default" | "lg";

interface ToggleProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  label?: string;
  description?: string;
}

const trackBaseStyles =
  "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const thumbBaseStyles =
  "pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition-transform";

const variantStyles: Record<ToggleVariant, string> = {
  default: "bg-gray-300 peer-checked:bg-primary",
  destructive: "bg-gray-300 peer-checked:bg-red-600",
  success: "bg-gray-300 peer-checked:bg-green-600",
};

const sizeStyles: Record<
  ToggleSize,
  { track: string; thumb: string; translate: string }
> = {
  sm: { track: "h-4 w-7", thumb: "h-3 w-3", translate: "translate-x-3" },
  default: { track: "h-5 w-9", thumb: "h-4 w-4", translate: "translate-x-4" },
  lg: { track: "h-6 w-11", thumb: "h-5 w-5", translate: "translate-x-5" },
};

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      label,
      description,
      id,
      checked,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const toggleId = id ?? generatedId;
    const { track, thumb, translate } = sizeStyles[size];

    return (
      <div className="flex items-start gap-3">
        <div className="relative inline-flex items-center">
          <input
            ref={ref}
            id={toggleId}
            type="checkbox"
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={toggleId}
            className={cn(
              trackBaseStyles,
              track,
              variantStyles[variant],
              className,
            )}
          >
            <span
              className={cn(
                thumbBaseStyles,
                thumb,
                "translate-x-0.5 peer-checked:" + translate,
                checked && translate,
                "mt-0.5",
              )}
            />
          </label>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={toggleId}
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";

export type { ToggleProps, ToggleVariant, ToggleSize };
