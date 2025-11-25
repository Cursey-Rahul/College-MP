import React from "react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { useNavigate } from "react-router-dom";

const Pdfgenerator = () => {
  const navigate= useNavigate();
  return (
    <section
      id="pdf-generator"
      className="relative min-h-[90vh] w-full flex items-center justify-start bg-black text-white overflow-hidden px-10 sm:px-20"
    >
      {/* 🔴 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black opacity-95 z-0"></div>

      {/* 💡 Red Glow Effect */}
      <div className="absolute top-1/2 left-1/4 w-[900px] h-[900px] bg-red-500/30 blur-[180px] rounded-full -translate-y-1/2 z-0"></div>

      {/* 🕶️ Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.8)_100%)] z-0"></div>

      {/* 🌟 Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl w-full gap-10">
        
        {/* ✨ Left Text Section */}
        <div className="flex-1 text-left space-y-8">
          <h2 className=" text-4xl sm:text-6xl font-extrabold leading-tight">
            Generate Smart Notes <br />
            <span className="text-red-500">In Seconds</span>
          </h2>

          <p className="text-base md:text-lg text-gray-300 max-w-xl">
            Upload your PDF or enter a topic — and let AI transform it into structured,
            easy-to-study notes instantly.
          </p>

          <button onClick={()=>navigate("/pdf")} className=" text-sm md:text-lg border-2 border-white text-white px-8 py-3 rounded-full bg-transparent hover:bg-white hover:text-black font-semibold transition duration-300">
            Generate Notes
          </button>
        </div>
      </div>
       <div className="absolute top-10 right-0 xl:right-10 h-fit">
          <img src="/pdf.png" alt="PDF Illustration" className="xl:w-200 xl:h-200 w-150 h-150 object-contain opacity-20 xl:opacity-50 2xl:opacity-70 mask"/>
        </div>
    </section>
  );
};

export default Pdfgenerator;
