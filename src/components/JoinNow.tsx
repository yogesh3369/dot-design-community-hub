import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { JoinCommunityModal } from "@/components/ui/join-community-modal";
import { GradientCTAButton } from "@/components/ui/gradient-cta-button";

const JoinNow = () => {
  return (
    <section id="join-now" className="py-24 relative overflow-hidden circuit-pattern">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-lbd-dark/95 to-black z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lbd-pink rounded-full filter blur-[200px]"
        />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
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
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to <span className="text-lbd-pink">confidently navigate</span> the future of design with AI?
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
            <JoinCommunityModal headingText="Join Our Community">
              <GradientCTAButton className="w-full md:w-auto">
                Join Our Community
              </GradientCTAButton>
            </JoinCommunityModal>
            
            <motion.button 
              className="w-full md:w-auto group flex items-center justify-center gap-2 py-3 px-6 text-lbd-white/80 hover:text-lbd-pink transition-colors duration-300 border border-white/10 hover:border-lbd-pink/30 backdrop-blur-sm bg-white/5 hover:bg-white/10 rounded-full font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowUp className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
              Back to Top
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinNow;
