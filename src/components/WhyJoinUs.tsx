
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Lightbulb, Award, Zap, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type UserType = 'early' | 'mid' | 'senior';

interface PanelProps {
  isActive: boolean;
  title: string;
  challenge: string;
  solution: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const DesignerPanel = ({ isActive, title, challenge, solution, icon, onClick }: PanelProps) => {
  return (
    <motion.div 
      className={`cursor-pointer rounded-2xl p-6 transition-all duration-500 relative overflow-hidden ${
        isActive ? 
          'border-lbd-pink shadow-lg shadow-lbd-pink/10' : 
          'border-white/5 hover:border-white/20'
      } border backdrop-blur-sm`}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
      layout
    >
      {/* Background gradient that only shows when active */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: isActive ? 
          'linear-gradient(135deg, rgba(255,75,127,0.15), rgba(138,94,255,0.15), rgba(54,219,255,0.05))' : 
          'none'
      }}
      ></div>
      
      {/* Animated border light effect when active */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 border-2 border-transparent animate-neon-border-pulse rounded-2xl"></div>
        </motion.div>
      )}
      
      <div className="flex items-start gap-4 relative z-10">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
          isActive ? 
            'bg-gradient-to-r from-lbd-pink to-lbd-purple text-white shadow-lg shadow-lbd-pink/20' : 
            'bg-lbd-dark-accent/70 text-lbd-pink'
        }`}>
          {icon}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold mb-2 font-heading">{title}</h3>
          
          <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="mb-4">
              <h4 className="font-medium text-white/70 mb-1">Challenge:</h4>
              <p className="text-white">{challenge}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-white/70 mb-1">Solution:</h4>
              <p className="text-white">{solution}</p>
            </div>
            
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="link"
                className="px-0 text-lbd-pink flex items-center group"
              >
                Learn more
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WhyJoinUs = () => {
  const [activeType, setActiveType] = useState<UserType>('early');
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
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
  
  const designerTypes = [
    {
      type: 'early' as UserType,
      title: 'Early-Career Designers',
      challenge: 'Feeling overwhelmed by endless AI tools and not knowing where to start?',
      solution: 'Structured learning paths, unique methodologies (MCPs, Vibe Coding), and mentorship to rapidly build your AI skills and portfolio.',
      icon: <Lightbulb size={24} />
    },
    {
      type: 'mid' as UserType,
      title: 'Mid-Career Designers',
      challenge: 'Struggling to integrate AI effectively into your workflow without disrupting productivity?',
      solution: 'Practical knowledge platforms, peer collaboration, and real-time problem-solving to enhance your existing skills quickly.',
      icon: <Zap size={24} />
    },
    {
      type: 'senior' as UserType,
      title: 'Senior Designers & Leaders',
      challenge: 'Unsure how to strategically lead AI adoption in your team and stay ahead of the curve?',
      solution: 'Curated industry insights, strategic networking, and expert guidance to lead confidently without becoming overwhelmed by technical details.',
      icon: <Award size={24} />
    }
  ];

  const activities = ['Workshops', 'Resources', 'Mentorship', 'Networking', 'Discussions', 'Insights'];

  return (
    <section id="why-join-us" ref={containerRef} className="py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Base background */}
        <div className="absolute inset-0 bg-lbd-dark"></div>
        
        {/* Cyber grid pattern with mouse follow */}
        <div 
          className="absolute inset-0 bg-cyber-grid bg-[length:40px_40px] opacity-10"
          style={{
            backgroundPosition: `calc(50% + ${mouseX.get() * 0.02}px) calc(50% + ${mouseY.get() * 0.02}px)`
          }}
        ></div>
        
        {/* Dynamic orbs with mouse tracking */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full filter blur-[150px] opacity-10"
          style={{
            background: "linear-gradient(135deg, rgba(255,75,127,0.5), rgba(138,94,255,0.2))",
            x: mouseX.get() * 0.02,
            y: mouseY.get() * 0.02
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full filter blur-[150px] opacity-10"
          style={{
            background: "linear-gradient(135deg, rgba(138,94,255,0.5), rgba(54,219,255,0.2))",
            x: mouseX.get() * -0.02,
            y: mouseY.get() * -0.02
          }}
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
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
                Find Your Perfect Fit
              </span>
            </div>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Why <span className="text-transparent bg-clip-text"
              style={{
                background: "linear-gradient(to right, #FF4B7F, #8A5EFF, #36DBFF, #FF4B7F)",
                backgroundSize: "300% 100%",
                animation: "shimmer 8s linear infinite"
              }}
            >Join Us</span>?
          </h2>
          <p className="text-lbd-white/70 text-lg">
            No matter where you are in your career, we have resources tailored for your unique challenges.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {designerTypes.map((designer) => (
            <DesignerPanel
              key={designer.type}
              isActive={activeType === designer.type}
              title={designer.title}
              challenge={designer.challenge}
              solution={designer.solution}
              icon={designer.icon}
              onClick={() => setActiveType(designer.type)}
            />
          ))}
        </motion.div>
        
        {/* Activity cards with enhanced visual effects */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {activities.map((activity, index) => (
            <motion.div 
              key={activity}
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -5
              }}
            >
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/20 via-lbd-purple/20 to-lbd-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-md"></div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 border border-transparent animate-neon-border-pulse rounded-xl"></div>
              </div>
              
              <div className="glass-dark backdrop-blur-sm border border-white/10 hover:border-white/30 p-4 rounded-xl flex items-center justify-center text-center relative z-10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-lbd-pink/10">
                <span className="text-white group-hover:text-lbd-pink transition-colors duration-300 font-medium">{activity}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
