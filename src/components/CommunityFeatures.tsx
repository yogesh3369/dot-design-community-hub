
import { motion } from 'framer-motion';
import { Book, Calendar, MessageCircle, Video } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CommunityFeatures = () => {
  // These could be fetched from an API in the future
  const features: FeatureItem[] = [
    {
      icon: <Book className="text-lbd-pink" />,
      title: "Weekly Resource Roundups",
      description: "Stay updated effortlessly with curated resources."
    },
    {
      icon: <Video className="text-lbd-pink" />,
      title: "Quick Tips & Hacks",
      description: "Actionable insights you can immediately apply."
    },
    {
      icon: <MessageCircle className="text-lbd-pink" />,
      title: "Interactive Discussions",
      description: "Weekly community discussions on AI trends."
    },
    {
      icon: <Calendar className="text-lbd-pink" />,
      title: "AI Tool Spotlights",
      description: "Regular introductions to new AI tools tailored specifically for designers."
    }
  ];

  return (
    <section id="community-features" className="py-24 relative overflow-hidden wave-pattern">
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
          
          <motion.svg 
            className="absolute bottom-10 left-10 w-64 h-64 opacity-5"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ rotate: 0, opacity: 0.03 }}
            animate={{ rotate: -360, opacity: 0.05 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          >
            <path fill="#8A5EFF" d="M42.8,-72.1C54.9,-62.9,63.7,-49.2,70.9,-34.7C78.1,-20.2,83.6,-4.9,81.3,9.1C79,23.1,68.9,35.9,58.1,48.5C47.3,61.1,35.9,73.5,21.6,77.6C7.4,81.7,-9.7,77.4,-25.2,71.4C-40.8,65.3,-54.9,57.5,-64.4,45.6C-73.9,33.8,-78.8,17.9,-79.5,1.7C-80.2,-14.6,-76.7,-29.2,-69,-41.7C-61.2,-54.1,-49.3,-64.5,-36,-71.4C-22.8,-78.3,-8.1,-81.8,4.9,-80C18,-78.2,36,-81.2,42.8,-72.1Z" transform="translate(100 100)" />
          </motion.svg>
        </div>
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
            <span className="text-lbd-pink text-sm font-medium">Join Our Community</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Community <span className="text-lbd-pink">Features & Benefits</span>
          </h2>
          <p className="text-lbd-white/70 text-lg">
            Everything you need to thrive in the evolving design landscape
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl hover:border-lbd-pink/30 transition-all duration-300 hover-lift"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-lbd-dark-accent flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-lbd-white/70">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityFeatures;
