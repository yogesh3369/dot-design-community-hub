
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface Persona {
  title: string;
  description: string;
  imageSrc: string;
}

const DayInLife = () => {
  const personas: Persona[] = [
    {
      title: "Early-Career Designer",
      description: "You begin your day with notifications about fresh AI tools ideal for your project, quickly get insights from experienced mentors, and end your day with practical workshops that boost your portfolio beyond traditional skills.",
      imageSrc: "/illustrations/early-career.svg" // These would be replaced with actual images
    },
    {
      title: "Mid-Career Designer",
      description: "Facing a challenging client request involving AI? No worries—you tap into our collective expertise, swiftly get guided solutions, and confidently present innovative, AI-driven ideas to clients.",
      imageSrc: "/illustrations/mid-career.svg"
    },
    {
      title: "Senior Designer/Leader",
      description: "Before adopting new AI tools or making crucial hires, you leverage insights from trusted peers and industry experts in Little Big Dots, enabling strategic, informed decisions that keep your team competitive.",
      imageSrc: "/illustrations/senior-designer.svg"
    }
  ];

  // For illustration style imagery
  const imageContainerStyle = "relative w-full h-64 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-lbd-pink/20 to-purple-700/20";
  
  return (
    <section id="day-in-life" className="py-24 relative overflow-hidden bg-lbd-dark-accent">
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
            <span className="text-lbd-pink text-sm font-medium">Experience</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            A Day in the <span className="text-lbd-pink">Life</span>
          </h2>
          <p className="text-lbd-white/70 text-lg mb-8">
            See how different designers leverage Little Big Dots in their daily workflow
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-lbd-pink/10 flex items-center justify-center">
              <Users className="text-lbd-pink" />
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card p-6 rounded-xl hover:border-lbd-pink/30 transition-all duration-300"
            >
              <div className={imageContainerStyle}>
                {/* Placeholder for illustration image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lbd-pink/20 to-purple-700/20">
                  <div className="text-4xl font-bold text-lbd-white/20">{persona.title.split(" ")[0]}</div>
                </div>
                
                {/* Animation elements for illustration effect */}
                <motion.div 
                  className="absolute top-4 right-4 w-16 h-16 bg-lbd-pink/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.div 
                  className="absolute bottom-8 left-8 w-12 h-12 bg-purple-700/20 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                />
                
                {/* Abstract elements */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                  <motion.path 
                    d="M 10,30 C 40,10 60,50 90,30 C 120,10 140,50 170,30" 
                    stroke="rgba(255, 75, 127, 0.3)" 
                    strokeWidth="2" 
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: index * 0.3 }}
                  />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="8" 
                    fill="rgba(255, 75, 127, 0.4)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
                  />
                  <motion.circle 
                    cx="150" 
                    cy="50" 
                    r="5" 
                    fill="rgba(149, 76, 233, 0.4)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, delay: index * 0.3 + 0.8 }}
                  />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{persona.title}</h3>
              <p className="text-lbd-white/70 leading-relaxed">{persona.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DayInLife;
