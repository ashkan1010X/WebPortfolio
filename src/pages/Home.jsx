import React from "react";
import "../index.css"; // Ensure updated CSS is imported

const Home = () => {
  return (
    <>
      {/* Hero section */}
      <section className="hero relative h-screen bg-gradient-to-r from-gray-900 to-black flex justify-center items-center text-center px-8">
        <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
        {/* Dark overlay to enhance text visibility */}
        {/* Description Section positioned at the top-left, below navbar */}
        <div className="absolute top-24 left-8 text-white text-opacity-90"></div>
        {/* Hero Content */}
        <div className="content text-white relative z-10">
          <h1 className="text-6xl font-bold glowing-text mb-6">
            Welcome to My Portfolio
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
