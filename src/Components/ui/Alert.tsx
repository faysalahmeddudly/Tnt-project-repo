import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { cn } from "../../utils/cn";

type AlertVariant = "info" | "success" | "warning" | "destructive";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
}

const baseStyles = "relative w-full flex gap-3 rounded-md border p-4";

const variantStyles: Record<AlertVariant, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  destructive: "bg-red-50 border-red-200 text-red-800",
};

const iconStyles: Record<AlertVariant, string> = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  destructive: "text-red-500",
};

const icons: Record<AlertVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: XCircle,
};



export const Alert = ({
  className,
  variant = "info",
  title,
  onClose,
  children,
  ...props
}: AlertProps) => {
  const Icon = icons[variant];

  return (
    <div
      role="alert"
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconStyles[variant])} />

      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold mb-0.5">{title}</p>}
        {children && <div className="text-sm opacity-90">{children}</div>}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-md outline-none hover:opacity-70 focus-visible:ring-2 focus-visible:ring-offset-1"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export type { AlertProps, AlertVariant };