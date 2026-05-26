import React from "react";
import { motion } from "framer-motion";

const logs = [
  {
    user: "USER_8492",
    role: "Lead Developer",
    log: "Since initializing the Wingman protocol, my team's sprint velocity has doubled. The code suggestions are scarily accurate.",
    status: "VERIFIED"
  },
  {
    user: "USER_1105",
    role: "Content Strategist",
    log: "It's not just a tool, it's a thinking partner. Whenever I hit a block, a quick prompt gets the creative gears turning again.",
    status: "VERIFIED"
  },
  {
    user: "USER_7734",
    role: "Data Analyst",
    log: "The way it parses complex datasets and outputs human-readable summaries is unparalleled. System stability is top-notch.",
    status: "VERIFIED"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative bg-card/40 border-y border-border/50 overflow-hidden">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-pixel mb-4 text-glow-secondary">USER_LOGS</h2>
            <p className="text-muted-foreground max-w-2xl font-sans">
              Encrypted feedback from active operatives in the field.
            </p>
          </div>
          <div className="text-xs font-pixel text-secondary tracking-widest px-3 py-1 border border-secondary/30 bg-secondary/10 pixel-corners flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary animate-pulse pixel-corners" />
            LIVE FEED
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {logs.map((log, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-background border border-muted p-6 pixel-corners relative group hover:border-secondary/50 transition-colors"
            >
              {/* Scan effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent h-12 -translate-y-full group-hover:animate-scanline opacity-0 group-hover:opacity-100 pointer-events-none z-0" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="font-pixel text-sm text-foreground mb-1">{log.user}</div>
                    <div className="font-sans text-xs text-muted-foreground uppercase tracking-widest">{log.role}</div>
                  </div>
                  <div className="text-[10px] font-pixel text-primary border border-primary/30 px-1.5 py-0.5 bg-primary/10">
                    {log.status}
                  </div>
                </div>
                
                <div className="text-muted-foreground font-sans text-sm leading-relaxed mb-4">
                  "{log.log}"
                </div>
                
                <div className="flex items-center gap-1 mt-4">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <div key={starIdx} className="w-3 h-3 bg-secondary pixel-corners box-glow-secondary" />
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
