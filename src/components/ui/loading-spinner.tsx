import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  return (
    <div 
      className={cn(
        "animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md", 
          "h-8 w-8": size === "lg"
        },
        className
      )}
    />
  );
}