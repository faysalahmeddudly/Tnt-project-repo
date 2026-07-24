import React from "react";
import { cn } from "../../utils/cn";

type CardVariant = "default" | "outline" | "elevated" | "ghost";
type CardPadding = "none" | "sm" | "default" | "lg";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

const baseStyles = "rounded-lg bg-white text-gray-900";

const variantStyles: Record<CardVariant, string> = {
  default: "border border-gray-200",
  outline: "border-2 border-gray-300",
  elevated: "border border-gray-200 shadow-md",
  ghost: "border-none bg-transparent",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  default: "p-5",
  lg: "p-8",
};



export const Card = ({
  className,
  variant = "default",
  padding = "default",
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(baseStyles, variantStyles[variant], paddingStyles[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Sub-components: Header, Title, Description, Content, Footer ---

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 mb-4", className)} {...props} />
);

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-semibold leading-none", className)} {...props} />
);

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-gray-500", className)} {...props} />
);

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-sm text-gray-700", className)} {...props} />
);

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-2 mt-4 pt-4 border-t border-gray-100", className)} {...props} />
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export type { CardProps, CardVariant, CardPadding };