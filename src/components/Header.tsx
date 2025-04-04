import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible = lastScrollTop > currentScrollPos || currentScrollPos < 10;
      setIsVisible(visible);
      setLastScrollTop(currentScrollPos);
      setScrollPosition(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);
  return <header className="bg-gray-950">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold font-heading text-lbd-white group">
              Little <span className="text-lbd-pink group-hover:text-white transition-colors">Big</span> Dots
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          
          
          
          
          <Button className="btn-primary relative overflow-hidden group">
            <span className="relative z-10">Join Our Community</span>
            <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-lbd-white" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} className="animate-fade-in" /> : <Menu size={24} className="animate-fade-in" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden absolute top-20 left-0 right-0 bg-lbd-dark-accent/95 backdrop-blur-lg z-50 animate-fade-in shadow-2xl border-t border-lbd-white/10">
          <div className="container-custom py-6 flex flex-col space-y-4">
            <a href="#features" className="text-lbd-white hover:text-lbd-pink py-2 transition-colors" onClick={toggleMenu}>
              Features
            </a>
            <a href="#resources" className="text-lbd-white hover:text-lbd-pink py-2 transition-colors" onClick={toggleMenu}>
              Resources
            </a>
            <a href="#community" className="text-lbd-white hover:text-lbd-pink py-2 transition-colors" onClick={toggleMenu}>
              Community
            </a>
            <a href="#blog" className="text-lbd-white hover:text-lbd-pink py-2 transition-colors" onClick={toggleMenu}>
              Blog
            </a>
            <Button className="btn-primary w-full">Join Our Community</Button>
          </div>
        </div>}
    </header>;
};
export default Header;