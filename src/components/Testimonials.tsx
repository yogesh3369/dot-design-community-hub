
import { cn } from "@/lib/utils";
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card";
import Pill from "@/components/ui/pill";

interface TestimonialsProps {
  className?: string;
}

function Testimonials({ className }: TestimonialsProps) {
  const title = "What Our Members Say";
  const description = "Real experiences from designers across different career stages";
  
  const testimonials = [
    {
      text: "Little Big Dots transformed how I approach AI—what once felt intimidating is now intuitive and exciting!",
      author: {
        name: "Junior Designer",
        role: "UI/UX Designer"
      }
    },
    {
      text: "The supportive atmosphere and actionable insights significantly improved my workflow efficiency.",
      author: {
        name: "Mid-Career UX Designer",
        role: "Senior UX Designer"
      }
    },
    {
      text: "As a design leader, this community helps me make informed, confident decisions about integrating AI into my team's processes.",
      author: {
        name: "Senior Design Lead",
        role: "Design Director"
      }
    },
    {
      text: "The structured methodologies have been a game-changer for my team's adoption of AI tools.",
      author: {
        name: "Mrinal",
        role: "Product Designer"
      }
    }
  ];

  return (
    <section id="testimonials" className={cn(
      "relative overflow-hidden bg-lbd-dark text-lbd-white zigzag-pattern",
      "py-24 md:py-32",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-lbd-dark/90 to-lbd-dark opacity-95"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <Pill className="mb-6">
            Community Voices
          </Pill>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lbd-white to-lbd-white/80">
            {title}
          </h2>
          
          <p className="text-lbd-white/70 text-lg md:text-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-8">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-lbd-dark sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-lbd-dark sm:block" />
        </div>
      </div>
    </section>
  );
};

export { Testimonials };
export default Testimonials;
