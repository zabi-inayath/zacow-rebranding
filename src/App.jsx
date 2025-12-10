import React, { useState } from "react";
import Balatro from "./Balatro";
import { motion, AnimatePresence } from "framer-motion";

// --- Content Definitions ---

// Define image paths for the toggle button
const IMAGE_MIRROR = "/mirror.png";
const IMAGE_CUSTOM = "/mirror2.png"; // Ensure this image exists in your public folder!

const state1 = {
  key: "state1",
  balatroProps: {
    color1: "#AE1919",
    color3: "#FF9407",
    color2: "#F3F4F5",
    opacity: 0.7,
    spinSpeed: 7.0,
  },
  title: (
    <>
      We're rebranding.
      <br />a new Zacow is on the way
    </>
  ),
  contactText: "for queries contact us through",
  contactLink: "info@zacow.com",
  toggleImage: IMAGE_MIRROR,
  // ADD FONT CLASS FOR STATE 1 (Poppins)
  titleFontClass: "font-fk-grotesk",
};

const state2 = {
  key: "state2",
  balatroProps: {
    color3: "#08FFD6", // Custom Green
    color2: "#169ACA", // Lighter Blue
    color1: "#123B95",
    pixelFilter: 900,
    opacity: 0.8,
    spinSpeed: 10.0, // Different speed for second state
  },
  title: (
    <>
      We’ll Be Back Soon.
      <br />
      Thank you for your patience.
    </>
  ),
  contactText: "for queries contact us through",
  contactLink: "support@zacow.com",
  toggleImage: IMAGE_CUSTOM,
  // ADD FONT CLASS FOR STATE 2 (DM Sans)
  titleFontClass: "font-ppeditorialold",
};

// --- App Component ---

function App() {
  const [isDefaultState, setIsDefaultState] = useState(true);
  const currentContent = isDefaultState ? state1 : state2;

  const toggleState = () => {
    setIsDefaultState((prev) => !prev);
  };

  return (
    // Main container (Using essential Tailwind for layout/layering)
    <div
      className="
        w-screen h-screen relative overflow-hidden flex justify-center items-center
        font-grotesk
      "
    >
      {/* --- BACKGROUND (Balatro & Dark Overlay) --- */}
      <AnimatePresence initial={false}>
        {/* Balatro Component Container */}
        <motion.div
          key={currentContent.key + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Balatro
            isRotate={false}
            mouseInteraction={true}
            pixelFilter={currentContent.balatroProps.pixelFilter || 700}
            color1={currentContent.balatroProps.color1}
            color2={currentContent.balatroProps.color2}
            color3={currentContent.balatroProps.color3}
            opacity={currentContent.balatroProps.opacity}
            spinSpeed={currentContent.balatroProps.spinSpeed || 7.0}
          />
        </motion.div>

        {/* Framer Motion Overlay */}
        <motion.div
          key={currentContent.key + "-overlay"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-5 bg-gradient-to-br from-black/70 to-black/40"
        />
      </AnimatePresence>

      {/* --- TEXT CONTENT (Layer 3: z-10) --- */}
      <div
        // CONVERTED INLINE STYLES TO TAILWIND CLASSES
        className="
          text-white z-10 max-w-[1000px] p-5 mt-[5vh]
          md:ml-[-20vw] flex flex-col items-start
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentContent.key + "-text"}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main large text - DYNAMIC FONT CLASS APPLIED HERE */}
            <h1
              className={`
                ${currentContent.titleFontClass} mb-10
                text-5xl md:text-[4rem] font-medium leading-tight
              `}
            >
              {currentContent.title}
            </h1>

            {/* Contact details - CONVERTED INLINE STYLES */}
            <p
              className="
                font-fk-grotesk
                text-2xl font-normal mb-2
              "
            >
              {currentContent.contactText}
            </p>

            <a
              href={`mailto:${currentContent.contactLink}`}
              className="
                text-xl font-semibold text-[#ffc107] underline cursor-pointer
              "
            >
              {currentContent.contactLink}
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Toggle Image - SRC IS CONDITIONAL & CLICK HANDLER */}
        <img
          className="w-12 h-12 absolute top-10 md:top-auto right-10 md:bottom-10 md:right-10 cursor-pointer"
          src={currentContent.toggleImage}
          alt="Toggle View"
          onClick={toggleState}
        />
      </div>
    </div>
  );
}

export default App;
