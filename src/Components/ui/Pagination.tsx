import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../utils/cn";

type PaginationVariant = "numbered" | "simple";
type PaginationSize = "sm" | "default" | "lg";

interface PaginationProps {
  currentPage: number; // 1-based
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: PaginationVariant;
  size?: PaginationSize;
  siblingCount?: number; 
  showEdges?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
}

const sizeStyles: Record<PaginationSize, string> = {
  sm: "h-7 w-7 text-xs",
  default: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
};


function getPageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis")[] {
  const totalNumbers = siblingCount * 2 + 5; 

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const pages: (number | "ellipsis")[] = [1];

  if (showLeftEllipsis) pages.push("ellipsis");

  for (
    let i = leftSibling === 1 ? 2 : leftSibling;
    i <= (rightSibling === totalPages ? totalPages - 1 : rightSibling);
    i++
  ) {
    if (i !== 1 && i !== totalPages) pages.push(i);
  }

  if (showRightEllipsis) pages.push("ellipsis");

  if (totalPages !== 1) pages.push(totalPages);

  return pages;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = "numbered",
  size = "default",
  siblingCount = 1,
  totalItems,
  itemsPerPage,
  className,
}: PaginationProps) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePrev = () => canGoPrev && onPageChange(currentPage - 1);
  const handleNext = () => canGoNext && onPageChange(currentPage + 1);

  // ..showing the page of pages
  const rangeText =
    totalItems !== undefined && itemsPerPage !== undefined
      ? (() => {
          const start = (currentPage - 1) * itemsPerPage + 1;
          const end = Math.min(currentPage * itemsPerPage, totalItems);
          return `Showing ${start}-${end} of ${totalItems}`;
        })()
      : null;

  const navButtonStyles = cn(
    "inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
    sizeStyles[size],
  );

  //next and previouse variant
  if (variant === "simple") {
    return (
      <div className={cn("flex items-center justify-between gap-4", className)}>
        {rangeText && (
          <span className="text-sm text-gray-500">{rangeText}</span>
        )}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canGoPrev}
            className="inline-flex items-center gap-1 px-3 h-8 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
            className="inline-flex items-center gap-1 px-3 h-8 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // --- Number variant: 1,2,3..
  const pages = getPageNumbers(currentPage, totalPages, siblingCount);

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {rangeText && <span className="text-sm text-gray-500">{rangeText}</span>}

      <div className="flex items-center gap-1.5 ml-auto">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoPrev}
          aria-label="Previous page"
          className={navButtonStyles}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className={cn(
                "inline-flex items-center justify-center text-gray-400",
                sizeStyles[size],
              )}
            >
              <MoreHorizontal className="h-4 w-4" />
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "inline-flex items-center justify-center rounded-md font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                sizeStyles[size],
                page === currentPage
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="Next page"
          className={navButtonStyles}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export type { PaginationProps, PaginationVariant, PaginationSize };
