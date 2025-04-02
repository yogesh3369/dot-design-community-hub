
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.header 
      className={`w-full py-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollPosition > 10 ? 'bg-lbd-dark/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold font-heading text-lbd-white group">
              Little <span className="text-lbd-pink group-hover:text-white transition-colors">Big</span> Dots
              <motion.span 
                className="inline-block ml-1"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Sparkles size={16} className="text-lbd-pink" />
              </motion.span>
            </span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {["Features", "Resources", "Community", "Blog"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lbd-white relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lbd-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </motion.a>
          ))}
          
          <Button className="btn-primary relative overflow-hidden group">
            <span className="relative z-10">Join Our Community</span>
            <motion.span 
              className="absolute inset-0 bg-white/20"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, originX: 0 }}
            ></motion.span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-lbd-white" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-20 left-0 right-0 bg-lbd-dark-accent/95 backdrop-blur-lg z-50 shadow-2xl border-t border-lbd-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container-custom py-6 flex flex-col space-y-4 overflow-hidden">
              {["features", "resources", "community", "blog"].map((item, i) => (
                <motion.a 
                  key={item}
                  href={`#${item}`} 
                  className="text-lbd-white hover:text-lbd-pink py-2 transition-colors" 
                  onClick={toggleMenu}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.a>
              ))}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <Button className="btn-primary w-full">Join Our Community</Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
