"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ 
  value, 
  duration = 2000, 
  decimals = 0,
  prefix = "",
  suffix = ""
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out exponential function for a smooth finish
      const easeAmount = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      const currentVal = value * easeAmount;
      
      setCount(currentVal);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(value); // ensure we hit the exact target
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  // Format the number depending on if it has decimals
  const formattedValue = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}
