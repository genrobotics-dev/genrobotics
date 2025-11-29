"use client";
import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const principlesData = [
  {
    icon: "/home/human-centric-innovation.svg",
    iconWidth: 86,
    title: "Human-Centric Innovation",
    desc: "Creating technology that enhances lives and values human dignity.",
    gradient: "bg-gradient-to-b from-[#FCD901] to-[#ffffff00]",
  },
  {
    icon: "/home/commitment-to-safety.svg",
    iconWidth: 68,
    title: "Commitment to Safety",
    desc: "Striving to make industries safer by removing humans from hazardous tasks.",
    gradient: "bg-gradient-to-t from-[#FCD901] to-[#ffffff00]",
  },
  {
    icon: "/home/handshake.svg",
    iconWidth: 102,
    title: "Integrity & Responsibility",
    desc: "Working with accountability to our clients, communities, and the environment.",
    gradient: "bg-gradient-to-b from-[#FCD901] to-[#ffffff00]",
  },
  {
    icon: "/home/collaboration.svg",
    iconWidth: 64,
    title: "Collaboration & Inclusivity",
    desc: "Building partnerships that share our commitment to societal advancement.",
    gradient: "bg-gradient-to-b from-[#FCD901] to-[#ffffff00]",
  },
  {
    icon: "/home/continuos.svg",
    iconWidth: 134,
    title: "Continuous Improvement",
    desc: "Embracing innovation to refine our solutions and adapt to new challenges.",
    gradient: "bg-gradient-to-t from-[#FCD901] to-[#ffffff00]",
  },
];

const NextArrow = ({ onClick }) => (
  <button
    className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-gray-300/70 text-black px-3 py-1 rounded-full"
    onClick={onClick}
    title="Next"
    aria-label="Next slide"
  >
    ›
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-gray-300/70 text-black px-3 py-1 rounded-full"
    onClick={onClick}
    title="Previous"
    aria-label="Previous slide"
  >
    ‹
  </button>
);

const Principles = () => {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const hasPlayedRef = useRef(false); // ensures autoplay runs only once on entry

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (sliderRef.current) {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            sliderRef.current.slickPlay(); // start autoplay once
            hasPlayedRef.current = true;
          } else if (!entry.isIntersecting) {
            sliderRef.current.slickPause(); // pause when out of view
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // controlled manually
    autoplaySpeed: 3000,
    cssEase: "linear",
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center items-center space-x-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="w-3 h-3 rounded-full bg-gray-500"></div>,
  };

  return (
    <section
      ref={sectionRef}
      className="section relative w-full xl:my-24 2xl:my-36"
      onMouseEnter={() => sliderRef.current?.slickPause()}
      onMouseLeave={() => sliderRef.current?.slickPlay()}
    >
      <div className="w-full max-w-4xl mx-auto text-center space-y-4">
        <h2 className="font-anton text-[#FCD901] text-2xl md:text-3xl lg:text-4xl">
          Our Guiding Principles{" "}
          <span className="text-white block md:inline">Our Core Values</span>
        </h2>
        <h4 className="text-white text-justify">
          Our values are the bedrock of our culture and the blueprint for our
          actions. They guide every decision we make and every technology we
          create.
        </h4>
      </div>

      {/* Mobile carousel */}
      <div className="relative lg:hidden mt-16">
        <Slider ref={sliderRef} {...settings}>
          {principlesData.map((principle, index) => (
            <div key={index} className="px-2">
              <div className="relative h-[300px] rounded-xl">
                <div
                  className={`relative h-full w-full rounded-xl p-8 flex flex-col items-center justify-between bg-black border-[0.25px] border-[#FCD901]`}
                >
                  <div className="h-20 flex items-center justify-center">
                    <Image
                      src={principle.icon}
                      alt={principle.title}
                      width={principle.iconWidth}
                      height={85}
                      className="mx-auto object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center mt-4">
                    <h3 className="text-white text-center text-lg md:text-xl lg:text-2xl font-anton">
                      {principle.title}
                    </h3>
                    <h5 className="text-[#cacaca] text-sm md:text-base lg:text-lg leading-6 font-extralight text-center mt-2">
                      {principle.desc}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <style jsx global>{`
          .slick-dots li div {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: gray;
          }
          .slick-dots li.slick-active div {
            background-color: #fcd901;
          }
        `}</style>
      </div>

      {/* Desktop grid */}
      <div className="w-full lg:flex flex-wrap justify-center gap-8 mt-12 2xl:mt-24 mx-auto hidden">
        {principlesData.map((principle, index) => (
          <div
            key={index}
            className="relative h-[380px] w-full md:w-[48%] lg:w-[30%] rounded-xl"
          >
            <div
              className={`absolute inset-0 rounded-xl p-[0.5px] hidden lg:block ${principle.gradient}`}
            >
              <div className="relative h-full w-full bg-black rounded-xl p-8 flex flex-col items-center justify-between">
                <div className="h-20 flex items-center justify-center">
                  <Image
                    src={principle.icon}
                    alt={principle.title}
                    width={principle.iconWidth}
                    height={85}
                    className="mx-auto object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col xl:mt-12">
                  <h3 className="text-white text-center text-lg md:text-xl lg:text-2xl font-anton">
                    {principle.title}
                  </h3>
                  <h5 className="text-[#cacaca] text-sm md:text-base lg:text-lg leading-6 font-extralight text-center mt-2">
                    {principle.desc}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Principles;
