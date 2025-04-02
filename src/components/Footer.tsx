
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-lbd-dark-accent py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-bold font-heading mb-4">
              Little <span className="text-lbd-pink">Big</span> Dots
            </h2>
            <p className="text-lbd-white/70 mb-6">
              A supportive community helping designers master AI with hands-on methodologies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lbd-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Home</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Features</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Resources</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Community</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lbd-white font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">AI Tools</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Design Resources</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lbd-white font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-lbd-white/70 hover:text-lbd-pink transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-lbd-white/10 text-center text-lbd-white/50 text-sm">
          &copy; {new Date().getFullYear()} Little Big Dots. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
