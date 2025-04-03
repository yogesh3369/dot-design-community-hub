
import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "Little Big Dots transformed how I approach AI—what once felt intimidating is now intuitive and exciting!",
      author: "Junior Designer",
      role: "UI/UX Designer"
    },
    {
      quote: "The supportive atmosphere and actionable insights significantly improved my workflow efficiency.",
      author: "Mid-Career UX Designer",
      role: "Senior UX Designer"
    },
    {
      quote: "As a design leader, this community helps me make informed, confident decisions about integrating AI into my team's processes.",
      author: "Senior Design Lead",
      role: "Design Director"
    },
    {
      quote: "The structured methodologies have been a game-changer for my team's adoption of AI tools.",
      author: "Mrinal",
      role: "Product Designer"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-lbd-dark z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-lbd-pink rounded-full filter blur-[150px]"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-[150px]"
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
            <span className="text-lbd-pink text-sm font-medium">Hear From Our Members</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            <span className="text-lbd-pink">Testimonials</span>
          </h2>
          <p className="text-lbd-white/70 text-lg">
            Real experiences from our community members
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 rounded-xl border border-white/10 hover:border-lbd-pink/30 transition-all duration-300"
            >
              <div className="mb-6">
                <svg className="w-10 h-10 text-lbd-pink/30" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8v12H6V14c0-2.21 1.79-4 4-4zm12 0v12h-4V14c0-2.21 1.79-4 4-4z" />
                </svg>
              </div>
              <p className="text-lbd-white text-lg italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-lbd-pink/20 flex items-center justify-center text-lbd-pink font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">{testimonial.author}</h4>
                  <p className="text-lbd-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
