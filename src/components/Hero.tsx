
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Parallax values for background elements
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const yTop = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  return (
    <motion.section 
      ref={heroRef}
      className="relative pt-20 pb-32 overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-lbd-dark z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-lbd-dark to-lbd-dark-accent opacity-80"></div>
        
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-lbd-pink rounded-full filter blur-[120px] opacity-20 animate-pulse"
          style={{ x: xLeft, y: yTop }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-700 rounded-full filter blur-[120px] opacity-10 animate-pulse"
          style={{ x: xRight, y: yBottom, animationDelay: "1s" }}
        ></motion.div>
        
        <motion.div 
          className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[800px] h-64 bg-lbd-pink rounded-full filter blur-[100px] opacity-5 animate-pulse"
          style={{ y: yBottom, animationDuration: "8s" }}
        ></motion.div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100 
            }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              From AI{" "}
              <motion.span 
                className="text-lbd-pink inline-block relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Sparkles className="absolute -top-5 -left-4 w-6 h-6 text-lbd-pink opacity-75" />
                Curiosity
              </motion.span>{" "}
              to Design{" "}
              <motion.span 
                className="text-lbd-pink inline-block relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Sparkles className="absolute -top-5 -right-4 w-6 h-6 text-lbd-pink opacity-75" />
                Confidence
              </motion.span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-lbd-white/80 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A supportive community helping designers master AI with hands-on methodologies,
            practical resources, and collaborative learning.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                className="btn-primary text-lg group w-full sm:w-auto relative overflow-hidden transition-all duration-300" 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center">
                  Join Our Community
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </span>
                <motion.span 
                  className="absolute inset-0 bg-white/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: "left" }}
                ></motion.span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button variant="outline" className="w-full sm:w-auto group relative overflow-hidden border-lbd-pink/30 text-lbd-white hover:text-white hover:bg-transparent">
                <span className="relative z-10 flex items-center">
                  <Play size={18} className="mr-2" />
                  Watch Demo
                </span>
                <motion.span 
                  className="absolute inset-0 bg-lbd-pink/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ borderRadius: "9999px" }}
                ></motion.span>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {[
              { number: "500+", text: "Active Members" },
              { number: "50+", text: "AI Resources" },
              { number: "24/7", text: "Community Support" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.span 
                  className="text-lbd-pink text-3xl font-bold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 + (index * 0.1), duration: 0.5 }}
                >
                  {item.number}
                </motion.span>
                <motion.span 
                  className="text-lbd-white/70 text-sm"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 + (index * 0.1), duration: 0.5 }}
                >
                  {item.text}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-20 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.a 
              href="#features" 
              className="text-lbd-white/50 hover:text-lbd-pink transition-colors"
              whileHover={{ y: 5 }}
              animate={{ y: [0, 5, 0] }}
              transition={{ 
                y: { 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut" 
                }
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-lbd-pink rounded-full"
            initial={{ 
              x: Math.random() * 100 - 50 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: 0 
            }}
            animate={{ 
              x: Math.random() * 100 - 50 + "%", 
              y: [Math.random() * 100 + "%", Math.random() * -50 + "%"],
              opacity: [0, 0.5, 0] 
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            style={{ scale: 0.5 + Math.random() * 2 }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Hero;
