
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Quote, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const testimonials: Testimonial[] = [
    {
      quote: "Little Big Dots transformed how I approach AI—what once felt intimidating is now intuitive and exciting!",
      author: "Emma Rodriguez",
      role: "UI/UX Designer"
    },
    {
      quote: "The supportive atmosphere and actionable insights significantly improved my workflow efficiency.",
      author: "Alex Chen",
      role: "Senior UX Designer"
    },
    {
      quote: "As a design leader, this community helps me make informed, confident decisions about integrating AI into my team's processes.",
      author: "Sarah Johnson",
      role: "Design Director"
    },
    {
      quote: "The structured methodologies have been a game-changer for my team's adoption of AI tools.",
      author: "Mrinal Patel",
      role: "Product Designer"
    }
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const nextTestimonial = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={containerRef} className="py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-br from-lbd-dark via-[#0A0A1F] to-black opacity-95"></div>
        
        {/* Cyber grid background */}
        <div 
          className="absolute inset-0 bg-cyber-grid bg-[length:40px_40px] opacity-10"
          style={{
            backgroundPosition: `calc(50% + ${mouseX.get() * 0.02}px) calc(50% + ${mouseY.get() * 0.02}px)`
          }}
        ></div>
        
        {/* Dynamic radial gradients that follow mouse */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at calc(50% + ${mouseX.get() * 0.1}px) calc(50% + ${mouseY.get() * 0.1}px), 
              rgba(255, 75, 127, 0.2) 0%, 
              transparent 40%)
            `
          }}
        ></motion.div>
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: [
                'rgba(255,75,127,0.7)', 
                'rgba(138,94,255,0.7)', 
                'rgba(54,219,255,0.7)'
              ][Math.floor(Math.random() * 3)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 3 + 2}px currentColor`,
            }}
            animate={{
              y: [0, -(Math.random() * 100 + 50)],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Decorative blurred circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-lbd-pink/5 mix-blend-overlay filter blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-lbd-purple/5 mix-blend-overlay filter blur-xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-6 relative"
          >
            <div className="px-4 py-1.5 rounded-full relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-lbd-pink/20 via-lbd-purple/20 to-lbd-cyan/20 backdrop-blur-sm border border-white/10 animate-neon-border-pulse rounded-full"></span>
              <span className="relative z-10 flex items-center text-lbd-pink text-sm font-medium">
                <Star className="w-4 h-4 mr-2 text-lbd-gold animate-pulse-glow" />
                Community Voices
              </span>
            </div>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            What Our <span className="text-transparent bg-clip-text"
              style={{
                background: "linear-gradient(to right, #FF4B7F, #8A5EFF, #36DBFF, #FF4B7F)",
                backgroundSize: "300% 100%",
                animation: "shimmer 8s linear infinite"
              }}
            >Members</span> Say
          </h2>
          <p className="text-lbd-white/70 text-lg md:text-xl">
            Real experiences from designers across different career stages
          </p>
        </motion.div>
        
        {/* Main testimonial display */}
        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="border-none shadow-2xl backdrop-blur-xl overflow-hidden relative">
                {/* Glassmorphism background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1D1D2B]/90 to-[#15151f]/90 backdrop-blur-md"></div>
                
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 border-2 border-transparent animate-neon-border-pulse rounded-xl"></div>
                </div>
                
                {/* Holographic effect */}
                <div className="absolute inset-0 hologram"></div>
                
                <div className="p-8 md:p-12 relative z-10">
                  {/* Decorative top gradient line */}
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-lbd-pink to-transparent"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#FF4B7F" fillOpacity="0.5" d="M47.5,-57.2C60.2,-45.7,68.4,-28.6,71.5,-10.1C74.5,8.4,72.5,28.2,62.3,41.6C52.2,55,34,62,15.2,68.8C-3.6,75.5,-23,82,-39.9,76.4C-56.8,70.8,-71.2,53.1,-77.1,33.3C-83,13.5,-80.5,-8.4,-71.4,-26.4C-62.3,-44.4,-46.6,-58.5,-30.4,-67.8C-14.2,-77.1,2.6,-81.8,17.3,-77.7C32,-73.7,44.7,-61,47.5,-57.2Z" transform="translate(100 100)" />
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-40 h-40 opacity-10">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#8A5EFF" d="M44.3,-58.5C54.9,-48.5,59.1,-31.4,64.1,-13.8C69.1,3.9,74.9,22.1,70.2,38.2C65.5,54.2,50.3,68.1,32.5,75.2C14.7,82.3,-5.8,82.7,-23.9,75.8C-41.9,68.9,-57.5,54.9,-67.1,37.9C-76.7,20.9,-80.3,0.9,-75.2,-16.1C-70.1,-33.2,-56.3,-47.3,-41.5,-56.4C-26.7,-65.5,-10.9,-69.7,3.8,-74.3C18.5,-78.9,36.9,-84,44.3,-58.5Z" transform="translate(100 100)" />
                    </svg>
                  </div>
                  
                  <div className="grid md:grid-cols-6 gap-8 items-center relative z-10">
                    <div className="md:col-span-1 flex justify-center">
                      <motion.div 
                        className="w-20 h-20 rounded-full relative overflow-hidden flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/30 to-lbd-purple/30 animate-hue-rotate opacity-80"></div>
                        <div className="absolute inset-0 animate-neon-border-pulse rounded-full"></div>
                        <Quote className="h-8 w-8 text-lbd-white relative z-10" />
                      </motion.div>
                    </div>
                    
                    <div className="md:col-span-4 flex flex-col items-center text-center">
                      <p className="text-xl md:text-2xl italic text-lbd-white mb-8 leading-relaxed">
                        "{testimonials[activeIndex].quote}"
                      </p>
                    </div>
                    
                    <div className="md:col-span-1 flex flex-col items-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/30 to-lbd-purple/30 animate-hue-rotate opacity-80"></div>
                        <div className="absolute inset-0 animate-neon-border-pulse rounded-full"></div>
                        <span className="relative z-10 font-bold text-lg text-lbd-white">{testimonials[activeIndex].author.charAt(0)}</span>
                      </div>
                      <h4 className="font-bold text-xl">{testimonials[activeIndex].author}</h4>
                      <p className="text-lbd-white/60">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-5 hidden md:block">
            <Button 
              onClick={prevTestimonial} 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-black/40 border border-white/10 hover:bg-lbd-pink/20 hover:border-lbd-pink relative overflow-hidden group"
              aria-label="Previous testimonial"
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-neon-border-pulse rounded-full"></span>
              <ChevronLeft className="w-5 h-5 relative z-10" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-5 hidden md:block">
            <Button 
              onClick={nextTestimonial} 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-black/40 border border-white/10 hover:bg-lbd-pink/20 hover:border-lbd-pink relative overflow-hidden group"
              aria-label="Next testimonial"
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-neon-border-pulse rounded-full"></span>
              <ChevronRight className="w-5 h-5 relative z-10" />
            </Button>
          </div>
          
          {/* Testimonial navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setAutoplay(false);
                }}
                aria-label={`View testimonial ${index + 1}`}
                className="group relative"
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'scale-125' 
                    : 'bg-lbd-white/20 hover:bg-lbd-white/40'
                }`}>
                  {activeIndex === index && (
                    <div className="absolute inset-0 rounded-full animate-neon-border-pulse"></div>
                  )}
                  <div className={`w-full h-full rounded-full ${
                    activeIndex === index 
                      ? 'bg-gradient-to-r from-lbd-pink to-lbd-purple animate-hue-rotate' 
                      : 'bg-white/20'
                  }`}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
