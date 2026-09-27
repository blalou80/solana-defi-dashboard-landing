import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * GitHub brand mark as inline SVG — lucide-react removed brand icons.
 * Inherits size/color from the parent like other icon components.
 */
export function GithubIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
      {...props}
    >
      <path d="M12 .5C5.65.5.5 5.63.5 11.95c0 5.06 3.29 9.35 7.86 10.87.58.1.79-.24.79-.53 0-.27-.01-1.17-.01-2.12-3.2.69-3.87-1.35-3.87-1.35-.53-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.46-2.27 1.18-3.07-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.17a11.2 11.2 0 0 1 2.88-.38c.98 0 1.96.13 2.88.38 2.2-1.48 3.17-1.17 3.17-1.17.63 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.7 5.37-5.26 5.65.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.2.64.8.53A11.46 11.46 0 0 0 23.5 11.95C23.5 5.63 18.35.5 12 .5Z" />
    </svg>
  );
}
