"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Single robust VerticalCarousel that scopes styles and guarantees measurable heights
// Accepts an optional `aspectRatio` prop (number or string like "16/9" or "4/3").
// When provided (and `fixedHeight` is not), the component computes the height
// from the container width using the supplied aspect ratio (width/height).
const VerticalCarousel = ({ items = [], debug = false, fixedHeight, aspectRatio }) => {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(fixedHeight || 500);

  // helper to parse aspectRatio prop into a numeric ratio (width/height)
  const parseAspectRatio = (r) => {
    if (!r && r !== 0) return null;
    if (typeof r === "number") return r > 0 ? r : null;
    if (typeof r === "string") {
      const parts = r.split("/").map((p) => p.trim());
      if (parts.length === 2) {
        const a = parseFloat(parts[0]);
        const b = parseFloat(parts[1]);
        if (!isNaN(a) && !isNaN(b) && b !== 0) return a / b;
      }
      const asNum = parseFloat(r);
      if (!isNaN(asNum) && asNum > 0) return asNum;
    }
    return null;
  };

  // measure container to ensure Next/Image has a sized parent
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      let h = Math.round(rect.height || 0);

      // if an aspectRatio is provided and fixedHeight is not, compute height from width
      const ratio = parseAspectRatio(aspectRatio);
      if (!fixedHeight && ratio) {
        const w = Math.round(rect.width || el.offsetWidth || el.clientWidth || (el.parentElement && el.parentElement.clientWidth) || window.innerWidth);
        const hFromRatio = Math.round(w / ratio);
        if (hFromRatio && hFromRatio > 0) h = hFromRatio;
      }

      // Try offsetHeight if getBoundingClientRect gives 0
      if ((!h || h < 1) && el.offsetHeight) h = el.offsetHeight;

      // Try computed style
      if ((!h || h < 1) && window.getComputedStyle) {
        const cs = window.getComputedStyle(el);
        if (cs && cs.height) {
          const parsed = parseInt(cs.height, 10);
          if (!isNaN(parsed) && parsed > 0) h = parsed;
        }
      }

      // if measured height is too small, try parent height
      if (!h || h < 50) {
        const p = el.parentElement;
        if (p) {
          const pr = p.getBoundingClientRect();
          if (pr.height && pr.height > 50) h = Math.round(pr.height);
          else if (p.offsetHeight && p.offsetHeight > 50) h = p.offsetHeight;
        }
      }

  // final fallback to a sensible default (60% of viewport or 500px)
      if (!h || h < 50) h = Math.min(Math.round(window.innerHeight * 0.6), 600) || 500;

      // final safeguard
      if (!h || h < 1) h = 200;
  // only set measured height when fixedHeight not provided
  if (!fixedHeight) setHeight(h);

      if (debug && typeof console !== "undefined") {
        console.log("VerticalCarousel.measure -> rect:", rect, "offsetHeight:", el.offsetHeight, "computedStyle:", window.getComputedStyle(el).height, "parentOffset:", el.parentElement?.offsetHeight, "finalHeight:", h);
      }
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);

    // also observe parent changes in case container gains height later
    if (el.parentElement) resizeObserver.observe(el.parentElement);

    // initial measure
    measure();

    return () => resizeObserver.disconnect();
  // Re-run measurement when fixedHeight or aspectRatio changes
  }, [fixedHeight, aspectRatio]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    centerMode: true,
    // centerPadding controls the peek area; use px so it's deterministic
    centerPadding: `${Math.round(height * 0.12)}px`,
    autoplay: true,
    autoplaySpeed: 3000,
    // placeholder for afterChange - will be overridden later to call normalize
    pauseOnHover: true,
    cssEase: "ease-in-out",
  };

  // If there are no items, render nothing (or a placeholder)
  if (!items || items.length === 0) return null;

  // Ensure slick internal elements get proper heights and alignment so slides render
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const normalize = () => {
      const list = el.querySelector(".slick-list");
      const track = el.querySelector(".slick-track");
      const slides = el.querySelectorAll(".slick-slide");

      if (list) {
        list.style.height = "100%";
        list.style.display = "block";
      }
      if (track) track.style.height = "100%";

      slides.forEach((s) => {
        s.style.display = "flex";
        s.style.justifyContent = "center";
        s.style.alignItems = "center";
        s.style.height = `${Math.round(height * 0.78)}px`;

        // normalize direct child wrappers - explicitly set px height so inline-block wrappers get a concrete height
        const slidePx = `${Math.round(height * 0.78)}px`;
        Array.from(s.children).forEach((child) => {
          if (child.tagName === "DIV") {
            // append cssText so we don't clobber other inline styles
            const prev = child.style.cssText || "";
            child.style.cssText =
              prev +
              `;display:flex !important;width:100% !important;height:${slidePx} !important;justify-content:center !important;align-items:center !important;`;
          }
        });

        const imgParent = s.querySelector(
          ".relative.w-full.h-full, .image-parent, .img-wrapper, .relative"
        );
        if (imgParent) {
          const prevImg = imgParent.style.cssText || "";
          imgParent.style.cssText =
            prevImg +
            ";height:100% !important;width:100% !important;display:block !important;position:relative !important;";
        }
      });

      // small reflow to let react-slick compute internal sizes
      window.dispatchEvent(new Event("resize"));
    };

    // run normalize immediately and after a short delay to catch async DOM changes
    normalize();
    const t = setTimeout(normalize, 50);

    // observe DOM changes inside the slider - react-slick clones and reflows after mount
    const mo = new MutationObserver(() => normalize());
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      clearTimeout(t);
      mo.disconnect();
    };
  }, [height, items]);

  return (
    <div
      ref={containerRef}
      className={`vertical-carousel relative w-full rounded-2xl overflow-hidden ${
        debug ? "debug-vertical-carousel" : ""
      }`}
      style={{
        height,
        minHeight: Math.max(200, Math.round(height * 0.6)),
        "--vr-slide-height": `${Math.round(height * 0.78)}px`,
        "--vr-gap": `16px`,
      }}
    >
  {/* Use opacity + spacing between slides instead of overlays */}

      <Slider {...settings}>
        {items.map((item, idx) => (
          // Each slide must have a measurable height so Image(fill) works
          <div
            key={idx}
            className="px-4 flex justify-center items-center"
            style={{ height: Math.round(height * 0.78) }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden ring-2 ring-primary/30">
              <Image
                src={item.src}
                alt={item.alt || `slide-${idx}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>
        ))}
      </Slider>
      {/* Scoped CSS overrides to ensure slick wrappers fill their slide and don't stay inline-block */}
      <style jsx>{`
        :global(.vertical-carousel) {
          min-height: 200px;
        }
        :global(.vertical-carousel .slick-list) {
          height: 100% !important;
        }
        :global(.vertical-carousel .slick-slide) {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        /* the extra wrapper react-slick inserts (often inline-block) */
        :global(.vertical-carousel .slick-slide > div) {
          display: flex !important;
          width: 100% !important;
          height: 100% !important;
          justify-content: center !important;
          align-items: center !important;
        }
        :global(.vertical-carousel .slick-slide img) {
          object-fit: cover !important;
        }
        /* Dim non-center slides and highlight the centered slide */
        :global(.vertical-carousel .slick-slide) {
          opacity: 0.25;
          transform: scale(0.98);
          transition: opacity 360ms ease, transform 360ms ease;
        }
        :global(.vertical-carousel .slick-center) {
          opacity: 1 !important;
          transform: scale(1) !important;
          z-index: 30;
        }

        /* Add horizontal spacing between slides by padding the inner wrapper */
        :global(.vertical-carousel .px-4) {
          padding-left: 12px !important;
          padding-right: 12px !important;
        }
        /* force immediate px-4 wrapper to use the computed slide px height minus gap and add vertical margins */
        :global(.vertical-carousel .slick-slide > div > .px-4) {
          height: calc(var(--vr-slide-height) - var(--vr-gap)) !important;
          margin-top: calc(var(--vr-gap) / 2) !important;
          margin-bottom: calc(var(--vr-gap) / 2) !important;
        }
        ${debug ? 
          `:global(.debug-vertical-carousel) { outline: 2px dashed lime; }
           :global(.debug-vertical-carousel .slick-slide) { outline: 1px dashed cyan; }
           :global(.debug-vertical-carousel .slick-slide > div) { background: rgba(255,255,0,0.03); }
          ` : ''}
      `}</style>
    </div>
  );
};

export default VerticalCarousel;
