import React from "react";
import { cn } from "../../utils/cn";

type TextareaVariant = "default" | "destructive" | "ghost";
type TextareaSize = "sm" | "default" | "lg";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  size?: TextareaSize;
  error?: string;
  label?: string;
}

const baseStyles =
  "flex w-full rounded-md border bg-white text-gray-900 transition-colors placeholder:text-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 resize-y";

const variantStyles: Record<TextareaVariant, string> = {
  default: "border-gray-300 focus-visible:border-blue-500",
  destructive: "border-red-500 focus-visible:ring-red-500",
  ghost: "border-transparent bg-gray-100 focus-visible:bg-white focus-visible:border-gray-300",
};

const sizeStyles: Record<TextareaSize, string> = {
  sm: "min-h-[60px] px-3 py-1.5 text-xs",
  default: "min-h-[80px] px-3 py-2 text-sm",
  lg: "min-h-[120px] px-4 py-3 text-base",
};



export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, variant = "default", size = "default", error, label, id, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    // if error  automatically destructive 
    const activeVariant = error ? "destructive" : variant;

    return (
      <div className="flex flex-col gap-1.5 w-full">

        
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            baseStyles,
            variantStyles[activeVariant],
            sizeStyles[size],
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export type { TextareaProps, TextareaVariant, TextareaSize };