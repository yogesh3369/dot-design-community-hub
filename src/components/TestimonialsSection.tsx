"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Pill from "@/components/ui/pill"

export interface Testimonial {
  id: number
  name: string
  company: string
  content: string

  avatar: string
}

export interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number


  className?: string
}

export function TestimonialsSection({
  title = "What Our Members Say",
  subtitle = "Real experiences from designers across different career stages",
  testimonials = [],
  autoRotateInterval = 6000,


  className,
}: TestimonialsSectionProps) {
  // State for active testimonial
  const [activeIndex, setActiveIndex] = useState(0)

  // Refs for scroll animations
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  // Automatically cycle through testimonials
  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [testimonials.length, autoRotateInterval])

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Handlers for navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={cn(
        "relative overflow-hidden bg-lbd-dark text-lbd-white zigzag-pattern",
        "py-16 md:py-32 flex justify-center",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-lbd-dark/90 to-lbd-dark opacity-95"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />
      
      <div className="container-custom relative z-10 px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12 space-y-4"
        >
          <Pill className="mb-6">
            Community Voices
          </Pill>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-lbd-white to-lbd-white/80"
          >
            {title}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants} 
            className="text-lbd-white/70 max-w-[700px] mx-auto md:text-xl/relaxed leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="md:grid md:grid-cols-[1fr_auto] gap-8 items-center max-w-[1200px] mx-auto mb-8"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -top-6 -left-6 z-10">
              <Quote className="h-12 w-12 text-lbd-pink/20" strokeWidth={1} />
            </div>

            {/* Testimonial cards */}
            <div className="relative h-[344px] md:h-[304px]">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-500",
                    "border border-white/10 bg-black/40 backdrop-blur-md",
                    index === activeIndex
                      ? "opacity-100 translate-x-0 shadow-lg"
                      : "opacity-0 translate-x-[100px] pointer-events-none",
                    "hover:border-lbd-pink/30 hover:bg-black/50 hover:shadow-md"
                  )}
                >
                  <CardContent className="p-6 md:p-8 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-lbd-pink/10">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-gradient-to-br from-lbd-pink/30 to-purple-700/20">
                            <span className="text-lbd-pink font-bold">{testimonial.name.charAt(0)}</span>
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <h4 className="font-semibold text-lbd-white text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-lbd-white to-lbd-white/80">
                            {testimonial.name}
                          </h4>
                        </div>
                      </div>

                    </div>

                    <Separator className="my-3 bg-white/10" />

                    <p className="flex-1 italic text-base/relaxed text-lbd-white">"{testimonial.content}"</p>


                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <motion.div variants={itemVariants} className="flex md:flex-col gap-4 justify-center mt-8 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full h-10 w-10 border-white/10 bg-black/40 text-lbd-white hover:bg-black/60 hover:border-lbd-pink/30"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex md:flex-col gap-2 items-center justify-center">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === activeIndex ? "bg-lbd-pink" : "bg-lbd-white/20",
                  )}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveIndex(index)
                    }
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full h-10 w-10 border-white/10 bg-black/40 text-lbd-white hover:bg-black/60 hover:border-lbd-pink/30"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>


      </div>
    </section>
  )
}

export default TestimonialsSection;
