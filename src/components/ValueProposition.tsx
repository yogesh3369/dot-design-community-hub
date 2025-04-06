
"use client";

import * as React from "react";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Sparkles, Lightbulb, Rocket } from "lucide-react";
import Pill from './ui/pill';

interface EmptyStateProps {
  title?: string
  description: string
  icons?: LucideIcon[]
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

function EmptyState({
  title,
  description,
  icons = [],
  action,
  className
}: EmptyStateProps) {
  return (
    <div className={cn(
      "border border-white/10 bg-black/40 backdrop-blur-md shadow-sm text-center",
      "border rounded-xl p-14 w-full",
      "group transition-all duration-200 hover:border-lbd-pink/30 hover:bg-black/50 hover:shadow-md",
      className
    )}>
      <div className="flex justify-center isolate">
        {icons.length === 3 ? (
          <>
            <div className="bg-lbd-dark/80 size-12 grid place-items-center rounded-xl relative left-2.5 top-1.5 -rotate-6 shadow-lg ring-1 ring-white/10 group-hover:-translate-x-5 group-hover:-rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
              {React.createElement(icons[0], {
                className: "w-6 h-6 text-lbd-pink"
              })}
            </div>
            <div className="bg-lbd-dark/80 size-12 grid place-items-center rounded-xl relative z-10 shadow-lg ring-1 ring-white/10 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
              {React.createElement(icons[1], {
                className: "w-6 h-6 text-purple-500"
              })}
            </div>
            <div className="bg-lbd-dark/80 size-12 grid place-items-center rounded-xl relative right-2.5 top-1.5 rotate-6 shadow-lg ring-1 ring-white/10 group-hover:translate-x-5 group-hover:rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
              {React.createElement(icons[2], {
                className: "w-6 h-6 text-blue-400"
              })}
            </div>
          </>
        ) : (
          <div className="bg-lbd-dark/80 size-12 grid place-items-center rounded-xl shadow-lg ring-1 ring-white/10 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
            {icons[0] && React.createElement(icons[0], {
              className: "w-6 h-6 text-lbd-pink"
            })}
          </div>
        )}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold font-heading mt-6">{title}</h2>
      <p className="text-lg text-lbd-white/80 leading-relaxed mt-1 whitespace-pre-line">{description}</p>
      {action && (
        <Button
          onClick={action.onClick}
          variant="outline"
          className={cn(
            "mt-4 border-white/10 hover:border-lbd-pink/30 text-white",
            "shadow-sm active:shadow-none"
          )}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}

const ValueProposition = () => {
  return (
    <section id="value-proposition" className="py-24 relative overflow-hidden bg-lbd-dark">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/[0.02] via-transparent to-purple-500/[0.02] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient blur circles */}
        <div className="absolute left-[-15%] top-[15%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[5%] w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full bg-lbd-pink/10 blur-[120px]" />
        <div className="absolute left-[40%] top-[60%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            whileInView={{ scale: 1, opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="w-fit mx-auto mb-4"
          >
            <Pill>
              Our Unique Value Proposition
            </Pill>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold font-heading text-center mb-8" 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Design's Future, <span className="text-lbd-pink">Simplified</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
          >
            <EmptyState
              description="Little Big Dots isn't just another community—it's your bridge between traditional design skills and the future powered by AI. Through practical workshops, structured methodologies like Object-Oriented UX, AI Agents, and Vibe Coding, and a vibrant network, we simplify complex AI technologies into accessible, everyday design tools."
              icons={[Sparkles, Lightbulb, Rocket]}
              className="max-w-[800px] mx-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
