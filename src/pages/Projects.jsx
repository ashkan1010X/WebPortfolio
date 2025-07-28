import "../index.css";

const Projects = () => {
  const projectList = [
    {
      title: "BooknGo",
      description:
        "A fullstack Airbnb-inspired app that makes booking and managing stays simple, fast, and hassle-free.",
      link: "https://bookngo.onrender.com//",
    },
    {
      title: "DataDish",
      description:
        "A powerful Recipe API delivering fresh, curated culinary data to fuel your next delicious creation.",
      link: "https://cooking-api-lyart.vercel.app/",
    },
    {
      title: "TaskTrack",
      description:
        "A sleek and intuitive to-do app designed to help you organize tasks and boost your productivity effortlessly.",
      link: "https://to-do-list-five-jade.vercel.app/",
    },
    {
      title: "YouTube Replica",
      description:
        "A detailed YouTube front-end clone demonstrating advanced CSS, Flexbox, and responsive design techniques.",
      link: "https://ashkan1010x.github.io/replicaYoutube/",
    },
  ];

  return (
    <div id="projects" className="p-8 bg-gray-900 text-white">
      <h2 className="text-center text-4xl font-bold text-teal-500 mb-8">
        My Projects
      </h2>

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
