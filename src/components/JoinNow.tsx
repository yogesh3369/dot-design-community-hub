
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const JoinNow = () => {
  return (
    <section id="join-now" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-lbd-dark to-black z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lbd-pink rounded-full filter blur-[200px]"
        ></motion.div>
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
            <Button 
              size="lg" 
              className="w-full md:w-auto text-lg px-8 py-6 h-auto bg-lbd-pink hover:bg-lbd-pink/90 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-lbd-pink/20"
            >
              Join Our Community
            </Button>
            
            <Button 
              variant="outline"
              size="lg" 
              className="w-full md:w-auto text-lg px-8 py-6 h-auto border-lbd-white/20 text-lbd-white hover:bg-lbd-white/5 hover:border-lbd-white/30 font-medium rounded-full transition-all duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowUp className="mr-2" size={18} />
              Back to Top
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinNow;
