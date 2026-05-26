import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function PixelMascot({ className }: { className?: string }) {
  const mascotRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    function handleMouseMove(e: MouseEvent) {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!mascotRef.current) return;

        const rect = mascotRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);

        // Limit pupil travel so it stays inside the socket
        const radius = 2.5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const transform = `translate(${x}px, ${y}px)`;
        if (leftPupilRef.current) leftPupilRef.current.style.transform = transform;
        if (rightPupilRef.current) rightPupilRef.current.style.transform = transform;
      });
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.div
      ref={mascotRef}
      className={`relative flex items-center justify-center ${className ?? "w-48 h-48"}`}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      {/* Glow halos */}
      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
      <div className="absolute inset-4 bg-secondary/30 blur-xl rounded-full" />

      <div className="relative w-32 h-40 flex flex-col items-center z-10">
        {/* Antenna */}
        <div className="w-2 h-4 bg-secondary pixel-corners mb-1" />
        <div className="w-4 h-2 bg-primary pixel-corners mb-1 box-glow" />

        {/* Head */}
        <div className="w-24 h-20 bg-card border-4 border-primary pixel-corners box-glow flex flex-col items-center justify-center relative">
          {/* Face screen */}
          <div className="w-20 h-11 bg-background border-2 border-secondary/50 pixel-corners flex items-center justify-center gap-3">

            {/* Left eye socket — NO overflow-hidden so pupil is visible */}
            <motion.div
              className="relative w-6 h-7 bg-[#0a0a1a] border-2 border-secondary/70 pixel-corners flex items-center justify-center"
              animate={{ scaleY: [1, 0.05, 1] }}
              transition={{ repeat: Infinity, duration: 5, times: [0, 0.04, 0.14], delay: 1 }}
            >
              {/* Pupil — moved by direct DOM ref, no re-render */}
              <div
                ref={leftPupilRef}
                className="w-3 h-3 bg-secondary pixel-corners box-glow-secondary"
              />
            </motion.div>

            {/* Right eye socket */}
            <motion.div
              className="relative w-6 h-7 bg-[#0a0a1a] border-2 border-secondary/70 pixel-corners flex items-center justify-center"
              animate={{ scaleY: [1, 0.05, 1] }}
              transition={{ repeat: Infinity, duration: 5, times: [0, 0.04, 0.14], delay: 1 }}
            >
              <div
                ref={rightPupilRef}
                className="w-3 h-3 bg-secondary pixel-corners box-glow-secondary"
              />
            </motion.div>
          </div>

          {/* Cheek blush */}
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-accent/50 pixel-corners" />
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-accent/50 pixel-corners" />
        </div>

        {/* Neck */}
        <div className="w-8 h-2 bg-muted-foreground border-x-2 border-primary pixel-corners" />

        {/* Body */}
        <div className="w-20 h-16 bg-card border-4 border-primary pixel-corners box-glow relative mt-1 flex justify-center items-center">
          <div className="w-12 h-8 bg-background border-2 border-secondary/30 pixel-corners flex flex-col gap-1 p-1">
            <div className="flex gap-1">
              <motion.div
                className="w-2 h-2 bg-secondary box-glow-secondary pixel-corners"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <div className="w-2 h-2 bg-primary box-glow pixel-corners" />
            </div>
            <div className="w-full h-1 bg-secondary/30 mt-1" />
            <div className="w-full h-1 bg-secondary/30" />
          </div>
        </div>

        {/* Float shadow */}
        <motion.div
          className="w-16 h-2 bg-primary/40 blur-md rounded-full mt-4"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
