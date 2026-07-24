import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

type SelectVariant = "default" | "destructive" | "ghost";
type SelectSize = "sm" | "default" | "lg";

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  variant?: SelectVariant;
  size?: SelectSize;
  error?: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

const baseStyles =
  "flex w-full appearance-none rounded-md border bg-white text-gray-900 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 pr-9";

const variantStyles: Record<SelectVariant, string> = {
  default: "border-gray-300 focus-visible:border-blue-500",
  destructive: "border-red-500 focus-visible:ring-red-500",
  ghost:
    "border-transparent bg-gray-100 focus-visible:bg-white focus-visible:border-gray-300",
};

const sizeStyles: Record<SelectSize, string> = {
  sm: "h-8 pl-3 text-xs",
  default: "h-9 pl-3 py-2 text-sm",
  lg: "h-11 pl-4 text-base",
};



export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      error,
      label,
      id,
      options,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;

    //! if error the input variant takes dynamic valuse as destructive
    const activeVariant = error ? "destructive" : variant;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              baseStyles,
              variantStyles[activeVariant],
              sizeStyles[size],
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export type { SelectProps, SelectVariant, SelectSize, SelectOption };
