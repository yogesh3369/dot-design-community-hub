
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, BookOpen, MessageCircle, Monitor, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const FeatureCard = ({ icon, title, description, isActive, onClick, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className={`p-6 cursor-pointer transition-all duration-300 hover-lift ${
          isActive 
            ? 'border-lbd-pink bg-gradient-to-br from-lbd-pink/10 to-purple-700/5 shadow-lg shadow-lbd-pink/10' 
            : 'bg-lbd-dark-accent/70 border-white/5 hover:border-white/20'
        }`}
        onClick={onClick}
      >
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
          isActive ? 'bg-gradient-to-br from-lbd-pink to-lbd-pink/80 text-white shadow-lg shadow-lbd-pink/20' : 'bg-lbd-white/5 text-lbd-pink'
        }`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-lbd-white">{title}</h3>
        <p className="text-lbd-white/70 leading-relaxed">{description}</p>
      </Card>
    </motion.div>
  );
};

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: <Zap size={24} />,
      title: "AI-Powered Design Tools",
      description: "Access cutting-edge AI tools specifically curated for design professionals."
    },
    {
      icon: <Users size={24} />,
      title: "Supportive Community",
      description: "Connect with like-minded designers navigating the evolving AI landscape."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Practical Resources",
      description: "Benefit from hands-on tutorials, templates, and methodologies."
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Expert Guidance",
      description: "Learn from industry leaders with real-world AI implementation experience."
    },
    {
      icon: <Monitor size={24} />,
      title: "Workshops & Events",
      description: "Participate in regular online workshops and collaborative learning sessions."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Trend Analysis",
      description: "Stay ahead with insights on emerging AI tools and design methodologies."
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-mesh-gradient">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }} 
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse" 
          }} 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-lbd-pink filter blur-[160px] opacity-10"
        />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1] 
          }} 
          transition={{ 
            duration: 20,
            delay: 2,
            repeat: Infinity,
            repeatType: "reverse" 
          }} 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-700 filter blur-[150px] opacity-10"
        />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-6 bg-lbd-pink/10 px-4 py-1 rounded-full border border-lbd-pink/20"
          >
            <span className="text-lbd-pink text-sm font-medium">Our Features</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Unlock Your <span className="text-gradient">AI Design</span> Potential
          </h2>
          <p className="text-lbd-white/70 text-lg">
            Our community provides everything you need to confidently integrate AI into your design workflow.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isActive={activeFeature === index}
              onClick={() => setActiveFeature(index)}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a href="#community" className="inline-flex items-center text-lbd-pink hover:text-lbd-white transition-colors group">
            <span className="mr-2">See how our community helps designers</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
