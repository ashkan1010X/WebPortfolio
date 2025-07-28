import React from "react";
import "../index.css"; // Ensure updated CSS is imported

const Projects = () => {
  const projectList = [
    {
      title: "Project 1",
      description: "Hey",
      link: "https://nestwebsite.onrender.com/",
    },
    { title: "Project 2", description: "Hey", link: "" },
    { title: "Project 3", description: "Hey", link: "" },
    { title: "Project 4", description: "Hey", link: "" },
  ];

  return (
    <div id="projects" className="p-8 bg-gray-900 text-white">
      <h2 className="text-center text-4xl font-bold text-teal-500 mb-8">
        My Projects
      </h2>

      {/* Using CSS Grid for the projects layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center cursor-pointer">
        {projectList.map((proj, idx) => (
          <div
            key={idx}
            className="project-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-110 hover:glow transition-all duration-300"
          >
            <h3 className="text-xl font-semibold">{proj.title}</h3>
            <p className="mt-2 text-gray-400">{proj.description}</p>
            <a href={proj.link} target="_blank" rel="noopener noreferrer">
              <button className="mt-4 p-3 bg-teal-500 text-white rounded-md hover:bg-teal-400 transition-all duration-300">
                View Project
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
