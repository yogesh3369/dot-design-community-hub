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
import { FaWhatsapp } from "react-icons/fa";
import { GradientCTAButton } from "@/components/ui/gradient-cta-button";

// Add type declaration for gtag
interface Window {
  gtag: (command: string, eventName: string, params?: Record<string, any>) => void;
}

declare const window: Window;

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
  buttonText?: string;
  children?: React.ReactNode;
}

export function JoinCommunityPopover({ headingText, buttonText = "Join Our Community", children }: JoinCommunityPopoverProps) {
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
  const [webhookResponse, setWebhookResponse] = useState<{
    message?: string;
    whatsappLink?: string;
    success?: boolean;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Track popover open event
  const trackPopoverOpen = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'join_community_popup_open', {
        event_category: 'Community Engagement',
        event_label: 'Join Community Button Clicked'
      });
    }
  };

  // Track form submission
  const trackFormSubmit = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'join_community_form_submit', {
        event_category: 'Community Engagement',
        event_label: 'Join Community Form Submitted'
      });
    }
  };

  // Track successful submission
  const trackSuccessfulSubmission = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'join_community_success', {
        event_category: 'Community Engagement',
        event_label: 'Successfully Joined Community',
        value: 1
      });
    }
  };

  // Define webhook URL as a constant for general community joins
  const WEBHOOK_URL = 'https://automation.karao.digital/webhook/b31614af-1370-4154-99f4-0159d129de6b';
  
  // Handle form validation and submission
  const validateAndSubmit = async () => {
    const form = document.getElementById('join-form') as HTMLFormElement;
    if (form && form.checkValidity()) {
      setIsSubmitting(true);
      try {
        console.log('Sending data to webhook:', formData);
        console.log('Webhook URL:', WEBHOOK_URL);
        
        // Add a timestamp to help avoid caching issues
        const dataWithTimestamp = {
          ...formData,
          timestamp: new Date().toISOString()
        };
        
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(dataWithTimestamp),
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'omit'
        });
        
        console.log('Response status:', response.status);

        if (response.ok) {
          // Parse the response data
          let responseData;
          // Clone the response so we can read it multiple times if needed
          const responseClone = response.clone();
          
          try {
            // Try to parse as JSON first
            const responseText = await response.text();
            console.log("Response text:", responseText);
            
            if (responseText && responseText.trim() !== '') {
              try {
                // Try to parse as JSON
                responseData = JSON.parse(responseText);
                console.log("Form submitted successfully:", responseData);
                
                // Check if the response has a "Message sent" key
                if (responseData["Message sent"]) {
                  // Use the value of "Message sent" as our message
                  responseData = {
                    message: responseData["Message sent"],
                    whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j'
                  };
                  console.log("Extracted message from 'Message sent' key:", responseData.message);
                }
              } catch (parseError) {
                console.log("Response is not valid JSON, using as plain text");
                // If not valid JSON, use the text directly
                responseData = { 
                  message: responseText || 'Thanks for joining our community!',
                  whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j'
                };
              }
            } else {
              // Empty response
              console.log("Empty response received");
              responseData = { 
                message: 'Thanks for joining our community!',
                whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j'
              };
            }
          } catch (error) {
            console.error("Error reading response:", error);
            responseData = { 
              message: 'Thanks for joining our community!',
              whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j'
            };
          }
          
          setWebhookResponse({
            message: responseData.message || 'Thanks for joining our community!',
            whatsappLink: responseData.whatsappLink || 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j',
            success: true
          });
          trackSuccessfulSubmission();
        } else {
          console.error("Form submission failed:", response.status, response.statusText);
          // Try to get error details if available
          try {
            const errorData = await response.text();
            console.error("Error details:", errorData);
          } catch (readError) {
            console.error("Could not read error response", readError);
          }
          // Still show a success message
          setWebhookResponse({
            message: 'Thanks for joining our community!',
            whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j',
            success: true
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Still show a success message despite the error
        setWebhookResponse({
          message: 'Thanks for joining our community!',
          whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j',
          success: true
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Mark all fields as touched to show validation errors
      setFormTouched({
        name: true,
        email: true,
        mobile: true,
        linkedin: true
      });
      
      // Update form validity
      const newErrors = {
        name: validateField('name', formData.name),
        email: validateField('email', formData.email),
        mobile: validateField('mobile', formData.mobile),
        linkedin: validateField('linkedin', formData.linkedin)
      };
      
      setErrors(newErrors);
      setFormValid(!Object.values(newErrors).some(error => error !== ''));
    }
  };

  // Validate a single field
  const validateField = (name: string, value: string): string => {
    if (name === 'name') {
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 3) return 'Name must be at least 3 characters';
    }
    
    if (name === 'email') {
      if (!value.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
    }
    
    if (name === 'mobile') {
      if (!value.trim()) return 'Mobile number is required';
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid mobile number';
    }
    
    return '';
  };

  // Handle input changes - only update the form data, don't validate while typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle blur event to validate fields when user exits the field
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setFormTouched({
      ...formTouched,
      [name]: true
    });
    
    // Validate the field
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage
    });
    
    // Check if form is valid
    const updatedErrors = { ...errors, [name]: errorMessage };
    const isFormValid = !Object.values(updatedErrors).some(error => error !== '');
    setFormValid(isFormValid);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmit();
    validateAndSubmit();
  };

  // Function to handle popover open state
  const handlePopoverOpen = () => {
    trackPopoverOpen();
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
            {children || buttonText}
          </PopoverTrigger>
          
          <PopoverContent 
            className="w-[350px] bg-lbd-dark border-white/10"
          >
            <PopoverHeader className="bg-lbd-dark text-white border-white/10">
              Join Our Community
            </PopoverHeader>
            
            <PopoverBody className="bg-lbd-dark/90 p-6 rounded-b-xl">
              {webhookResponse ? (
                <div className="flex flex-col items-center justify-center space-y-6 py-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center p-4 rounded-lg bg-green-500/20 w-full"
                  >
                    <p className="text-white text-lg font-medium mb-6">{webhookResponse.message}</p>
                    
                    {webhookResponse.whatsappLink && (
                      <a 
                        href={webhookResponse.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 w-full"
                      >
                        <FaWhatsapp size={20} />
                        Open WhatsApp
                      </a>
                    )}
                  </motion.div>
                </div>
              ) : (
                <>
                  <form id="join-form" className="space-y-4">
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
                  
                  <p className="text-white/40 text-xs">
                    By joining, you agree to our Terms of Service and Privacy Policy
                  </p>
                </>
              )}
            </PopoverBody>
            
            {!webhookResponse ? (
              <PopoverFooter className="bg-lbd-dark/80 border-white/10 flex justify-between items-center">
                <PopoverCloseButton 
                  className="text-white/60 hover:text-white" 
                />
                <button 
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!formValid || isSubmitting}
                  className={`
                    ${formValid && !isSubmitting
                      ? 'bg-gradient-to-r from-lbd-pink to-purple-600 cursor-pointer' 
                      : 'bg-gray-600 cursor-not-allowed'
                    }
                    text-white border-0 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors duration-300 flex items-center gap-2
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : 'Submit'}
                </button>
              </PopoverFooter>
            ) : null}
          </PopoverContent>
        </PopoverRoot>
      </div>
    </PopoverStateContext.Provider>
  );
}
