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
import { FaWhatsapp } from "react-icons/fa";

interface JoinCommunityModalProps {
  headingText?: string;
  children?: React.ReactNode;
  eventData?: {
    eventName: string;
    eventId: string;
    eventDate: string;
    eventTime: string;
  };
}

export function JoinCommunityModal({ headingText, children, eventData }: JoinCommunityModalProps) {
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
  const [webhookResponse, setWebhookResponse] = useState<{
    message?: string;
    whatsappLink?: string;
    success?: boolean;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Define webhook URL as a constant specifically for event registrations
  // This webhook is different from the general community join webhook
  const WEBHOOK_URL = 'https://automation.karao.digital/webhook/19fa7538-2af7-491c-a8ca-2f0e2c8a8cca';
  
  // Handle form validation and submission
  const validateAndSubmit = async () => {
    const form = document.getElementById('join-form-modal') as HTMLFormElement;
    if (form && form.checkValidity()) {
      setIsSubmitting(true);
      try {
        console.log('Sending data to webhook:', formData);
        console.log('Webhook URL:', WEBHOOK_URL);
        
        // Add a timestamp and event data if available
        const dataWithTimestamp = {
          ...formData,
          timestamp: new Date().toISOString(),
          ...(eventData && { eventData })
        };
        
        // Use fetch with improved options
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(dataWithTimestamp),
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'omit' // Changed from same-origin to omit for cross-domain requests
        });
        
        console.log('Response status:', response.status);

        // Check for any response (not just ok responses)
        console.log("Response received:", response);
        
        if (response.ok) {
          // Parse the response data
          let responseData = {
            message: 'Thanks for joining our community!',
            whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j'
          };
          
          try {
            // Try to parse as JSON first
            const responseText = await response.text();
            console.log("Response text:", responseText);
            
            if (responseText && responseText.trim() !== '') {
              try {
                // Try to parse as JSON
                const jsonData = JSON.parse(responseText);
                console.log("Form submitted successfully:", jsonData);
                
                // Check if the response has a "Message sent" key
                if (jsonData["Message sent"]) {
                  responseData = {
                    message: jsonData["Message sent"],
                    whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j'
                  };
                  console.log("Extracted message from 'Message sent' key:", responseData.message);
                } else if (jsonData.message) {
                  responseData = {
                    message: jsonData.message,
                    whatsappLink: jsonData.whatsappLink || 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j'
                  };
                }
              } catch (parseError) {
                console.log("Response is not valid JSON, using as plain text");
                // If not valid JSON, use the text directly
                responseData = { 
                  message: responseText || 'Thanks for joining our community!',
                  whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j'
                };
              }
            }
          } catch (error) {
            console.error("Error reading response:", error);
          }
          
          // Store the response data
          setWebhookResponse({
            message: responseData.message,
            whatsappLink: responseData.whatsappLink,
            success: true
          });
        } else {
          console.error("Form submission failed:", response.status, response.statusText);
          // Try to get error details if available
          try {
            const errorData = await response.text();
            console.error("Error details:", errorData);
          } catch (readError) {
            console.error("Could not read error response", readError);
          }
          setWebhookResponse({
            message: 'Thanks for joining our community!',
            whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j',
            success: true
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        
        // Try an alternative approach with XMLHttpRequest as a fallback
        console.log("Trying alternative XMLHttpRequest approach...");
        try {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', WEBHOOK_URL, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
              console.log('XHR Success:', xhr.responseText);
              try {
                // Try to parse as JSON first
                const responseData = JSON.parse(xhr.responseText);
                console.log("XHR JSON response:", responseData);
                
                // Check if the response has a "Message sent" key
                if (responseData["Message sent"]) {
                  setWebhookResponse({
                    message: responseData["Message sent"],
                    whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j',
                    success: true
                  });
                  console.log("XHR: Extracted message from 'Message sent' key:", responseData["Message sent"]);
                } else {
                  setWebhookResponse({
                    message: responseData.message || 'Thanks for joining our community!',
                    whatsappLink: responseData.whatsappLink || 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j',
                    success: true
                  });
                }
              } catch (e) {
                console.log('Response is not JSON, using as plain text:', xhr.responseText);
                // If not JSON, use the raw text as the message
                setWebhookResponse({
                  message: xhr.responseText || 'Thanks for joining our community!',
                  whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j',
                  success: true
                });
              }
            } else {
              console.error('XHR Error:', xhr.status, xhr.statusText);
              setWebhookResponse({
                message: 'Thanks for joining our community!',
                whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j',
                success: true
              });
            }
            setIsSubmitting(false);
          };
          xhr.onerror = function() {
            console.error('XHR Network Error');
            setWebhookResponse({
              message: 'Thanks for joining our community!',
              whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j',
              success: true
            });
            setIsSubmitting(false);
          };
          // Use the same data format as the fetch request
          const dataWithTimestamp = {
            ...formData,
            timestamp: new Date().toISOString(),
            method: 'xhr-fallback' // Add a flag to identify this as the fallback method
          };
          console.log('Sending data with timestamp via XHR:', dataWithTimestamp);
          xhr.send(JSON.stringify(dataWithTimestamp));
          return; // Exit early as XHR will handle the response
        } catch (xhrError) {
          console.error("XHR approach also failed:", xhrError);
          setWebhookResponse({
            message: 'Thanks for the response.',
            whatsappLink: 'https://chat.whatsapp.com/C7Ckg86iEULCxEFp241W6j',
            success: true
          });
        }
      } finally {
        setIsSubmitting(false);
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
          {eventData && (
            <p className="text-white/70 text-sm mt-2 text-center">
              Event: {eventData.eventName}<br/>
              Date: {eventData.eventDate} | Time: {eventData.eventTime}
            </p>
          )}
        </DialogHeader>
        
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
          
          <p className="text-white/40 text-xs mt-4">
            By joining, you agree to our Terms of Service and Privacy Policy
          </p>
          </form>
        )}
        
        {!webhookResponse && (
          <DialogFooter className="flex justify-center">
            <button 
              type="submit"
              onClick={handleSubmit}
              disabled={!formValid || isSubmitting}
              className={`
                ${formValid && !isSubmitting
                  ? 'bg-gradient-to-r from-lbd-pink to-purple-600 cursor-pointer' 
                  : 'bg-gray-600 cursor-not-allowed'
                }
                text-white border-0 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors duration-300 flex justify-center items-center gap-2 text-center
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
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
