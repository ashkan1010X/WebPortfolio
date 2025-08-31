import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { projects, allTags } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "../index.css";

const Projects = () => {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const tagScrollerRef = useRef(null);
  const [fadeL, setFadeL] = useState(false);
  const [fadeR, setFadeR] = useState(false);
  const modalRef = useRef(null);
  const prevFocusRef = useRef(null);

  // Horizontal scroll fade logic (mobile only)
  useEffect(() => {
    const el = tagScrollerRef.current;
    if (!el) return;
    const update = () => {
      setFadeL(el.scrollLeft > 4);
      setFadeR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [showAllTags, selectedTags]);

  // Modal focus trap + scroll lock (mobile & desktop)
  useEffect(() => {
    if (activeProject) {
      prevFocusRef.current = document.activeElement;
      document.body.style.overflow = "hidden"; // lock background scroll
      // focus first focusable inside modal after paint
      setTimeout(() => {
        const focusable = modalRef.current?.querySelector(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 10);
    } else {
      document.body.style.overflow = "";
      if (prevFocusRef.current && prevFocusRef.current.focus) {
        prevFocusRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  // Filtering + navigation helpers positioned early for modal logic
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((t) => p.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [query, selectedTags]);

  const activeIndex = activeProject
    ? filtered.findIndex((p) => p.slug === activeProject.slug)
    : -1;
  const goToIndex = (idx) => {
    if (idx < 0 || idx >= filtered.length) return;
    setActiveProject(filtered[idx]);
  };
  const goPrev = useCallback(
    () => goToIndex(activeIndex - 1),
    [activeIndex, filtered]
  );
  const goNext = useCallback(
    () => goToIndex(activeIndex + 1),
    [activeIndex, filtered]
  );

  const onKeyDownModal = useCallback(
    (e) => {
      if (e.key === "Escape") setActiveProject(null);
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [goPrev, goNext]
  );

  const toggleTag = (tag) => {
    setSelectedTags((t) =>
      t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]
    );
  };

  // (filtered & navigation already defined above)

  return (
    <section
      id="projects"
      className="min-h-screen pt-28 pb-20 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
    >
      <header className="max-w-5xl mx-auto mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-teal-400 mb-4 animate-fadeInUp">
          Selected Engineering Work
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Curated projects highlighting architectural decisions, performance
          considerations, and user-centric design. Filter by technology or
          search by keyword.
        </p>
      </header>

      <div className="max-w-5xl mx-auto mb-6 md:mb-8 flex flex-col gap-3 md:flex-row md:items-center md:gap-4 ">
        <div className="w-full md:">
          <input
            type="search"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-600/40 transition rounded-md px-4 py-3 outline-none md:text-base"
            aria-label="Search projects"
          />
        </div>
        <div className="relative md:static">
          <div
            ref={tagScrollerRef}
            className="flex gap-2 overflow-x-auto md:overflow-visible scrollbar-none flex-nowrap md:flex-wrap -mx-1 px-1 md:px-0 py-1 pr-6 md:pr-0"
            role="listbox"
            aria-label="Filter projects by tag"
          >
            {(showAllTags ? allTags : allTags.slice(0, 20)).map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] md:text-xs font-medium tracking-wide border transition whitespace-nowrap ${
                  selectedTags.includes(tag)
                    ? "bg-teal-500 text-white border-teal-400 shadow shadow-teal-600/30"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-teal-400 hover:text-teal-300"
                }`}
                aria-pressed={selectedTags.includes(tag)}
              >
                {tag}
              </button>
            ))}
            {allTags.length > 20 && (
              <button
                onClick={() => setShowAllTags((v) => !v)}
                className="flex-shrink-0 px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold tracking-wide border bg-gray-700/60 text-gray-200 hover:border-teal-400 hover:text-teal-200 transition"
                aria-expanded={showAllTags}
              >
                {showAllTags ? "Less" : `+${allTags.length - 20}`}
              </button>
            )}
          </div>
          {fadeL && (
            <span className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-gray-900 to-transparent md:hidden" />
          )}
          {fadeR && (
            <span className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-gray-900 to-transparent md:hidden" />
          )}
        </div>
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="md:hidden inline-flex items-center self-start text-[11px] uppercase tracking-wide bg-teal-600/20 text-teal-300 border border-teal-500/40 hover:bg-teal-600/30 px-3 py-1 rounded-full"
            aria-label="Clear active filters"
          >
            {selectedTags.length} filter{selectedTags.length > 1 ? "s" : ""} •
            Clear
          </button>
        )}
      </div>

      <div className="max-w-5xl mx-auto grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} onSelect={setActiveProject} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-10">
            No projects match your filters.
          </p>
        )}
      </div>

      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          onKeyDown={onKeyDownModal}
          className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-0 md:p-4"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          />
          <div
            ref={modalRef}
            className="relative w-full h-full md:h-auto md:max-h-[90vh] overflow-hidden md:overflow-visible max-w-2xl bg-gray-900 border border-gray-700 rounded-none md:rounded-xl p-6 md:p-8 shadow-2xl animate-fadeInUp flex flex-col"
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 md:top-3 md:right-3 h-9 w-9 flex items-center justify-center rounded-full bg-gray-800/80 backdrop-blur border border-gray-600 text-gray-300 hover:text-white hover:border-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              aria-label="Close details"
            >
              <span className="text-lg leading-none">✕</span>
            </button>
            <div className="overflow-y-auto md:overflow-visible pr-1 -mr-1 custom-scrollbar">
              <div className="flex items-start justify-between gap-3 pr-10 mb-2">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {activeProject.title}
                  </h3>
                  {filtered.length > 1 && (
                    <p className="mt-1 text-[11px] md:text-xs tracking-wide text-gray-400">
                      Project {activeIndex + 1} of {filtered.length}
                    </p>
                  )}
                </div>
                {filtered.length > 1 && (
                  <div className="flex items-center gap-2 -mt-1">
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={activeIndex === 0}
                      className="h-8 w-8 rounded-md border border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:border-teal-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                      aria-label="Previous project"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={activeIndex === filtered.length - 1}
                      className="h-8 w-8 rounded-md border border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:border-teal-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                      aria-label="Next project"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs md:text-sm text-teal-400 mb-4">
                {activeProject.tags.join(" • ")}
              </p>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                {activeProject.longDescription}
              </p>
              <ul className="space-y-2 mb-6 list-disc pl-5 md:pl-6 text-gray-300 text-sm md:text-base">
                {activeProject.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4 sticky bottom-0 md:static pt-2 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent md:bg-none">
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto text-center px-5 py-3 rounded-md bg-teal-600 hover:bg-teal-500 font-semibold text-white shadow-lg shadow-teal-600/30 transition"
                >
                  Live Demo ↗
                </a>
                {activeProject.repo && (
                  <a
                    href={activeProject.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto text-center px-5 py-3 rounded-md bg-gray-800 hover:bg-gray-700 font-semibold text-gray-200 border border-gray-600 transition"
                  >
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
