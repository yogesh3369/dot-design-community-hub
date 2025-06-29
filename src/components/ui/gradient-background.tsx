"use client";

import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'intense';
  isFirst?: boolean;
  isLast?: boolean;
}

/**
 * A reusable gradient background component that can be applied to any section
 * Provides a dark background with customizable gradient effects and smooth transitions
 */
export function GradientBackground({
  children,
  className,
  variant = 'default',
  isFirst = false,
  isLast = false,
}: GradientBackgroundProps) {
  // Base background color for all variants
  const baseBackground = "bg-lbd-dark";
  
  // Define gradient variants with smoother transitions
  const gradientVariants = {
    default: "relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-purple-500/10 before:via-transparent before:to-transparent after:absolute after:inset-0 after:bg-gradient-to-r after:from-lbd-pink/5 after:via-transparent after:to-purple-500/10",
    subtle: "relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-purple-500/5 before:via-transparent before:to-transparent after:absolute after:inset-0 after:bg-gradient-to-r after:from-lbd-pink/3 after:via-transparent after:to-purple-500/5",
    intense: "relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-purple-500/20 before:via-lbd-pink/10 before:to-transparent after:absolute after:inset-0 after:bg-gradient-to-r after:from-lbd-pink/10 after:via-transparent after:to-purple-500/20",
  };
  
  // Determine if we need top/bottom borders
  const borderStyles = cn(
    isFirst ? "rounded-t-lg" : "",
    isLast ? "rounded-b-lg" : "",
    !isFirst && !isLast ? "" : ""
  );

  return (
    <div className={cn(
      baseBackground, 
      gradientVariants[variant], 
      borderStyles,
      "overflow-visible", // Allow content to flow without hard breaks
      className
    )}>
      {/* Radial gradient overlay with reduced opacity for smoother transitions */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_80%)] pointer-events-none" />
      
      {/* Content container with proper z-index */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Smooth transition gradient at the bottom */}
      {!isLast && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-lbd-dark pointer-events-none" />
      )}
      
      {/* Smooth transition gradient at the top */}
      {!isFirst && (
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-t from-transparent to-lbd-dark pointer-events-none" />
      )}
    </div>
  );
}
