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
  const [particleCount, setParticleCount] = useState(100);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(600);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['green', 'black', 'white', 'yellow']; // Theme-specific colors for dark theme
    const centerColor = '';

    const particles: Particle[] = [];

    const initParticles = () => {
      // Create one big particle in the center
      particles.push({
        x: width  / 2,
        y: height / 2,
        radius: 2,
        color: centerColor,
        velocityX: 0, // No movement for the central particle
        velocityY: 0, // No movement for the central particle
        distanceFromCenter: 0,
        angle: Math.random() * Math.PI * 2,
        speed: 0, // No orbiting for the central particle
      });

      // Create smaller particles orbiting around the center
      for (let i = 1; i < particleCount; i++) {
        const radius = Math.random() * 2 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const distanceFromCenter = Math.random() * (width / 2);
        particles.push({
          x: width / 2 + Math.cos(particles[0].angle) * distanceFromCenter,
          y: height / 2 + Math.sin(particles[0].angle) * distanceFromCenter,
          radius,
          color,
          velocityX: Math.random() * 2 - 1,
          velocityY: Math.random() * 2 - 1,
          distanceFromCenter,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.005, // Lower speed for the orbiting particles
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

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Animation;