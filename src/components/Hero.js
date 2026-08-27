'use client';

import { useEffect, useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Slow/metered connections (Save-Data) skip the video even when
    // motion is otherwise fine — prefers-reduced-motion itself is
    // handled purely in CSS via the motion-reduce: variant below.
    const connection = navigator.connection || navigator.webkitConnection;
    const video = videoRef.current;
    if (connection?.saveData && video) {
      video.pause();
      video.style.display = 'none';
    }
  }, []);

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      {/* Fallback backdrop: shows through before the video's first frame
          paints, and stays visible whenever the video is suppressed
          (prefers-reduced-motion or Save-Data). Stands in for the
          poster frame called for in the design spec until one is
          supplied. */}
      <div
        className="absolute inset-0 bg-[linear-gradient(160deg,#1a1d22_0%,#215546_55%,#2b6e5e_100%)]"
        aria-hidden="true"
      />

      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover grayscale-70 motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient for AA text contrast over the video — heavier on
          the reading side, sheer toward the far edge. */}
      <div
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(26,29,34,0.85)_0%,rgba(26,29,34,0.68)_40%,rgba(26,29,34,0.35)_78%,rgba(26,29,34,0.5)_100%)]"
        aria-hidden="true"
      />

      <div className="container-page relative z-10 py-24">
        <div className="max-w-2xl">
          <h1 className="mm-rise text-h1 font-display font-bold text-white lg:text-h1-desktop">
            Momentum Minds — Jeden partner. Více možností.
          </h1>

          <p
            className="mm-rise mt-4 text-body-lg text-white/85 lg:text-body-lg-desktop"
            style={{ animationDelay: '80ms' }}
          >
            Recruitment marketing, podpora náboru a průmyslové služby — jeden
            spolehlivý partner pro vaše procesy.
          </p>

          <div className="mm-rise mt-8" style={{ animationDelay: '160ms' }}>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-primary-hover"
            >
              Kontaktovat
              <FiArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
