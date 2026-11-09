"use client";

import { useEffect, useState, useCallback, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

const subscribePointerChange = (onStoreChange: () => void) => {
  const mql = window.matchMedia("(pointer: coarse)");
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
};

const getIsTouchDevice = () =>
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia("(pointer: coarse)").matches;

const getServerIsTouchDevice = () => false;

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextHover, setIsTextHover] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailId = useRef(0);
  const lastTrailTime = useRef(0);
  const isTouchDevice = useSyncExternalStore(
    subscribePointerChange,
    getIsTouchDevice,
    getServerIsTouchDevice,
  );

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const now = Date.now();
      if (now - lastTrailTime.current > 30) {
        lastTrailTime.current = now;
        const id = trailId.current++;
        setTrail((prev) => [...prev.slice(-8), { id, x: e.clientX, y: e.clientY }]);
      }

      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [moveCursor, isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']";
    const textSelector = "p, h1, h2, h3, h4, h5, h6, span, li, blockquote, label";

    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        setIsHovering(true);
        setIsTextHover(false);
      } else if (target.closest(textSelector)) {
        setIsTextHover(true);
        setIsHovering(false);
      }
    };
    const handleOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector) || target.closest(textSelector)) {
        setIsHovering(false);
        setIsTextHover(false);
      }
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isTouchDevice]);

  // Clean stale trail dots
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => {
        if (prev.length === 0) return prev;
        return prev.slice(1);
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Hide default cursor via global style */}
      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>

      {/* Trail dots */}
      <AnimatePresence>
        {trail.map((dot) => (
          <motion.div
            key={dot.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute rounded-full bg-primary/40"
            style={{
              left: dot.x - 3,
              top: dot.y - 3,
              width: 6,
              height: 6,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer ring — follows with spring delay */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : isHovering ? 1.6 : isTextHover ? 1.8 : 1,
        }}
        transition={{
          scale: { type: "spring", damping: 20, stiffness: 300 },
          opacity: { duration: 0.15 },
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`
            flex items-center justify-center rounded-full transition-colors duration-200
            ${isHovering
              ? "h-12 w-12 border-2 border-primary bg-primary/10 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
              : isTextHover
                ? "h-14 w-14 border border-primary/30 bg-primary/5"
                : "h-9 w-9 border-2 border-primary/60"
            }
          `}
        >
          {/* Magnetic inner glow on hover */}
          {isHovering && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-2 w-2 rounded-full bg-primary"
            />
          )}
          {/* Text cursor line */}
          {isTextHover && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="h-5 w-0.5 rounded-full bg-primary/50"
            />
          )}
        </div>
      </motion.div>

      {/* Center dot — sticks precisely to the mouse */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.5 : isTextHover ? 0 : 1,
        }}
        transition={{
          scale: { type: "spring", damping: 25, stiffness: 400 },
          opacity: { duration: 0.1 },
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
      </motion.div>

      {/* Click ripple */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            key="ripple"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ x: cursorX, y: cursorY }}
            className="absolute -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-2 border-primary/40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
