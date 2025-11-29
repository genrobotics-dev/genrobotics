import Image from "next/image";
import React from "react";

const CraftingRobotics = () => {
  return (
    <section className="relative hidden md:block">
      <div className="w-full aspect-16/9 relative">
        <Image
          src="/about/crafting-robotics.webp"
          alt="crafting robotics"
          fill
        />
      </div>
      <div className="absolute inset-0 flex flex-col p-4 md:p-12 2xl:p-64 crafting-hero">
        <h2 className="font-anton text-[#FCD901] md:text-4xl lg:text-6xl 2xl:text-7xl leading-tight">
          Crafting Robotics and AI Solutions
        </h2>
        <h3 className="font-anton text-white md:text-2xl lg:text-4xl 2xl:text-5xl leading-tight mt-2">
          To Empower and Redefine Possibilities <br /> for Mankind.
        </h3>
      </div>
    </section>
  );
};

export default CraftingRobotics;
