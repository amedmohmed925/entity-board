'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Segment {
  text: string;
  className?: string;
}

interface TypewriterProps {
  texts: string[];
  delay?: number;
  pause?: number;
  className?: string;
}

export function Typewriter({ 
  texts, 
  delay = 100, 
  pause = 2000, 
  className = "" 
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Parse markup strings into structured segments once per text change
  const segments = useMemo(() => {
    const fullText = texts[currentTextIndex];
    // Pattern: [text]{class} or everything else
    const parts = fullText.split(/(\[.*?\]\{.*?\})/);
    return parts.map(part => {
      const match = part.match(/\[(.*?)\]\{(.*?)\}/);
      if (match) {
        return { text: match[1], className: match[2] };
      }
      return { text: part, className: '' };
    }).filter(s => s.text !== '');
  }, [texts, currentTextIndex]);

  const totalChars = useMemo(() => {
    return segments.reduce((acc, s) => acc + s.text.length, 0);
  }, [segments]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (visibleChars === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        timeout = setTimeout(() => {}, 500);
      } else {
        timeout = setTimeout(() => {
          setVisibleChars(prev => prev - 1);
        }, delay / 2);
      }
    } else {
      if (visibleChars === totalChars) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      } else {
        timeout = setTimeout(() => {
          setVisibleChars(prev => prev + 1);
        }, delay);
      }
    }

    return () => clearTimeout(timeout);
  }, [visibleChars, isDeleting, totalChars, texts.length, delay, pause]);

  // Helper to get rendered segments based on visibleChars
  const renderedSegments = useMemo(() => {
    let count = 0;
    return segments.map((s, idx) => {
      const remainingChars = Math.max(0, visibleChars - count);
      const textToShow = s.text.slice(0, remainingChars);
      count += s.text.length;
      return { ...s, text: textToShow };
    }).filter(s => s.text !== '');
  }, [segments, visibleChars]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="flex flex-wrap items-center">
        {renderedSegments.map((s, i) => (
          <span key={i} className={s.className || ""}>
            {s.text}
          </span>
        ))}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[3px] h-[1.2em] bg-purple-600 ml-1 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.8)]"
      />
    </div>
  );
}
