import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    id: "01",
    title: "Smart Assistance",
    description: "Your AI that adapts to your workflow, anticipating your needs before you even ask.",
    icon: (
      <div className="w-10 h-10 flex grid-cols-2 grid-rows-2 gap-1">
        <div className="bg-primary pixel-corners" />
        <div className="bg-secondary pixel-corners" />
        <div className="bg-secondary pixel-corners" />
        <div className="bg-primary pixel-corners" />
      </div>
    ),
    color: "primary"
  },
  {
    id: "02",
    title: "Creative Boost",
    description: "Generate ideas, text, and solutions instantly. Break through creative blocks with ease.",
    icon: (
      <div className="w-10 h-10 flex flex-col gap-1 items-center justify-end pb-1">
        <div className="w-4 h-4 bg-accent pixel-corners box-glow animate-pulse" />
        <div className="w-2 h-4 bg-muted-foreground pixel-corners" />
      </div>
    ),
    color: "accent"
  },
  {
    id: "03",
    title: "Task Automation",
    description: "Let your Wingman handle repetitive work while you focus on the big picture.",
    icon: (
      <div className="w-10 h-10 relative">
        <div className="absolute top-1 left-1 w-6 h-6 border-2 border-secondary pixel-corners" />
        <div className="absolute bottom-1 right-1 w-6 h-6 bg-secondary/20 border-2 border-secondary pixel-corners box-glow-secondary" />
      </div>
    ),
    color: "secondary"
  },
  {
    id: "04",
    title: "Privacy-First",
    description: "Your data stays yours. End-to-end encryption ensures your companion keeps secrets.",
    icon: (
      <div className="w-10 h-10 flex flex-col items-center pt-1">
        <div className="w-6 h-4 border-t-2 border-x-2 border-primary rounded-t-lg" />
        <div className="w-8 h-6 bg-primary pixel-corners box-glow flex items-center justify-center">
          <div className="w-2 h-2 bg-background pixel-corners" />
        </div>
      </div>
    ),
    color: "primary"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function Features() {
  return (
    <section id="features" className="py-24 relative bg-background scanlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-pixel mb-4 text-glow">SYSTEM_CAPABILITIES</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Equipped with next-generation modules to augment your daily operations.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id}
              variants={itemVariants}
              className="group relative bg-card border-2 border-card-border p-6 pixel-corners transition-colors hover:border-primary/50 overflow-hidden"
            >
              {/* Hover highlight line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              
              <div className="flex items-start justify-between mb-6">
                <div className={`p-2 bg-${feature.color}/10 rounded pixel-corners`}>
                  {feature.icon}
                </div>
                <span className="text-xs font-pixel text-muted-foreground">[{feature.id}]</span>
              </div>
              
              <h3 className="text-lg font-pixel mb-3 uppercase tracking-wide">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              {/* Techy decoration */}
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1 flex-1 bg-muted/50 pixel-corners overflow-hidden">
                  <div className="h-full bg-primary/50 w-0 group-hover:animate-progress" />
                </div>
                <div className="text-[10px] font-pixel text-primary/50 group-hover:text-primary transition-colors">
                  READY
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
