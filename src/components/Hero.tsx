
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // For interactive particles
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([]);
  
  useEffect(() => {
    // Generate initial particles
    const initialParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: [
        'rgba(255, 75, 127, 0.7)', 
        'rgba(138, 94, 255, 0.7)', 
        'rgba(54, 219, 255, 0.7)',
        'rgba(255, 215, 0, 0.4)'
      ][Math.floor(Math.random() * 4)]
    }));
    setParticles(initialParticles);

    const handleMouseMove = (e: MouseEvent) => {
      const heroElement = heroRef.current;
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate distance from center (0 to 1)
        const distanceX = (x - centerX) / centerX;
        const distanceY = (y - centerY) / centerY;
        
        mouseX.set(distanceX * 40); // Amplify the effect a bit
        mouseY.set(distanceY * 40);
        
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const calculateMovement = (axis: 'x' | 'y', factor: number = 0.02) => {
    const center = axis === 'x' ? window.innerWidth / 2 : window.innerHeight / 2;
    const position = axis === 'x' ? mousePosition.x : mousePosition.y;
    return (position - center) * factor;
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-28 pb-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-lbd-dark z-0">
        {/* Base gradient background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-lbd-dark via-lbd-dark to-lbd-dark-accent opacity-95"></div>
        
        {/* Cyber grid pattern */}
        <div 
          className="absolute inset-0 bg-cyber-grid bg-[length:40px_40px] opacity-20"
          style={{
            backgroundPosition: `calc(50% + ${mouseX.get() * 0.5}px) calc(50% + ${mouseY.get() * 0.5}px)`
          }}
        ></div>
        
        {/* Dynamic mesh gradient that follows mouse */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,75,127,0.4) 0%, transparent 25%), 
              radial-gradient(circle at ${window.innerWidth - mousePosition.x}px ${mousePosition.y}px, rgba(138,94,255,0.4) 0%, transparent 25%),
              radial-gradient(circle at ${mousePosition.x}px ${window.innerHeight - mousePosition.y}px, rgba(54,219,255,0.3) 0%, transparent 25%)
            `,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
          }}
        ></motion.div>
        
        {/* Animated glow orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[150px] opacity-20"
          animate={{ 
            background: ['rgba(255,75,127,0.3)', 'rgba(138,94,255,0.3)', 'rgba(54,219,255,0.3)', 'rgba(255,75,127,0.3)'],
            scale: [1, 1.2, 1],
            x: calculateMovement('x', -0.5),
            y: calculateMovement('y', -0.5)
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full filter blur-[180px] opacity-15"
          animate={{ 
            background: ['rgba(138,94,255,0.2)', 'rgba(54,219,255,0.2)', 'rgba(255,75,127,0.2)', 'rgba(138,94,255,0.2)'],
            scale: [1, 1.3, 1],
            x: calculateMovement('x', 0.6),
            y: calculateMovement('y', 0.6) 
          }}
          transition={{ duration: 14, delay: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        {/* Animated particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            }}
            animate={{
              x: [
                (Math.random() - 0.5) * 100, 
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
              ],
              y: [
                (Math.random() - 0.5) * 100, 
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
              ],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Morphing shape decorations */}
        <motion.div 
          className="absolute top-20 right-20 w-60 h-60 opacity-5"
          animate={{ 
            rotate: 360,
            x: calculateMovement('x', 0.03), 
            y: calculateMovement('y', 0.03) 
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 }
          }}
        >
          <motion.div 
            className="w-full h-full bg-lbd-pink"
            animate={{ borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '50% 60% 50% 70% / 40% 40% 60% 50%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-40 left-20 w-80 h-80 opacity-5"
          animate={{ 
            rotate: -360,
            x: calculateMovement('x', -0.02), 
            y: calculateMovement('y', -0.02) 
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 }
          }}
        >
          <motion.div 
            className="w-full h-full bg-lbd-purple"
            animate={{ borderRadius: ['40% 60% 70% 30% / 60% 30% 70% 40%', '70% 30% 50% 50% / 30% 40% 60% 70%', '30% 70% 70% 30% / 50% 30% 70% 50%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
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
            <motion.span 
              className="inline-block px-4 py-1.5 mb-6 rounded-full relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-lbd-pink/20 via-lbd-purple/20 to-lbd-cyan/20 backdrop-blur-sm border border-white/10 animate-neon-border-pulse rounded-full"></span>
              <span className="relative z-10 flex items-center text-lbd-pink font-medium text-sm">
                <Sparkles className="w-4 h-4 mr-2 text-lbd-gold animate-pulse-glow" /> 
                TRANSFORMING DESIGN WITH AI
              </span>
            </motion.span>
            
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              From AI <motion.span 
                className="relative text-transparent bg-clip-text"
                style={{
                  background: "linear-gradient(to right, #FF4B7F, #8A5EFF, #36DBFF, #FF4B7F)",
                  backgroundSize: "300% 100%",
                }}
                animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >Curiosity</motion.span> to Design <motion.span 
                className="relative text-transparent bg-clip-text"
                style={{
                  background: "linear-gradient(to right, #8A5EFF, #36DBFF, #FF4B7F, #8A5EFF)",
                  backgroundSize: "300% 100%",
                }}
                animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
                transition={{ duration: 8, delay: 4, repeat: Infinity, ease: "linear" }}
              >Confidence</motion.span>
            </motion.h1>
            
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
                className="group w-full sm:w-auto relative overflow-hidden transition-all duration-300 px-8 py-6 h-auto text-lg shadow-lg shadow-lbd-pink/30"
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center font-medium group-hover:text-white">
                  <Zap className="mr-2 h-5 w-5 text-lbd-gold animate-pulse-glow" />
                  Join Our Community
                  <ChevronRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-lbd-pink via-lbd-purple to-lbd-cyan bg-size-200"
                  animate={{ 
                    backgroundPosition: isHovered ? "100% center" : "0% center", 
                    scale: isHovered ? [1, 1.03, 1] : 1 
                  }}
                  transition={{ 
                    backgroundPosition: { duration: 0.5 },
                    scale: { duration: 0.5, repeat: isHovered ? Infinity : 0 }
                  }}
                />
              </Button>
              
              <motion.a 
                href="#features"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 py-3 px-6 text-lbd-white/80 transition-colors duration-300 border border-white/10 hover:border-lbd-pink/30 backdrop-blur-sm bg-white/5 hover:bg-gradient-to-r from-lbd-pink/10 to-lbd-purple/10 rounded-full font-medium relative overflow-hidden"
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(255, 75, 127, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 group-hover:text-white flex items-center">
                  Explore Features
                  <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-20 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            {[
              { icon: <Star className="text-lbd-gold animate-pulse-glow" />, value: "500+", label: "Active Members" },
              { icon: <Zap className="text-lbd-cyan animate-pulse-glow" />, value: "50+", label: "AI Resources" },
              { icon: <Sparkles className="text-lbd-pink animate-pulse-glow" />, value: "24/7", label: "Community Support" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/20 via-lbd-purple/20 to-lbd-cyan/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative flex flex-col items-center p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-lbd-pink/10 z-10 h-full">
                  <div className="mb-2">{stat.icon}</div>
                  <span className="text-lbd-pink text-4xl font-bold">{stat.value}</span>
                  <span className="text-lbd-white/80 text-sm mt-1">{stat.label}</span>
                </div>
              </motion.div>
            ))}
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
