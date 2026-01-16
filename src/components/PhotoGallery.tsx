/* ==========================================
   PhotoGallery Component - Polaroid Gallery

   A reusable 3x3 polaroid photo grid.
   Can be used for both solo and couple photos.
   ========================================== */

import { motion } from "framer-motion";
import styles from "./PhotoGallery.module.css";

interface PhotoGalleryProps {
  /** Section title displayed above the gallery */
  title: string;
  /** Array of photo URLs to display */
  photos: string[];
  /** Button text for the continue action */
  buttonText: string;
  /** Callback when user clicks "Continue" button */
  onNextSection: () => void;
}

/** Rotation angles for polaroid effect */
const ROTATIONS = [-3, 2, -2, 3, -1, 2, -3, 2, -2];

export default function PhotoGallery({
  title,
  photos,
  buttonText,
  onNextSection,
}: PhotoGalleryProps) {
  return (
    <section className={styles.gallery}>
      {/* Decorative Side Borders */}
      <div className={styles.sideBorderLeft}>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>♡</span>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>❤</span>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>♡</span>
        <span className={styles.borderDot} />
      </div>
      <div className={styles.sideBorderRight}>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>♡</span>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>❤</span>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>♡</span>
        <span className={styles.borderDot} />
      </div>

      {/* Section Header */}
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      {/* 3x3 Photo Grid */}
      <div className={styles.photoGrid}>
        {photos.map((photoUrl, index) => (
          <motion.div
            key={index}
            className={styles.photoFrame}
            style={{ transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)` }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 20,
              transition: { duration: 0.2 },
            }}
          >
            <div className={styles.polaroid}>
              <img
                src={photoUrl}
                alt={`Memory ${index + 1}`}
                className={styles.photo}
                draggable={false}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      <motion.button
        className={`btn-primary ${styles.continueButton}`}
        onClick={onNextSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {buttonText}
      </motion.button>
    </section>
  );
}
