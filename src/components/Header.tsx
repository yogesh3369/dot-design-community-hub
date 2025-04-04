
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronRight, Sparkles } from 'lucide-react';
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
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const navItems = [
    { title: "Features", href: "#features" },
    { title: "Resources", href: "#resources" },
    { title: "Community", href: "#community" },
    { title: "Blog", href: "#blog" },
  ];

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
      className={`w-full py-6 fixed top-0 left-0 right-0 z-50 transition-all duration-500 
        ${scrollPosition > 10 ? 'bg-lbd-dark/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-b border-lbd-neon-pink/20' : 'bg-transparent'} 
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
              <span className="relative z-10">Little <span className="text-gradient-animated font-extrabold">Big</span> Dots</span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-lbd-pink via-lbd-purple to-lbd-cyan"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </span>
          </motion.a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item, index) => (
                <NavigationMenuItem key={item.title} onMouseEnter={() => setHoveredItem(index)} onMouseLeave={() => setHoveredItem(null)}>
                  <NavigationMenuLink 
                    href={item.href} 
                    className={cn(
                      "text-lbd-white group relative flex items-center py-2 px-4 rounded-full transition-all duration-300",
                      hoveredItem === index ? "text-lbd-neon-pink" : ""
                    )}
                  >
                    <span className="relative z-10">{item.title}</span>
                    <AnimatePresence>
                      {hoveredItem === index && (
                        <motion.span 
                          className="absolute inset-0 rounded-full bg-white/5 border border-lbd-neon-pink/30"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <Button 
                  className="relative overflow-hidden group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center text-white">
                    <Sparkles className="mr-2 h-4 w-4 animate-pulse-glow" />
                    Join Our Community
                    <ChevronRight className={`ml-1 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-lbd-pink via-lbd-purple to-lbd-cyan bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500 animate-hue-rotate opacity-90"></span>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative p-2 rounded-full transition-colors duration-300" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
        >
          <span className="absolute inset-0 rounded-full animate-neon-border-pulse opacity-70"></span>
          {isMenuOpen ? 
            <X size={24} className="text-lbd-white animate-fade-in relative z-10" /> : 
            <Menu size={24} className="text-lbd-white animate-fade-in relative z-10" />
          }
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-20 left-0 right-0 bg-gradient-to-b from-lbd-dark/95 to-black/95 backdrop-blur-xl z-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-t border-lbd-neon-pink/20"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-6 flex flex-col space-y-4 overflow-hidden">
              {navItems.map((item, i) => (
                <motion.a 
                  key={item.title}
                  href={item.href} 
                  className="group text-lbd-white py-3 px-4 transition-colors rounded-lg flex items-center overflow-hidden relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  onClick={toggleMenu}
                >
                  <span className="absolute w-full h-full left-0 top-0 bg-gradient-to-r from-lbd-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="w-2 h-2 rounded-full bg-lbd-neon-pink mr-3 group-hover:animate-pulse-glow"></span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">{item.title}</span>
                </motion.a>
              ))}
              <motion.div 
                className="pt-4 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Button className="w-full group relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center text-white">
                    <Sparkles className="mr-2 h-4 w-4 animate-pulse-glow" />
                    Join Our Community
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-lbd-pink via-lbd-purple to-lbd-cyan animate-hue-rotate bg-size-200 opacity-90"></span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
