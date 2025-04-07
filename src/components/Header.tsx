import React, { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
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
          "flex max-w-4xl fixed top-4 sm:top-10 inset-x-0 mx-4 sm:mx-auto border border-white/10 rounded-full bg-lbd-dark/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-[5000] px-4 sm:px-8 py-3 sm:py-4 items-center justify-between",
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
          <span className="text-lg sm:text-2xl font-bold font-heading text-lbd-white group relative">
            Little <span className="text-lbd-pink group-hover:text-white transition-colors duration-300">Big</span> Dots
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-lbd-pink via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
        </motion.a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              to={navItem.link}
              className={cn(
                "relative text-lbd-white hover:text-lbd-pink items-center flex space-x-1 transition-colors py-2 px-4 mx-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
              )}
            >
              <span className="text-sm font-medium">{navItem.name}</span>
            </Link>
          ))}
        </div>

        {/* Join Button - Desktop */}
        <JoinCommunityModal headingText="Join Our Community">
          <button 
            className="hidden md:flex border text-sm font-medium relative border-white/10 bg-gradient-to-r from-lbd-pink via-purple-600 to-lbd-pink bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 text-white px-4 py-2 rounded-full overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="relative z-10 flex items-center">
              Join Our Community
              <ChevronRight className={`ml-1 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-lbd-pink to-transparent h-px" />
          </button>
        </JoinCommunityModal>

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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-white hover:text-lbd-pink hover:bg-white/5 transition-colors"
                >
                  {navItem.name}
                </Link>
              ))}
              <hr className="my-2 border-white/10" />
              <JoinCommunityModal headingText="Join Our Community">
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-lbd-pink hover:bg-white/5 transition-colors flex items-center"
                >
                  Join Our Community
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </JoinCommunityModal>
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
      name: "Features",
      link: "#features",
    },
    {
      name: "Testimonials",
      link: "#testimonials",
    }
  ];

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-40">
      <div className="container-custom mx-auto py-6">
        <FloatingNav navItems={navItems} />
      </div>
    </header>
  );
};

export default Header;
