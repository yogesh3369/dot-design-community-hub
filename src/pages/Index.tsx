import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyJoinUs from '@/components/WhyJoinUs';
import ValueProposition from '@/components/ValueProposition';
import CommunityBenefits from '@/components/CommunityBenefits';
import Events from '@/components/Events';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSupport from '@/components/FaqSupport';
import JoinNow from '@/components/JoinNow';
import Footer from '@/components/Footer';
import { GradientBackground } from '@/components/ui/gradient-background';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-lbd-dark"> {/* Unified container with single background */}
          <GradientBackground variant="intense" isFirst={true}>
            <Hero />
          </GradientBackground>
          <GradientBackground variant="default">
            <WhyJoinUs />
          </GradientBackground>
          <GradientBackground variant="subtle">
            <ValueProposition />
          </GradientBackground>
          <GradientBackground variant="default">
            <CommunityBenefits />
          </GradientBackground>
          <GradientBackground variant="subtle">
            <Events />
          </GradientBackground>
          <GradientBackground variant="intense">
            <TestimonialsSection 
            testimonials={[
              {
                name: "Arun Kumar",
                designation: "Designer",
                username: "arunkumar",
                quote: "Little Big Dots helped me explore AI in a more practical and inspiring way. The community and resources shaped how I now approach PRDs with an AI-first mindset.",
                src: "/images/testimonials/arun-kumar.jpg"
              },
              {
                name: "Raxit Tanwar",
                designation: "UX Designer",
                username: "raxitanwar",
                quote: "This community and their leaders, have helped me so much in learning about how AI would help designers like us and how do we leverage this to make ourselves better. The first event they held about how to convert that small idea into a working MVP was so informative that I ended up making a small tool which helped my fellow designers and streamline certain processes. The constant interaction and chatter going in the group makes my life easier in terms of staying updated to the constantly changing world of AI. This has been my stop point for all things I can gather about AI and its use. I sincerely thank all the mentors and community members contributing and taking time out to share their wealth of knowledge and experience.",
                src: "/images/testimonials/raxit-tanwar.jpg"
              },
              {
                name: "Shruti Khopkar",
                designation: "Product Designer",
                username: "shrutikhopkar",
                quote: "Being part of the Little Big Dots community has been one of the most rewarding experiences of my design journey so far. I've often found myself searching for the right direction and guidance in such a fast-paced, ever-evolving field. It was through a project supervised by LBD team, that I got the opportunity to step into something bigger than just a task — it was a door into a community that truly gets it. Little Big Dots has been more than just a network — it's a space where ideas, innovation, and curiosity are constantly nurtured. The way AI is being explored here, not just as a tool but as a co-creator in the design process, has completely shifted the way I think about my work. I've felt inspired to take bolder steps in my career, supported by insights that are always a step ahead of the curve. Most importantly, I've felt seen — like my thoughts and efforts matter, even as I continue learning. I'm incredibly grateful for this space and the people in it, and I'm excited for what's ahead.",
                src: "/images/testimonials/shruti-khopkar.jpg"
              },
              {
                name: "Vinay Parashar",
                designation: "UI Designer",
                username: "vinayparashar",
                quote: "Being a part of Little Big Dots has been a game-changer in my design journey. It's more than just a community—it's a vibrant space where designers from all backgrounds come together to share knowledge, grow their skills, and support each other. The knowledge exchange programs are especially impactful, offering real-world insights and fresh perspectives that you simply can't get from textbooks or tutorials. Whether you're a beginner or a seasoned pro, Little Big Dots gives you the tools, connections, and inspiration to keep evolving in the creative field. I'm truly grateful to be part of such a generous and growth-oriented community.",
                src: "/images/testimonials/vinay-parashar.jpg"
              },
              {
                name: "Terence Dsouza",
                designation: "Design Lead",
                username: "terencedsouza",
                quote: "Little Big Dots helped me stay on top of what's happening in AI without the noise. I've been able to discover new tools and workflows that make it easier to build MVPs for my ideas — faster and with more clarity. It's been great having a space where learning feels practical and community-driven.",
                src: "/images/testimonials/terence-dsouza.jpg"
              },
              {
                name: "Faizan Qureshi",
                designation: "Product Designer",
                username: "faizanqureshi",
                quote: "Being part of Little Big Dots has been such a warm and inspiring experience. The LBD team has been incredibly supportive and thoughtful. Through this space, I learned how to approach product thinking more deeply — from understanding PRDs to planning before jumping into implementation. It's truly helped me grow as a designer and a thinker.",
                src: "/images/testimonials/faizan-qureshi.jpg"
              },
              {
                name: "Satya Koli",
                designation: "UX Researcher",
                username: "satyakoli",
                quote: "Attending Little Big Dots session was truly an eye-opener for me. It introduced me to the power of AI and no-code tools, something I had only heard about but never truly explored. The session was incredibly helpful — not only did I learn a lot, but I also managed to create a few applications on my own, which gave me a real sense of achievement. This initiative by LBD team is absolutely fantastic. Their support and guidance throughout the session made all the difference. I appreciate the way complex concepts were simplified and made actionable. I'm really looking forward to attending many more sessions and continuing this journey of learning and innovation. Thank you, LBD team, for this empowering experience!",
                src: "/images/testimonials/satya-koli.jpg"
              },
            ]}
          />
          </GradientBackground>
          <GradientBackground variant="default">
            <FaqSupport />
          </GradientBackground>
          <GradientBackground variant="intense" isLast={true}>
            <JoinNow />
          </GradientBackground>
        </div>
        {/* More sections would be added here in future iterations */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
