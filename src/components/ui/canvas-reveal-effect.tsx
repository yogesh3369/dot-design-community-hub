"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const CanvasRevealEffect = ({
  colors = [[255, 255, 255]],
  dotSize = 2,
  animationSpeed = 10,
  className,
  containerClassName,
}: {
  colors?: number[][];
  dotSize?: number;
  animationSpeed?: number;
  className?: string;
  containerClassName?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === container) {
          canvas.width = entry.contentRect.width;
          canvas.height = entry.contentRect.height;
        }
      }
    });

    resizeObserver.observe(container);

    // Create dots
    const dots: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: number[];
      size: number;
    }[] = [];

    const createDots = () => {
      const width = canvas.width;
      const height = canvas.height;
      const numDots = Math.floor((width * height) / 1000);

      for (let i = 0; i < numDots; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * animationSpeed * 0.1,
          vy: (Math.random() - 0.5) * animationSpeed * 0.1,
          color,
          size: dotSize,
        });
      }
    };

    createDots();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off edges
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.color[0]}, ${dot.color[1]}, ${dot.color[2]}, 0.8)`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
    };
  }, [colors, dotSize, animationSpeed]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full", containerClassName)}
    >
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 w-full h-full", className)}
      />
    </div>
  );
};
