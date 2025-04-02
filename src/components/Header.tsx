
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-6">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold font-heading text-lbd-white">
              Little <span className="text-lbd-pink">Big</span> Dots
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-lbd-white hover:text-lbd-pink transition-colors">
            Features
          </a>
          <a href="#resources" className="text-lbd-white hover:text-lbd-pink transition-colors">
            Resources
          </a>
          <a href="#community" className="text-lbd-white hover:text-lbd-pink transition-colors">
            Community
          </a>
          <a href="#blog" className="text-lbd-white hover:text-lbd-pink transition-colors">
            Blog
          </a>
          <Button className="btn-primary">Join Our Community</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-lbd-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-lbd-dark-accent z-50 animate-fade-in">
          <div className="container-custom py-6 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-lbd-white hover:text-lbd-pink py-2 transition-colors"
              onClick={toggleMenu}
            >
              Features
            </a>
            <a 
              href="#resources" 
              className="text-lbd-white hover:text-lbd-pink py-2 transition-colors"
              onClick={toggleMenu}
            >
              Resources
            </a>
            <a 
              href="#community" 
              className="text-lbd-white hover:text-lbd-pink py-2 transition-colors"
              onClick={toggleMenu}
            >
              Community
            </a>
            <a 
              href="#blog" 
              className="text-lbd-white hover:text-lbd-pink py-2 transition-colors"
              onClick={toggleMenu}
            >
              Blog
            </a>
            <Button className="btn-primary w-full">Join Our Community</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
