import Image from "next/image";
import React from "react";

const Wings = () => {
  return (
    <section className="section md:pb-24 2xl:pb-36 space-y-8 py-12 bg-black">
      <div className="w-fit mx-auto md:space-y-4">
        <h2 className="font-anton text-white text-2xl md:text-3xl text-center mt-12">
          Our <span className="text-[#FCD901]">Specialized Wings</span>
        </h2>
        <h4 className="text-white text-xl text-justify md:text-center">
          We channel our expertise through specialized divisions, each dedicated to a <span className="inline md:block">critical sector where technology can make a profound impact.</span>
        </h4>
      </div>
      <div className="relative w-32 h-32 md:w-60 md:h-60 2xl:w-96 2xl:h-96 mb-0 md:mb-4 mx-auto">
        <Image src="/about/gen-main-logo.svg" alt="main logo" fill />
      </div>
      <div className="flex gap-8 xl:gap-16 mt-8">
        <div className="relative w-32 aspect-square 2xl:w-72 2xl: mx-auto">
          <Image src="/about/gen-sanitation-logo.webp" alt="sanitation logo" fill />
        </div>
        <div className="relative w-36 aspect-square 2xl:w-72 2xl: mx-auto">
          <Image src="/about/gen-medical-logo.webp" alt="medical logo" fill />
        </div>
        <div className="relative w-36 aspect-square 2xl:w-72 2xl: mx-auto">
          <Image src="/about/oil-gas-logo.webp" alt="oil and gas logo" fill />
        </div>
        <div className="relative w-48 aspect-[705/512] 2xl:w-72 2xl: mx-auto">
          <Image src="/about/gen-defence-logo.webp" alt="defence logo" fill />
        </div>
      </div>
    </section>
  );
};

export default Wings;
