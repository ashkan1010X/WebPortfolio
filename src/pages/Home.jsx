import React from "react";
import "../index.css";

const Home = () => {
  const numDrops = 100;

  const rainDrops = Array.from({ length: numDrops }, (_, index) => (
    <div
      key={index}
      className="rain-drop"
      style={{
        left: `${(index / numDrops) * 100}%`,
        animationDelay: `${Math.random() * 0.5}s`,
      }}
    />
  ));

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-matrix-green overflow-hidden">
      <div className="matrix-rain absolute inset-0 z-0">{rainDrops}</div>
      <div className="z-10 text-center space-y-4">
        <h1
          className="text-6xl font-matrix glitch"
          data-text="Welcome to The Grid"
        >
          Welcome to The Grid
        </h1>
        <p className="text-xl font-matrix">
          I'm a passionate coder on a journey to create innovative and
          functional web applications. With a strong foundation in front-end and
          back-end technologies, I strive to solve real-world problems through
          clean, efficient code. I love exploring new languages, frameworks, and
          techniques to stay at the cutting edge of web development.
        </p>
        <p className="text-lg font-matrix">
          From building responsive user interfaces with React to crafting robust
          back-end systems with Node.js, I enjoy bringing projects to life.
          Let's work together to build something amazing.
        </p>
      </div>
    </section>
  );
};

export default Home;
