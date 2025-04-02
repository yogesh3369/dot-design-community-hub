
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        {/* More sections would be added here in future iterations */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
