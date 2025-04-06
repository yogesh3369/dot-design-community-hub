import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverSubmitButton,
  PopoverCloseButton,
} from "@/components/ui/animated-popover";

// Create a context to track popover state
interface PopoverStateContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopoverStateContext = React.createContext<PopoverStateContextType | undefined>(undefined);

function usePopoverState() {
  const context = React.useContext(PopoverStateContext);
  if (!context) {
    throw new Error("usePopoverState must be used within a PopoverStateProvider");
  }
  return context;
}

// Component to display heading text that hides when popover is active
function HeadingText({ text }: { text: string }) {
  const { isOpen } = usePopoverState();
  
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.h3 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-white/90 text-lg font-medium mb-4 text-center"
        >
          {text}
        </motion.h3>
      )}
    </AnimatePresence>
  );
}

interface JoinCommunityPopoverProps {
  headingText?: string;
}

export function JoinCommunityPopover({ headingText }: JoinCommunityPopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
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
    const form = document.getElementById('join-form') as HTMLFormElement;
    if (form && form.checkValidity()) {
      try {
        const response = await fetch('https://dsy3369.app.n8n.cloud/webhook-test/b672f111-73aa-48a2-b2ac-8c8ac6b16e13', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          console.log("Form submitted successfully:", formData);
          setIsOpen(false); // Close the popover after submission
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
        if (value && !/^[0-9]{10}$/.test(value)) return 'Invalid number';
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
    setFormTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate the field
    const errorMessage = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
    
    // Update form validity
    const nameValid = formData.name && !errors.name;
    const emailValid = formData.email && !errors.email;
    setFormValid(nameValid && emailValid);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await validateAndSubmit();
  };

  // Function to handle popover open state
  const handlePopoverOpen = () => {
    setIsOpen(true);
  };

  // Function to handle popover close
  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  return (
    <PopoverStateContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="w-full">
        {headingText && <HeadingText text={headingText} />}
        
        <PopoverRoot className="w-full">
          <PopoverTrigger 
            variant="default" 
            className="bg-gradient-to-r from-lbd-pink to-purple-600 text-white font-medium rounded-lg px-8 py-3 border-0 hover:text-white inline-flex items-center justify-center whitespace-nowrap min-w-[240px]"
          >
            Join Community

          </PopoverTrigger>
      
      <PopoverContent 
        className="w-[350px] bg-lbd-dark border-white/10"
      >
        <PopoverHeader className="bg-lbd-dark text-white border-white/10">
          Join Our Community
        </PopoverHeader>
        
        <PopoverBody className="space-y-4">
          <form id="join-form" className="space-y-4" onSubmit={handleSubmit} noValidate>
            <p className="text-white/60 text-sm hidden">Connect with designers mastering AI through hands-on learning and collaboration.</p>
            
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Your Name"
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
          
          <p className="text-white/40 text-xs">
            By joining, you agree to our Terms of Service and Privacy Policy
          </p>
        </PopoverBody>
        
        <PopoverFooter className="bg-lbd-dark/80 border-white/10 flex justify-between items-center">
          <PopoverCloseButton 
            className="text-white/60 hover:text-white" 
          />
          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={!formValid}
            className={`
              ${formValid 
                ? 'bg-gradient-to-r from-lbd-pink to-purple-600 cursor-pointer' 
                : 'bg-gray-600 cursor-not-allowed'
              }
              text-white border-0 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors duration-300 flex items-center gap-2
            `}
          >
            Submit
          </button>
        </PopoverFooter>
      </PopoverContent>
    </PopoverRoot>
      </div>
    </PopoverStateContext.Provider>
  );
}
