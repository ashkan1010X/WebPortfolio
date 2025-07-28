import "../index.css";

const Home = () => {
  return (
    <>
      <section className="hero relative h-screen bg-gradient-to-r from-gray-900 to-black flex justify-center items-center text-center px-8">
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Hero Content including description */}
        <div className="content text-white relative z-10 max-w-xl px-4 mx-auto">
          <div className="mb-8 text-red-300 text-opacity-90 font-medium leading-relaxed text-center">
            <p>
              Crafting modern, scalable web solutions with clean code and
              creative design. Passionate about turning ideas into seamless
              digital experiences.
            </p>
          </div>

          <h1 className="text-6xl font-bold glowing-text mb-6">
            Welcome to the Code
          </h1>

          <p className="mt-4 text-xl text-opacity-80">
            Explore my projects, skills, and passion for web development.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
