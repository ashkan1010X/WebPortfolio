import React, { useEffect, useRef, useCallback } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techLogos = {
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "React Native": "https://reactnative.dev/img/header_logo.svg",
  "Next.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  Redux:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "Tailwind CSS":
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  GSAP: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
  "Framer Motion": "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
  Sass: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  Bootstrap:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  NestJS:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  "Express.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  MySQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  PostgreSQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Prisma:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  AWS: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
};

const skills = {
  Frontend: [
    "JavaScript",
    "TypeScript",
    "React",
    "React Native",
    "Next.js",
    "Redux",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
    "Sass",
    "Bootstrap",
  ],
  Backend: ["Node.js", "NestJS", "Express.js"],
  Database: ["MySQL", "PostgreSQL", "MongoDB", "Prisma"],
  Tools: ["Git", "Docker", "AWS"],
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      when: "beforeChildren",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, rotateX: 8, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 16 },
  },
};

// Additional Framer Motion variants for category groups & chips
const categoryVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
};

const chipListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

// Word-by-word animated text (intro & closing paragraphs)
const textContainerVariants = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 + i * 0.05 },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: "0.8em", filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const AnimatedText = ({ text, className = "", index = 0, highlights = [] }) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <p className={className}>{text}</p>;
  const words = text.split(/(\s+)/); // keep spaces
  const normalizedHighlights = highlights.map((h) => h.toLowerCase());
  return (
    <motion.p
      className={className}
      variants={textContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      aria-label={text}
    >
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        const bare = w.replace(/[^\w]/g, "").toLowerCase();
        const isHighlight = normalizedHighlights.includes(bare);
        return (
          <motion.span
            key={i}
            className={`inline-block will-change-transform ${
              isHighlight
                ? "text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-300 font-semibold drop-shadow-[0_0_6px_rgba(56,189,248,.35)]"
                : ""
            }`}
            variants={wordVariants}
            aria-hidden
          >
            {w}
          </motion.span>
        );
      })}
    </motion.p>
  );
};

const gradientBorder =
  "relative rounded-xl p-[1px] bg-gradient-to-br from-teal-500/60 via-cyan-400/40 to-indigo-500/50 shadow-[0_0_0_1px_rgba(45,212,191,0.15),0_4px_24px_-4px_rgba(45,212,191,0.35)]";

const About = () => {
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  // We'll select skill chips via class for animation to avoid fragile index refs
  const iconsRef = useRef([]);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-80px" });
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  // Scroll progress (within about section)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Parallax / subtle translate for heading on mouse move
  const handleMouseMove = useCallback((e) => {
    if (!headingRef.current) return;
    const rect = headingRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    headingRef.current.style.setProperty("--tiltX", (y * 6).toFixed(2));
    headingRef.current.style.setProperty("--tiltY", (x * -6).toFixed(2));
  }, []);

  useEffect(() => {
    if (isInView) controls.start("show");
  }, [isInView, controls]);

  useEffect(() => {
    if (!headingRef.current) return;
    if (prefersReducedMotion) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      headingRef.current.querySelectorAll("span > span"),
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        delay: 0.15,
      }
    );
    return () => tl.kill();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const chips = gsap.utils.toArray(".skill-chip");
      if (chips.length) {
        gsap.fromTo(
          chips,
          { scale: 0.85, filter: "brightness(0.6)" },
          {
            scale: 1,
            filter: "brightness(1)",
            duration: 0.65,
            stagger: 0.04,
            ease: "back.out(1.9)",
            delay: 0.25,
          }
        );
      }

      // Scroll reveal for cards & categories
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      gsap.utils.toArray(".about-reveal").forEach((el) => {
        if (isMobile) {
          // Immediately show on mobile
          gsap.set(el, { autoAlpha: 1, y: 0 });
        } else {
          gsap.fromTo(
            el,
            { autoAlpha: 1, y: 56 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Background floating orbs subtle motion
      gsap.to(".about-orb", {
        y: 40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 1.2, yoyo: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={(el) => {
        inViewRef.current = el;
        sectionRef.current = el;
      }}
      onMouseMove={handleMouseMove}
      className="relative w-full px-6 sm:px-10 pt-36 pb-40 bg-black text-gray-200 overflow-visible min-h-screen"
      style={{ perspective: "1200px" }}
    >
      {/* scroll progress bar */}
      <motion.div
        aria-hidden
        style={{
          scaleX: progressScaleX,
          opacity: progressOpacity,
          transformOrigin: "0% 50%",
        }}
        className="hidden sm:block fixed top-20 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 z-[60] pointer-events-none"
      />
      {/* background decor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="about-orb absolute -top-32 -left-40 w-[40rem] h-[40rem] rounded-full bg-teal-500/20 blur-[140px]" />
        <div className="about-orb absolute top-1/2 -right-32 w-[34rem] h-[34rem] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <header
          ref={headingRef}
          className="mb-14 will-change-transform"
          style={{
            transform: "rotateX(var(--tiltX,0deg)) rotateY(var(--tiltY,0deg))",
            transition: "transform 0.4s ease",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-10">
            <div className="flex-1">
              <h1 className="select-none text-[clamp(2.1rem,6.2vw,3.45rem)] font-extrabold tracking-tight leading-[1.1] text-white flex flex-wrap gap-x-3">
                <span className="inline-block overflow-hidden">
                  <span className="block">About</span>
                </span>
                <span className="inline-block overflow-hidden">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-400 drop-shadow-[0_0_8px_rgba(56,189,248,.35)] animate-[pulseGlow_5s_ease_infinite]">
                    Ashkan
                  </span>
                </span>
              </h1>
              <AnimatedText
                index={0}
                className="mt-6 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed text-gray-300"
                highlights={["full", "stack", "developer"]}
                text={
                  "I'm a full stack developer who designs, builds, and optimizes web products end‑to‑end. I focus on performance, accessibility, scalability, and creating resilient architectures that align user needs with business outcomes. I enjoy crafting fluid interactions and systems that remain maintainable as they grow."
                }
              />
            </div>
            <motion.figure
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mx-auto md:mx-0 w-40 sm:w-48 md:w-56 lg:w-64 shrink-0 about-reveal relative"
            >
              <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-teal-400/60 via-cyan-400/40 to-indigo-500/50 shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_8px_32px_-6px_rgba(56,189,248,0.4)]">
                <img
                  src="/profileIMG.jpg"
                  alt="Ashkan portrait"
                  loading="lazy"
                  className="rounded-[inherit] object-cover w-full h-full aspect-[3/4] saturate-[1.05] contrast-[1.02]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-teal-400/20"
                />
              </div>
              <figcaption className="sr-only">Portrait of Ashkan</figcaption>
            </motion.figure>
          </div>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 gap-10 lg:gap-14 mb-20"
        >
          <motion.div
            variants={cardVariants}
            className={`${gradientBorder} about-reveal`}
            whileHover={{ y: -4 }}
          >
            <div className="relative rounded-[inherit] p-6 sm:p-8 bg-gray-900/70 backdrop-blur-xl h-full transition-transform will-change-transform">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-300">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />{" "}
                Engineering Principles
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-gray-300/90">
                I aim for durable, observable systems: clear separation of
                concerns, defensive API boundaries, progressive enhancement, and
                iterative hardening guided by metrics—not guesses. I prioritize
                accessibility, performance budgets, strong typing, automated
                tests, and fast feedback loops (CI, lint, a11y & perf audits) so
                code remains malleable as scope scales.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className={`${gradientBorder} about-reveal`}
            whileHover={{ y: -4 }}
          >
            <div className="relative rounded-[inherit] p-6 sm:p-8 bg-gray-900/70 backdrop-blur-xl h-full transition-transform">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />{" "}
                What I Deliver
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-gray-300/90">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400">▹</span> Accessible,
                  responsive UI with motion that guides not distracts.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400">▹</span> Component
                  architecture driven by cohesion, stability & reusability.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400">▹</span> APIs & backend flows
                  optimized for clarity, performance, and observability.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400">▹</span> Tooling & DX
                  improvements (lint, metrics, a11y audits, performance
                  budgets).
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-white">Tech Stack</h2>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {Object.entries(skills).map(([category, list]) => (
              <motion.div
                key={category}
                className={`${gradientBorder} group about-reveal`}
                variants={categoryVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative rounded-[inherit] p-5 bg-gray-900/70 backdrop-blur-xl h-full flex flex-col">
                  <h3 className="text-lg font-semibold mb-4 text-teal-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400 group-hover:scale-125 transition-transform" />
                    {category}
                  </h3>
                  <motion.ul
                    className="flex flex-wrap gap-3 text-sm text-gray-300"
                    variants={chipListVariants}
                  >
                    {list.map((skill) => {
                      const isLong = skill.length > 11 || skill.includes(" ");
                      return (
                        <motion.li
                          key={skill}
                          variants={chipVariants}
                          whileHover={{ y: -2, scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                          className={`skill-chip inline-flex items-center px-3 ${
                            isLong ? "pr-4" : "pr-3"
                          } py-2 rounded-md bg-gray-800/60 border border-gray-700/50 hover:border-teal-400/60 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.25),0_4px_22px_-6px_rgba(45,212,191,0.35)] transition group/item text-[0.68rem] sm:text-xs font-medium tracking-wide gap-2 overflow-visible min-h-[2rem]`}
                        >
                          {techLogos[skill] && (
                            <img
                              src={techLogos[skill]}
                              loading="lazy"
                              alt={skill + " logo"}
                              className={`w-4 h-4 object-contain drop-shadow-sm shrink-0 ${
                                skill === "Express.js"
                                  ? "invert brightness-125"
                                  : ""
                              }`}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          )}
                          <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#5eead4,#38bdf8_50%,#6366f1)] bg-[length:200%_200%] group-hover/item:animate-pan-bg whitespace-nowrap">
                            {skill}
                          </span>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedText
              index={1}
              className="text-sm sm:text-base text-gray-400"
              text={
                "Always exploring better ways to build fast, inclusive products. Open to collaborations and challenging product problems."
              }
            />
          </div>
        </div>
        <div aria-hidden className="h-10" />
      </div>
    </section>
  );
};

export default About;
