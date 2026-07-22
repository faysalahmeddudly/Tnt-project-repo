import type React from "react";

type inputVariant = "default" | "error" | "success";
type inputSize = "default" | "sm" | "lg";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  varaiant?: inputVariant;
  size?: inputSize;
  label?: string;
  error?: string;
  helperText?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  wrapperClassName?: string;
}

const baseStyles =
  "w-full rouneded-md border bg-white text-sm text-gray-900" +
  "placeholder:text-grey-400 transition-colors duration-150" +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 " +
  "outline-none focus-visible:ring-2 focus-visible:ring-offset-1";

const variantStyles: Record<inputVariant, string> = {
  default:
    "border-gray-300 focus-visible:ring-blue-500 focus-visible:border-blue-500",
  error:
    "border-red-500 text-red-900 focus-visible:ring-red-500 focus-visible:border-red-500",
  success:
    "border-green-500 focus-visible:ring-green-500 focus-visible:border-green-500",
};

const sizeStyles: Record<inputSize, string> = {
  default: "h-9 px-3 py-2",
  sm: "h-8 px-2.5 py-1.5 text-xs",
  lg: "h-11 px-4 py-2.5 text-base",
};

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}


const input= React.forwardRef<HTMLInputElement,InputProps>((
    {
        className, w
    }
)){
    
}
