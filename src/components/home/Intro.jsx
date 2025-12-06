import Image from "next/image";
import Link from "next/link";
import coverMobile from "../../../public/home/cover-mobile.webp";
import coverMd from "../../../public/home/cover-md.webp";
import coverLg from "../../../public/home/cover-lg.webp";

const Intro = () => {
  return (
    <section className="relative w-full min-h-screen lg:min-h-[100dvh]">
      <Image
        src={coverMobile}
        alt="Intro background"
        width={1920}
        height={1080}
        className="w-full h-dvh object-cover z-10 md:hidden"
        loading="lazy"
        decoding="async"
      />
      <Image
        src={coverMd}
        alt="Intro background"
        width={1920}
        height={1080}
        className="w-full h-auto object-cover z-10 hidden md:block lg:hidden"
        loading="lazy"
        decoding="async"
      />
      <Image
        src={coverLg}
        alt="Intro background"
        width={1920}
        height={1080}
        className="w-full h-auto object-cover z-10 hidden lg:block"
        loading="lazy"
        decoding="async"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center px-4 text-center mx-auto space-y-4 mt-24 md:mt-36 lg:mt-40 xl:mt-48 2xl:mt-64 max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl lg:space-y-8 min-h-dvh">
        <h1 className="font-anton text-white ">
          An Extension of{" "}
          <span className="text-[#FCD901]">Human Potential</span>
        </h1>

        <h4 className="text-white font-thin text-sm md:text-base lg:text-lg 2xl:text-xl md:leading-relaxed text-justify">
          We are shaping a future where robotics and AI seamlessly extend human capabilities. Through relentless innovation in Humanoid Robotics, assistive mobility, automation, and intelligent systems, Genrobotics is building more than machines — we are engineering a new era where technology protects lives, amplifies potential, and redefines possibilities.
        </h4>

        <Link
          href="#verticals"
          className="inline-block px-6 py-2 text-black font-medium bg-[#FCD901] rounded-lg hover:bg-yellow-400 transition-colors text-sm md:text-base lg:text-lg"
        >
          Explore Our Verticals
        </Link>
      </div>
    </section>
  );
};

export default Intro;
