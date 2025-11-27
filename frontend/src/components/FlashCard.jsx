import React from "react";
import { useNavigate } from "react-router-dom";

const Flashcard = () => {
  const navigate= useNavigate();
  return (
    <section
      id="flashcard"
      className="relative min-h-screen w-full flex items-center justify-center md:justify-end bg-black text-white overflow-hidden px-6 sm:px-10 md:px-20 py-12"
    >
      {/* 🟢 Dotted Glow Background */}
    
      {/* 💚 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black to-black opacity-90 z-0"></div>

      {/* 💡 Green Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-green-500/25 blur-[120px] rounded-full -translate-y-1/2 z-0 pointer-events-none"></div>

      {/* 🌟 Main Content (Right Side / centered on mobile) */}
  <div className="relative z-10 flex flex-col justify-between 
                  items-start md:items-end 
                  text-left md:text-right 
                  space-y-6 w-full max-w-full md:max-w-5xl">

    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight break-words">
      Create Smart <br />
      <span className="text-green-400">Flashcards Instantly</span>
    </h2>

    <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-full md:max-w-2xl opacity-90 leading-relaxed break-words">
      ✨ Upload your notes or PDFs and let AI generate clean,
      question–answer flashcards for efficient learning and revision.
    </p>

    {/* Button: centered on mobile, right on md+ */}
    <div className="w-full flex justify-center md:justify-end">
      <button
        onClick={() => navigate("/flashcard")}
        className="whitespace-nowrap text-sm md:text-lg border-2 border-white text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full bg-transparent hover:bg-white hover:text-black font-semibold transition duration-300"
      >
        Generate Flashcards
      </button>
    </div>

  </div>


  {/* Illustration: responsive size and position to avoid overlapping text on small screens */}
  <div className="absolute z-0 right-4 top-4 md:left-10 md:top-10 pointer-events-none">
    <img
      src="/flash.png"
      alt="Illustration"
      className="w-24 h-24 sm:w-36 sm:h-36 md:w-56 md:h-56 object-contain opacity-30 sm:opacity-40 xl:opacity-60 2xl:opacity-80"
    />
  </div>


      </section>
  );
};

export default Flashcard;

