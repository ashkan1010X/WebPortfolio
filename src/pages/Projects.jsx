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

const VISIBLE_TAGS = 10;

const Projects = () => {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const modalRef = useRef(null);
  const prevFocusRef = useRef(null);

  // Modal focus trap + scroll lock
  useEffect(() => {
    if (activeProject) {
      prevFocusRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        const focusable = modalRef.current?.querySelector(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        focusable?.focus();
      }, 10);
    } else {
      document.body.style.overflow = "";
      prevFocusRef.current?.focus?.();
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

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
  const goPrev = useCallback(() => goToIndex(activeIndex - 1), [activeIndex, filtered]);
  const goNext = useCallback(() => goToIndex(activeIndex + 1), [activeIndex, filtered]);

  const onKeyDownModal = useCallback((e) => {
    if (e.key === "Escape") setActiveProject(null);
    if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    if (e.key === "Tab" && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }, [goPrev, goNext]);

  const toggleTag = (tag) => {
    setSelectedTags((t) =>
      t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag],
    );
  };

  const visibleTags = showAllTags ? allTags : allTags.slice(0, VISIBLE_TAGS);
  const hasMoreTags = allTags.length > VISIBLE_TAGS;

  return (
    <section
      id="projects"
      className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
    >
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-400 mb-4">
          Selected Engineering Work
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Curated projects highlighting architectural decisions, performance
          considerations, and user-centric design.
        </p>
      </header>

      {/* Search + Filter — stacked, full width */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col gap-4">
        {/* Search bar — full width */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-800/60 border border-gray-700/60 focus:border-teal-500 focus:ring-2 focus:ring-teal-600/30 transition rounded-lg pl-9 pr-4 py-3 outline-none text-sm md:text-base placeholder:text-gray-500"
            aria-label="Search projects"
          />
        </div>

        {/* Tag filters — below search */}
        <div className="flex flex-col gap-2">
          <div
            className="flex flex-wrap gap-2"
            role="listbox"
            aria-label="Filter projects by tag"
          >
            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-[11px] md:text-xs font-medium tracking-wide border transition whitespace-nowrap ${
                  selectedTags.includes(tag)
                    ? "bg-teal-500 text-white border-teal-400 shadow shadow-teal-600/30"
                    : "bg-gray-800/60 border-gray-700/60 text-gray-400 hover:border-teal-400/60 hover:text-teal-300"
                }`}
                aria-pressed={selectedTags.includes(tag)}
              >
                {tag}
              </button>
            ))}
            {hasMoreTags && (
              <button
                onClick={() => setShowAllTags((v) => !v)}
                className="px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold tracking-wide border bg-gray-700/40 text-gray-300 hover:border-teal-400/60 hover:text-teal-300 transition"
                aria-expanded={showAllTags}
              >
                {showAllTags ? "Show less" : `+${allTags.length - VISIBLE_TAGS} more`}
              </button>
            )}
          </div>

          {/* Active filters summary + clear */}
          {selectedTags.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-500">
                Filtering by {selectedTags.length} tag{selectedTags.length > 1 ? "s" : ""}
              </span>
              <button
                onClick={() => setSelectedTags([])}
                className="text-[11px] text-teal-400 hover:text-teal-300 underline underline-offset-2 transition"
                aria-label="Clear all filters"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project grid */}
      <div className="max-w-5xl mx-auto grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            onSelect={setActiveProject}
            featured={i === 0}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-sm">No projects match your filters.</p>
            <button
              onClick={() => { setQuery(""); setSelectedTags([]); }}
              className="mt-3 text-teal-400 hover:text-teal-300 text-sm underline underline-offset-2 transition"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
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
            className="relative w-full h-full md:h-auto md:max-h-[90vh] overflow-hidden md:overflow-visible max-w-2xl bg-gray-900 border border-gray-700/60 rounded-none md:rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/60 flex flex-col"
          >
            {/* Close */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full bg-gray-800/80 backdrop-blur border border-gray-600 text-gray-300 hover:text-white hover:border-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition"
              aria-label="Close details"
            >
              <span className="text-lg leading-none">✕</span>
            </button>

            <div className="overflow-y-auto pr-1 -mr-1">
              {/* Title + nav */}
              <div className="flex items-start justify-between gap-3 pr-10 mb-2">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {activeProject.title}
                  </h3>
                  {filtered.length > 1 && (
                    <p className="mt-1 text-[11px] tracking-wide text-gray-500">
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
                      className="h-8 w-8 rounded-md border border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:border-teal-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition"
                      aria-label="Previous project"
                    >←</button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={activeIndex === filtered.length - 1}
                      className="h-8 w-8 rounded-md border border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:border-teal-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition"
                      aria-label="Next project"
                    >→</button>
                  </div>
                )}
              </div>

              <p className="text-xs text-teal-400 mb-4 font-medium">
                {activeProject.tags.slice(0, 6).join(" · ")}
              </p>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                {activeProject.longDescription}
              </p>
              <ul className="space-y-2 mb-6 list-disc pl-5 text-gray-300 text-sm md:text-base">
                {activeProject.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              {/* CTA links */}
              <div className="flex flex-col md:flex-row gap-3 sticky bottom-0 md:static pt-2 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent md:bg-none">
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto text-center px-5 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 font-semibold text-white shadow-lg shadow-teal-600/25 transition"
                  >
                    Live Demo ↗
                  </a>
                )}
                {activeProject.repo && (
                  <a
                    href={activeProject.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto text-center px-5 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 font-semibold text-gray-200 border border-gray-600 hover:border-gray-500 transition"
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
