"use client";
import Image from "next/image";
import React from "react";

const images = [
  "/about/products/product1.webp",
  "/about/products/product2.webp",
  "/about/products/product3.webp",
  "/about/products/product4.webp",
  "/about/products/product5.webp",
  "/about/products/product6.webp",
  "/about/products/product7.webp",
  "/about/products/product8.webp",
  "/about/products/product9.webp",
  "/about/products/product10.webp",
  "/about/products/product11.webp",
  "/about/products/product12.webp",
  "/about/products/product13.webp",
  "/about/products/product14.webp",
  "/about/products/product15.webp",
];

const ApplyingRobotics = () => {
  const half = Math.ceil(images.length / 2);
  const firstRow = images.slice(0, half);
  const secondRow = images.slice(half);

  return (
    <section className="bg-black">
      {/* Text */}
      <div className="flex flex-col md:flex-row gap-8 section md:py-32">
        <div className="md:flex-5">
          <h2 className="font-anton text-[#FCD901] text-2xl md:text-4xl">
            Applying Robotics
          </h2>
          <h2 className="font-anton text-white text-xl md:text-3xl mt-2">
            to Elevate Humanity
          </h2>
        </div>
        <div className="md:flex-7 space-y-6">
          <h4 className="text-white text-justify leading-relaxed">
            At Genrobotics, we believe robotics and AI are not just
            technologies, but partners in human progress. Born with a mission to
            replace human exposure to dangerous, high-risk, and physically
            demanding environments, we have grown into a diversified robotics
            company shaping the future across multiple sectors.
          </h4>
          <h4 className="text-white text-justify leading-relaxed">
            Our journey began by reimagining urban sanitation — creating
            solutions that safeguard workers and restore dignity to essential
            services. From there, we expanded into medical rehabilitation,
            pioneering Physical Medicine and Rehabilitation (PMR) to help individuals regain
            independence and transform healthcare outcomes.
          </h4>
          <h4 className="text-white text-justify leading-relaxed">
            Today, our expertise extends further — from confined-space cleaning
            in oil & gas industries to cutting-edge research in humanoid
            robotics, space, and defense. Each innovation is powered by a single
            vision: to make life safer, smarter, and better for humanity.
          </h4>
          <h4 className="text-white text-justify leading-relaxed">
            By adapting our core technologies to diverse applications, we are
            not only solving today’s challenges but also engineering the next
            era of human–robot collaboration.
          </h4>
          <h4>
            Technology must exist to protect, empower, and transform human life.
          </h4>
        </div>
      </div>

      {/* Row 1 */}
      <div className="marquee pb-4">
        <div className="marquee-track">
          {[...firstRow, ...firstRow].map((src, i) => (
            <div key={`row1-${i}`} className="marquee-item">
              <div className="w-64 md:w-80 lg:w-96 xl:w-[32rem] aspect-[16/9] relative rounded-lg overflow-hidden">
                <Image
                  src={src}
                  alt={`product-${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="marquee">
        <div className="marquee-track marquee-right">
          {[...secondRow, ...secondRow].map((src, i) => (
            <div key={`row2-${i}`} className="marquee-item">
              <div className="w-64 md:w-80 lg:w-96 aspect-[16/9] xl:w-[32rem] relative rounded-lg overflow-hidden">
                <Image
                  src={src}
                  alt={`product-${half + i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplyingRobotics;
