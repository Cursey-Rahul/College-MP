import React, { useEffect, useState } from "react";
import { FaBookOpen, FaClone, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FlashcardsPage = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    let flashcardData;

    try {
      const res = await fetch("http://localhost:5000/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();

      // API returned flashcards? Use them; else dummy fallback
      flashcardData = data.flashcards?.length > 0
        ? { topic, flashcards: data.flashcards }
        : {
            topic,
            flashcards: [
              { title: `Dummy Card 1 for ${topic}`, description: "Dummy description" },
              { title: `Dummy Card 2 for ${topic}`, description: "Another dummy description" },
            ],
          };

      showToast(`📗 Flashcards ready for "${topic}"`, "success");
    } catch (err) {
      flashcardData = {
        topic,
        flashcards: [
          { title: `Dummy Card 1 for ${topic}`, description: "Dummy description" },
          { title: `Dummy Card 2 for ${topic}`, description: "Another dummy description" },
        ],
      };
      showToast("⚠️ Server offline → Using dummy flashcards", "warning");
    }

    setLoading(false);
    navigate("/flashcards/display", { state: { flashcards: flashcardData } });
    setTopic("");
  };

  return (
    <section className="h-screen bg-gradient-to-br from-[#001a0f] via-[#002b1a] to-[#003322] text-white flex flex-col items-center justify-center px-6 md:px-16 pt-28 relative overflow-hidden">
      <div id="toast-container" className="absolute bottom-10 right-10 z-50 space-y-2"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#0f0f0f_1px,transparent_0)] bg-[size:22px_22px] opacity-10"></div>
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-green-800/20 blur-[180px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-emerald-700/20 blur-[180px] rounded-full -z-10 animate-pulse delay-700"></div>
      <div className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-lime-500/10 blur-[160px] rounded-full -z-10"></div>

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
        className="relative bg-gradient-to-br from-[#002015]/80 to-[#001a12]/60 p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] flex flex-col items-center gap-6 w-full max-w-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,197,94,0.2)]"
      >
        <div className="flex items-center w-full gap-3 bg-[#001f14]/70 border border-gray-700 rounded-xl px-5 py-4 focus-within:border-green-500 transition-all duration-300 shadow-inner hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]">
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
          className={`relative flex items-center justify-center gap-2 border-2 px-10 py-3 rounded-full text-lg font-semibold overflow-hidden transition duration-300 ${
            loading
              ? "border-gray-600 text-gray-400 cursor-not-allowed"
              : "border-white text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          }`}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-green-600 via-lime-600 to-emerald-500 opacity-0 hover:opacity-20 blur-xl transition duration-500"></span>
          {loading ? (
            <span>Generating...</span>
          ) : (
            <>
              <FaLeaf className="text-xl text-green-400 animate-pulse" />
              Generate Flashcards
            </>
          )}
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
