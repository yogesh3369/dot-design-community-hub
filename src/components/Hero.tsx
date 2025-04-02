import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import { useState } from "react";
const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  return <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-lbd-dark z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-lbd-dark to-lbd-dark-accent opacity-80"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-lbd-pink rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-700 rounded-full filter blur-[120px] opacity-10 animate-pulse" style={{
        animationDelay: "1s"
      }}></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[800px] h-64 bg-lbd-pink rounded-full filter blur-[100px] opacity-5 animate-pulse" style={{
        animationDuration: "8s"
      }}></div>
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
    </section>;
};
export default Hero;