import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Evolution } from "@/components/sections/evolution";
import { UseCases } from "@/components/sections/use-cases";
import { Testimonials } from "@/components/sections/testimonials";
import { AnalyzeChat } from "@/components/sections/analyze-chat";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-background pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary pixel-corners box-glow flex items-center justify-center">
                <div className="w-2 h-2 bg-background pixel-corners" />
              </div>
              <span className="font-pixel text-lg text-glow tracking-tighter">AMOO_WINGMAN</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Your personal digital companion for the modern web. Built with cutting-edge tech, designed with soul.
            </p>
            <div className="flex gap-4">
              {['TW', 'GH', 'DC'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 border border-primary/30 flex items-center justify-center font-pixel text-xs text-primary hover:bg-primary hover:text-primary-foreground transition-colors pixel-corners">
                  {social}
                </a>
              ))}
            </div>
          </div>
          

        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© 2025 AMOO WINGMAN. ALL RIGHTS RESERVED.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse box-glow" />
            <span className="font-pixel tracking-widest">SYSTEM_NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CTA() {
  return (
    <section className="py-32 relative bg-background overflow-hidden border-t border-primary/20">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-4 border-primary p-8 md:p-16 bg-card/80 backdrop-blur-sm pixel-corners box-glow relative"
        >
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-secondary" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-secondary" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-secondary" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-secondary" />

          <h2 className="text-3xl md:text-5xl font-pixel mb-6 text-glow uppercase">Ready to Initialize?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto font-sans">
            Join thousands of users who have already upgraded their workflow with a personal Amoo Wingman. The future is waiting.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-5 bg-secondary text-background font-pixel text-lg uppercase tracking-wider pixel-corners box-glow-secondary hover:bg-secondary/90 transition-colors w-full sm:w-auto"
          >
            ANALYZE_CHAT_NOW
          </motion.button>
          
          <div className="mt-6 text-xs text-muted-foreground font-pixel tracking-widest">
            NO CREDIT CARD REQUIRED.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground dark selection:bg-primary/30 selection:text-primary-foreground">
      <div className="scanline-overlay" />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <UseCases />
        <Evolution />
        <Testimonials />
        <AnalyzeChat />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
