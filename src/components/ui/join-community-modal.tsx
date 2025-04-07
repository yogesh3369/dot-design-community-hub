import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface JoinCommunityModalProps {
  headingText?: string;
  children?: React.ReactNode;
}

export function JoinCommunityModal({ headingText, children }: JoinCommunityModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    linkedin: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    linkedin: ''
  });
  const [formValid, setFormValid] = useState(false);
  const [formTouched, setFormTouched] = useState({
    name: false,
    email: false,
    mobile: false,
    linkedin: false
  });
  
  // Handle form validation and submission
  const validateAndSubmit = async () => {
    const form = document.getElementById('join-form-modal') as HTMLFormElement;
    if (form && form.checkValidity()) {
      try {
        const response = await fetch('https://dsy3369.app.n8n.cloud/webhook/b672f111-73aa-48a2-b2ac-8c8ac6b16e13', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          console.log("Form submitted successfully:", formData);
          setIsOpen(false); // Close the modal after submission
        } else {
          console.error("Form submission failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      // Trigger HTML5 validation
      const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
      form.dispatchEvent(submitEvent);
    }
  };
  
  // Validate a single field
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name required';
        if (!/^[A-Za-z\s]{2,}$/.test(value)) return 'Letters only';
        return '';
      case 'email':
        if (!value.trim()) return 'Email required';
        if (!/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(value)) return 'Invalid email';
        return '';
      case 'mobile':
        if (!value.trim()) return 'Mobile required';
        if (!/^[0-9]{10}$/.test(value)) return 'Invalid number';
        return '';
      case 'linkedin':
        if (value && !/https:\/\/([a-z]+\.)?linkedin\.com\/.*/.test(value)) return 'Invalid LinkedIn URL';
        return '';
      default:
        return '';
    }
  };
  
  // Handle input changes - only update the form data, don't validate while typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle blur event to validate fields when user exits the field
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setFormTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate the field
    const errorMessage = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    // Check if all required fields are valid
    const requiredFields = ['name', 'email', 'mobile'];
    const allRequiredValid = requiredFields.every(field => 
      formTouched[field as keyof typeof formTouched] && !validateField(field, formData[field as keyof typeof formData])
    );
    
    // Check if optional fields with content are valid
    const optionalFields = ['linkedin'];
    const allOptionalValid = optionalFields.every(field => 
      !formData[field as keyof typeof formData] || !validateField(field, formData[field as keyof typeof formData])
    );
    
    setFormValid(allRequiredValid && allOptionalValid);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            className="bg-gradient-to-r from-lbd-pink to-purple-600 hover:from-lbd-pink/90 hover:to-purple-600/90 text-white font-medium rounded-lg py-3 px-6 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Join Our Community
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-lbd-dark border border-white/10 text-white max-w-md w-[95vw] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-white">
            {headingText || "Join Our Community"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <form id="join-form-modal" onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Full Name"
                className={`w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 ${
                  errors.name && formTouched.name ? 'focus:ring-red-500 border border-red-500' : 
                  formTouched.name && !errors.name ? 'focus:ring-green-500' : 
                  'focus:ring-lbd-pink/50'
                }`}
                required
              />
              <div className="text-xs text-red-400 mt-0.5 min-h-[12px]">
                {formTouched.name && errors.name ? errors.name : ''}
              </div>
            </div>
            
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Email Address"
                className={`w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 ${
                  errors.email && formTouched.email ? 'focus:ring-red-500 border border-red-500' : 
                  formTouched.email && !errors.email ? 'focus:ring-green-500' : 
                  'focus:ring-lbd-pink/50'
                }`}
                required
              />
              <div className="text-xs text-red-400 mt-0.5 min-h-[12px]">
                {formTouched.email && errors.email ? errors.email : ''}
              </div>
            </div>
            
            <div className="relative">
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Mobile Number"
                className={`w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 ${
                  errors.mobile && formTouched.mobile ? 'focus:ring-red-500 border border-red-500' : 
                  formTouched.mobile && !errors.mobile ? 'focus:ring-green-500' : 
                  'focus:ring-lbd-pink/50'
                }`}
                required
              />
              <div className="text-xs text-red-400 mt-0.5 min-h-[12px]">
                {formTouched.mobile && errors.mobile ? errors.mobile : ''}
              </div>
            </div>
            
            <div className="relative">
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="LinkedIn Profile URL"
                className={`w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 ${
                  errors.linkedin && formTouched.linkedin ? 'focus:ring-red-500 border border-red-500' : 
                  formTouched.linkedin && !errors.linkedin ? 'focus:ring-green-500' : 
                  'focus:ring-lbd-pink/50'
                }`}
              />
              <div className="text-xs text-red-400 mt-0.5 min-h-[12px]">
                {formTouched.linkedin && errors.linkedin ? errors.linkedin : ''}
              </div>
            </div>
          </form>
          
          <p className="text-white/40 text-xs mt-4">
            By joining, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
        
        <DialogFooter className="flex justify-center">
          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={!formValid}
            className={`
              ${formValid 
                ? 'bg-gradient-to-r from-lbd-pink to-purple-600 cursor-pointer' 
                : 'bg-gray-600 cursor-not-allowed'
              }
              text-white border-0 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors duration-300 flex justify-center items-center gap-2 text-center
            `}
          >
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
