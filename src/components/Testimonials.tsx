
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
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

  return (
    <section id="testimonials" className="py-24 bg-lbd-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-lbd-pink/30 filter blur-[100px]"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-700/30 filter blur-[100px]"
        />
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
            What Our <span className="text-lbd-pink">Members</span> Say
          </h2>
          <p className="text-lbd-white/70 text-lg md:text-xl">
            Real experiences from designers across different career stages
          </p>
        </motion.div>
        
        {/* Main testimonial display */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <Card className="border-none bg-gradient-to-br from-lbd-dark-accent/80 to-lbd-dark-accent shadow-xl backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                  <Quote className="h-12 w-12 text-lbd-pink/30 mb-6" />
                  <p className="text-xl md:text-2xl italic text-lbd-white mb-8 leading-relaxed">
                    "{testimonials[activeIndex].quote}"
                  </p>
                  <div className="mt-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-lbd-pink/20 mb-3">
                      <span className="text-lbd-pink font-bold text-lg">{testimonials[activeIndex].author.charAt(0)}</span>
                    </div>
                    <h4 className="font-bold text-xl">{testimonials[activeIndex].author}</h4>
                    <p className="text-lbd-white/60">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Testimonial navigation dots */}
          <div className="flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-lbd-pink scale-125' : 'bg-lbd-white/20 hover:bg-lbd-white/40'
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
