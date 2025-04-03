
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
    <section id="community-features" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-lbd-dark z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px]"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-lbd-pink rounded-full filter blur-[150px]"
        ></motion.div>
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
              className="glass-card p-6 rounded-xl hover:border-lbd-pink/30 transition-all duration-300"
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
