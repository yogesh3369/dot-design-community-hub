
"use client";

import { motion } from 'framer-motion';
import { CardSpotlight } from './ui/card-spotlight';
import Pill from './ui/pill';

const ValueProposition = () => {
  return (
    <section id="value-proposition" className="py-24 relative overflow-hidden dot-pattern">
      {/* Background elements */}
      <div className="absolute inset-0 bg-lbd-dark/95 z-0">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.05 }} 
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }} 
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px]"
        />
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.05 }} 
          transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse" }} 
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-lbd-pink rounded-full filter blur-[150px]"
        />
        
        {/* Decorative elements */}
        <div className="absolute w-full h-full overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-20 opacity-5" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 C320,140 420,-40 640,50 C860,140 980,-40 1200,50 C1420,140 1280,-40 1440,50 L1440,0 L0,0 Z" fill="#FF4B7F"/>
          </svg>
          
          <svg className="absolute bottom-0 left-0 w-full h-20 opacity-5" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 C320,-40 420,140 640,50 C860,-40 980,140 1200,50 C1420,-40 1280,140 1440,50 L1440,100 L0,100 Z" fill="#8A5EFF"/>
          </svg>
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            whileInView={{ scale: 1, opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="w-fit mx-auto mb-4"
          >
            <Pill>
              Our Unique Value Proposition
            </Pill>
          </motion.div>
          
          <CardSpotlight className="backdrop-blur-sm bg-lbd-dark/50 border-white/10 hover:border-lbd-pink/30">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center" 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Design's Future, <span className="text-lbd-pink">Simplified</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-lbd-white/80 leading-relaxed text-center" 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Little Big Dots isn't just another community—it's your bridge between traditional design skills and the future powered by AI. Through practical workshops, structured methodologies like Object-Oriented UX, AI Agents, and Vibe Coding, and a vibrant network, we simplify complex AI technologies into accessible, everyday design tools.
            </motion.p>
            
            {/* Decorative floating elements */}
            <div className="relative h-20 mt-8">
              <motion.div 
                className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-lbd-pink/20 border border-lbd-pink/30"
                animate={{ y: [-10, 10], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-purple-600/20 border border-purple-600/30"
                animate={{ y: [5, -5], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-blue-400/20 border border-blue-400/30"
                animate={{ y: [-8, 8], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 7, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </CardSpotlight>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
