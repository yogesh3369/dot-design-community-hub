"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Pill from "@/components/ui/pill";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  username?: string;
};

export interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  className?: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-lbd-pink/20 transition-all duration-300 h-auto"
    >
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border border-lbd-pink/10 bg-gradient-to-br from-lbd-pink/10 to-purple-700/10">
            {testimonial.src ? (
              <img 
                src={testimonial.src} 
                alt={testimonial.name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-lbd-pink font-medium">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-lbd-white">{testimonial.name}</h3>
            <p className="text-xs text-lbd-white/60">@{testimonial.username || testimonial.name.toLowerCase().replace(/\s+/g, '')}</p>
          </div>
        </div>
        <p className="text-lbd-white/80 text-sm leading-relaxed">{testimonial.quote}</p>
      </div>
    </motion.div>
  );
};

export function TestimonialsSection({
  title = "What Our Members Say",
  subtitle = "Real experiences from designers across different career stages",
  testimonials = [],
  className,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className={cn(
        "relative overflow-hidden bg-lbd-dark text-lbd-white zigzag-pattern",
        "py-16 md:py-24 lg:py-32 flex justify-center",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-lbd-dark/90 to-lbd-dark opacity-95"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />
      
      <div className="container-custom relative z-10 px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Pill className="mb-6">
            Community Voices
          </Pill>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lbd-white to-lbd-white/80">
            {title}
          </h2>
          
          <p className="text-lg text-lbd-white/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Show UI button for mobile only */}
          <div className="mb-6 md:hidden">
            <button className="px-4 py-2 bg-black/40 border border-white/10 text-lbd-white rounded-md text-sm font-medium hover:bg-black/60 hover:border-lbd-pink/20 transition-all duration-300">
              Show UI
            </button>
          </div>
          
          {/* Masonry layout - horizontal grid with vertical flow */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="break-inside-avoid mb-4"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
