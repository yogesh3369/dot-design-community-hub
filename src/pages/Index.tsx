
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyJoinUs from '@/components/WhyJoinUs';
import ValueProposition from '@/components/ValueProposition';
import Footer from '@/components/Footer';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Horizontal scroll effect for sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    // Initialize smooth scroll
    const initLocomotive = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]') as HTMLElement,
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true }
      });

      // Clean up
      return () => locomotiveScroll.destroy();
    };

    const cleanup = initLocomotive();
    return () => { cleanup.then(cleanupFn => cleanupFn()); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" ref={containerRef} data-scroll-container>
      <Header />
      <main className="flex-grow pt-20" data-scroll-section>
        <div data-scroll data-scroll-speed="-2">
          <Hero />
        </div>
        
        <div data-scroll data-scroll-speed="1">
          <WhyJoinUs />
        </div>
        
        <div data-scroll data-scroll-speed="0.5">
          <ValueProposition />
        </div>
        {/* More sections would be added here in future iterations */}
      </main>
      <Footer />
      
      {/* Animated page transition overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 bg-lbd-dark"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'top' }}
      />
    </div>
  );
};

export default Index;
