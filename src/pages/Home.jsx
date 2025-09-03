import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const metrics = [
  { label: "Production Projects", value: 12 },
  { label: "APIs Designed", value: 8 },
  { label: "UI Components", value: 120 },
];

const rotatingWords = [
  "Performance",
  "Accessibility",
  "Scalability",
  "Developer Experience",
  "Resilience",
];

const Home = () => {
  const [counts, setCounts] = useState(metrics.map(() => 0));
  const [wordIndex, setWordIndex] = useState(0);

  // Initial metric counter (immediate on mount)
  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setCounts(metrics.map((m) => Math.floor(m.value * p)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 sm:pt-0 overflow-hidden bg-black hero-noise">
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0 hero-gradient-mask animate-pan-bg opacity-70" />
      {/* Decorative blurred orbs */}
      <div className="orb w-[38rem] h-[38rem] -top-32 -left-56 animate-float-slow" />
      <div className="orb orb-secondary w-[28rem] h-[28rem] top-1/2 -right-40 animate-float-slower" />
      {/* Halo ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[120vmin] h-[120vmin] rounded-full border border-teal-500/10 animate-rotate-slow" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-[clamp(2.35rem,8.4vw,3.6rem)] font-extrabold tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-[linear-gradient(120deg,#5eead4_0%,#38bdf8_35%,#6366f1_65%,#5eead4_100%)] bg-[length:200%_200%] animate-pan-bg drop-shadow-[0_0_8px_rgba(45,212,191,0.35)]">
          Engineering Impact Through
          <br className="hidden sm:block" /> Clean Architecture & UX
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-gray-300/90 leading-relaxed max-w-3xl mx-auto mb-8">
          I build resilient full stack applications with a focus on
          <span className="inline-flex relative w-[11ch] justify-start mx-2 h-[1.6em]">
            {rotatingWords.map((w, i) => (
              <span
                key={w + i}
                className={`absolute inset-0 flex items-center justify-start transition-opacity duration-700 ${
                  i === wordIndex ? "opacity-100" : "opacity-0"
                } text-teal-300`}
              >
                {w}
              </span>
            ))}
          </span>
          and maintainable code. Explore selected work and see how I approach
          shipping quality software.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 w-full sm:w-auto">
          <Link
            to="/projects"
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-semibold text-lg shadow-lg shadow-teal-600/30 transition focus:outline-none focus:ring-2 focus:ring-teal-400 overflow-hidden"
          >
            <span className="relative z-10">View Projects ↓</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
          </Link>
          <a
            href="/contact"
            className="px-8 py-4 rounded-xl bg-gray-800/70 backdrop-blur hover:bg-gray-700 text-gray-200 font-semibold text-lg border border-gray-700/80 hover:border-teal-400 transition focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Contact
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto w-full">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="group relative p-3 sm:p-4 rounded-lg bg-gray-800/60 border border-gray-700/60 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-teal-400/60 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.25),0_4px_30px_-6px_rgba(45,212,191,0.35)]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.18),transparent_60%)]" />
              <p className="relative text-3xl sm:text-4xl font-extrabold text-teal-400 tabular-nums tracking-tight">
                {counts[i]}+
              </p>
              <p className="relative text-[0.55rem] sm:text-xs uppercase tracking-wide text-gray-400 mt-1 leading-snug break-words">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom accent wave */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-40"
        height="160"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0d9488"
          fillOpacity="0.2"
          d="M0,224L30,197.3C60,171,120,117,180,96C240,75,300,85,360,112C420,139,480,181,540,181.3C600,181,660,139,720,138.7C780,139,840,181,900,213.3C960,245,1020,267,1080,256C1140,245,1200,203,1260,165.3C1320,128,1380,96,1410,80L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};

export default Home;
