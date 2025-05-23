import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded project data with more details
const projects = [
  {
    title: "Neural Interface SDK",
    description: "Open-source software development kit for brain-computer interface applications with real-time data processing capabilities.",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    category: "Software",
    status: "Released",
    featured: true,
  },
  {
    title: "BrainWave Processor",
    description: "Real-time neural signal processing system for medical applications, featuring advanced filtering algorithms and pattern recognition.",
    image: "https://images.pexels.com/photos/3825578/pexels-photo-3825578.jpeg",
    category: "Hardware",
    status: "In Development",
    featured: true,
  },
  {
    title: "Thought-to-Text",
    description: "Revolutionary system for converting neural patterns into written text with up to 90% accuracy for common phrases.",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    category: "Research",
    status: "Beta",
    featured: true,
  },
  {
    title: "Neural AR Interface",
    description: "Augmented reality system controlled directly by neural signals for immersive information display.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    category: "Research",
    status: "Concept",
    featured: false,
  },
  {
    title: "BrainSync Mobile App",
    description: "Companion application for monitoring and controlling neural interface devices from your smartphone.",
    image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg",
    category: "Software",
    status: "Released",
    featured: false,
  }
];

type Category = 'All' | 'Software' | 'Hardware' | 'Research';

// Animated card component
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-lg overflow-hidden shadow-lg relative flex flex-col h-full bg-card ${
        project.featured ? 'md:col-span-2' : 'md:col-span-1'
      }`}
    >
      <div className="relative overflow-hidden group h-56 md:h-64">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
              {project.category}
            </span>
            <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
              {project.status}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 relative inline-block">
          {project.title}
          <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-primary transition-all duration-300"></span>
        </h3>
        <p className="text-muted-foreground flex-grow">{project.description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-md group inline-flex items-center gap-2 transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <span>Learn More</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.button>
      </div>
      
      {/* Spotlight effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};

// Filter button component
const FilterButton = ({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-full relative text-sm font-medium ${
        active 
          ? 'text-white' // Changed to always visible white text when active
          : 'text-foreground hover:text-foreground' // Removed muted-foreground to ensure visibility
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {active && (
        <motion.span
          layoutId="filterBackground"
          className="absolute inset-0 bg-primary rounded-full -z-10"
          // Removed opacity animations to ensure the background is always visible
          transition={{ type: "spring", bounce: 0.25 }}
        />
      )}
      {children}
    </motion.button>
  );
};

const Work = () => {
  const [filter, setFilter] = useState<Category>('All');
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  const categories: Category[] = ['All', 'Software', 'Hardware', 'Research'];
  
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Our Work</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring the boundaries of human-computer interaction through
            groundbreaking research and development.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map(category => (
            <FilterButton
              key={category}
              active={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </FilterButton>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-muted-foreground">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Work;