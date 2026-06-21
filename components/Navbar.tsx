"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Student Work", href: "#video-testimonials" },
  { label: "Reviews", href: "#reviews" },
  { label: "Mentor", href: "#mentor" },
  { label: "Course", href: "#curriculum" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
    >
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 ${
        scrolled ? "glass-dark shadow-[0_8px_40px_rgba(0,0,0,0.7)]" : "bg-transparent border border-transparent"
      }`}>
        <div className="flex items-center justify-between px-6 py-3.5">
          {/* Logo */}
          <a href="#home" className="group">
            <p className="font-display font-semibold text-pure-white text-xl tracking-tight leading-none group-hover:opacity-80 transition-opacity">
              Vaibhav Kulkarni
            </p>
            <p className="font-inter text-[9px] tracking-[0.35em] text-taupe uppercase mt-0.5">Films</p>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="font-inter text-[13px] text-silver/70 hover:text-pure-white tracking-wide transition-colors duration-300 relative group">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-pure-white/60 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a href="#enroll"
            className="hidden md:inline-flex items-center gap-2 font-inter text-[13px] font-medium bg-pure-white text-deep-black px-5 py-2.5 rounded-xl hover:bg-silver transition-colors duration-200 hover:scale-105 active:scale-95">
            Reserve Seat
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 -mr-2 text-pure-white"
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1.5">
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-white/5 md:hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-5">
                {NAV_LINKS.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            onClick={(e) => {
                              e.preventDefault();

                              const target = document.querySelector(l.href);

                              setMenuOpen(false);

                              setTimeout(() => {
                                target?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }, 300);
                            }}
                            className="font-inter text-sm text-silver/70 hover:text-pure-white transition-colors"
                          >
                            {l.label}
                          </a>
                        ))}
                <a
                  href="#enroll"
                  onClick={(e) => {
                    e.preventDefault();

                    const target = document.querySelector("#enroll");

                    setMenuOpen(false);

                    setTimeout(() => {
                      target?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 300);
                  }}
                  className="inline-flex justify-center font-inter text-sm font-medium bg-pure-white text-deep-black px-5 py-3 rounded-xl mt-2"
                >
                  Reserve Seat
</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
