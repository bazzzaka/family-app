import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const GlowingParticles = ({ count = 30, speed = 0.5 }) => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas size to match parent element
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    
    // Create particles
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 5 + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          color: i % 3 === 0 ? theme.palette.primary.main : theme.palette.secondary.main,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          opacity: Math.random() * 0.7 + 0.3,
          blinkSpeed: Math.random() * 0.02 + 0.005,
          blinkDirection: Math.random() > 0.5 ? 1 : -1
        });
      }
    };
    
    // Initialize
    resizeCanvas();
    createParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Blink effect - change opacity
        particle.opacity += particle.blinkSpeed * particle.blinkDirection;
        if (particle.opacity > 0.9) {
          particle.blinkDirection = -1;
        } else if (particle.opacity < 0.3) {
          particle.blinkDirection = 1;
        }
        
        // Draw particle with glow
        ctx.save();
        ctx.fillStyle = alpha(particle.color, particle.opacity);
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      });
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [count, speed, theme.palette.primary.main, theme.palette.secondary.main]);
  
  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.7
      }}
    />
  );
};

export default GlowingParticles; 