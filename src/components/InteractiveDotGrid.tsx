"use client";

import { useEffect, useRef, useCallback } from "react";

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  baseOpacity: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
}

export function InteractiveDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef<Dot[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isDarkRef = useRef(false);

  const GRID_SPACING = 40;
  const MOUSE_RADIUS = 150;
  const PARTICLE_COUNT = 25;

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = [];
    const cols = Math.ceil(width / GRID_SPACING) + 1;
    const rows = Math.ceil(height / GRID_SPACING) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          baseX: col * GRID_SPACING,
          baseY: row * GRID_SPACING,
          x: col * GRID_SPACING,
          y: row * GRID_SPACING,
          radius: 1.2,
          baseRadius: 1.2,
          opacity: 0.15,
          baseOpacity: 0.15,
        });
      }
    }
    dotsRef.current = dots;
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      initDots(width, height);
      initParticles(width, height);
    };

    const checkTheme = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const themeObserver = new MutationObserver(checkTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    checkTheme();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = isDarkRef.current;
      const primaryColor = isDark ? [52, 211, 153] : [4, 120, 87];
      const mouse = mouseRef.current;

      // Update & draw grid dots
      for (const dot of dotsRef.current) {
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS);
          const angle = Math.atan2(dy, dx);

          // Push dots away from cursor
          dot.x += (dot.baseX - Math.cos(angle) * force * 20 - dot.x) * 0.15;
          dot.y += (dot.baseY - Math.sin(angle) * force * 20 - dot.y) * 0.15;
          dot.radius += (dot.baseRadius + force * 3 - dot.radius) * 0.15;
          dot.opacity += (Math.min(0.8, dot.baseOpacity + force * 0.65) - dot.opacity) * 0.15;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.08;
          dot.y += (dot.baseY - dot.y) * 0.08;
          dot.radius += (dot.baseRadius - dot.radius) * 0.08;
          dot.opacity += (dot.baseOpacity - dot.opacity) * 0.08;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor.join(",")}, ${dot.opacity})`;
        ctx.fill();
      }

      // Draw connecting lines between nearby cursor-affected dots
      const activeDots = dotsRef.current.filter((d) => d.opacity > 0.2);
      for (let i = 0; i < activeDots.length; i++) {
        for (let j = i + 1; j < activeDots.length; j++) {
          const dx = activeDots[i].x - activeDots[j].x;
          const dy = activeDots[i].y - activeDots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GRID_SPACING * 1.8) {
            const lineOpacity = Math.min(activeDots[i].opacity, activeDots[j].opacity) * 0.4;
            ctx.beginPath();
            ctx.moveTo(activeDots[i].x, activeDots[i].y);
            ctx.lineTo(activeDots[j].x, activeDots[j].y);
            ctx.strokeStyle = `rgba(${primaryColor.join(",")}, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update & draw floating particles
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulsePhase += 0.02;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulse = Math.sin(p.pulsePhase) * 0.5 + 0.5;
        const drawRadius = p.radius * (0.8 + pulse * 0.4);
        const drawOpacity = p.opacity * (0.6 + pulse * 0.4);

        // Glow effect near cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let extraGlow = 0;
        if (dist < MOUSE_RADIUS * 1.5) {
          extraGlow = (1 - dist / (MOUSE_RADIUS * 1.5)) * 0.5;
        }

        // Outer glow
        if (drawOpacity + extraGlow > 0.15) {
          const gradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, drawRadius * 4
          );
          gradient.addColorStop(0, `rgba(${primaryColor.join(",")}, ${(drawOpacity + extraGlow) * 0.6})`);
          gradient.addColorStop(1, `rgba(${primaryColor.join(",")}, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawRadius * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor.join(",")}, ${drawOpacity + extraGlow})`;
        ctx.fill();
      }

      // Connect nearby particles with faint lines
      const parts = particlesRef.current;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const dx = parts[i].x - parts[j].x;
          const dy = parts[i].y - parts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const lineOpacity = (1 - dist / 200) * 0.08;
            ctx.beginPath();
            ctx.moveTo(parts[i].x, parts[i].y);
            ctx.lineTo(parts[j].x, parts[j].y);
            ctx.strokeStyle = `rgba(${primaryColor.join(",")}, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      themeObserver.disconnect();
    };
  }, [initDots, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
