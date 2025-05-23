import { useEffect, useState, useRef } from 'react';
import { motion,  useScroll, useTransform } from 'framer-motion';

// 3D Text hover effect component
const AnimatedText = ({ text }: { text: string }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.01
      }
    }
  };
  
  const child = {
    hidden: { opacity: 0, y: 20, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        type: "spring", 
        damping: 10, 
        stiffness: 100 
      }
    }
  };
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex overflow-hidden text-4xl md:text-6xl font-bold mb-6"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ textShadow: '0 1px 0 rgba(0,0,0,0.1)' }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Moving gradient background
const MovingGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 opacity-50">
      <div className="absolute inset-0">
        <div className="absolute -inset-[100%] animate-[spin_20s_linear_infinite] bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <MovingGradient />
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(
              circle ${Math.min(400, window.innerWidth / 2)}px at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(var(--primary-rgb), 0.1),
              transparent
            )`,
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            style={{ opacity, scale }}
            className="text-center"
          >
            <AnimatedText text="The Future of" />
            <motion.div
              className="text-primary mb-6 text-4xl md:text-6xl font-bold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 2 
              }}
            >
              Brain-Computer Interface
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Pioneering revolutionary technology that seamlessly connects human cognition
              with digital interfaces, transforming the way we interact with technology.
            </motion.p>
            
            <motion.div
              className="inline-flex rounded-md overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a
                href="#features"
                className="group inline-flex items-center space-x-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-primary shadow-lg relative overflow-hidden transition-all duration-300"
              >
                <span className="absolute inset-0 w-0 bg-white mix-blend-overlay group-hover:w-full transition-all duration-300 ease-out" />
                <span className="relative">Discover More</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/50 relative">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px] z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of human-computer interaction through
              our innovative solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  translateY: -5,
                  boxShadow: '0 20px 80px -20px var(--primary)'
                }}
                className="bg-card p-6 rounded-lg shadow-lg group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-primary mb-4 text-3xl relative z-10">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">{feature.title}</h3>
                <p className="text-muted-foreground relative z-10">{feature.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    title: "Neural Interface",
    description: "Advanced brain-computer interfaces for intuitive control and communication.",
    icon: "🧠"
  },
  {
    title: "AI Integration",
    description: "Cutting-edge artificial intelligence for enhanced neural processing.",
    icon: "🤖"
  },
  {
    title: "Real-time Processing",
    description: "Ultra-low latency signal processing for immediate response.",
    icon: "⚡"
  }
];

export default Home;