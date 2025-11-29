import React from "react";
import { Book, FileText, ListChecks, Layers } from "lucide-react";

const BenefitCard = ({ icon: Icon, title, desc }) => (
  <div
    className="relative w-full p-8 rounded-3xl border border-white/6 
    bg-gradient-to-br from-[#071617]/70 to-[#051012]/50 backdrop-blur-md shadow-xl"
  >
    {/* floating blobs */}
    <div className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full" />
    <div className="pointer-events-none absolute -bottom-8 -left-8 w-28 h-28 bg-teal-400/10 blur-3xl rounded-full" />

    <div className="flex items-start gap-5">
      <div
        className="flex-none w-14 h-14 rounded-lg flex items-center justify-center 
        bg-gradient-to-tr from-emerald-400/20 to-green-300/10 border border-green-400/10"
      >
        <Icon className="w-7 h-7 text-emerald-300 drop-shadow" />
      </div>

      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-sm md:text-base text-teal-100/80 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

export default function WebsiteBenefits({ benefits }) {
  const defaultBenefits = benefits || [
    {
      key: "smart-flashcards",
      title: "Interactive Flashcards",
      desc: "Transform any topic into digital flashcards with instant answers, helping you learn actively and retain information longer. Perfect for spaced repetition learning.",
      icon: Layers,
    },
    {
      key: "adaptive-tests",
      title: "Adaptive Practice Tests",
      desc: "Generate MCQs tailored to your chosen topic and difficulty level. Test yourself, get instant feedback, and track progress with AI-powered scoring and explanations.",
      icon: ListChecks,
    },
    {
      key: "smart-notes",
      title: "Smart Notes & Summaries",
      desc: "Automatically create well-structured notes or summarize large PDFs, saving time and giving you concise, exam-ready material to revise efficiently.",
      icon: FileText,
    },
    {
      key: "revision-boost",
      title: "Boost Memory & Retention",
      desc: "By combining flashcards, practice tests, and summaries, you can revise smarter, remember more, and improve your learning outcomes significantly.",
      icon: Book,
    },
  ];

  const cards = benefits || defaultBenefits;

  return (
    <section
    id="tools-overview"
      className="w-full py-24 bg-gradient-to-b from-[#041017] via-[#03110f] to-[#00110f] 
      text-white relative overflow-hidden border-t border-b border-white/10"
    >
      {/* decorative green strip */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-1 bg-gradient-to-r from-transparent via-green-400/40 to-transparent opacity-60 blur-md rounded-b-full" />

      {/* background ambient glows */}
      <div className="absolute -left-20 top-12 w-80 h-80 bg-emerald-600/20 blur-[120px] rounded-full" />
      <div className="absolute right-12 bottom-10 w-96 h-96 bg-teal-500/14 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose This Website?
          </h2>
          <p className="text-teal-200/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Our platform provides interactive learning tools designed to
            maximize retention, save time, and make studying more efficient and
            enjoyable.
          </p>
        </div>

        {/* grid without animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {cards.map((b) => (
            <BenefitCard
              key={b.key}
              icon={b.icon}
              title={b.title}
              desc={b.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
