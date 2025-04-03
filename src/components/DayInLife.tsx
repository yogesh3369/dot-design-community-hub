
import { motion } from 'framer-motion';
import { Users, Zap, Code, Lightbulb } from 'lucide-react';

interface Persona {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DayInLife = () => {
  const personas: Persona[] = [
    {
      title: "Early-Career Designer",
      description: "You begin your day with notifications about fresh AI tools ideal for your project, quickly get insights from experienced mentors, and end your day with practical workshops that boost your portfolio beyond traditional skills.",
      icon: <Zap className="h-6 w-6 text-yellow-400" />
    },
    {
      title: "Mid-Career Designer",
      description: "Facing a challenging client request involving AI? No worries—you tap into our collective expertise, swiftly get guided solutions, and confidently present innovative, AI-driven ideas to clients.",
      icon: <Code className="h-6 w-6 text-blue-400" />
    },
    {
      title: "Senior Designer/Leader",
      description: "Before adopting new AI tools or making crucial hires, you leverage insights from trusted peers and industry experts in Little Big Dots, enabling strategic, informed decisions that keep your team competitive.",
      icon: <Lightbulb className="h-6 w-6 text-green-400" />
    }
  ];
  
  return (
    <section id="day-in-life" className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-lbd-dark to-lbd-dark-accent z-0">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.05, x: 0 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="url(#grid-pattern)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <defs>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
          </svg>
        </motion.div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
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
          
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            A Day in the <span className="text-lbd-pink">Life</span>
          </h2>
          <p className="text-lbd-white/70 text-lg md:text-xl mb-8">
            See how designers at different career stages leverage our community
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-lbd-pink/10 flex items-center justify-center">
              <Users className="text-lbd-pink h-8 w-8" />
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-gradient-to-br from-lbd-dark-accent/80 to-lbd-dark-accent/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:border-lbd-pink/30 transition-all duration-500"
            >
              {/* Persona Card */}
              <div className="p-8 relative h-full flex flex-col">
                {/* Decorative elements */}
                <motion.div 
                  className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-lbd-pink/50 to-transparent opacity-40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                />
                
                {/* Content area */}
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-lg bg-lbd-dark flex items-center justify-center mb-4 group-hover:bg-lbd-pink/10 transition-colors duration-300">
                    {persona.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{persona.title}</h3>
                </div>
                
                {/* Persona illustration */}
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-6 bg-gradient-to-br from-lbd-dark/60 to-lbd-dark/30 backdrop-blur-sm">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 225">
                    {/* Abstract workspace illustration */}
                    <motion.rect 
                      x="50" y="50" width="300" height="125" rx="4" 
                      fill="rgba(255,255,255,0.05)" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    />
                    
                    {/* Screen/monitor */}
                    <motion.rect 
                      x="100" y="70" width="200" height="85" rx="2" 
                      fill="rgba(255,75,127,0.1)" 
                      stroke="rgba(255,75,127,0.2)" 
                      strokeWidth="1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                    />
                    
                    {/* Abstract person */}
                    <motion.circle 
                      cx="200" cy="180" r="15" 
                      fill="rgba(255,75,127,0.3)"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                    />
                    
                    {/* Abstract UI elements */}
                    <motion.rect 
                      x="110" y="80" width="40" height="4" rx="2" 
                      fill="rgba(255,255,255,0.3)"
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: 40 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    />
                    <motion.rect 
                      x="110" y="90" width="60" height="4" rx="2" 
                      fill="rgba(255,255,255,0.2)"
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: 60 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                    />
                    <motion.rect 
                      x="110" y="100" width="50" height="4" rx="2" 
                      fill="rgba(255,255,255,0.15)"
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: 50 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    />
                    
                    {/* Decorative elements */}
                    <motion.circle 
                      cx="250" cy="85" r="4" 
                      fill="rgba(255,255,255,0.4)"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.6 }}
                    />
                    <motion.circle 
                      cx="270" cy="85" r="4" 
                      fill="rgba(255,75,127,0.5)"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.7 }}
                    />
                  </svg>
                </div>
                
                <p className="text-lbd-white/70 leading-relaxed flex-grow">
                  {persona.description}
                </p>
                
                {/* Visual element for hover effect */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lbd-pink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DayInLife;
