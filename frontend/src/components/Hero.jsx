import React from 'react'
import Navbar from './Navbar';

const Hero = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='w-full min-h-screen relative overflow-hidden'>

      {/* BACKGROUND VIDEO */}
      <video
        className="absolute top-0 left-0 w-full h-full object-contain z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/Hero.mp4" type="video/mp4" />
      </video>

      {/* NAVBAR ABOVE VIDEO */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* MAIN HEADING - untouched */}
      <div className='absolute mx-auto 2xl:ml-14 xl:w-2/3 w-fit h-screen flex items-center justify-center pointer-events-none top-60 left-10 z-10'>
        <h1 className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-8xl drop-shadow-lg Class Effect'>
          AI That Supercharges Your Study Time
        </h1>
      </div>

      {/* BUTTONS SECTION - untouched */}
      <div className='absolute mx-auto 2xl:ml-14 w-fit xl:w-1/3 h-auto flex items-center top-190 2xl:top-210 left-10 justify-between z-10'> 
        <div className='flex items-center gap-4 text-white text-xs flex-wrap md:flex-nowrap md:text-sm font-light opacity-100'>
          
          <div className="absolute top-0 right-100 w-[300px] h-[50px] bg-red-500 blur-[70px] rounded-full -translate-y-1/2 z-0 pointer-events-none"></div>
          <div className="absolute top-0 right-60 w-[250px] h-[50px] bg-green-500 blur-[70px] rounded-full -translate-y-1/2 z-0 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[300px] h-[50px] bg-blue-500 blur-[65px] rounded-full -translate-y-1/2 z-0 pointer-events-none"></div>
          <div className="absolute top-0 left-130 w-[300px] h-[50px] bg-purple-900 blur-[90px] rounded-full -translate-y-1/2 z-0 pointer-events-none"></div>

          <button onClick={() => scrollToSection("pdf-generator")}>
            <p>PDF GENERATOR</p> 
          </button>
          <p>\</p>
          <button onClick={() => scrollToSection("quiz")}>
            <p>AI POWERED QUIZ</p> 
          </button>
          <p>\</p>
          <button onClick={() => scrollToSection("notes-summarizer")}>
            <p>NOTES SUMMARIZER</p> 
          </button>
          <p>\</p>
          <button onClick={() => scrollToSection("flashcard")}>
            <p>FLASH CARDS</p> 
          </button>

        </div>

        {/* Explore / Get Started */}
        <div className='absolute w-auto hidden h-auto xl:flex items-center pointer-events-auto bottom-0 lg:left-200 xl:left-240 2xl:left-312 justify-center flex-col gap-6 z-10'> 
          <h6 className='pointer-events-none text-base 2xl:text-lg text-white font-light mb-2'>
            Designing Smarter Study Journeys with the Power of AI
          </h6>
          <div className='flex gap-8 mr-17'>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full bg-transparent hover:bg-white hover:text-black transition duration-100">Explore</button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full bg-transparent hover:bg-white hover:text-black transition duration-100">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
