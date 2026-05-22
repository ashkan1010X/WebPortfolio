import React from "react";

const ProjectCard = ({ project, onSelect, featured = false }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className={`group text-left w-full rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 touch-manipulation relative overflow-hidden
        ${featured
          ? "bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 border border-teal-500/40 hover:border-teal-400/70 shadow-[0_0_0_1px_rgba(45,212,191,0.15),0_8px_32px_-4px_rgba(45,212,191,0.2)] hover:shadow-[0_0_0_1px_rgba(45,212,191,0.35),0_12px_40px_-4px_rgba(45,212,191,0.3)] p-6 md:p-7"
          : "bg-gray-800/50 border border-gray-700/50 hover:border-teal-400/50 shadow-sm hover:shadow-[0_0_0_1px_rgba(45,212,191,0.2),0_4px_20px_-4px_rgba(45,212,191,0.15)] p-5 md:p-6"
        }`}
      aria-label={`Open details for ${project.title}`}
    >
      {/* Featured glow accent */}
      {featured && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(45,212,191,0.07),transparent_60%)] pointer-events-none" />
      )}

      <div className="relative">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-teal-300 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                Featured
              </span>
            )}
            <h3 className={`font-bold text-white group-hover:text-teal-300 transition-colors duration-200 leading-tight
              ${featured ? "text-xl md:text-2xl" : "text-lg md:text-xl"}`}>
              {project.title}
            </h3>
          </div>
          <span className={`flex-shrink-0 text-[10px] md:text-xs px-2.5 py-1 rounded-full border font-semibold whitespace-nowrap transition-colors duration-200
            ${featured
              ? "bg-teal-500/15 text-teal-300 border-teal-500/40 group-hover:bg-teal-500/25"
              : "bg-gray-700/60 text-teal-400 border-gray-600/60 group-hover:border-teal-500/40"
            }`}>
            {project.stackShort}
          </span>
        </div>

        {/* Description */}
        <p className={`text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-200 mb-4
          ${featured ? "text-sm md:text-base line-clamp-3" : "text-[13px] md:text-sm line-clamp-3"}`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, featured ? 5 : 4).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wide bg-gray-700/50 text-teal-400/80 px-2 py-0.5 rounded border border-gray-600/40 transition-colors duration-200 group-hover:border-teal-500/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: links + view details */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/40 group-hover:border-teal-500/20 transition-colors duration-200">
          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-teal-300 transition-colors duration-150 font-medium"
                aria-label={`Live demo for ${project.title}`}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-teal-300 transition-colors duration-150 font-medium"
                aria-label={`Source code for ${project.title}`}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Code
              </a>
            )}
          </div>
          <span className="text-[10px] text-gray-500 group-hover:text-teal-400/60 transition-colors duration-200 font-medium tracking-wide">
            View details →
          </span>
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;
