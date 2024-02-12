'use client'

import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityX: number;
  velocityY: number;
  distanceFromCenter: number;
  angle: number;
  speed: number;
}

const Animation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particleCount, setParticleCount] = useState(50);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['yellow', 'black', 'blue']; // Theme-specific colors for dark theme

    const particles: Particle[] = [];

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2;
        const color = colors[Math.floor(Math.random() * colors.length)]; // Randomly choose a dark color
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          radius,
          color,
          velocityX: Math.random() * 2 - 1,
          velocityY: Math.random() * 2 - 1,
          distanceFromCenter: Math.random() * (width / 2),
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.05,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.angle += particle.speed;
        const x =
          Math.cos(particle.angle) * particle.distanceFromCenter + width / 2;
        const y =
          Math.sin(particle.angle) * particle.distanceFromCenter + height / 2;
        particle.x = x;
        particle.y = y;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    // Handle window resize events
    const handleResize = () => {
      if (canvas) {
        setWidth(canvas.clientWidth);
        setHeight(canvas.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [particleCount, width, height]);

  return (
    <canvas ref={canvasRef} width={width} height={height} />
  );
};

export default Animation;