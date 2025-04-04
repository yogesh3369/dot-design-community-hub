
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  const calculateMovement = (axis: 'x' | 'y', factor: number = 0.02) => {
    const center = axis === 'x' ? window.innerWidth / 2 : window.innerHeight / 2;
    const position = axis === 'x' ? mousePosition.x : mousePosition.y;
    return (position - center) * factor;
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-32 overflow-hidden">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-lbd-dark z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-lbd-dark to-lbd-dark-accent opacity-95"></div>
        
        {/* Interactive SVG Pattern */}
        <div className="absolute inset-0 zigzag-pattern opacity-5"></div>
        
        {/* Dynamic mesh gradient background */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,75,127,0.4) 0%, transparent 40%), 
                             radial-gradient(circle at ${window.innerWidth - mousePosition.x}px ${mousePosition.y}px, rgba(138,75,255,0.4) 0%, transparent 40%),
                             radial-gradient(circle at ${mousePosition.x}px ${window.innerHeight - mousePosition.y}px, rgba(0,255,255,0.2) 0%, transparent 30%)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
          }}
        ></div>
        
        {/* Animated glow effects */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-lbd-pink rounded-full filter blur-[150px] opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: calculateMovement('x', -0.5),
            y: calculateMovement('y', -0.5)
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-700 rounded-full filter blur-[180px] opacity-15"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: calculateMovement('x', 0.6),
            y: calculateMovement('y', 0.6) 
          }}
          transition={{ duration: 10, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        
        <motion.div 
          className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[900px] h-[300px] bg-lbd-pink rounded-full filter blur-[120px] opacity-10"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [0, -100],
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-20 right-20 w-40 h-40 opacity-10"
          style={{ x: calculateMovement('x', 0.03), y: calculateMovement('y', 0.03) }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FF4B7F" d="M37.9,-65.7C50.5,-56.7,63,-48,71.9,-36C80.8,-24,86.2,-8.7,85.4,6.2C84.6,21.1,77.6,35.7,67.5,47.8C57.3,59.8,44,69.3,29.4,75.3C14.8,81.4,-1,84,-17.1,81.9C-33.2,79.9,-49.6,73.1,-60.8,61.1C-72,49,-78,31.7,-79.8,14.4C-81.6,-2.9,-79.2,-20.2,-71.9,-34.1C-64.6,-48.1,-52.5,-58.6,-39.2,-67.3C-25.9,-76,-13,-82.8,-0.2,-82.5C12.5,-82.2,25.1,-74.7,37.9,-65.7Z" transform="translate(100 100)" />
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-20 w-60 h-60 opacity-10"
          style={{ x: calculateMovement('x', -0.02), y: calculateMovement('y', -0.02) }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#8A5EFF" d="M40.9,-69.5C54.6,-62.9,68.3,-54.8,77.2,-42.7C86.1,-30.7,90.1,-14.6,88.8,0.7C87.5,16.1,80.9,30.6,71.6,43.1C62.2,55.7,50.1,66.5,36.4,73C22.7,79.5,7.5,81.8,-8.1,80.6C-23.7,79.4,-39.7,74.7,-52.5,65.7C-65.2,56.7,-74.7,43.3,-78.5,28.6C-82.3,13.9,-80.4,-2.1,-76.2,-17.2C-72.1,-32.2,-65.7,-46.2,-54.8,-53.9C-44,-61.6,-28.7,-62.9,-14.3,-65.3C0.1,-67.8,13.5,-71.3,27.3,-76.2C41,-81,54.9,-87.2,40.9,-69.5Z" transform="translate(100 100)" />
          </svg>
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-lbd-pink font-medium text-sm">
              TRANSFORMING DESIGN WITH AI
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-8 leading-tight tracking-tight">
              From AI <motion.span 
                className="bg-gradient-to-r from-lbd-pink via-purple-400 to-lbd-pink bg-clip-text text-transparent bg-size-200 bg-pos-0"
                animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >Curiosity</motion.span> to Design <motion.span 
                className="bg-gradient-to-r from-purple-500 via-lbd-pink to-purple-500 bg-clip-text text-transparent bg-size-200 bg-pos-0"
                animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
                transition={{ duration: 8, delay: 4, repeat: Infinity, ease: "linear" }}
              >Confidence</motion.span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-lbd-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              A supportive community helping designers master AI with hands-on methodologies,
              practical resources, and collaborative learning.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button 
                className="group w-full sm:w-auto relative overflow-hidden transition-all duration-300 px-8 py-6 h-auto text-lg"
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center font-medium">
                  Join Our Community
                  <ChevronRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-lbd-pink via-purple-600 to-lbd-pink bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></span>
              </Button>
              
              <motion.a 
                href="#features"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 py-3 px-6 text-lbd-white/80 hover:text-lbd-pink transition-colors duration-300 border border-white/10 hover:border-lbd-pink/30 backdrop-blur-sm bg-white/5 hover:bg-white/10 rounded-full font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Features
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-20 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <motion.div 
              className="flex flex-col items-center p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 30px -5px rgba(255, 75, 127, 0.3)'
              }}
            >
              <span className="text-lbd-pink text-4xl font-bold">500+</span>
              <span className="text-lbd-white/80 text-sm mt-1">Active Members</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 30px -5px rgba(138, 75, 255, 0.3)'
              }}
            >
              <span className="text-lbd-pink text-4xl font-bold">50+</span>
              <span className="text-lbd-white/80 text-sm mt-1">AI Resources</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 30px -5px rgba(255, 75, 127, 0.3)'
              }}
            >
              <span className="text-lbd-pink text-4xl font-bold">24/7</span>
              <span className="text-lbd-white/80 text-sm mt-1">Community Support</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.a 
              href="#features" 
              className="text-lbd-white/50 hover:text-lbd-pink transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
