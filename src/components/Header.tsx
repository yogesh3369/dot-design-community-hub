
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronRight } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <header 
      className={`w-full py-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${scrollPosition > 10 ? 'bg-lbd-dark/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-b border-white/5' : 'bg-transparent'} 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <motion.a 
            href="/" 
            className="flex items-center" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-bold font-heading text-lbd-white group relative">
              Little <span className="text-lbd-pink group-hover:text-white transition-colors duration-300">Big</span> Dots
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-lbd-pink via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
          </motion.a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#features" 
                  className={cn(
                    "text-lbd-white hover:text-lbd-pink transition-colors py-2 px-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10",
                  )}
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#resources" 
                  className={cn(
                    "text-lbd-white hover:text-lbd-pink transition-colors py-2 px-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10",
                  )}
                >
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#community" 
                  className={cn(
                    "text-lbd-white hover:text-lbd-pink transition-colors py-2 px-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10",
                  )}
                >
                  Community
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#blog" 
                  className={cn(
                    "text-lbd-white hover:text-lbd-pink transition-colors py-2 px-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10",
                  )}
                >
                  Blog
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Button 
                  className="relative overflow-hidden group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center text-white">
                    Join Our Community
                    <ChevronRight className={`ml-1 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-lbd-pink via-purple-600 to-lbd-pink bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500"></span>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-lbd-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
        >
          {isMenuOpen ? 
            <X size={24} className="animate-fade-in" /> : 
            <Menu size={24} className="animate-fade-in" />
          }
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden absolute top-20 left-0 right-0 bg-gradient-to-b from-lbd-dark-accent/95 to-black/95 backdrop-blur-xl z-50 shadow-2xl border-t border-lbd-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom py-6 flex flex-col space-y-4">
            <a href="#features" className="text-lbd-white hover:text-lbd-pink py-3 px-4 transition-colors rounded-lg hover:bg-white/5 flex items-center" onClick={toggleMenu}>
              <span className="w-2 h-2 rounded-full bg-lbd-pink mr-3"></span>
              Features
            </a>
            <a href="#resources" className="text-lbd-white hover:text-lbd-pink py-3 px-4 transition-colors rounded-lg hover:bg-white/5 flex items-center" onClick={toggleMenu}>
              <span className="w-2 h-2 rounded-full bg-lbd-pink mr-3"></span>
              Resources
            </a>
            <a href="#community" className="text-lbd-white hover:text-lbd-pink py-3 px-4 transition-colors rounded-lg hover:bg-white/5 flex items-center" onClick={toggleMenu}>
              <span className="w-2 h-2 rounded-full bg-lbd-pink mr-3"></span>
              Community
            </a>
            <a href="#blog" className="text-lbd-white hover:text-lbd-pink py-3 px-4 transition-colors rounded-lg hover:bg-white/5 flex items-center" onClick={toggleMenu}>
              <span className="w-2 h-2 rounded-full bg-lbd-pink mr-3"></span>
              Blog
            </a>
            <div className="pt-4 border-t border-white/10">
              <Button className="w-full bg-gradient-to-r from-lbd-pink via-purple-600 to-lbd-pink bg-size-200 hover:bg-pos-100 transition-all duration-500 text-white font-medium">
                Join Our Community
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
