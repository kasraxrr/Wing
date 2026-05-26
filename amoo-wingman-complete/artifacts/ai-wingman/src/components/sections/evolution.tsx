import React from "react";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "v1.0",
    title: "Core Initialization",
    desc: "Basic conversational protocols established. Learning algorithms activated.",
    badges: ["Speed", "Reliability"]
  },
  {
    year: "v2.5",
    title: "Contextual Memory",
    desc: "Long-term context retention achieved. Personalization matrix online.",
    badges: ["Memory", "Creativity"]
  },
  {
    year: "v4.0",
    title: "Autonomous Tasks",
    desc: "Agentic capabilities unlocked. Can execute multi-step workflows.",
    badges: ["Security", "Autonomy"]
  }
];

export function Evolution() {
  return (
    <section id="evolution" className="py-24 relative overflow-hidden bg-card/30 border-y border-primary/20">
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-2xl md:text-4xl font-pixel mb-4 text-glow-secondary">EVOLUTION_TIMELINE</h2>
          <div className="h-1 w-24 bg-secondary pixel-corners box-glow-secondary" />
        </div>

        <div className="relative border-l-4 border-muted ml-4 md:ml-8 space-y-12">
          {milestones.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Node */}
              <div className="absolute -left-[14px] top-1 w-6 h-6 bg-background border-4 border-secondary pixel-corners box-glow-secondary flex items-center justify-center">
                <div className="w-1 h-1 bg-secondary pixel-corners animate-pulse" />
              </div>

              <div className="bg-background border-2 border-border p-6 pixel-corners hover:border-secondary/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <span className="text-secondary font-pixel text-sm px-2 py-1 bg-secondary/10 border border-secondary/30 pixel-corners">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-pixel uppercase tracking-wide">{item.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 font-sans text-lg">
                  {item.desc}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {item.badges.map((badge, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 border border-muted-foreground/30 px-3 py-1.5 pixel-corners bg-muted/20">
                      <div className="w-1.5 h-1.5 bg-primary pixel-corners" />
                      <span className="text-xs font-pixel text-foreground/80 tracking-widest">{badge}</span>
                      {/* Fake loading bar inside badge */}
                      <div className="w-8 h-1 bg-muted pixel-corners ml-2 overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary"
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${60 + Math.random() * 40}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
