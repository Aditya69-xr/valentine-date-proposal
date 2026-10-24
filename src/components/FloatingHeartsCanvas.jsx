import React, { useEffect, useRef } from 'react';

/**
 * FloatingHeartsCanvas
 * Enhanced Valentine's Canvas:
 * - 3D shaded glowing hearts
 * - Floating soft rose petals swaying in wind
 * - Bokeh light orbs & golden glitter sparkles
 * - Interactive cursor fairy dust trail
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

    // 1. Floating 3D Hearts
    class Heart {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        this.x = Math.random() * width;
        this.y = isInitial ? Math.random() * height : height + 30;
        this.size = Math.random() * 20 + 12;
        this.speedY = Math.random() * 0.9 + 0.6;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.rotation = (Math.random() - 0.5) * 0.4;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.45 + 0.3;

        const palette = [
          { r: 230, g: 0, b: 57 },    // Vivid Ruby
          { r: 255, g: 77, b: 109 },  // Rose Pink
          { r: 255, g: 42, b: 109 },  // Bright Pink
          { r: 164, g: 22, b: 26 },   // Crimson
          { r: 255, g: 182, b: 193 }  // Soft Blush
        ];
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.depth = Math.random() * 0.6 + 0.5;
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

        const s = this.size;
        c.beginPath();
        c.moveTo(0, s * 0.3);
        c.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.2, 0, s);
        c.bezierCurveTo(s, s * 0.2, s * 0.5, -s * 0.3, 0, s * 0.3);
        c.closePath();

        const grad = c.createRadialGradient(-s * 0.2, s * 0.2, s * 0.1, 0, s * 0.4, s * 0.9);
        grad.addColorStop(0, `rgba(${this.color.r + 40}, ${this.color.g + 40}, ${this.color.b + 40}, ${this.opacity})`);
        grad.addColorStop(0.6, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.9})`);
        grad.addColorStop(1, `rgba(${Math.max(0, this.color.r - 50)}, ${Math.max(0, this.color.g - 50)}, ${Math.max(0, this.color.b - 50)}, ${this.opacity * 0.7})`);

        c.fillStyle = grad;
        c.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.4)`;
        c.shadowBlur = 12 * this.depth;
        c.fill();

        // 3D Specular curve
        c.beginPath();
        c.ellipse(-s * 0.25, s * 0.15, s * 0.18, s * 0.08, -Math.PI / 4, 0, Math.PI * 2);
        c.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.6})`;
        c.fill();

        c.restore();
      }
    }

    // 2. Falling Rose Petals
    class RosePetal {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }
      reset(isInitial = false) {
        this.x = Math.random() * width;
        this.y = isInitial ? Math.random() * height : -30;
        this.size = Math.random() * 12 + 10;
        this.speedY = Math.random() * 1.1 + 0.8;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.03;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = Math.random() * 0.03 + 0.01;
        this.opacity = Math.random() * 0.5 + 0.35;
      }
      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle) * 0.9 + this.speedX;
        this.angle += this.angularSpeed;
        this.flip += this.flipSpeed;

        if (this.y > height + 30) {
          this.reset(false);
        }
      }
      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.angle);
        c.scale(1, Math.sin(this.flip));

        c.beginPath();
        c.moveTo(0, -this.size);
        c.bezierCurveTo(this.size * 0.8, -this.size * 0.8, this.size * 0.8, this.size * 0.8, 0, this.size);
        c.bezierCurveTo(-this.size * 0.8, this.size * 0.8, -this.size * 0.8, -this.size * 0.8, 0, -this.size);
        c.closePath();

        const grad = c.createLinearGradient(0, -this.size, 0, this.size);
        grad.addColorStop(0, `rgba(255, 107, 139, ${this.opacity})`);
        grad.addColorStop(0.5, `rgba(224, 17, 95, ${this.opacity})`);
        grad.addColorStop(1, `rgba(164, 22, 26, ${this.opacity})`);

        c.fillStyle = grad;
        c.shadowColor = 'rgba(230, 0, 57, 0.3)';
        c.shadowBlur = 6;
        c.fill();
        c.restore();
      }
    }

    // 3. Bokeh Light Orbs
    class BokehOrb {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 65 + 30;
        this.alpha = Math.random() * 0.12 + 0.04;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
        this.color = Math.random() > 0.5 ? '255, 180, 200' : '255, 215, 225';
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

    // 4. Golden Glitter Sparkles
    class Sparkle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.8 + 1;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.flickerSpeed = Math.random() * 0.04 + 0.02;
        this.flickerVal = Math.random() * Math.PI;
      }
      update() {
        this.flickerVal += this.flickerSpeed;
        this.currentAlpha = Math.abs(Math.sin(this.flickerVal)) * this.alpha;
        this.y -= 0.35;
        if (this.y < 0) this.y = height;
      }
      draw(c) {
        c.save();
        c.fillStyle = `rgba(255, 235, 180, ${this.currentAlpha})`;
        c.shadowColor = 'rgba(255, 215, 0, 0.7)';
        c.shadowBlur = 8;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Cursor fairy dust
    const cursorParticles = [];
    const handleMouseMove = (e) => {
      for (let i = 0; i < 2; i++) {
        cursorParticles.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          decay: Math.random() * 0.03 + 0.02
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Collections
    const hearts = Array.from({ length: 28 }, () => new Heart(true));
    const petals = Array.from({ length: 22 }, () => new RosePetal(true));
    const bokehs = Array.from({ length: 16 }, () => new BokehOrb());
    const sparkles = Array.from({ length: 40 }, () => new Sparkle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      bokehs.forEach(b => {
        b.update();
        b.draw(ctx);
      });

      sparkles.forEach(s => {
        s.update();
        s.draw(ctx);
      });

      petals.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      hearts.forEach(h => {
        h.update();
        h.draw(ctx);
      });

      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const p = cursorParticles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= p.decay;

        if (p.life <= 0) {
          cursorParticles.splice(i, 1);
        } else {
          ctx.save();
          ctx.fillStyle = `rgba(255, 130, 160, ${p.life})`;
          ctx.shadowColor = 'rgba(255, 50, 100, 0.8)';
          ctx.shadowBlur = 10;
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
