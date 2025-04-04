
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const testimonials: Testimonial[] = [
    {
      quote: "Little Big Dots transformed how I approach AI—what once felt intimidating is now intuitive and exciting!",
      author: "Junior Designer",
      role: "UI/UX Designer"
    },
    {
      quote: "The supportive atmosphere and actionable insights significantly improved my workflow efficiency.",
      author: "Mid-Career UX Designer",
      role: "Senior UX Designer"
    },
    {
      quote: "As a design leader, this community helps me make informed, confident decisions about integrating AI into my team's processes.",
      author: "Senior Design Lead",
      role: "Design Director"
    },
    {
      quote: "The structured methodologies have been a game-changer for my team's adoption of AI tools.",
      author: "Mrinal",
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

  const nextTestimonial = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-mesh-gradient relative overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-lbd-pink/10"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
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
            className="inline-flex items-center justify-center mb-6 bg-lbd-pink/10 px-4 py-1 rounded-full border border-lbd-pink/20"
          >
            <span className="text-lbd-pink text-sm font-medium">Community Voices</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            What Our <span className="text-gradient">Members</span> Say
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
              <Card className="border-none bg-gradient-to-br from-[#1D1D2B]/90 to-[#15151f]/90 shadow-2xl backdrop-blur-md overflow-hidden hover-lift">
                <div className="p-8 md:p-12 relative">
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-lbd-pink to-transparent"></div>
                  
                  <div className="grid md:grid-cols-6 gap-8 items-center">
                    <div className="md:col-span-1 flex justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lbd-pink/30 to-purple-700/30 flex items-center justify-center shadow-inner shadow-lbd-pink/20">
                        <Quote className="h-8 w-8 text-lbd-pink" />
                      </div>
                    </div>
                    
                    <div className="md:col-span-4 flex flex-col items-center text-center">
                      <p className="text-xl md:text-2xl italic text-lbd-white mb-8 leading-relaxed">
                        "{testimonials[activeIndex].quote}"
                      </p>
                    </div>
                    
                    <div className="md:col-span-1 flex flex-col items-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-lbd-pink/30 to-purple-700/20 mb-3 glow-effect">
                        <span className="text-lbd-pink font-bold text-lg">{testimonials[activeIndex].author.charAt(0)}</span>
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
              className="h-12 w-12 rounded-full bg-black/40 border border-white/10 hover:bg-lbd-pink/20 hover:border-lbd-pink"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-5 hidden md:block">
            <Button 
              onClick={nextTestimonial} 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-black/40 border border-white/10 hover:bg-lbd-pink/20 hover:border-lbd-pink"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-gradient-to-r from-lbd-pink to-purple-500 scale-125 shadow-lg shadow-lbd-pink/20' 
                    : 'bg-lbd-white/20 hover:bg-lbd-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
