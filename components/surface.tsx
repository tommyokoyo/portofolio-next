import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type SurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[8px] border border-line/70 bg-surface/72 shadow-soft backdrop-blur-xl transition-[border-color,background-color,box-shadow,transform] duration-500 dark:shadow-soft-dark",
        interactive && "hover:border-accent/35 hover:bg-surface/88 hover:shadow-soft",
        className
      )}
      {...props}
    />
  )
);

Surface.displayName = "Surface";
