import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradientCTAButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function GradientCTAButton({ 
  children, 
  className, 
  onClick,
  icon = <ChevronRight className="ml-1 h-4 w-4" />
}: GradientCTAButtonProps) {
  return (
    <motion.button 
      className={cn(
        "bg-gradient-to-r from-lbd-pink to-purple-600 hover:from-lbd-pink/90 hover:to-purple-600/90",
        "text-white font-medium rounded-lg py-3 px-6",
        "shadow-lg shadow-purple-500/20 transition-all duration-300",
        "hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]",
        "flex items-center gap-2",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
      {icon}
    </motion.button>
  );
}
