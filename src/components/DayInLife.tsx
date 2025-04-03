
import { motion } from 'framer-motion';
import { Users, Zap, Code, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Persona {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const DayInLife = () => {
  const personas: Persona[] = [
    {
      title: "Early-Career Designer",
      description: "You begin your day with notifications about fresh AI tools ideal for your project, quickly get insights from experienced mentors, and end your day with practical workshops that boost your portfolio beyond traditional skills.",
      icon: <Zap className="h-6 w-6" />,
      color: "from-yellow-400/20 to-amber-500/20"
    },
    {
      title: "Mid-Career Designer",
      description: "Facing a challenging client request involving AI? No worries—you tap into our collective expertise, swiftly get guided solutions, and confidently present innovative, AI-driven ideas to clients.",
      icon: <Code className="h-6 w-6" />,
      color: "from-blue-400/20 to-cyan-500/20"
    },
    {
      title: "Senior Designer/Leader",
      description: "Before adopting new AI tools or making crucial hires, you leverage insights from trusted peers and industry experts in Little Big Dots, enabling strategic, informed decisions that keep your team competitive.",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "from-green-400/20 to-emerald-500/20"
    }
  ];
  
  return (
    <section id="day-in-life" className="py-24 bg-gradient-to-b from-lbd-dark to-lbd-dark-accent relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-grid-pattern"
        ></motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 2 }}
          className="absolute -left-64 top-20 w-96 h-96 rounded-full bg-lbd-pink/20 filter blur-[100px]"
        ></motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -right-64 bottom-20 w-96 h-96 rounded-full bg-purple-700/20 filter blur-[100px]"
        ></motion.div>
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
          
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            A Day in the <span className="text-lbd-pink">Life</span>
          </h2>
          <p className="text-lbd-white/70 text-lg md:text-xl">
            See how designers at different career stages leverage our community
          </p>
          
          <div className="w-20 h-20 bg-gradient-to-br from-lbd-pink/20 to-purple-700/20 rounded-full flex items-center justify-center mx-auto mt-8">
            <Users className="text-lbd-pink h-8 w-8" />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <Card className="h-full border-none overflow-hidden bg-lbd-dark-accent/50 backdrop-blur-sm hover:shadow-lg hover:shadow-lbd-pink/5 transition-all duration-500">
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Header with icon */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${persona.color} flex items-center justify-center`}>
                      {persona.icon}
                    </div>
                    <h3 className="text-xl font-bold">{persona.title}</h3>
                  </div>
                  
                  {/* Illustration */}
                  <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-lbd-dark/60 to-lbd-dark-accent/60 backdrop-blur-sm flex items-center justify-center">
                    <IllustrationForPersona index={index} />
                  </div>
                  
                  <p className="text-lbd-white/70 leading-relaxed">
                    {persona.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IllustrationForPersona = ({ index }: { index: number }) => {
  const baseDelay = index * 0.3;
  
  // Different illustrations for each persona
  if (index === 0) {
    return (
      <div className="relative w-full h-full">
        {/* Early Career - Learning and Tools */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: baseDelay }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
            {/* Computer screen */}
            <motion.rect
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: baseDelay + 0.1 }}
              x="40" y="20" width="120" height="80" rx="4" 
              fill="rgba(255,255,255,0.05)" 
              stroke="rgba(255,75,127,0.3)" 
              strokeWidth="1.5"
            />
            
            {/* AI icon in screen */}
            <motion.circle
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 0.3 }}
              cx="100" cy="45" r="15"
              fill="rgba(255,75,127,0.2)"
            />
            
            {/* Nodes around the AI icon */}
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 0.5 }}
              cx="80" cy="35" r="3"
              fill="rgba(255,255,255,0.5)"
            />
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 0.6 }}
              cx="120" cy="35" r="3"
              fill="rgba(255,255,255,0.5)"
            />
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 0.7 }}
              cx="85" cy="60" r="3"
              fill="rgba(255,255,255,0.5)"
            />
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 0.8 }}
              cx="115" cy="60" r="3"
              fill="rgba(255,255,255,0.5)"
            />
            
            {/* Lines connecting nodes */}
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 0.9 }}
              x1="100" y1="45" x2="80" y2="35"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 1.0 }}
              x1="100" y1="45" x2="120" y2="35"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 1.1 }}
              x1="100" y1="45" x2="85" y2="60"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 1.2 }}
              x1="100" y1="45" x2="115" y2="60"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            
            {/* Book/learning icons */}
            <motion.rect
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: baseDelay + 1.3 }}
              x="75" y="75" width="50" height="10" rx="2"
              fill="rgba(255,255,255,0.2)"
            />
            <motion.rect
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: baseDelay + 1.4 }}
              x="80" y="85" width="40" height="8" rx="2"
              fill="rgba(255,75,127,0.2)"
            />
          </svg>
        </motion.div>
      </div>
    );
  } else if (index === 1) {
    return (
      <div className="relative w-full h-full">
        {/* Mid-Career - Collaboration & Solutions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: baseDelay }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
            {/* Project board */}
            <motion.rect
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: baseDelay + 0.1 }}
              x="30" y="20" width="140" height="80" rx="4" 
              fill="rgba(255,255,255,0.05)" 
              stroke="rgba(100,150,255,0.3)" 
              strokeWidth="1.5"
            />
            
            {/* Columns on the board */}
            <motion.rect
              initial={{ opacity: 0, height: 0 }}
              whileInView={{ opacity: 1, height: 70 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: baseDelay + 0.3 }}
              x="40" y="25" width="35" height="70" rx="2" 
              fill="rgba(100,150,255,0.1)" 
            />
            <motion.rect
              initial={{ opacity: 0, height: 0 }}
              whileInView={{ opacity: 1, height: 70 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: baseDelay + 0.5 }}
              x="82.5" y="25" width="35" height="70" rx="2" 
              fill="rgba(255,75,127,0.1)" 
            />
            <motion.rect
              initial={{ opacity: 0, height: 0 }}
              whileInView={{ opacity: 1, height: 70 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: baseDelay + 0.7 }}
              x="125" y="25" width="35" height="70" rx="2" 
              fill="rgba(100,220,200,0.1)" 
            />
            
            {/* Task cards */}
            <motion.rect
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: baseDelay + 0.9 }}
              x="43" y="30" width="29" height="15" rx="2" 
              fill="rgba(255,255,255,0.2)" 
            />
            <motion.rect
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: baseDelay + 1.1 }}
              x="43" y="50" width="29" height="15" rx="2" 
              fill="rgba(255,255,255,0.15)" 
            />
            <motion.rect
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: baseDelay + 1.3 }}
              x="85.5" y="30" width="29" height="15" rx="2" 
              fill="rgba(255,75,127,0.25)" 
            />
            <motion.rect
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: baseDelay + 1.5 }}
              x="128" y="30" width="29" height="15" rx="2" 
              fill="rgba(255,255,255,0.15)" 
            />
            
            {/* People icons */}
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 1.7 }}
              cx="58" y="75" r="5"
              fill="rgba(100,150,255,0.3)"
            />
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 1.8 }}
              cx="100" y="75" r="5"
              fill="rgba(255,75,127,0.3)"
            />
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 1.9 }}
              cx="143" y="75" r="5"
              fill="rgba(100,220,200,0.3)"
            />
          </svg>
        </motion.div>
      </div>
    );
  } else {
    return (
      <div className="relative w-full h-full">
        {/* Senior Leader - Strategy & Decision Making */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: baseDelay }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
            {/* Dashboard */}
            <motion.rect
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: baseDelay + 0.1 }}
              x="30" y="20" width="140" height="80" rx="4" 
              fill="rgba(255,255,255,0.05)" 
              stroke="rgba(110,200,120,0.3)" 
              strokeWidth="1.5"
            />
            
            {/* Graph */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: baseDelay + 0.3 }}
              d="M45,65 L65,55 L85,60 L105,40 L125,45 L145,30"
              stroke="rgba(110,200,120,0.6)"
              strokeWidth="2"
              fill="none"
            />
            
            {/* Graph points */}
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 0.5 }}
              cx="45" cy="65" r="3"
              fill="rgba(255,255,255,0.8)"
            />
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 0.6 }}
              cx="65" cy="55" r="3"
              fill="rgba(255,255,255,0.8)"
            />
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 0.7 }}
              cx="85" cy="60" r="3"
              fill="rgba(255,255,255,0.8)"
            />
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 0.8 }}
              cx="105" cy="40" r="3"
              fill="rgba(255,255,255,0.8)"
            />
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 0.9 }}
              cx="125" cy="45" r="3"
              fill="rgba(255,255,255,0.8)"
            />
            <motion.circle
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: baseDelay + 1.0 }}
              cx="145" cy="30" r="3"
              fill="rgba(255,255,255,0.8)"
            />
            
            {/* Chart bars */}
            <motion.rect
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 30, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 1.1 }}
              x="50" y="75" width="10" height="30" 
              fill="rgba(110,200,120,0.3)" 
              transform="scale(1,-1) translate(0,-150)"
            />
            <motion.rect
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 40, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 1.2 }}
              x="70" y="75" width="10" height="40" 
              fill="rgba(110,200,120,0.5)" 
              transform="scale(1,-1) translate(0,-150)"
            />
            <motion.rect
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 35, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 1.3 }}
              x="90" y="75" width="10" height="35" 
              fill="rgba(110,200,120,0.4)" 
              transform="scale(1,-1) translate(0,-150)"
            />
            <motion.rect
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 50, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 1.4 }}
              x="110" y="75" width="10" height="50" 
              fill="rgba(110,200,120,0.6)" 
              transform="scale(1,-1) translate(0,-150)"
            />
            <motion.rect
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 45, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 1.5 }}
              x="130" y="75" width="10" height="45" 
              fill="rgba(110,200,120,0.5)" 
              transform="scale(1,-1) translate(0,-150)"
            />
            
            {/* Decision point */}
            <motion.circle
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: baseDelay + 1.6 }}
              cx="145" cy="30" r="8"
              fill="rgba(255,75,127,0.3)"
              stroke="rgba(255,75,127,0.6)"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>
    );
  }
};

export default DayInLife;
