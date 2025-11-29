import Image from "next/image";
import React from "react";

const Founders = () => {
  return (
    <section className="section md:py-4 bg-black">
      <div className="relative w-full 2xl:max-w-[1600px] 2xl:mx-auto">
        <Image
          src="/home/founders.webp"
          alt="Intro background"
          width={1789}
          height={2527}
          className="w-full h-auto rounded-2xl"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-between xl:py-24 bg-gradient-to-b from-0% from-black/25 via-15% via-black/0  to-black/25">
          <h2 className="font-anton text-[#FCD901] mt-6 md:mt-16 lg:mt-24 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center">
            Meet Our Founders
          </h2>
          <div className="container p-2 md:p-0">
            {/* Row stays intact even on mobile */}
            <div className="flex justify-center divide-x divide-[#FCD901] text-center">
              {[
                { name: "Nikhil N P", role: "Co-founder" },
                { name: "Vimal Govind M K", role: "Co-founder & CEO" },
                { name: "Rashid K", role: "Co-founder" },
                { name: "Arun George", role: "Co-founder" },
              ].map((f, i) => (
                <div key={i} className="px-2 md:px-6 lg:px-8 flex flex-col">
                  <p className="text-[#FCD901] text-xs sm:text-sm md:text-xl lg:text-3xl xl:text-4xl font-semibold truncate">
                    {f.name}
                  </p>
                  <p className="text-white text-[10px] sm:text-xs md:text-base font-light">
                    {f.role}
                  </p>
                </div>
              ))}
            </div>
            <h4 className="hidden md:block md:mx-16 xl:mx-32 2xl:mx-60 my-2 md:my-10 text-white/70 text-justify max-w-7xl 2xl:max-w-[1400px] mx-auto xl:leading-relaxed">
              Genrobotics is led by visionary leaders who are dedicated to using
              robotics for positive change. Our team of engineers, researchers,
              and experts combines technical skills with a strong commitment to
              innovation. With a forward-thinking approach, we work to create
              solutions that bring meaningful and lasting improvements to
              industries around the world.
            </h4>
            <h6 className="md:hidden text-white/70 text-justify">
              Genrobotics is led by visionary leaders who are dedicated to using
              robotics for positive change. Our team of engineers, researchers,
              and experts combines technical skills with a strong commitment to
              innovation. With a forward-thinking approach, we work to create
              solutions that bring meaningful and lasting improvements to
              industries around the world.
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founders;
