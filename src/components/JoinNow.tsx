
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUp, Star, Sparkles, Zap } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const JoinNow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="join-now" ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-b from-lbd-dark/95 via-[#0A0A1F] to-black"></div>
        
        {/* Cyber grid pattern with mouse follow */}
        <div 
          className="absolute inset-0 bg-cyber-grid bg-[length:40px_40px] opacity-20"
          style={{
            backgroundPosition: `calc(50% + ${mouseX.get() * 0.02}px) calc(50% + ${mouseY.get() * 0.02}px)`
          }}
        ></div>
        
        {/* Animated gradient blob */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full filter blur-[200px]"
          style={{
            background: "linear-gradient(135deg, rgba(255,75,127,0.5), rgba(138,94,255,0.5), rgba(54,219,255,0.5))",
            backgroundSize: "400% 400%",
            animation: "gradient-shift 10s ease infinite"
          }}
        />
        
        {/* Decorative particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              backgroundColor: [
                'rgba(255,75,127,0.7)', 
                'rgba(138,94,255,0.7)', 
                'rgba(54,219,255,0.7)',
                'rgba(255,215,0,0.4)'
              ][Math.floor(Math.random() * 4)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 4 + 2}px currentColor`,
            }}
            animate={{
              y: [0, -(Math.random() * 150 + 50)],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Decorative SVG waves */}
        <motion.svg 
          className="absolute bottom-0 left-0 w-full opacity-10"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ y: 20, opacity: 0.05 }}
          animate={{ y: 0, opacity: 0.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        >
          <path fill="#FF4B7F" fillOpacity="0.5" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,170.7C960,160,1056,160,1152,170.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </motion.svg>
      </div>
      
      <div className="container-custom relative z-10">
        {/* 3D tilt card with mouse follow effect */}
        <motion.div 
          className="max-w-3xl mx-auto perspective-1000"
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          <div className="text-center">
            <motion.div
              className="inline-flex items-center justify-center mb-6 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="px-6 py-2 rounded-full bg-gradient-to-r from-lbd-pink/20 via-lbd-purple/30 to-lbd-cyan/20 backdrop-blur-sm border border-white/10 animate-neon-border-pulse">
                <span className="relative z-10 flex items-center text-lbd-white font-semibold text-sm">
                  <Star className="w-4 h-4 mr-2 text-lbd-gold animate-pulse-glow" /> 
                  THE FUTURE OF DESIGN AWAITS
                </span>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text"
                  style={{
                    background: "linear-gradient(to right, #FF4B7F, #8A5EFF, #36DBFF, #FF4B7F)",
                    backgroundSize: "300% 100%",
                    animation: "shimmer 8s linear infinite"
                  }}
                >confidently navigate</span>
                <motion.span 
                  className="absolute -inset-1 rounded-lg" 
                  style={{ 
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,75,127,0.2) 0%, transparent 70%)`,
                    zIndex: 0 
                  }}
                ></motion.span>
              </span> the future of design with AI?
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-lbd-white/80 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join Little Big Dots and start transforming your skills today.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col md:flex-row justify-center items-center gap-4"
            >
              <Button 
                size="lg" 
                className="w-full md:w-auto text-lg px-8 py-6 h-auto relative overflow-hidden rounded-full transition-all duration-300 shadow-lg shadow-lbd-pink/20 group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-lbd-pink via-lbd-purple to-lbd-cyan animate-hue-rotate opacity-90"></span>
                <span className="relative z-10 flex items-center font-medium">
                  <Sparkles className="mr-2 h-5 w-5 text-lbd-gold animate-pulse-glow" />
                  Join Our Community
                </span>
              </Button>
              
              <Button 
                variant="outline"
                size="lg" 
                className="w-full md:w-auto text-lg px-8 py-6 h-auto border-lbd-white/20 text-lbd-white hover:bg-lbd-white/5 hover:border-lbd-white/30 font-medium rounded-full transition-all duration-300 group relative overflow-hidden"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center">
                  <ArrowUp className="mr-2 group-hover:-translate-y-1 transition-transform duration-300" size={18} />
                  Back to Top
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(255,75,127,0.1) 0%, transparent 70%)`
                  }}
                ></span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      
        {/* Floating badges */}
        <div className="max-w-4xl mx-auto mt-20 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Cutting-edge AI', 'Expert Mentors', 'Practical Resources', 'Supportive Network'].map((item, i) => (
              <motion.div
                key={item}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/20 via-lbd-purple/20 to-lbd-cyan/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="p-4 rounded-xl border border-white/10 backdrop-blur-sm bg-white/5 flex flex-col items-center justify-center text-center h-full relative z-10 group-hover:border-white/30 transition-all duration-300">
                  <span className="text-lbd-white group-hover:text-lbd-pink transition-colors duration-300 font-medium">{item}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute -bottom-10 left-0 w-40 h-40 opacity-5"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF4B7F" d="M37.9,-65.7C50.5,-56.7,63,-48,71.9,-36C80.8,-24,86.2,-8.7,85.4,6.2C84.6,21.1,77.6,35.7,67.5,47.8C57.3,59.8,44,69.3,29.4,75.3C14.8,81.4,-1,84,-17.1,81.9C-33.2,79.9,-49.6,73.1,-60.8,61.1C-72,49,-78,31.7,-79.8,14.4C-81.6,-2.9,-79.2,-20.2,-71.9,-34.1C-64.6,-48.1,-52.5,-58.6,-39.2,-67.3C-25.9,-76,-13,-82.8,-0.2,-82.5C12.5,-82.2,25.1,-74.7,37.9,-65.7Z" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinNow;
