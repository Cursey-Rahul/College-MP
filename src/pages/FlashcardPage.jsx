import React, { useEffect, useState } from "react";
import { FaBookOpen, FaClone, FaLeaf } from "react-icons/fa";
import { motion as Motion } from "framer-motion";

// Minimal fallback data
const localData = {
  flashcards: {
    topic: "Sample Topic",
    cards: [
      { title: "Dummy Card 1", description: "This is a dummy description." },
      { title: "Dummy Card 2", description: "Another dummy description." },
    ],
  },
};

const FlashcardsPage = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashcardsData, setFlashcardsData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const showToast = (message, type = "info") => {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} shadow-lg max-w-md w-full`;
    toast.innerHTML = `<div><span>${message}</span></div>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return showToast("⚠️ Please enter a topic first!", "warning");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      const cards = data.flashcards?.length
        ? data.flashcards
        : localData.flashcards.cards;

      setFlashcardsData({ topic, cards });
      showToast("📗 Flashcards generated!", "success");
    } catch (err) {
      console.log("Error fetching flashcards:", err);
      setFlashcardsData({ topic, cards: localData.flashcards.cards });
      showToast("⚠️ Server offline → Using dummy flashcards", "warning");
    } finally {
      setLoading(false);
      setCurrentIndex(0);
      setFlipped(false);
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcardsData.cards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prev) =>
      prev === 0 ? flashcardsData.cards.length - 1 : prev - 1
    );
  };

  // ------------------- RENDER -------------------

  // If flashcards exist → show flashcards display
  if (flashcardsData) {
    const currentCard = flashcardsData.cards[currentIndex];
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#001a0f] via-[#002b1a] to-[#003322] text-white px-6 relative">
        <div id="toast-container" className="absolute bottom-10 right-10 z-50 space-y-2"></div>
        <FaBookOpen className="absolute top-38 left-20 text-emerald-400/20 text-7xl animate-float-slow" />
      <FaLeaf className="absolute bottom-28 left-40 text-green-300/20 text-6xl animate-float" />
      <FaClone className="absolute top-48 right-32 text-lime-400/20 text-7xl rotate-12 animate-float-rev" />
        <h1 className="text-4xl h-14 mt-30 w-full md:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-lime-300 to-emerald-300 animate-shimmer">
          Flashcards: {flashcardsData.topic}
        </h1>

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
              <p className="text-2xl md:text-4xl font-bold text-center">{currentCard.title}</p>
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
            ← Previous
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition"
          >
            Next →
          </button>
        </div>

        {/* Glow backgrounds */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-green-800/20 blur-[180px] rounded-full -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-emerald-700/20 blur-[180px] rounded-full -z-10 animate-pulse delay-700"></div>

        <button
          onClick={() => setFlashcardsData(null)}
          className="mt-10 px-6 py-2 border border-green-400 rounded-full hover:bg-green-400 hover:text-black transition"
        >
          ← Back
        </button>

        <style>{`
         @keyframes float {0%{transform:translateY(0);}50%{transform:translateY(-10px);}100%{transform:translateY(0);}}
        @keyframes float-slow {0%{transform:translateY(0);}50%{transform:translateY(-6px);}100%{transform:translateY(0);}}
        @keyframes float-rev {0%{transform:translateY(0);}50%{transform:translateY(8px);}100%{transform:translateY(0);}}
        @keyframes shimmer {0%{background-position:-100% 0;}100%{background-position:100% 0;}}
        .animate-float {animation:float 5s ease-in-out infinite;}
        .animate-float-slow {animation:float-slow 7s ease-in-out infinite;}
        .animate-float-rev {animation:float-rev 6s ease-in-out infinite;}
        .animate-shimmer {animation:shimmer 6s linear infinite;}
          .perspective { perspective: 1000px; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          @keyframes shimmer { 0% { background-position:-100% 0; } 100% { background-position:100% 0; } }
          .animate-shimmer { animation: shimmer 6s linear infinite; background-size:300% 100%; }
        `}</style>
      </section>
    );
  }

  // Else → input form
  return (
    <section className="h-screen bg-gradient-to-br from-[#001a0f] via-[#002b1a] to-[#003322] text-white flex flex-col items-center justify-center px-6 md:px-16 pt-28 relative overflow-hidden">
      <div id="toast-container" className="absolute bottom-10 right-10 z-50 space-y-2"></div>

      <FaBookOpen className="absolute top-38 left-20 text-emerald-400/20 text-7xl animate-float-slow" />
      <FaLeaf className="absolute bottom-28 left-40 text-green-300/20 text-6xl animate-float" />
      <FaClone className="absolute top-48 right-32 text-lime-400/20 text-7xl rotate-12 animate-float-rev" />

      <h1 className="w-full text-6xl font-extrabold text-center mb-4 leading-snug relative bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-lime-300 to-emerald-300 animate-shimmer bg-[length:300%_100%]">
        Generate Smart Flashcards
      </h1>
      <p className="text-gray-300 text-lg text-center mb-2 max-w-2xl">
        Turn any topic into interactive question–answer flashcards instantly.
      </p>
      <p className="text-green-300/60 text-sm text-center mb-12 italic">
        Perfect for revision, learning and boosting memory.
      </p>

      <form
        onSubmit={handleSubmit}
        className="relative bg-gradient-to-br from-[#002015]/80 to-[#001a12]/60 p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] flex flex-col items-center gap-6 w-full max-w-2xl backdrop-blur-xl"
      >
        <div className="flex items-center w-full gap-3 bg-[#001f14]/70 border border-gray-700 rounded-xl px-5 py-4">
          <FaClone className="text-2xl text-green-400/80" />
          <input
            type="text"
            placeholder="Enter a topic (e.g., Photosynthesis)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-transparent outline-none w-full text-white text-lg placeholder-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 border-2 px-10 py-3 rounded-full text-lg font-semibold ${
            loading ? "border-gray-600 text-gray-400 cursor-not-allowed" : "border-white text-white hover:bg-white hover:text-black"
          }`}
        >
          <FaLeaf className="text-xl text-green-400 animate-pulse" />
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>
      </form>

      <p className="mt-16 text-sm text-gray-500 text-center tracking-wide">
        🌿 Boost your memory ― study smarter, not harder.
      </p>

      <style>{`
        @keyframes float {0%{transform:translateY(0);}50%{transform:translateY(-10px);}100%{transform:translateY(0);}}
        @keyframes float-slow {0%{transform:translateY(0);}50%{transform:translateY(-6px);}100%{transform:translateY(0);}}
        @keyframes float-rev {0%{transform:translateY(0);}50%{transform:translateY(8px);}100%{transform:translateY(0);}}
        @keyframes shimmer {0%{background-position:-100% 0;}100%{background-position:100% 0;}}
        .animate-float {animation:float 5s ease-in-out infinite;}
        .animate-float-slow {animation:float-slow 7s ease-in-out infinite;}
        .animate-float-rev {animation:float-rev 6s ease-in-out infinite;}
        .animate-shimmer {animation:shimmer 6s linear infinite;}
      `}</style>
    </section>
  );
};

export default FlashcardsPage;
