
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
}

const FaqSupport = () => {
  // This could be fetched from an API in the future
  const faqs: FaqItem[] = [
    {
      question: "Do I need prior AI knowledge?",
      answer: "No, we welcome all skill levels and provide structured paths for beginners."
    },
    {
      question: "What if I'm unsure how to participate?",
      answer: "Our moderators and guides will help you integrate smoothly and actively into the community."
    }
  ];

  return (
    <section id="faq-support" className="py-24 relative overflow-hidden bubbles-pattern">
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
        
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/5"
              style={{
                width: `${(i + 2) * 100}px`,
                height: `${(i + 2) * 100}px`,
                left: '50%',
                top: '50%',
                marginLeft: `-${((i + 2) * 100) / 2}px`,
                marginTop: `-${((i + 2) * 100) / 2}px`,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.5,
              }}
            />
          ))}
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
            <span className="text-lbd-pink text-sm font-medium">Get Support</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            FAQ & <span className="text-lbd-pink">Support</span>
          </h2>
          <p className="text-lbd-white/70 text-lg">
            Find answers to common questions about our community
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="glass-card mb-4 border-lbd-pink/20 overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:text-lbd-pink transition-all">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-lbd-white/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSupport;
