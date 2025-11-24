import React from "react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate= useNavigate();
  return (
    <section
      id="notes-summarizer"
      className="relative h-screen w-full flex items-center justify-start bg-black text-white overflow-hidden px-10 md:px-20"
    >
      {/* 🟣 Dotted Glow Background */}
      <DottedGlowBackground />

      {/* 💜 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/10 via-black to-black opacity-90 z-0"></div>

      {/* 🌌 Purple Glow */}
      <div className="absolute top-1/2 left-1/4 w-[700px] h-[700px] bg-purple-600/25 blur-[150px] rounded-full -translate-y-1/2 z-0"></div>

      {/* 📘 Main Content (Left Side) */}
      <div className="relative z-10 flex flex-col items-start text-left space-y-8 max-w-7xl">
        <h2 className="text-6xl font-extrabold leading-tight">
          Generate <br />
          <span className="text-purple-400">Smart Notes Instantly</span>
        </h2>

        <p className="text-xl text-gray-300 max-w-3xl opacity-90 leading-relaxed">
          Transform your study materials into clear, organized notes powered by AI.  
          Review key concepts faster and make learning effortless.
        </p>

        <button onClick={()=>navigate("/notes")} className="border-2 border-white text-white px-10 py-3 rounded-full bg-transparent hover:bg-white hover:text-black font-semibold transition duration-300">
          Summarize Notes
        </button>
      </div>
      <div className=" absolute top-10 right-10 h-fit">
          <img src="/notes.png" alt="Illustration" className="w-200 h-200 object-contain opacity-90 mask"/>
        </div>
    </section>
  );
};

export default Notes;
