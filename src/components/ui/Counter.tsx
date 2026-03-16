'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const Counter = ({ value, duration = 2, prefix = '', suffix = '', decimals = 0 }: CounterProps) => {
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) => {
    return prefix + latest.toLocaleString(undefined, { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    }) + suffix;
  });

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  return <motion.span>{displayValue}</motion.span>;
};
