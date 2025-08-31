import React from "react";

const ProjectCard = ({ project, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className="group text-left w-full bg-gray-800 dark:bg-gray-700 p-5 md:p-6 rounded-xl md:rounded-lg shadow-lg hover:shadow-2xl transform md:hover:-translate-y-1 active:scale-[.985] transition-all duration-300 border border-gray-700/40 hover:border-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 touch-manipulation"
      aria-label={`Open details for ${project.title}`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-teal-400">
          {project.title}
        </h3>
        <span className="text-[11px] md:text-xs px-2 py-1 bg-teal-600/20 text-teal-300 rounded-full">
          {project.stackShort}
        </span>
      </div>
      <p className="mt-3 text-gray-400 text-[15px] md:text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[11px] md:text-[10px] uppercase tracking-wide bg-gray-700/60 text-gray-300 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
};

export default ProjectCard;
