
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyJoinUs from '@/components/WhyJoinUs';
import ValueProposition from '@/components/ValueProposition';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <Hero />
        <WhyJoinUs />
        <ValueProposition />
        {/* More sections would be added here in future iterations */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
