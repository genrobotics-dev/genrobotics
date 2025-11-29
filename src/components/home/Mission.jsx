"use client";
import Image from "next/image";
import React from "react";

const Mission = () => {
  return (
    <section className="relative xl:absolute xl:bottom-[12rem] 2xl:bottom-[16rem] left-0 w-full z-20 lg:mt-0">
      <div className="section w-full flex flex-col xl:flex-row items-center gap-8">
        {/* Text content */}
        <div className="space-y-6 xl:w-[40%] lg:space-y-4 2xl:space-y-8">
          <h2 className="font-anton text-center xl:text-left text-[#FCD901]">
            Our Mission{" "}
            <span className="block text-white">
              Pioneering Robotics for a Safer World
            </span>
          </h2>

          {/* Divider line */}
          <div className="w-[90%] mx-auto md:mx-0 h-px bg-[linear-gradient(90deg,#fcd90100,#fcda01d1_50%,#fcd90100)] lg:hidden"></div>
          <div className="hidden w-[90%] mx-auto md:mx-0 h-px bg-[linear-gradient(90deg,#fcda01d1_50%,#fcd90100)] lg:block"></div>

          <h5 className="text-sm md:text-base text-white text-justify font-thin">
            Genrobotics is driven by a singular vision—leveraging Robotics & AI
            to replace human exposure to dangerous, high-risk, and physically
            demanding environments while enhancing quality of life. What began
            as a mission to serve humanity has evolved into a diversified
            robotics enterprise at the forefront of global innovation.
            From sanitation and healthcare to oil & gas, space, and defense, our
            solutions address some of the world’s most critical challenges.
            Whether it’s cleaning hazardous confined spaces, developing Physical
            Medicine and Rehabilitation (PMR) to restore independence in healthcare,
            advancing humanoid research, or building next-generation systems for
            space and defense, every innovation we create is guided by one
            principle:
            Technology must exist to protect, empower, and transform human life.
          </h5>
        </div>
        {/* Image */}
        <div className="w-full xl:w-[60%] 2xl:w-[60%] shrink-0">
          <div className="relative w-full aspect-[1383/778]">
            <Image
              src="/home/worldmap.webp"
              alt="world-map"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
