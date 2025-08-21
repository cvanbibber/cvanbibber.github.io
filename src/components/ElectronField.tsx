import React, { useEffect, useRef } from 'react';

// Canvas-based electron field with simple physics and mouse repulsion
// Lightweight and runs only when the hero is in view via IntersectionObserver
const ElectronField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<number | null>(null);
  const runningRef = useRef<boolean>(false);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const electrons = Array.from({ length: 32 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      q: -1, // charge (all electrons)
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle conductive path lines
      ctx.strokeStyle = 'rgba(100, 181, 246, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < electrons.length; i++) {
        for (let j = i + 1; j < electrons.length; j++) {
          const a = electrons[i];
          const b = electrons[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const alpha = 0.2 * (1 - d2 / (120 * 120));
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Update electrons with mouse repulsion and mild friction
      electrons.forEach(e => {
        if (mouse.current.active) {
          const dx = e.x - mouse.current.x;
          const dy = e.y - mouse.current.y;
          const d2 = dx * dx + dy * dy + 0.001;
          const force = 12000 / d2; // inverse-square
          e.vx += (dx / Math.sqrt(d2)) * force * 0.05;
          e.vy += (dy / Math.sqrt(d2)) * force * 0.05;
        }
        // friction
        e.vx *= 0.992;
        e.vy *= 0.992;
        // move
        e.x += e.vx;
        e.y += e.vy;
        // bounds reflect
        if (e.x < 0 || e.x > canvas.width) e.vx *= -1;
        if (e.y < 0 || e.y > canvas.height) e.vy *= -1;
        e.x = Math.max(0, Math.min(canvas.width, e.x));
        e.y = Math.max(0, Math.min(canvas.height, e.y));
      });

      // Draw electrons
      electrons.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!runningRef.current) {
        runningRef.current = true;
        animRef.current = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (runningRef.current) {
        runningRef.current = false;
        if (animRef.current) cancelAnimationFrame(animRef.current);
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current!);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };
    const onLeave = () => (mouse.current.active = false);

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      stop();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default ElectronField;
