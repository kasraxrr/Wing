import React from "react";
import { motion } from "framer-motion";

const cases = [
  {
    id: "DEV_MODE",
    title: "Code Generation & Debugging",
    description: "Write code faster, spot bugs instantly, and refactor legacy systems with your AI co-pilot.",
    metrics: ["+40% Speed", "-60% Errors"]
  },
  {
    id: "WRITE_MODE",
    title: "Content Creation",
    description: "From marketing copy to technical documentation, generate high-quality text that matches your brand voice.",
    metrics: ["+200% Output", "Consistent Tone"]
  },
  {
    id: "DATA_MODE",
    title: "Data Analysis",
    description: "Turn raw spreadsheets into actionable insights. Automatically generate reports and visualize trends.",
    metrics: ["Real-time", "Accurate"]
  }
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 relative bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-pixel mb-4 text-glow">OPERATIONAL_MODES</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
            Designed for versatile deployment across different operational contexts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((useCase, idx) => (
            <motion.div 
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-card border border-primary/20 p-6 flex flex-col h-full relative overflow-hidden group pixel-corners"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
              <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-500 w-0 group-hover:w-full" />
              
              <div className="mb-4 inline-block px-3 py-1 bg-primary/10 border border-primary/30 text-primary font-pixel text-xs tracking-wider pixel-corners self-start">
                &gt; {useCase.id}
              </div>
              
              <h3 className="text-xl font-pixel mb-3 uppercase tracking-wide group-hover:text-primary transition-colors">{useCase.title}</h3>
              <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
                {useCase.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                {useCase.metrics.map((metric, mIdx) => (
                  <span key={mIdx} className="text-xs font-pixel text-secondary bg-secondary/10 px-2 py-1 pixel-corners">
                    {metric}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
