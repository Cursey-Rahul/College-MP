import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import QuizPage from "./pages/QuizPage";
import PdfPage from "./pages/PdfPage";
import Contact from "./pages/Contact";
import FlashcardsPage from "./pages/FlashcardPage";


const App = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/pdf" element={<PdfPage />} />
         <Route path="/flashcard" element={<FlashcardsPage />} />
         <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
