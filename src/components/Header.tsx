import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ChevronRight, Menu, X } from "lucide-react";
import { JoinCommunityModal } from "@/components/ui/join-community-modal";
import { GradientCTAButton } from "@/components/ui/gradient-cta-button";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-4xl fixed top-4 sm:top-10 inset-x-0 mx-4 sm:mx-auto border border-white/10 rounded-full bg-lbd-dark/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-[4000] px-4 sm:px-8 py-3 sm:py-4 items-center justify-between",
          className
        )}
      >
        {/* Logo */}
        <motion.a 
          href="/" 
          className="flex items-center" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <img 
              src="/LBD.svg" 
              alt="LBD Logo" 
              className="h-8 sm:h-10 w-auto" 
            />
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-lbd-pink via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
        </motion.a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              to={navItem.link}
              onClick={(e) => {
                // Check if this is a hash link (for scrolling) or a regular link (for navigation)
                if (navItem.link.startsWith('#')) {
                  e.preventDefault();
                  const targetId = navItem.link.replace('#', '');
                  const targetElement = document.getElementById(targetId === 'features' ? 'community-benefits' : targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // Save scroll position in session storage
                    sessionStorage.setItem('scrollPosition', targetElement.offsetTop.toString());
                  }
                }
                // For regular links, let the default navigation happen
              }}
              className={cn(
                "relative text-lbd-white hover:text-lbd-pink items-center flex space-x-1 transition-colors py-2 px-4 mx-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
              )}
            >
              <span className="text-sm font-medium">{navItem.name}</span>
            </Link>
          ))}
        </div>

        {/* Join Community CTA Button */}
        <div className="hidden md:block">
          <JoinCommunityModal>
            <button className="text-sm font-medium text-white py-2 px-4 rounded-full flex items-center bg-gradient-to-r from-lbd-pink to-purple-600 hover:from-lbd-pink/90 hover:to-purple-600/90 transition-all duration-300">
              Join Community
              <ChevronRight className="h-3 w-3 ml-1" />
            </button>
          </JoinCommunityModal>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-lbd-pink transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-4 w-56 py-2 bg-lbd-dark/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg"
            >
              {navItems.map((navItem: any, idx: number) => (
                <Link
                  key={`mobile-link-${idx}`}
                  to={navItem.link}
                  onClick={(e) => {
                    // Close the mobile menu regardless of link type
                    setIsMobileMenuOpen(false);
                    
                    // Check if this is a hash link (for scrolling) or a regular link (for navigation)
                    if (navItem.link.startsWith('#')) {
                      e.preventDefault();
                      const targetId = navItem.link.replace('#', '');
                      const targetElement = document.getElementById(targetId === 'features' ? 'community-benefits' : targetId);
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                        // Save scroll position in session storage
                        sessionStorage.setItem('scrollPosition', targetElement.offsetTop.toString());
                      }
                    } else if (navItem.link === '/') {
                      // For home link, scroll to top
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      // Clear any saved scroll position
                      sessionStorage.removeItem('scrollPosition');
                    }
                    // For other regular links, let the default navigation happen
                  }}
                  className="block px-4 py-2 text-sm text-white hover:text-lbd-pink hover:bg-white/5 transition-colors"
                >
                  {navItem.name}
                </Link>
              ))}
              {/* Join Community CTA Button in mobile menu */}
              <div className="px-4 py-2">
                <JoinCommunityModal>
                  <button className="w-full text-left text-sm text-white hover:text-lbd-pink hover:bg-white/5 transition-colors py-2">
                    Join Our Community
                    <ChevronRight className="h-4 w-4 ml-1 inline" />
                  </button>
                </JoinCommunityModal>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

const Header = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Events",
      link: "/events",
    }
  ];

  // Handle scroll position on page load
  useEffect(() => {
    // Clear any saved scroll position on page load
    sessionStorage.removeItem('scrollPosition');
    
    // Always start from top on page load
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });

    // Handle hash in URL for direct linking
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        const targetElement = document.getElementById(targetId === 'features' ? 'community-benefits' : targetId);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            sessionStorage.setItem('scrollPosition', targetElement.offsetTop.toString());
          }, 100);
        }
      }
    };

    // Check for hash on initial load
    if (window.location.hash) {
      handleHashChange();
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-40">
      <div className="container-custom mx-auto py-6">
        <FloatingNav navItems={navItems} />
      </div>
    </header>
  );
};

export default Header;
