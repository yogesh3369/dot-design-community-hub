
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, BookOpen, MessageCircle, Monitor, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon, title, description, isActive, onClick }: any) => {
  return (
    <div 
      className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:border-lbd-pink/50 hover:shadow-lg hover:shadow-lbd-pink/5 ${isActive ? 'border-lbd-pink bg-lbd-pink/5' : 'border-white/10'}`}
      onClick={onClick}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${isActive ? 'bg-lbd-pink text-white' : 'bg-lbd-white/10 text-lbd-pink'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-lbd-white">{title}</h3>
      <p className="text-lbd-white/70">{description}</p>
    </div>
  );
};

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: <Zap size={24} />,
      title: "AI-Powered Design Tools",
      description: "Access cutting-edge AI tools specifically curated for design professionals."
    },
    {
      icon: <Users size={24} />,
      title: "Supportive Community",
      description: "Connect with like-minded designers navigating the evolving AI landscape."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Practical Resources",
      description: "Benefit from hands-on tutorials, templates, and methodologies."
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Expert Guidance",
      description: "Learn from industry leaders with real-world AI implementation experience."
    },
    {
      icon: <Monitor size={24} />,
      title: "Workshops & Events",
      description: "Participate in regular online workshops and collaborative learning sessions."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Trend Analysis",
      description: "Stay ahead with insights on emerging AI tools and design methodologies."
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-lbd-dark z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lbd-pink rounded-full filter blur-[150px] opacity-5 animate-pulse" style={{ animationDuration: "15s" }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-700 rounded-full filter blur-[150px] opacity-5 animate-pulse" style={{ animationDuration: "20s", animationDelay: "2s" }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Unlock Your <span className="text-lbd-pink">AI Design</span> Potential
          </h2>
          <p className="text-lbd-white/70 text-lg">
            Our community provides everything you need to confidently integrate AI into your design workflow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isActive={activeFeature === index}
              onClick={() => setActiveFeature(index)}
            />
          ))}
        </div>
        
        <div className="text-center">
          <a href="#community" className="inline-flex items-center text-lbd-pink hover:text-lbd-white transition-colors">
            <span className="mr-2">See how our community helps designers</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
