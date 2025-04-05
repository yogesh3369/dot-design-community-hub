'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Book, Zap, MessageCircle, Sparkles } from 'lucide-react';
import Pill from "@/components/ui/pill";
import { BentoGrid, BentoItem } from '@/components/ui/bento-grid';

const CommunityBenefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Features data - could be fetched from an API in the future
  const features: BentoItem[] = [
    {
      icon: <Book className="w-5 h-5" />,
      title: "Weekly Resource Roundups",
      description: "Stay updated effortlessly with curated resources from our community experts.",
      status: "Weekly",
      tags: ["Resources", "Curated"],
      colSpan: 2,
      hasPersistentHover: true
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Quick Tips & Hacks",
      description: "Actionable insights you can immediately apply to your design workflow.",
      status: "Daily",
      tags: ["Tips", "Workflow"]
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Interactive Discussions",
      description: "Weekly community discussions on AI trends and emerging design practices.",
      status: "Live",
      tags: ["Community", "Networking"]
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI Tool Spotlights",
      description: "Regular introductions to new AI tools tailored specifically for designers.",
      status: "Featured",
      tags: ["Tools", "AI", "Design"],
      colSpan: 2
    }
  ];

  return (
    <section id="community-benefits" className="py-20 lg:py-40 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-lbd-dark/95 z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px]"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-lbd-pink rounded-full filter blur-[150px]"
        />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.svg 
            className="absolute top-10 right-10 w-72 h-72 opacity-5"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ rotate: 0, opacity: 0.03 }}
            animate={{ rotate: 360, opacity: 0.05 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <path fill="#FF4B7F" d="M47.7,-73.2C59.5,-65.6,65.5,-48.2,71.7,-32C77.9,-15.8,84.3,-0.8,82.1,13.1C80,27,69.3,39.8,57.7,50.8C46.1,61.9,33.6,71.2,19.2,75.9C4.8,80.6,-11.5,80.7,-24.3,74.2C-37.1,67.7,-46.4,54.6,-54.1,41.9C-61.9,29.2,-68,16.8,-72.8,1.9C-77.5,-13,-80.9,-29.5,-74.8,-41.7C-68.7,-54,-53.1,-62.1,-38.5,-68.3C-23.9,-74.5,-12,-78.8,3.1,-83.2C18.1,-87.6,36.2,-80.9,47.7,-73.2Z" transform="translate(100 100)" />
          </motion.svg>
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Pill
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { scale: 0.9, opacity: 0 },
              visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
            }}
            className="mb-6"
          >
            Join Our Community
          </Pill>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Community <span className="text-lbd-pink">Features & Benefits</span>
          </h2>
          <p className="text-lbd-white/70 text-lg mb-8">
            Everything you need to thrive in the evolving design landscape
          </p>
        </motion.div>
        
        {/* Bento Grid layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="px-4"
        >
          <BentoGrid items={features} />
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityBenefits;
