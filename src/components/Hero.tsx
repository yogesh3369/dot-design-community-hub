
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-lbd-dark z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-lbd-dark to-lbd-dark-accent opacity-80"></div>
        
        {/* SVG Pattern */}
        <div className="absolute inset-0 opacity-5 zigzag-pattern"></div>
        
        {/* Animated glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-lbd-pink rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-700 rounded-full filter blur-[120px] opacity-10 animate-pulse" style={{
          animationDelay: "1s"
        }}></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[800px] h-64 bg-lbd-pink rounded-full filter blur-[100px] opacity-5 animate-pulse" style={{
          animationDuration: "8s"
        }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-40 h-40 opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FF4B7F" d="M37.9,-65.7C50.5,-56.7,63,-48,71.9,-36C80.8,-24,86.2,-8.7,85.4,6.2C84.6,21.1,77.6,35.7,67.5,47.8C57.3,59.8,44,69.3,29.4,75.3C14.8,81.4,-1,84,-17.1,81.9C-33.2,79.9,-49.6,73.1,-60.8,61.1C-72,49,-78,31.7,-79.8,14.4C-81.6,-2.9,-79.2,-20.2,-71.9,-34.1C-64.6,-48.1,-52.5,-58.6,-39.2,-67.3C-25.9,-76,-13,-82.8,-0.2,-82.5C12.5,-82.2,25.1,-74.7,37.9,-65.7Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="absolute bottom-10 left-20 w-60 h-60 opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#8A5EFF" d="M40.9,-69.5C54.6,-62.9,68.3,-54.8,77.2,-42.7C86.1,-30.7,90.1,-14.6,88.8,0.7C87.5,16.1,80.9,30.6,71.6,43.1C62.2,55.7,50.1,66.5,36.4,73C22.7,79.5,7.5,81.8,-8.1,80.6C-23.7,79.4,-39.7,74.7,-52.5,65.7C-65.2,56.7,-74.7,43.3,-78.5,28.6C-82.3,13.9,-80.4,-2.1,-76.2,-17.2C-72.1,-32.2,-65.7,-46.2,-54.8,-53.9C-44,-61.6,-28.7,-62.9,-14.3,-65.3C0.1,-67.8,13.5,-71.3,27.3,-76.2C41,-81,54.9,-87.2,40.9,-69.5Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight animate-fade-in">
            From AI <span className="text-lbd-pink animate-pulse">Curiosity</span> to Design <span className="text-lbd-pink animate-pulse" style={{
              animationDelay: "0.5s"
            }}>Confidence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-lbd-white/80 mb-10 leading-relaxed animate-fade-in" style={{
            animationDelay: "0.3s"
          }}>
            A supportive community helping designers master AI with hands-on methodologies,
            practical resources, and collaborative learning.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{
            animationDelay: "0.6s"
          }}>
            <Button className="btn-primary text-lg group w-full sm:w-auto relative overflow-hidden transition-all duration-300" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <span className="relative z-10 flex items-center">
                Join Our Community
                <ChevronRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </span>
              <span className={`absolute inset-0 bg-white/20 transition-all duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'} origin-left`}></span>
            </Button>
          </div>
          
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-fade-in" style={{
            animationDelay: "0.9s"
          }}>
            <div className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
              <span className="text-lbd-pink text-3xl font-bold">500+</span>
              <span className="text-lbd-white/70 text-sm">Active Members</span>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-lbd-white/10"></div>
            
            <div className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
              <span className="text-lbd-pink text-3xl font-bold">50+</span>
              <span className="text-lbd-white/70 text-sm">AI Resources</span>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-lbd-white/10"></div>
            
            <div className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
              <span className="text-lbd-pink text-3xl font-bold">24/7</span>
              <span className="text-lbd-white/70 text-sm">Community Support</span>
            </div>
          </div>
          
          <div className="mt-20 flex justify-center animate-bounce animate-fade-in" style={{
            animationDelay: "1.2s"
          }}>
            <a href="#features" className="text-lbd-white/50 hover:text-lbd-pink transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
