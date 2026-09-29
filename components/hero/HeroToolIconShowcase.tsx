'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, PanInfo } from 'motion/react';
import { Code2, Wrench, Sparkles, RotateCw, Move } from 'lucide-react';

export function HeroToolIconShowcase() {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoAngleRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Drag / Rotation motion values
  const dragRotateY = useMotionValue(0);
  const dragRotateX = useMotionValue(0);

  // Mouse hover parallax tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 85, mass: 0.6 };
  const smoothDragY = useSpring(dragRotateY, springConfig);
  const smoothDragX = useSpring(dragRotateX, springConfig);

  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const hoverTiltX = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);
  const hoverTiltY = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);

  // Combined rotation
  const finalRotateX = useTransform([smoothDragX, hoverTiltX], ([dx, hx]) => (dx as number) + (hx as number));
  const finalRotateY = useTransform([smoothDragY, hoverTiltY], ([dy, hy]) => (dy as number) + (hy as number));

  // Continuous auto-rotation when idle (not dragging and not hovering)
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isDragging && !isHovered) {
        autoAngleRef.current += delta * 25; // 25 degrees per second
        dragRotateY.set(autoAngleRef.current);
      } else if (isDragging) {
        autoAngleRef.current = dragRotateY.get();
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, isHovered, dragRotateY]);

  // Mouse parallax handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Drag interaction handlers
  const handlePanStart = () => {
    setIsDragging(true);
  };

  const handlePan = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragRotateY.set(dragRotateY.get() + info.delta.x * 0.7);
    dragRotateX.set(Math.max(-45, Math.min(45, dragRotateX.get() - info.delta.y * 0.4)));
  };

  const handlePanEnd = () => {
    setIsDragging(false);
    // Smoothly damp vertical tilt back towards zero
    dragRotateX.set(0);
  };

  return (
    <div
      id="hero-3d-tools-icon"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex flex-col items-center justify-center [perspective:1400px] select-none py-6 min-h-[420px] sm:min-h-[500px]"
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-3xl pointer-events-none" />

      {/* 3D Tilted Gyroscope Outer Orbit Rings */}
      <motion.div
        animate={{ rotateZ: 360, rotateY: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] rounded-full border border-blue-400/25 dark:border-blue-500/25 pointer-events-none [transform:rotateX(68deg)]"
      />
      <motion.div
        animate={{ rotateZ: -360, rotateX: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute w-64 h-64 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-full border border-dashed border-indigo-400/20 dark:border-indigo-500/20 pointer-events-none [transform:rotateY(68deg)]"
      />

      {/* 3D Master Floating Token Container */}
      <motion.div
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{
          rotateX: finalRotateX,
          rotateY: finalRotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: isDragging ? 0 : [0, -12, 0],
        }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative flex items-center justify-center cursor-grab active:cursor-grabbing group touch-none"
      >
        {/* =========================================================================
            LARGE 3D DOUBLE-SIDED TOKEN (FRONT: CODE / BACK: TOOL)
           ========================================================================= */}
        <div className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-76 md:h-76 rounded-[3rem] [transform-style:preserve-3d] shadow-2xl shadow-blue-600/30 transition-shadow duration-300">
          
          {/* =========================================================================
              1. FRONT FACE: CODE ICON (<Code2 />)
             ========================================================================= */}
          <div
            className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white flex flex-col items-center justify-center [backface-visibility:hidden] [transform:translateZ(18px)] border-2 border-blue-300/40 shadow-xl overflow-hidden"
          >
            {/* Specular gloss sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-transparent pointer-events-none" />

            {/* Front Icon - Elevated with 3D Depth */}
            <div className="relative z-10 [transform:translateZ(30px)] flex flex-col items-center justify-center gap-2 drop-shadow-md">
              <Code2 className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 stroke-[1.75] text-white" />
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-blue-100/90 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                Code &bull; Next.js 15
              </span>
            </div>

            {/* Top-Right Sparkle Accent */}
            <div className="absolute top-5 right-5 text-blue-200/90 pointer-events-none [transform:translateZ(35px)]">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* =========================================================================
              2. BACK FACE: TOOL ICON (<Wrench />)
             ========================================================================= */}
          <div
            className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-indigo-700 via-blue-700 to-sky-600 text-white flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(18px)] border-2 border-sky-300/40 shadow-xl overflow-hidden"
          >
            {/* Specular gloss sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-transparent pointer-events-none" />

            {/* Back Icon - Elevated with 3D Depth */}
            <div className="relative z-10 [transform:translateZ(30px)] flex flex-col items-center justify-center gap-2 drop-shadow-md">
              <Wrench className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 stroke-[1.75] text-white" />
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-sky-100/90 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                Tools &bull; Utilities
              </span>
            </div>

            {/* Top-Left Sparkle Accent */}
            <div className="absolute top-5 left-5 text-sky-200/90 pointer-events-none [transform:translateZ(35px)]">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* =========================================================================
              3. 3D THICKNESS CORE (CENTRAL PRISM RIM)
             ========================================================================= */}
          <div className="absolute -inset-1 rounded-[3.1rem] bg-blue-900/90 border border-blue-400/40 pointer-events-none [transform:translateZ(0px)]" />
          <div className="absolute -inset-2 rounded-[3.2rem] bg-indigo-950/70 pointer-events-none [transform:translateZ(-10px)] blur-[1px]" />
        </div>
      </motion.div>

      {/* Interactive Mouse Drag & Rotation Cue */}
      <div className="mt-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400 text-xs font-mono shadow-2xs">
        <Move className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
        <span>Drag with mouse to rotate 360&deg; in 3D</span>
      </div>
    </div>
  );
}
