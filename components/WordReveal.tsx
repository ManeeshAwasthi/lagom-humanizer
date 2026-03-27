"use client";

import { useEffect, useState } from "react";

interface WordRevealProps {
  text: string;
}

export default function WordReveal({ text }: WordRevealProps) {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!text) {
      setDisplayedWords([]);
      return;
    }

    // Reset and start new animation
    setDisplayedWords([]);
    setKey((k) => k + 1);

    const words = text.split(" ");
    const batchSize = 8; // reveal words in batches for performance
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex >= words.length) {
        clearInterval(interval);
        return;
      }
      const end = Math.min(currentIndex + batchSize, words.length);
      setDisplayedWords(words.slice(0, end));
      currentIndex = end;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  if (!text) return null;

  const words = text.split(" ");
  const paragraphs = text.split(/\n\n+/);

  return (
    <div key={key} className="word-reveal leading-relaxed text-sm text-text/90">
      {paragraphs.map((para, pIdx) => {
        const paraWords = para.split(" ");
        // Calculate offset for this paragraph's words
        const prevWords = paragraphs
          .slice(0, pIdx)
          .reduce((acc, p) => acc + p.split(" ").length + 1, 0);

        return (
          <p key={pIdx} className={pIdx > 0 ? "mt-4" : ""}>
            {paraWords.map((word, wIdx) => {
              const globalIdx = prevWords + wIdx;
              const delay = Math.min(globalIdx * 15, 2000);
              return (
                <span
                  key={`${pIdx}-${wIdx}`}
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {word}{wIdx < paraWords.length - 1 ? " " : ""}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
