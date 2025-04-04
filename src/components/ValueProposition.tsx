
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, Check } from 'lucide-react';

const ValueProposition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // List of benefits
  const benefits = [
    "Structured AI learning paths designed specifically for designers",
    "Proven methodologies like Object-Oriented UX and Vibe Coding",
    "Expert-led workshops that translate theory into practical skills",
    "AI Agent strategies to streamline your design workflow"
  ];

  return (
    <section id="value-proposition" ref={ref} className="py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-b from-lbd-dark via-[#0A0A1F] to-lbd-dark-accent"></div>
        
        {/* Dynamic mesh gradient that follows mouse */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,75,127,0.4) 0%, transparent 35%), 
              radial-gradient(circle at ${window.innerWidth - mousePosition.x}px ${mousePosition.y}px, rgba(138,94,255,0.4) 0%, transparent 35%),
              radial-gradient(circle at ${mousePosition.x}px ${window.innerHeight - mousePosition.y}px, rgba(54,219,255,0.3) 0%, transparent 35%)
            `,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
          }}
        ></motion.div>
        
        {/* Cyber grid pattern with mouse follow */}
        <div 
          className="absolute inset-0 bg-cyber-grid bg-[length:40px_40px] opacity-10"
          style={{
            backgroundPosition: `calc(50% + ${mouseX.get() * 0.02}px) calc(50% + ${mouseY.get() * 0.02}px)`
          }}
        ></div>
        
        {/* Animated orbs */}
        <motion.div 
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full filter blur-[150px]"
          animate={{ 
            background: ['rgba(255,75,127,0.1)', 'rgba(138,94,255,0.1)', 'rgba(54,219,255,0.1)', 'rgba(255,75,127,0.1)'],
            scale: [1, 1.2, 1],
            x: mouseX.get() * 0.02,
            y: mouseY.get() * 0.02
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full filter blur-[150px]"
          animate={{ 
            background: ['rgba(138,94,255,0.1)', 'rgba(54,219,255,0.1)', 'rgba(255,75,127,0.1)', 'rgba(138,94,255,0.1)'],
            scale: [1, 1.2, 1],
            x: mouseX.get() * -0.02,
            y: mouseY.get() * -0.02
          }}
          transition={{ duration: 10, delay: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        {/* Moving particles */}
        {Array.from({ length: 20 }).map((_, i) => (
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
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="glass-dark backdrop-blur-lg rounded-3xl border border-white/10 p-10 relative overflow-hidden shadow-lg shadow-lbd-pink/10 hover:shadow-xl hover:shadow-lbd-pink/20 transition-all duration-500"
            whileHover={{ y: -5 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 border-2 border-transparent animate-neon-border-pulse rounded-3xl"></div>
            </div>
            
            {/* Holographic effect overlay */}
            <div className="absolute inset-0 hologram rounded-3xl"></div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              whileInView={{ scale: 1, opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.2 }} 
              className="w-fit mx-auto"
            >
              <div className="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-full relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-lbd-pink/20 via-lbd-purple/20 to-lbd-cyan/20 backdrop-blur-sm border border-white/10 animate-neon-border-pulse rounded-full"></span>
                <span className="relative z-10 flex items-center text-lbd-pink text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2 text-lbd-gold animate-pulse-glow" />
                  Our Unique Value Proposition
                </span>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-heading mb-6 text-center relative" 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transform: "translateZ(20px)" }}
            >
              Design's Future, <span className="text-transparent bg-clip-text"
                style={{
                  background: "linear-gradient(to right, #FF4B7F, #8A5EFF, #36DBFF, #FF4B7F)",
                  backgroundSize: "300% 100%",
                  animation: "shimmer 8s linear infinite"
                }}
              >Simplified</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-lbd-white/80 leading-relaxed text-center mb-10" 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ transform: "translateZ(10px)" }}
            >
              Little Big Dots isn't just another community—it's your bridge between traditional design skills and the future powered by AI. Through practical workshops, structured methodologies like Object-Oriented UX, AI Agents, and Vibe Coding, and a vibrant network, we simplify complex AI technologies into accessible, everyday design tools.
            </motion.p>
            
            {/* Benefits list */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ transform: "translateZ(15px)" }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="mt-0.5">
                    <Check className="h-5 w-5 text-lbd-cyan" />
                  </div>
                  <p className="text-lbd-white/90">{benefit}</p>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Decorative floating elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <motion.div 
                className="absolute top-10 left-10 w-8 h-8 rounded-full bg-lbd-pink/10 border border-lbd-pink/20"
                animate={{ y: [-10, 10], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute bottom-10 right-10 w-6 h-6 rounded-full bg-lbd-purple/10 border border-lbd-purple/20"
                animate={{ y: [5, -5], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute top-1/2 right-20 w-4 h-4 rounded-full bg-lbd-cyan/10 border border-lbd-cyan/20"
                animate={{ y: [-8, 8], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 7, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
