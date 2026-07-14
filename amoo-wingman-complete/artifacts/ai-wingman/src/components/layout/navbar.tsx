import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#analyze", label: "Analyze", highlight: true },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20 scanlines"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary pixel-corners box-glow flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 bg-background pixel-corners" />
          </div>
          <Link href="/" className="font-pixel text-xs sm:text-sm md:text-base text-glow tracking-tighter whitespace-nowrap">
            AMOO_WINGMAN
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm transition-colors uppercase tracking-wider font-pixel text-xs ${
                link.highlight
                  ? "text-primary hover:text-secondary"
                  : "text-muted-foreground hover:text-secondary"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 border border-primary/30 pixel-corners"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-primary transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-primary transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-primary transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-primary/20 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left font-pixel text-xs py-2 px-3 border transition-colors pixel-corners ${
                    link.highlight
                      ? "text-primary border-primary/30 hover:bg-primary/10"
                      : "text-muted-foreground border-border hover:text-secondary hover:border-secondary/30"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
