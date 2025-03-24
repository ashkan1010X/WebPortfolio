import React from "react";
import "../index.css"; // Import the global styles

const Projects = () => {
  const projectList = [
    {
      title: "FullStack AirBnB Clone",
      link: "https://nestwebsite.onrender.com",
    },
    { title: "Food API App", link: "https://food-api-woad.vercel.app" },
    {
      title: "To-Do Tracker",
      link: "https://to-do-app-gamma-swart.vercel.app",
    },
    {
      title: "Youtube Replica",
      link: "https://youtube-replica-project.vercel.app",
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-matrix-green overflow-hidden">
      <div className="matrix-rain absolute inset-0 z-0"></div>{" "}
      {/* Rain effect div */}
      <div className="z-10 w-full max-w-6xl p-8 flex flex-wrap justify-center gap-16">
        <h2
          className="text-4xl font-matrix glitch text-center mb-8 w-full"
          data-text="My Projects"
        >
          My Projects
        </h2>
        {projectList.map((proj, idx) => (
          <a
            key={idx}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card inline-block"
          >
            <h3 className="btn-matrix inline-block">{proj.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
