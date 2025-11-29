"use client";

import React, { useState, useEffect } from "react";

const Intro = () => {
  const [showIndicator, setShowIndicator] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Hide indicator after a small scroll
      if (scrollY > 50 && showIndicator) setShowIndicator(false);

      // Fade-out effect
      const fadeEnd = 400;
      const newOpacity = Math.max(1 - scrollY / fadeEnd, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showIndicator]);

  return (
    <div
      className="fixed inset-0 w-full h-screen flex flex-col justify-center items-center bg-black overflow-hidden z-10 pointer-events-none"
      style={{ opacity }}
    >
      {/* Text content */}
      <div className="relative z-20 max-w-3xl px-6 text-center pointer-events-auto">
        <h1 className="font-anton text-white text-5xl md:text-7xl">
          Case <span className="text-[#FCD901]">Studies</span>
        </h1>
        <h4 className="text-white text-justify md:text-center mt-4 text-base md:text-lg">
          Discover how our robotic solutions are making a tangible impact in
          cities and industries worldwide.
        </h4>
      </div>

      {/* Scroll Down Indicator */}
      {showIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-auto">
          <span className="text-[#FCD901]/50 text-3xl animate-bounce">
            &#8595;
          </span>
          <span className="text-[#FCD901]/50 text-sm">Scroll Down</span>
        </div>
      )}
    </div>
  );
};

export default Intro;

