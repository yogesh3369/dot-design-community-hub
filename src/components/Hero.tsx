
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-lbd-dark z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-lbd-dark to-lbd-dark-accent opacity-80"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-lbd-pink rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-700 rounded-full filter blur-[120px] opacity-10"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
            From AI <span className="text-lbd-pink">Curiosity</span> to Design <span className="text-lbd-pink">Confidence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-lbd-white/80 mb-10 leading-relaxed">
            A supportive community helping designers master AI with hands-on methodologies,
            practical resources, and collaborative learning.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-primary text-lg group w-full sm:w-auto">
              Join Our Community
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" className="border-lbd-white/20 text-lg hover:bg-lbd-dark-accent w-full sm:w-auto">
              Explore Resources
            </Button>
          </div>
          
          <div className="mt-16 flex items-center justify-center space-x-8">
            <div className="flex flex-col items-center">
              <span className="text-lbd-pink text-3xl font-bold">500+</span>
              <span className="text-lbd-white/70 text-sm">Active Members</span>
            </div>
            
            <div className="w-px h-12 bg-lbd-white/10"></div>
            
            <div className="flex flex-col items-center">
              <span className="text-lbd-pink text-3xl font-bold">50+</span>
              <span className="text-lbd-white/70 text-sm">AI Resources</span>
            </div>
            
            <div className="w-px h-12 bg-lbd-white/10"></div>
            
            <div className="flex flex-col items-center">
              <span className="text-lbd-pink text-3xl font-bold">24/7</span>
              <span className="text-lbd-white/70 text-sm">Community Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
