import React from 'react'
import MySpline from './MySpline'
import Navbar from './Navbar';

const Hero = () => {
    const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className='w-full min-h-screen'>
        <Navbar/>
        <div className='absolute ml-14 w-2/3 h-screen flex items-center justify-center pointer-events-none top-60 left-10'>
            <h1 className='text-white text-8xl drop-shadow-lg Class	Effect' >AI That Supercharges Your Study Time</h1>
        </div>
        <div className='absolute ml-14 w-1/3 h-auto flex items-center top-210 left-10 justify-between'> 
         <div className='flex items-center gap-4 text-white text-sm font-light opacity-100'>
          <div className="absolute top-0 right-100 w-[300px] h-[50px] bg-red-500 blur-[70px] rounded-full -translate-y-1/2 z-0 pointer-events-none"></div>
           <div className="absolute top-0 right-60 w-[250px] h-[50px] bg-green-500 blur-[70px] rounded-full -translate-y-1/2 z-0 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[300px] h-[50px] bg-blue-500 blur-[65px] rounded-full -translate-y-1/2 z-0 pointer-events-none"></div>
             <div className="absolute top-0 left-130 w-[300px] h-[50px] bg-purple-900 blur-[90px] rounded-full -translate-y-1/2 z-0 pointer-events-none"></div>
          <button
        onClick={() => scrollToSection("pdf-generator")}
      >
       <p>PDF GENERATOR</p> 
      </button>
      <p>\</p>
       <button
        onClick={() => scrollToSection("quiz")}
      >
       <p>AI POWERED QUIZ</p> 
      </button>
      <p>\</p>
       <button
        onClick={() => scrollToSection("notes-summarizer")}
      >
       <p>NOTES SUMMARIZER</p> 
      </button>
      <p>\</p>
       <button
        onClick={() => scrollToSection("flashcard")}
      >
       <p>FLASH CARDS</p> 
      </button>
         </div>
      <div className='absolute w-3/4 h-auto flex items-center pointer-events-auto bottom-5 left-312 justify-center flex-col gap-6'> 
      <h6 className='pointer-events-none'>Designing Smarter Study Journeys with the Power of AI</h6>
      <div className='flex gap-8 mr-17'>
         <button className="border-2 border-white text-white px-8 py-3 rounded-full bg-transparent hover:bg-white hover:text-black transition duration-100">Explore</button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full bg-transparent hover:bg-white hover:text-black transition duration-100">Get Started</button>
      </div>
        </div>
        </div>
        <MySpline/>
    </div>
  )
}

export default Hero