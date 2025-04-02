
import { motion } from 'framer-motion';

const ValueProposition = () => {
  return (
    <section id="value-proposition" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-lbd-dark z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px]"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-lbd-pink rounded-full filter blur-[150px]"
        ></motion.div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto bg-lbd-dark-accent/50 p-10 rounded-3xl border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-fit mx-auto"
          >
            <div className="inline-flex items-center justify-center mb-6 bg-gradient-to-r from-lbd-pink/20 to-purple-700/20 px-4 py-1 rounded-full border border-lbd-pink/30">
              <span className="text-lbd-pink text-sm font-medium">Our Unique Value Proposition</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading mb-6 text-center"
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
          
          {/* Floating design elements for enhanced visual interest */}
          <div className="relative h-20 mt-10">
            <motion.div 
              className="absolute top-0 left-1/4 w-8 h-8 bg-lbd-pink/20 rounded-full"
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute top-5 right-1/4 w-6 h-6 bg-purple-600/20 rounded-full"
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-1/3 w-10 h-10 bg-blue-400/20 rounded-full"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.4, 0.9, 0.4]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
