"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function HalloweenScrollPumpkin() {
  const reducedMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const reveal = useTransform(scrollY, [120, 360], [0, 1]);
  const entrance = useTransform(scrollY, [120, 360], [-110, 0]);
  const turn = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 10, -12]);
  const float = useTransform(scrollYProgress, [0, 0.5, 1], [18, -28, 18]);
  const batX = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <motion.div
      className="halloween-scroll"
      aria-hidden="true"
      style={{ opacity: reveal, x: reducedMotion ? 0 : entrance }}
    >
      <motion.div style={{ rotate: reducedMotion ? 0 : turn, y: reducedMotion ? 0 : float }}>
        <motion.svg className="halloween-bats" viewBox="0 0 120 45" style={{ x: reducedMotion ? 0 : batX }}>
          <path d="m4 20 9-15 5 10 9-4-2 13 10 2-12 8-8-8-11 2 4-8Z" fill="#522860" />
          <path d="m74 12 8-10 3 8 12-4-4 10 11 3-13 5-7-5-11 4 3-8Z" fill="#291535" />
        </motion.svg>
        <svg className="halloween-pumpkin" viewBox="0 0 120 110" fill="none">
          <path d="M58 28c-5-12-1-20 10-25l7 8c-10 2-12 8-10 17" fill="#749545" />
          <path d="M65 21c12-12 22-10 25-4-10 5-18 7-25 4Z" fill="#8cab4e" />
          <ellipse cx="60" cy="66" rx="49" ry="37" fill="#ed5d10" />
          <ellipse cx="40" cy="65" rx="25" ry="35" fill="#ff8528" />
          <ellipse cx="80" cy="65" rx="25" ry="35" fill="#e86514" />
          <ellipse cx="60" cy="65" rx="25" ry="38" fill="#ff9f39" />
          <path d="m32 57 17-14 4 20Zm39-14 17 14-21 6ZM55 71l6-12 6 12ZM30 75l15 7 7-6 9 9 9-9 7 6 15-7c-8 25-53 26-62 0Z" fill="#291535" />
          <path d="m35 57 13-10 2 13Zm37-10 12 10-15 3ZM37 81l8 4 7-4 9 9 9-9 7 4 8-4c-12 16-36 16-48 0Z" fill="#ffdf75" />
          <path d="M25 44c-5 8-7 14-6 22" stroke="#ffc373" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className="halloween-shadow" />
      </motion.div>
      <style jsx>{`
        :global(.halloween-scroll) {
          position: fixed;
          left: 12px;
          top: 46%;
          width: 100px;
          z-index: 30;
          pointer-events: none;
          user-select: none;
        }
        :global(.halloween-bats) { width: 100%; height: 38px; overflow: visible; }
        .halloween-pumpkin {
          display: block;
          width: 100%;
          filter: drop-shadow(0 0 12px rgba(255, 133, 40, 0.35));
        }
        .halloween-shadow {
          display: block;
          width: 70%;
          height: 8px;
          margin: 3px auto 0;
          border-radius: 50%;
          background: rgba(41, 21, 53, 0.18);
          filter: blur(4px);
        }
        @media (max-width: 767px) {
          :global(.halloween-scroll) { left: 0; top: 40%; width: 46px; }
          :global(.halloween-bats) { height: 22px; }
        }
      `}</style>
    </motion.div>
  );
}