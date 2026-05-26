import React, { useMemo } from "react";
import { PixelMascot } from "@/components/ui/pixel-mascot";
import { motion } from "framer-motion";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.floor(Math.random() * 100)}%`,
        top: `${Math.floor(Math.random() * 100)}%`,
        duration: 3 + Math.floor(Math.random() * 5),
        delay: Math.floor(Math.random() * 5),
      })),
    []
  );

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-16 overflow-hidden bg-grid">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-primary/40 pixel-corners"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -100], opacity: [0, 1, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 py-12 md:py-0">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 border border-secondary/30 bg-secondary/10 pixel-corners">
              <div className="w-2 h-2 bg-secondary animate-pulse pixel-corners" />
              <span className="text-[10px] sm:text-xs text-secondary font-pixel tracking-widest">SYSTEM ONLINE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-pixel mb-5 leading-tight text-glow uppercase">
              Your Amoo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Wingman
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 relative">
              Smart, Fast, Always by Your Side.
              <br />
              A modern AI companion designed to help you think, create, and get things done.
              <span className="inline-block w-2 h-5 ml-1 bg-primary align-middle animate-blink" />
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo("analyze")}
                className="px-6 py-4 bg-primary text-primary-foreground font-pixel text-sm uppercase tracking-wider pixel-corners box-glow hover:bg-primary/90 transition-colors"
              >
                Start Now &gt;
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo("features")}
                className="px-6 py-4 bg-transparent border-2 border-secondary text-secondary font-pixel text-sm uppercase tracking-wider pixel-corners hover:bg-secondary/10 transition-colors"
              >
                See Features
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Mascot */}
        <div className="flex-1 flex justify-center md:justify-end order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <PixelMascot className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => scrollTo("features")}
      >
        <span className="text-[10px] text-muted-foreground font-pixel tracking-widest">SCROLL</span>
        <div className="w-4 h-6 border-2 border-muted-foreground pixel-corners flex justify-center p-1">
          <div className="w-1 h-1 bg-primary pixel-corners" />
        </div>
      </motion.div>
    </section>
  );
}
