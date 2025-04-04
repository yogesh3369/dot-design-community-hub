import { motion } from 'framer-motion';
import { Zap, Users, BookOpen, MessageCircle, Monitor, Sparkles, User } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

function Feature() {
  return (
    <section id="features" className="py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge className="bg-lbd-pink/10 text-lbd-pink border-lbd-pink/20">Our Features</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-lbd-white">
                Unlock Your <span className="text-gradient">AI Design</span> Potential
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-lbd-white/70 text-left">
                Our community provides everything you need to confidently integrate AI into your design workflow.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted/50 rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <Zap className="w-8 h-8 stroke-1 text-lbd-pink" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight text-lbd-white">AI-Powered Design Tools</h3>
                <p className="text-lbd-white/70 max-w-xs text-base">
                  Access cutting-edge AI tools specifically curated for design professionals.
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-md aspect-square p-6 flex justify-between flex-col">
              <Users className="w-8 h-8 stroke-1 text-lbd-pink" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight text-lbd-white">Supportive Community</h3>
                <p className="text-lbd-white/70 max-w-xs text-base">
                  Connect with like-minded designers navigating the evolving AI landscape.
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-md aspect-square p-6 flex justify-between flex-col">
              <BookOpen className="w-8 h-8 stroke-1 text-lbd-pink" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight text-lbd-white">Practical Resources</h3>
                <p className="text-lbd-white/70 max-w-xs text-base">
                  Benefit from hands-on tutorials, templates, and methodologies.
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <MessageCircle className="w-8 h-8 stroke-1 text-lbd-pink" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight text-lbd-white">Expert Guidance</h3>
                <p className="text-lbd-white/70 max-w-xs text-base">
                  Learn from industry leaders with real-world AI implementation experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature };
