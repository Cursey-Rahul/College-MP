import React from "react";
import { useNavigate } from "react-router-dom";

const Quizz = () => {
  const navigate= useNavigate();
  return (
    <section
      id="quiz"
      className="relative h-screen w-full flex items-center justify-end bg-black text-white overflow-hidden px-10 md:px-20"
    >
      {/* 🔵 Dotted Glow Background */}
    
      {/* 💙 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-black opacity-90 z-0"></div>

      {/* 💡 Blue Glow */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-blue-500/25 blur-[150px] rounded-full -translate-y-1/2 z-0"></div>

      {/* 🌟 Main Content (Right Side) */}
      <div className="relative z-10 flex flex-col items-end text-right space-y-8 max-w-5xl">
        <h2 className="text-6xl font-extrabold leading-tight">
          Test Your <br />
          <span className="text-blue-400">Knowledge & Skills</span>
        </h2>

        <p className="text-xl text-gray-300 max-w-3xl opacity-90 leading-relaxed">
          ✨ Challenge yourself with AI-powered quizzes that adapt to your level.
          Track your progress, unlock achievements, and master every concept with ease.
        </p>

        <button  onClick={() => navigate("/quiz")} className="border-2 border-white text-white px-10 py-3 rounded-full bg-transparent hover:bg-white hover:text-black font-semibold transition duration-300">
          Start Quiz
        </button>
      </div>
         <div className=" absolute top-10 left-10 h-fit">
          <img src="/quiz.png" alt="Illustration" className="w-200 h-200 object-contain opacity-90 mask"/>
        </div>
    </section>
  );
};

export default Quizz;
