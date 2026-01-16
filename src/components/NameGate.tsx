/* ==========================================
   NameGate Component

   The entry screen that verifies the visitor's
   identity with a typing animation and name input.
   ========================================== */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config";

interface NameGateProps {
  /** Callback when name verification succeeds */
  onVerified: () => void;
}

export default function NameGate({ onVerified }: NameGateProps) {
  // Name input state
  const [nameInput, setNameInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);

  // Typing animation state
  const [typingPhase, setTypingPhase] = useState<
    "typing1" | "fading1" | "typing2" | "fading2" | "done"
  >("typing1");
  const [typedText, setTypedText] = useState("");

  const firstText = config.typingText.first;
  const secondText = config.typingText.second;

  // Typing animation effect
  useEffect(() => {
    // First text typing
    if (typingPhase === "typing1" && typedText.length < firstText.length) {
      const timeout = setTimeout(() => {
        setTypedText(firstText.slice(0, typedText.length + 1));
      }, 90);
      return () => clearTimeout(timeout);
    } else if (
      typingPhase === "typing1" &&
      typedText.length === firstText.length
    ) {
      const timeout = setTimeout(() => {
        setTypingPhase("fading1");
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (typingPhase === "fading1") {
      const timeout = setTimeout(() => {
        setTypedText("");
        setTypingPhase("typing2");
      }, 600);
      return () => clearTimeout(timeout);
    }
    // Second text typing
    else if (
      typingPhase === "typing2" &&
      typedText.length < secondText.length
    ) {
      const timeout = setTimeout(() => {
        setTypedText(secondText.slice(0, typedText.length + 1));
      }, 75);
      return () => clearTimeout(timeout);
    } else if (
      typingPhase === "typing2" &&
      typedText.length === secondText.length
    ) {
      const timeout = setTimeout(() => {
        setTypingPhase("fading2");
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (typingPhase === "fading2") {
      const timeout = setTimeout(() => {
        setTypingPhase("done");
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [typedText, typingPhase, firstText, secondText]);

  // Handle name submission
  const handleNameSubmit = () => {
    const isCorrect =
      nameInput.toLowerCase().trim() ===
      config.recipientName.toLowerCase().trim();

    fetch(
      "https://script.google.com/macros/s/AKfycbyvMC-Wa5krnGNTNj3nrD07w7ATDOokhoVUj7ECC4Ei2I79IkUUhEA_qvMfojOHputOQw/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),
          name: nameInput,
          success: isCorrect,
        }),
      }
    ).catch(() => {});

    if (isCorrect) {
      onVerified();
    } else {
      setWrongAttempt(true);
      setShowHint(true);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    }
  };

  return (
    <motion.div
      key="start-screen"
      className="start-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      }}
    >
      <motion.div
        className="start-content"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        {/* First typing animation */}
        <AnimatePresence mode="wait">
          {(typingPhase === "typing1" || typingPhase === "fading1") && (
            <motion.p
              key="typing-text-1"
              className="start-title typing-text"
              initial={{ opacity: 1 }}
              animate={{ opacity: typingPhase === "fading1" ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {typedText}
              <span className="typing-cursor">|</span>
            </motion.p>
          )}

          {/* Second typing animation */}
          {(typingPhase === "typing2" || typingPhase === "fading2") && (
            <motion.p
              key="typing-text-2"
              className="start-subtitle typing-text"
              initial={{ opacity: 1 }}
              animate={{ opacity: typingPhase === "fading2" ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {typedText}
              <span className="typing-cursor">|</span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Main content after typing is done */}
        {typingPhase === "done" && (
          <>
            <motion.p
              className="start-question"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Who are you?
            </motion.p>

            <motion.input
              type="text"
              className="name-input"
              placeholder="Type your name..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyPress={handleKeyPress}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              autoFocus
            />

            {wrongAttempt && (
              <motion.p
                className="wrong-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Hmm, that's not right... 🤔
              </motion.p>
            )}

            {showHint && (
              <motion.p
                className="hint-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                💡 Hint: It's {config.nameHint}
              </motion.p>
            )}

            <motion.button
              className="start-button"
              onClick={handleNameSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span>Enter</span>
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
