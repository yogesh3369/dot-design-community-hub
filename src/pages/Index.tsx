
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyJoinUs from '@/components/WhyJoinUs';
import ValueProposition from '@/components/ValueProposition';
import CommunityBenefits from '@/components/CommunityBenefits';
import Testimonials from '@/components/Testimonials';
import FaqSupport from '@/components/FaqSupport';
import JoinNow from '@/components/JoinNow';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WhyJoinUs />
        <ValueProposition />
        <CommunityBenefits />
        <Testimonials />
        <FaqSupport />
        <JoinNow />
        {/* More sections would be added here in future iterations */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
