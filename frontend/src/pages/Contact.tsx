import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Animated input component with floating label
const FloatingLabelInput = ({ 
  label, 
  name,
  type = "text", 
  value, 
  onChange,
  required = false,
  textarea = false
}: { 
  label: string; 
  name: string;
  type?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  textarea?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isOccupied = value.length > 0;
  
  const variants = {
    focused: { y: -24, scale: 0.85, color: 'var(--primary)' },
    occupied: { y: -24, scale: 0.85 },
    unfocused: { y: 0, scale: 1 }
  };

  const InputOrTextarea = textarea ? 'textarea' : 'input';
  
  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        className="absolute left-4 origin-left cursor-text"
        variants={variants}
        initial="unfocused"
        animate={isFocused ? 'focused' : isOccupied ? 'occupied' : 'unfocused'}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      
      <InputOrTextarea
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-background/50 backdrop-blur-sm px-4 pt-6 pb-2 border rounded-md focus:ring-2 focus:ring-primary/50 outline-none transition-all"
        required={required}
        rows={textarea ? 4 : undefined}
      />
      
      {/* Bottom border animation */}
      <div className="relative h-0.5 w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

// Floating messages animation
const FloatingMessages = () => {
  const messages = [
    "Great technology!", 
    "How can we collaborate?", 
    "Impressive work!", 
    "Looking forward to the demo", 
    "Can you help with integration?"
  ];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {messages.map((msg, i) => {
        // Create more controlled starting positions
        const startPositionX = (i % 3) * 30 + Math.random() * 40; // Distribute horizontally
        const startPositionY = Math.min(300 + i * 60, 500); // Start from bottom but within view
        
        return (
          <motion.div
            key={i}
            className="absolute text-sm px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm shadow-sm"
            initial={{ 
              opacity: 0,
              x: startPositionX, 
              y: startPositionY,
              scale: 0.8,
            }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              x: startPositionX + (Math.random() * 60 - 30),
              y: 50 + (i % 3) * 40, // Stay within the visible area
              scale: 1,
            }}
            transition={{ 
              duration: 8 + Math.random() * 4, 
              delay: i * 2,
              repeat: Infinity,
              repeatDelay: 3 + Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            {msg}
          </motion.div>
        );
      })}
    </div>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formState);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      
      // Reset submission state after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our technology or interested in collaboration?
            We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 relative"
          >
            <FloatingMessages />
            
            <div className="relative z-10 bg-card/20 backdrop-blur-sm p-8 rounded-xl border border-border/50 shadow-lg opacity-70">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Our team is here to help you with any questions about our
                technology and potential collaborations.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Location</h3>
                    <p className="text-muted-foreground">
                      123 Innovation Drive<br />
                      Silicon Valley, CA 94025<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-muted-foreground">info@neurosync.tech</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            ref={formRef}
          >
            <div className="bg-card/30 backdrop-blur-sm p-8 rounded-xl border border-border/50 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 text-primary p-4 rounded-md text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FloatingLabelInput
                    label="Name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                  
                  <FloatingLabelInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                  
                  <FloatingLabelInput
                    label="Subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                  />
                  
                  <FloatingLabelInput
                    label="Message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    textarea
                  />
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={isSubmitting ? 'opacity-0' : ''}>
                      Send Message
                    </span>
                    
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    {/* Button shine effect */}
                    <div className="absolute inset-0 -z-10">
                      <div className="absolute inset-0 translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"></div>
                    </div>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Contact;