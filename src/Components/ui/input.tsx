import React from "react";
import { cn } from "../../utils/cn";

type InputVariant = "default" | "destructive" | "ghost";
type InputSize = "sm" | "default" | "lg";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  variant?: InputVariant;
  size?: InputSize;
  error?: string;
  label?: string;
}

const baseStyles =
  "flex w-full rounded-md border bg-white text-gray-900 transition-colors placeholder:text-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium";

const variantStyles: Record<InputVariant, string> = {
  default: "border-gray-300 focus-visible:border-blue-500",
  destructive: "border-red-500 focus-visible:ring-red-500",
  ghost:
    "border-transparent bg-gray-100 focus-visible:bg-white focus-visible:border-gray-300",
};

const sizeStyles: Record<InputSize, string> = {
  sm: "h-8 px-3 text-xs",
  default: "h-9 px-3 py-2 text-sm",
  lg: "h-11 px-4 text-base",
};



export const Input = ({
  className,
  variant = "default",
  size = "default",
  error,
  label,
  id,
  ...props
}: InputProps) => {
  
  //! if error it goes to the color is destrictive
  const activeVariant = error ? "destructive" : variant;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          baseStyles,
          variantStyles[activeVariant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export type { InputProps, InputVariant, InputSize };
