"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const milestones = [
  { year: "2015", img: "/about/milestones/milestone1.webp", title: "Invention of G1 & G2" },
  { year: "2017", img: "/about/milestones/milestone2.webp", title: "Genrobotics Founded" },
  { year: "", img: "/about/milestones/milestone3.webp", title: "Seed Funding" },
  { year: "2018", img: "/about/milestones/milestone4.webp", title: "Bandicoot 1.0 Launched", subTitle: "(By the Hon'ble Chief Minister of Kerala)" },
  { year: "", img: "/about/milestones/milestone5.webp", title: "Bandicoot 2.0 Launched", subTitle: "(By the Hon'ble Prime Minister of India & UN General Secretary)" },
  { year: "2019", img: "/about/milestones/milestone6.webp", title: "AMRUT 1.0 Award", subTitle: "(Promising Innovative Solution for eliminating Manual Scavening)" },
  { year: "", img: "/about/milestones/milestone7.webp", title: "Entered into Oil and Gas Adjacent Market" },
  { year: "2020", img: "/about/milestones/milestone8.webp", title: "Pre - Series A Funding", subTitle: "(Anand Mahindra, UIV, Sea Fund)" },
  { year: "", img: "/about/milestones/milestone9.webp", title: "National Startup Award" },
  { year: "2021", img: "/about/milestones/milestone10.webp", title: "A dedicated wing for Medical & Mobility established" },
  { year: "2022", img: "/about/milestones/milestone11.webp", title: "Series A Funding" },
  { year: "", img: "/about/milestones/milestone12.webp", title: "Launch of G-Gaiter" },
  { year: "", img: "/about/milestones/milestone13.webp", title: "Ranked Top 3 AI Startup by MeitY" },
  { year: "2023", img: "/about/milestones/milestone14.webp", title: "Forbes Asia Award" },
  { year: "", img: "/about/milestones/milestone15.webp", title: "New Varients of Bandicoot’s for Differents Requirements" },
  { year: "2024", img: "/about/milestones/milestone16.webp", title: "Portfolio Expansion with Wilboar" },
  { year: "", img: "/about/milestones/milestone17.webp", title: "Pre Series B Funding" },
  { year: "", img: "/about/milestones/milestone18.webp", title: "Series B Funding" },
  { year: "2025", img: "/about/milestones/milestone19.webp", title: "Launch of G-Gaiter Paediatrics" },
];

const Journey = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [maxX, setMaxX] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  // ✅ Calculate scrollable width and viewport size
  useEffect(() => {
    const handleResize = () => {
      if (!outerRef.current || !innerRef.current) return;

      const outerWidth = outerRef.current.offsetWidth;
      const innerW = innerRef.current.scrollWidth;
      const vw = window.innerWidth;

      setInnerWidth(innerW);
      setViewportWidth(vw);

      const max = innerW - outerWidth;
      setMaxX(max > 0 ? max : 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Track scroll progress — starts only *after* component sticks to top
  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return;

      const rect = outerRef.current.getBoundingClientRect();
      const start = rect.top + window.scrollY; // when top of section hits viewport top
      const sectionHeight = outerRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Only start horizontal scroll AFTER the section sticks
      const scrollStart = start;
      const scrollEnd = start + sectionHeight - windowHeight;

      // If before sticking → no progress
      if (scrollY < scrollStart) {
        setProgress(0);
      } else if (scrollY > scrollEnd) {
        setProgress(1);
      } else {
        const p = (scrollY - scrollStart) / (scrollEnd - scrollStart);
        setProgress(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={outerRef} className="relative h-[500vh] bg-black">
      <section className="sticky top-0 h-dvh overflow-hidden text-white flex flex-col justify-around">
        {/* ✅ Heading */}
        <div className="w-full flex justify-center mt-12 md:mt-16 lg:mt-24 z-20">
          <h2 className="text-white tracking-wide text-center font-anton">
            <span className="block text-6xl md:text-7xl lg:text-9xl text-[#FCD901]">
              10+{" "}
            </span>
            Years of Remarkable Journey
          </h2>
        </div>

        {/* ✅ Timeline container */}
        <motion.div
          ref={innerRef}
          className="flex h-full items-center relative mt-24 px-[60vw]"
          animate={{ x: -progress * maxX }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          {/* ✅ Timeline line */}
          {viewportWidth > 0 && (
            <div
              className="absolute top-1/2 left-0 h-[2px]"
              style={{
                width: `${innerWidth + viewportWidth * 0.5}px`,
                marginLeft: `-${viewportWidth * 0.25}px`,
                background:
                  "linear-gradient(to right, transparent 0%, #FCD901 10%, #FCD901 90%, transparent 100%)",
              }}
            />
          )}

          {/* ✅ Milestones */}
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 w-64 md:w-72 flex flex-col items-center mx-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <div className="absolute bottom-6 flex flex-col items-center">
                <div className="relative flex flex-col items-center">
                  {milestone.year && (
                    <p className="absolute -top-6 w-full text-5xl text-center font-anton text-[#FCD901] tracking-wider">
                      {milestone.year}
                    </p>
                  )}

                  <div className="relative h-24 md:h-32 aspect-[16/9] mt-4 z-10">
                    <Image
                      src={milestone.img}
                      alt={milestone.title}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black z-10" />

              {/* Text */}
              <div className="absolute top-[60%] mt-6 flex flex-col items-center space-y-2">
                <p className="text-center text-white font-semibold text-sm md:text-base">
                  {milestone.title}
                </p>
                <p className="text-center text-gray-300 text-xs md:text-sm max-w-xs">
                  {milestone.subTitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Journey;
