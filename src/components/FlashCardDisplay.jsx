import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function FlashcardDisplay() {
  const location = useLocation();
  const Navigate = useNavigate();

  const userTopic = location.state?.flashcards?.topic || "General";

  const flashcards =
    location.state?.flashcards?.flashcards?.length > 0
      ? location.state.flashcards.flashcards
      : [
          { title: "Dummy Card 1", description: "This is a dummy description." },
          { title: "Dummy Card 2", description: "Another dummy description." },
        ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prev) =>
      prev === 0 ? flashcards.length - 1 : prev - 1
    );
  };

  const currentCard = flashcards[currentIndex];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#001a0f] via-[#002b1a] to-[#003322] text-white px-6 relative">
      <h1 className="text-4xl w-full h-15 md:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-lime-300 to-emerald-300 animate-shimmer">
        Flashcards: {userTopic}
      </h1>
      <button
  onClick={() => Navigate(-1)}
  className="fixed top-40 left-6 px-5 py-2 rounded-full border-2 border-green-400 text-green-400 bg-[#002015]/70 hover:bg-green-400 hover:text-black transition flex items-center gap-2 shadow-md hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
>
  ← Back
</button>


      {/* Card container */}
      <div
  className="relative w-full max-w-3xl h-96 md:h-[500px] cursor-pointer perspective"
  onClick={() => setFlipped(!flipped)}
>
  <Motion.div
    animate={{ rotateY: flipped ? 180 : 0 }}
    transition={{ duration: 0.8 }}
    className="relative w-full h-full"
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Front */}
    <div className="absolute w-full h-full bg-[#002015]/90 border border-green-400/20 rounded-3xl flex items-center justify-center p-10 md:p-16 backface-hidden">
      <p className="text-2xl md:text-4xl font-bold text-center">
        {currentCard.title}
      </p>
    </div>

    {/* Back */}
    <div className="absolute w-full h-full bg-[#002015]/90 border border-green-400/30 rounded-3xl flex items-center justify-center p-10 md:p-16 backface-hidden rotate-y-180">
      <p className="text-lg md:text-2xl text-center">{currentCard.description}</p>
    </div>
  </Motion.div>
</div>

      {/* Navigation buttons */}
      <div className="flex justify-between w-full max-w-xl mt-6">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-6 py-2 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition"
        >
          <FaArrowLeft /> Previous
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition"
        >
          Next <FaArrowRight />
        </button>
      </div>

      {/* Glow background */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-green-800/20 blur-[180px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-emerald-700/20 blur-[180px] rounded-full -z-10 animate-pulse delay-700"></div>

      <style>
        {`
          .perspective { perspective: 1000px; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          @keyframes shimmer {
            0% { background-position: -100% 0; }
            100% { background-position: 100% 0; }
          }
          .animate-shimmer { animation: shimmer 6s linear infinite; background-size: 300% 100%; }
        `}
      </style>
    </section>
  );
}
