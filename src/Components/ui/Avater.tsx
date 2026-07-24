import React from "react";
import { User } from "lucide-react";
import { cn } from "../../utils/cn";

type AvatarSize = "xs" | "sm" | "default" | "lg" | "xl";
type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string; // যেমন নামের ইনিশিয়াল "AR"
  size?: AvatarSize;
  status?: AvatarStatus;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  default: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const statusSizeStyles: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  default: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
};

const statusColorStyles: Record<Exclude<AvatarStatus, "none">, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500",
  busy: "bg-red-500",
};



export const Avatar = ({
  className,
  src,
  alt = "",
  fallback,
  size = "default",
  status = "none",
  ...props
}: AvatarProps) => {
  const [imgError, setImgError] = React.useState(false);
  const showImage = src && !imgError;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-gray-200 overflow-hidden font-medium text-gray-600",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : fallback ? (
        <span>{fallback.slice(0, 2).toUpperCase()}</span>
      ) : (
        <User className="h-1/2 w-1/2" />
      )}

      {status !== "none" && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-white",
            statusSizeStyles[size],
            statusColorStyles[status]
          )}
        />
      )}
    </div>
  );
};

export type { AvatarProps, AvatarSize, AvatarStatus };