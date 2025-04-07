
"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Lightbulb, Award, Zap, Sparkles } from 'lucide-react';
import Pill from "@/components/ui/pill";
import { JoinCommunityModal } from "@/components/ui/join-community-modal";

interface TimelineEntry {
  title: string;
  type: string;
  challenge: string;
  solution: string;
  icon: React.ReactNode;
}

const DesignerPanel = ({ title, challenge, solution, icon }: Omit<TimelineEntry, 'type'>) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(panelRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={panelRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card border border-white/10 hover:border-lbd-pink/30 bg-lbd-dark-accent/50 hover:bg-gradient-to-br hover:from-lbd-pink/20 hover:to-purple-700/20 p-6 rounded-xl transition-all duration-300 backdrop-blur-sm"
    >
      <div className="flex flex-col items-start gap-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-12 h-12 rounded-full bg-lbd-dark-accent text-lbd-pink flex items-center justify-center shadow-lg shadow-lbd-pink/20"
        >
          {icon}
        </motion.div>
        
        <div className="w-full">
          <h3 className="text-xl md:text-2xl font-bold mb-4 font-heading group flex items-center">
            {title}
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="ml-2 inline-flex text-lbd-pink/70"
            >
              <Sparkles size={18} />
            </motion.span>
          </h3>
          
          <div className="mb-4 text-left">
            <h4 className="font-medium text-white/70 mb-1">Challenge:</h4>
            <p className="text-white">{challenge}</p>
          </div>
          
          <div className="text-left">
            <h4 className="font-medium text-white/70 mb-1">Solution:</h4>
            <p className="text-white">{solution}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  
  // Track scroll position to highlight the current section
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionCount = data.length;
    const sectionSize = 1 / sectionCount;
    const newIndex = Math.min(
      sectionCount - 1,
      Math.floor(latest / sectionSize)
    );
    setActiveIndex(newIndex >= 0 ? newIndex : null);
  });

  return (
    <div
      className="w-full bg-lbd-dark font-sans"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold font-heading mb-4 flex flex-col sm:flex-row sm:items-center gap-1"
        >
          <span>Why <span className="text-lbd-pink inline-flex items-center">Join Us<span className="ml-2"><Sparkles size={24} className="text-lbd-pink" /></span></span>?</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lbd-white/70 text-lg max-w-2xl mb-4"
        >
          No matter where you are in your career, we have resources tailored for your unique challenges.
        </motion.p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className="flex justify-start pt-4 md:pt-12 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={isActive ? { scale: 1.1, opacity: 1 } : { scale: 1, opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                  className={`h-10 absolute left-3 md:left-3 w-10 rounded-full ${isActive ? 'bg-lbd-pink/20' : 'bg-lbd-dark-accent'} flex items-center justify-center transition-colors duration-300`}
                >
                  <motion.div 
                    animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className={`h-4 w-4 rounded-full ${isActive ? 'bg-lbd-pink' : 'bg-lbd-pink/50'} border ${isActive ? 'border-lbd-pink' : 'border-lbd-pink/30'} p-2`} 
                  />
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isActive ? 1 : 0.6, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`hidden md:block text-xl md:pl-20 md:text-3xl font-bold ${isActive ? 'text-white' : 'text-white/60'} font-heading transition-colors duration-300`}
                >
                  {item.title}
                </motion.h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white font-heading">
                  {item.title}
                </h3>
                <DesignerPanel
                  title={item.title}
                  challenge={item.challenge}
                  solution={item.solution}
                  icon={item.icon}
                />
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/20 dark:via-white/10 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-lbd-pink via-purple-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const WhyJoinUs = () => {
  const designerTypes = [
    {
      type: 'early',
      title: 'Early-Career Designers',
      challenge: 'Feeling overwhelmed by endless AI tools?',
      solution: 'Structured learning paths, unique methodologies (MCPs, Vibe Coding), and mentorship to rapidly build your AI skills and portfolio.',
      icon: <Lightbulb size={24} />,

    },
    {
      type: 'mid',
      title: 'Mid-Career Designers',
      challenge: 'Struggling to integrate AI effectively into your workflow?',
      solution: 'Practical knowledge platforms, peer collaboration, and real-time problem-solving to enhance your existing skills quickly.',
      icon: <Zap size={24} />,

    },
    {
      type: 'senior',
      title: 'Senior Designers & Leaders',
      challenge: 'Unsure how to strategically lead AI adoption in your team?',
      solution: 'Curated industry insights, strategic networking, and expert guidance to lead confidently without becoming overwhelmed by technical details.',
      icon: <Award size={24} />,

    }
  ];

  return (
    <section id="why-join-us" className="relative overflow-hidden">
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
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-1"
          >
            <Pill
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { scale: 0.9, opacity: 0 },
                visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
              }}
            >
              Find Your Perfect Fit
            </Pill>
          </motion.div>
        </div>
        
        <Timeline data={designerTypes} />
        
        {/* "Aha" effect - sparkling buttons for different activities */}
        <div className="container-custom">
          <motion.div 
            className="mt-8 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold font-heading mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lbd-pink to-purple-500">Explore Our Community</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Workshops', icon: '🔧' },
                { name: 'Resources', icon: '📚' },
                { name: 'Mentorship', icon: '🧠' },
                { name: 'Networking', icon: '🌐' },
                { name: 'Discussions', icon: '💬' },
                { name: 'Insights', icon: '💡' }
              ].map((activity, index) => (
                <motion.div 
                  key={activity.name}
                  className="glass-card border border-white/10 hover:border-lbd-pink/30 hover:bg-lbd-pink/5 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 0 20px rgba(255, 75, 127, 0.2)'
                  }}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{activity.icon}</span>
                  <span className="text-white text-sm md:text-base font-medium">{activity.name}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <JoinCommunityModal headingText="Join Our Community">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-lbd-pink to-purple-600 px-6 py-3 rounded-full text-white font-medium shadow-lg shadow-lbd-pink/20 hover:shadow-lbd-pink/30 transition-shadow duration-300"
                >
                  Join Our Community
                </motion.button>
              </JoinCommunityModal>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;