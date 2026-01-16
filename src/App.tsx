/* ==========================================
   Birthday Surprise App

   Single page with 4 sections that transition
   one by one (not scrollable)
   ========================================== */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { config } from "./config";
import NameGate from "./components/NameGate";
import HeroSection from "./components/HeroSection";
import PhotoGallery from "./components/PhotoGallery";
import LetterSection from "./components/LetterSection";
import backgroundMusic from "./assets/music.mp3";
import "./App.css";

// Import photos from assets/solo
import s1 from "./assets/solo/s1.png";
import s2 from "./assets/solo/s2.png";
import s3 from "./assets/solo/s3.png";
import s4 from "./assets/solo/s4.png";
import s5 from "./assets/solo/s5.png";
import s6 from "./assets/solo/s6.png";
import s7 from "./assets/solo/s7.png";
import s8 from "./assets/solo/s8.png";
import s9 from "./assets/solo/s9.png";

// Import photos from assets/together (only if enabled)
// These imports are tree-shaken if togetherGallery.enabled is false
import t1 from "./assets/together/t1.png";
import t2 from "./assets/together/t2.png";
import t3 from "./assets/together/t3.png";
import t4 from "./assets/together/t4.png";
import t5 from "./assets/together/t5.png";
import t6 from "./assets/together/t6.png";
import t7 from "./assets/together/t7.png";
import t8 from "./assets/together/t8.png";
import t9 from "./assets/together/t9.png";

// Photo arrays
const SOLO_PHOTOS = [s1, s2, s3, s4, s5, s6, s7, s8, s9];
const TOGETHER_PHOTOS = config.togetherGallery.enabled
  ? [t1, t2, t3, t4, t5, t6, t7, t8, t9]
  : [];

// Calculate total sections and indices based on config
const TOTAL_SECTIONS = config.togetherGallery.enabled ? 4 : 3;
const SECTION_LETTER = config.togetherGallery.enabled ? 3 : 2;

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export default function App() {
  // Track if user has clicked start
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Track which section is currently active (0 = Hero, 1 = Solo Photos, 2 = Together Photos, 3 = Letter)
  const [currentSection, setCurrentSection] = useState(0);

  // Audio state
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Confetti effect - fires from both sides
  const runConfetti = () => {
    const end = Date.now() + 10 * 1000;
    const colors = [
      config.colors.primary,
      config.colors.medium,
      "#ffffff",
      config.colors.light,
    ];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  // Handle successful name verification
  const handleVerified = () => {
    setShowStartScreen(false);
    // Run confetti
    runConfetti();
    // Start music
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked
      });
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Navigate to next section
  const goToNextSection = () => {
    setCurrentSection((prev) => Math.min(prev + 1, TOTAL_SECTIONS - 1));
  };

  // Animation variants for section transitions
  const sectionVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <div className="app">
      {/* Background Music */}
      <audio ref={audioRef} src={backgroundMusic} loop preload="auto" />

      <AnimatePresence mode="wait">
        {/* Start Screen - Name Verification Gate */}
        {showStartScreen && <NameGate onVerified={handleVerified} />}
      </AnimatePresence>

      {/* Music Toggle Button - only show after start */}
      {!showStartScreen && (
        <button
          className="music-toggle"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}

      {/* Main Content - only show after start */}
      {!showStartScreen && (
        <AnimatePresence mode="wait">
          {currentSection === 0 && (
            <motion.div
              key="hero"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="section-wrapper"
            >
              <HeroSection onNextSection={goToNextSection} />
            </motion.div>
          )}

          {currentSection === 1 && (
            <motion.div
              key="solo-gallery"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="section-wrapper"
            >
              <PhotoGallery
                title={config.soloGalleryTitle}
                photos={SOLO_PHOTOS}
                buttonText={config.buttons.soloGallery}
                onNextSection={goToNextSection}
              />
            </motion.div>
          )}

          {config.togetherGallery.enabled && currentSection === 2 && (
            <motion.div
              key="together-gallery"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="section-wrapper"
            >
              <PhotoGallery
                title={config.togetherGallery.title}
                photos={TOGETHER_PHOTOS}
                buttonText={config.togetherGallery.buttonText}
                onNextSection={goToNextSection}
              />
            </motion.div>
          )}

          {currentSection === SECTION_LETTER && (
            <motion.div
              key="letter"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="section-wrapper"
            >
              <LetterSection />

              {/* Footer only shows on last section */}
              <footer className="footer">
                <p>{config.footerText}</p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
