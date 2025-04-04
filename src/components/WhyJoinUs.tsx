
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Award, Zap } from 'lucide-react';

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
      className={`cursor-pointer rounded-2xl p-6 transition-all duration-500 ${
        isActive ? 'bg-gradient-to-br from-lbd-pink/20 to-purple-700/20 border-lbd-pink' : 'bg-lbd-dark-accent/50 border-white/5'
      } border backdrop-blur-sm`}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
      layout
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isActive ? 'bg-lbd-pink text-white' : 'bg-lbd-dark-accent text-lbd-pink'
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WhyJoinUs = () => {
  const [activeType, setActiveType] = useState<UserType>('early');
  
  const designerTypes = [
    {
      type: 'early' as UserType,
      title: 'Early-Career Designers',
      challenge: 'Feeling overwhelmed by endless AI tools?',
      solution: 'Structured learning paths, unique methodologies (MCPs, Vibe Coding), and mentorship to rapidly build your AI skills and portfolio.',
      icon: <Lightbulb size={24} />
    },
    {
      type: 'mid' as UserType,
      title: 'Mid-Career Designers',
      challenge: 'Struggling to integrate AI effectively into your workflow?',
      solution: 'Practical knowledge platforms, peer collaboration, and real-time problem-solving to enhance your existing skills quickly.',
      icon: <Zap size={24} />
    },
    {
      type: 'senior' as UserType,
      title: 'Senior Designers & Leaders',
      challenge: 'Unsure how to strategically lead AI adoption in your team?',
      solution: 'Curated industry insights, strategic networking, and expert guidance to lead confidently without becoming overwhelmed by technical details.',
      icon: <Award size={24} />
    }
  ];

  return (
    <section id="why-join-us" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-lbd-dark z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-lbd-pink rounded-full filter blur-[150px]"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-[150px]"
        ></motion.div>
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
            className="inline-flex items-center justify-center mb-6 bg-lbd-pink/10 px-4 py-1 rounded-full border border-lbd-pink/20"
          >
            <span className="text-lbd-pink text-sm font-medium">Find Your Perfect Fit</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Why <span className="text-lbd-pink">Join Us</span>?
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
        
        {/* "Aha" effect - sparkling buttons for different activities */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {['Workshops', 'Resources', 'Mentorship', 'Networking', 'Discussions', 'Insights'].map((activity, index) => (
            <motion.div 
              key={activity}
              className="glass-card border border-white/10 hover:border-lbd-pink/30 hover:bg-lbd-pink/5 p-4 rounded-xl flex items-center justify-center text-center"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 20px rgba(255, 75, 127, 0.2)'
              }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-white text-sm md:text-base font-medium">{activity}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
