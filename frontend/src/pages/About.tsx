import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Team member data
const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Executive Officer",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg",
    bio: "Pioneer in neurotechnology with 15+ years of research experience."
  },
  {
    name: "Michael Rodriguez",
    role: "Chief Technology Officer",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    bio: "Leading expert in brain-computer interface development."
  },
  {
    name: "Dr. Emily Williams",
    role: "Head of Research",
    image: "https://images.pexels.com/photos/3796024/pexels-photo-3796024.jpeg",
    bio: "Renowned neuroscientist specializing in neural signal processing."
  }
];

// Text spotlight component
const SpotlightText = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    setMousePosition({
      x: e.clientX - left,
      y: e.clientY - top
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden"
    >
      <div 
        className="pointer-events-none absolute -inset-px z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// 3D Tilt Card Component
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"]
  );
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full"
    >
      <div style={{ transform: "translateZ(0)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <SpotlightText>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl font-bold mb-4 relative">
              <span className="relative">
                Our Mission
                <motion.span
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At NeuroSync, we're dedicated to bridging the gap between human cognition
              and digital technology. Our mission is to develop innovative brain-computer
              interfaces that enhance human capabilities and improve lives.
            </p>
          </motion.section>
        </SpotlightText>

        {/* Team Section */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <TiltCard>
                  <div className="bg-card rounded-lg overflow-hidden shadow-lg h-full border border-border/50">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                        style={{ transform: "translateZ(20px)" }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary mb-3">{member.role}</p>
                      <p className="text-muted-foreground">{member.bio}</p>
                    </div>
                    <div className="absolute inset-0 border border-primary/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-secondary/50 rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background sparkles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
          
          <h2 className="text-3xl font-bold text-center mb-8 relative z-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <motion.div 
              className="text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-background/50 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/50"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Pushing the boundaries of what's possible in neurotechnology.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-background/50 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/50"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ethics</h3>
              <p className="text-muted-foreground">
                Maintaining the highest standards of ethical research and development.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-background/50 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <motion.div 
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                  }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/50"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Impact</h3>
              <p className="text-muted-foreground">
                Creating meaningful change in people's lives through technology.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;