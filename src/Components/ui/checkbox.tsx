import React from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

type CheckboxVariant = "default" | "destructive" | "success";
type CheckboxSize = "sm" | "default" | "lg";

interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: string;
  description?: string;
  error?: string;
}

const boxBaseStyles =
  "peer inline-flex shrink-0 items-center justify-center rounded border-2 bg-white transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<CheckboxVariant, string> = {
  default:
    "border-gray-300 peer-checked:bg-primary peer-checked:border-primary focus-visible:ring-blue-500",
  destructive:
    "border-gray-300 peer-checked:bg-red-600 peer-checked:border-red-600 focus-visible:ring-red-500",
  success:
    "border-gray-300 peer-checked:bg-green-600 peer-checked:border-green-600 focus-visible:ring-green-500",
};

const sizeStyles: Record<CheckboxSize, { box: string; icon: string }> = {
  sm: { box: "h-3.5 w-3.5", icon: "h-2.5 w-2.5" },
  default: { box: "h-4 w-4", icon: "h-3 w-3" },
  lg: { box: "h-5 w-5", icon: "h-4 w-4" },
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      label,
      description,
      error,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
    const activeVariant = error ? "destructive" : variant;
    const { box, icon } = sizeStyles[size];

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2.5">
          <div className="relative inline-flex items-center">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className="peer absolute h-full w-full opacity-0 cursor-pointer"
              {...props}
            />
            <div
              className={cn(
                boxBaseStyles,
                box,
                variantStyles[activeVariant],
                className,
              )}
            >
              <Check
                className={cn(
                  "text-white opacity-0 peer-checked:opacity-100 transition-opacity",
                  icon,
                )}
                strokeWidth={3}
              />
            </div>
          </div>

          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <label
                  htmlFor={checkboxId}
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
        {error && <p className="text-xs text-red-600 pl-6">{error}</p>}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export type { CheckboxProps, CheckboxVariant, CheckboxSize };
