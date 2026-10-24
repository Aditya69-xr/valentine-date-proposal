import React, { useEffect, useRef } from 'react';

/**
 * FloatingHeartsCanvas
 * Renders 3D-shaded floating hearts, soft bokeh lights, and subtle glitter/fairy dust.
 * Reacts dynamically to mouse/touch cursor with burst sparkles.
 */
export default function FloatingHeartsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Classes
    class Heart {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        this.x = Math.random() * width;
        this.y = isInitial ? Math.random() * height : height + 30;
        this.size = Math.random() * 18 + 12; // 12px to 30px
        this.speedY = Math.random() * 0.9 + 0.6;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.rotation = (Math.random() - 0.5) * 0.4;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.45 + 0.25;
        // Romantic colors: Crimson, Rose Gold, Soft Pink, Burgundy
        const palette = [
          { r: 168, g: 24, b: 56 },   // Crimson
          { r: 197, g: 140, b: 133 }, // Rose Gold
          { r: 236, g: 110, b: 142 }, // Soft Rose
          { r: 245, g: 180, b: 195 }, // Pale Pink
          { r: 114, g: 14, b: 34 }    // Deep Burgundy
        ];
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.depth = Math.random() * 0.6 + 0.4; // 3D depth multiplier
      }

      update() {
        this.swayAngle += this.swaySpeed;
        this.x += Math.sin(this.swayAngle) * 0.8 + this.speedX;
        this.y -= this.speedY * this.depth;
        this.rotation += this.rotationSpeed;

        if (this.y < -40 || this.x < -40 || this.x > width + 40) {
          this.reset(false);
        }
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.scale(this.depth, this.depth);

        // Draw 3D-shaded Heart
        const s = this.size;
        c.beginPath();
        c.moveTo(0, s * 0.3);
        c.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.2, 0, s);
        c.bezierCurveTo(s, s * 0.2, s * 0.5, -s * 0.3, 0, s * 0.3);
        c.closePath();

        // 3D Gradient Shading
        const grad = c.createRadialGradient(-s * 0.2, s * 0.2, s * 0.1, 0, s * 0.4, s * 0.9);
        grad.addColorStop(0, `rgba(${this.color.r + 50}, ${this.color.g + 50}, ${this.color.b + 50}, ${this.opacity})`);
        grad.addColorStop(0.6, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.85})`);
        grad.addColorStop(1, `rgba(${Math.max(0, this.color.r - 40)}, ${Math.max(0, this.color.g - 40)}, ${Math.max(0, this.color.b - 40)}, ${this.opacity * 0.6})`);

        c.fillStyle = grad;
        c.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.35)`;
        c.shadowBlur = 12 * this.depth;
        c.fill();

        // Soft specular highlight for 3D look
        c.beginPath();
        c.ellipse(-s * 0.25, s * 0.15, s * 0.18, s * 0.08, -Math.PI / 4, 0, Math.PI * 2);
        c.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.55})`;
        c.fill();

        c.restore();
      }
    }

    // Bokeh light orbs
    class BokehOrb {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 60 + 30;
        this.alpha = Math.random() * 0.12 + 0.03;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.color = Math.random() > 0.5 ? '255, 200, 210' : '235, 175, 160';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < -100) this.x = width + 100;
        if (this.x > width + 100) this.x = -100;
        if (this.y < -100) this.y = height + 100;
        if (this.y > height + 100) this.y = -100;
      }
      draw(c) {
        c.save();
        const g = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, `rgba(${this.color}, ${this.alpha})`);
        g.addColorStop(1, `rgba(${this.color}, 0)`);
        c.fillStyle = g;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Glitter/Sparkle
    class Sparkle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 1;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.flickerSpeed = Math.random() * 0.04 + 0.02;
        this.flickerVal = Math.random() * Math.PI;
      }
      update() {
        this.flickerVal += this.flickerSpeed;
        this.currentAlpha = Math.abs(Math.sin(this.flickerVal)) * this.alpha;
        this.y -= 0.3;
        if (this.y < 0) this.y = height;
      }
      draw(c) {
        c.save();
        c.fillStyle = `rgba(255, 235, 210, ${this.currentAlpha})`;
        c.shadowColor = 'rgba(255, 215, 0, 0.6)';
        c.shadowBlur = 6;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Interactive cursor fairy dust
    const cursorParticles = [];
    const handleMouseMove = (e) => {
      for (let i = 0; i < 2; i++) {
        cursorParticles.push({
          x: e.clientX + (Math.random() - 0.5) * 15,
          y: e.clientY + (Math.random() - 0.5) * 15,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          decay: Math.random() * 0.03 + 0.02
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize collections
    const hearts = Array.from({ length: 32 }, () => new Heart(true));
    const bokehs = Array.from({ length: 14 }, () => new BokehOrb());
    const sparkles = Array.from({ length: 45 }, () => new Sparkle());

    // Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Bokeh lights
      bokehs.forEach(b => {
        b.update();
        b.draw(ctx);
      });

      // Render Glitter sparkles
      sparkles.forEach(s => {
        s.update();
        s.draw(ctx);
      });

      // Render 3D Floating Hearts
      hearts.forEach(h => {
        h.update();
        h.draw(ctx);
      });

      // Render cursor fairy particles
      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const p = cursorParticles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= p.decay;

        if (p.life <= 0) {
          cursorParticles.splice(i, 1);
        } else {
          ctx.save();
          ctx.fillStyle = `rgba(255, 180, 195, ${p.life})`;
          ctx.shadowColor = 'rgba(255, 100, 140, 0.7)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
