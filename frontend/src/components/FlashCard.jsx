import React from "react";
import { useNavigate } from "react-router-dom";

const Flashcard = () => {
  const navigate= useNavigate();
  return (
    <section
      id="flashcard"
      className="relative h-screen w-full flex items-center justify-end bg-black text-white overflow-hidden px-10 sm:px-20"
    >
      {/* 🟢 Dotted Glow Background */}
    
      {/* 💚 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black to-black opacity-90 z-0"></div>

      {/* 💡 Green Glow */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-green-500/25 blur-[150px] rounded-full -translate-y-1/2 z-0"></div>

      {/* 🌟 Main Content (Right Side) */}
<div className="relative z-10 flex flex-col justify-between 
                items-start lg:items-end 
                text-left lg:text-right 
                space-y-8 w-full max-w-5xl">

  <h2 className="text-3xl sm:text-6xl font-extrabold leading-tight">
    Create Smart <br />
    <span className="text-green-400">Flashcards Instantly</span>
  </h2>

  <p className="text-base md:text-lg text-gray-300 max-w-2xl opacity-90 leading-relaxed">
    ✨ Upload your notes or PDFs and let AI generate clean,
    question–answer flashcards for efficient learning and revision.
  </p>

  {/* Button: Left by default, Right on lg */}
  <div className="w-full flex justify-start lg:justify-end">
    <button
      onClick={() => navigate("/flashcard")}
      className="text-nowrap text-sm md:text-lg border-2 border-white text-white px-5 sm:px-8 py-3 rounded-full bg-transparent hover:bg-white hover:text-black font-semibold transition duration-300"
    >
      Generate Flashcards
    </button>
  </div>

</div>


<div className="absolute top-10 md:left-10 h-fit">
  <img
    src="/flash.png"
    alt="Illustration"
    className="w-200 h-200 object-contain opacity-30 sm:opacity-40 xl:opacity-60 2xl:opacity-80 mask"
  />
</div>

    </section>
  );
};

export default Flashcard;

