import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface JoinFormProps {
  className?: string;
}

export function JoinForm({ className }: JoinFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    linkedin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <h3 className="text-white/90 text-lg font-medium mb-4">Join Our Community</h3>
          
          <div className="space-y-3">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lbd-pink/50"
                required
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lbd-pink/50"
                required
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lbd-pink/50"
              />
            </div>
            
            <div>
              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn Profile URL"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lbd-pink/50"
              />
            </div>
          </div>
          
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-lbd-pink to-purple-600 text-white font-medium rounded-lg px-6 py-3 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Community
            <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
          
          <p className="text-white/40 text-xs text-center mt-3">
            By joining, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </div>
  );
}
