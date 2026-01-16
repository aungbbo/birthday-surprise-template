/* ==========================================
   LetterSection Component

   Displays a heartfelt message inside a letter-style
   card with typewriter animation.
   ========================================== */

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./LetterSection.module.css";
import { config } from "../config";

// Typing speed in milliseconds per character
const TYPING_SPEED = 30;

// Delay before starting typewriter effect
const START_DELAY = 500;

export default function LetterSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const fullText = config.message.join("\n");

  /**
   * Typewriter effect - types out the message character by character
   */
  useEffect(() => {
    if (!isInView) return;

    let currentIndex = 0;
    const startTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, TYPING_SPEED);

      return () => clearInterval(typingInterval);
    }, START_DELAY);

    return () => clearTimeout(startTimeout);
  }, [isInView, fullText]);

  return (
    <section ref={sectionRef} className={styles.letter}>
      {/* Section Header */}
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {config.messageTitle}
      </motion.h2>

      {/* Letter Card Container */}
      <motion.div
        className={styles.letterCard}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Decorative Corner Elements */}
        <div className={styles.cornerTopLeft} />
        <div className={styles.cornerTopRight} />
        <div className={styles.cornerBottomLeft} />
        <div className={styles.cornerBottomRight} />

        {/* Letter Content */}
        <div className={styles.letterContent}>
          <pre className={styles.messageText}>
            {displayedText}
            {!isTypingComplete && <span className={styles.cursor}>|</span>}
          </pre>
        </div>
      </motion.div>

      {/* Background Decorations */}
      <div className={styles.bgDecor1} />
      <div className={styles.bgDecor2} />
      <div className={styles.bgDecor3} />
    </section>
  );
}
