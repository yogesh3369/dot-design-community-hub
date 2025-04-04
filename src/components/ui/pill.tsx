"use client";

import { Circle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PillProps {
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
  custom?: number;
  variants?: any;
  initial?: string;
  animate?: string;
}

export const Pill = ({
  children,
  className,
  icon = true,
  custom,
  variants,
  initial = "hidden",
  animate = "visible",
}: PillProps) => {
  return (
    <motion.div
      custom={custom}
      variants={variants}
      initial={initial}
      animate={animate}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]",
        className
      )}
    >
      {icon && <Circle className="h-2 w-2 fill-lbd-pink" />}
      <span className="text-sm text-white/60 tracking-wide">{children}</span>
    </motion.div>
  );
};

export default Pill;
