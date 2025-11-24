import React from "react";
import Hero from "../components/Hero";
import Pdfgenerator from "../components/Pdfgenerator";
import Quizz from "../components/Quizz";
import Notes from "../components/Notes";
import FlashCard from "@/components/FlashCard";
import ToolsOverview from "@/components/ToolsOverview";

const HomePage = () => {
  return (
    <>
      <Hero />
      <ToolsOverview/>
      <Pdfgenerator />
      <Quizz />
      <Notes />
      <FlashCard/>
    </>
  );
};

export default HomePage;
