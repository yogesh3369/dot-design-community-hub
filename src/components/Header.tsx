
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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

  return (
    <header 
      className={`w-full py-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${scrollPosition > 10 ? 'bg-lbd-dark/90 backdrop-blur-lg shadow-lg border-b border-white/5' : 'bg-transparent'} 
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
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
        <nav className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#features" 
                  className={cn(
                    "text-lbd-white hover:text-lbd-pink transition-colors duration-200",
                    "px-4 py-2 text-sm font-medium"
                  )}
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#resources" 
                  className={cn(
                    "text-lbd-white hover:text-lbd-pink transition-colors duration-200",
                    "px-4 py-2 text-sm font-medium"
                  )}
                >
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#community" 
                  className={cn(
                    "text-lbd-white hover:text-lbd-pink transition-colors duration-200",
                    "px-4 py-2 text-sm font-medium"
                  )}
                >
                  Community
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#blog" 
                  className={cn(
                    "text-lbd-white hover:text-lbd-pink transition-colors duration-200",
                    "px-4 py-2 text-sm font-medium"
                  )}
                >
                  Blog
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button 
            className="bg-gradient-to-r from-lbd-pink to-lbd-pink/80 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-lbd-pink/25 px-6"
          >
            Join Our Community
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-lbd-white" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} className="animate-fade-in" /> : <Menu size={24} className="animate-fade-in" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-lbd-dark-accent/95 backdrop-blur-lg z-50 animate-fade-in shadow-2xl border-t border-lbd-white/10">
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
            <Button className="bg-gradient-to-r from-lbd-pink to-lbd-pink/80 text-white font-medium rounded-full w-full">
              Join Our Community
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
