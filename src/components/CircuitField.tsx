import React, { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';

// Redesigned CircuitField: subtle but technical
// - Thick power rail shows electron flow (−) and V/I indicators
// - Several low-voltage signal lines with positive carriers (+) easily pushed by a positive cursor
// - Tasteful random pulses and electronics symbols (resistor, capacitor, diode, op-amp, ground)
// - Performance: dual-canvas, DPR-capped, offscreen pause, reduced-motion static fallback

type Vec2 = { x: number; y: number };

type Signal = {
  points: Array<{ x0: number; y0: number; x: number; y: number }>; // control points
  segs: Array<{ ax: Vec2; bx: Vec2; len: number }>;
  total: number;
  carriers: Array<{ s: number; v: number; charge: 1 | -1 }>; // s in [0,total]
  color: string;
  tubeR: number; // visual comfort radius
  label: string; // e.g. 1.2V, 3.3V
  stiffness: number; // curve wobble stiffness (higher -> stiffer)
};

// Floating electron for ambient interactivity
type Floater = { x: number; y: number; vx: number; vy: number; charge: -1 };

const CircuitField: React.FC = () => {
  const staticRef = useRef<HTMLCanvasElement | null>(null);
  const dynamicRef = useRef<HTMLCanvasElement | null>(null);
  const runningRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const dprRef = useRef(1);
  const timeRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0, active: false, charge: 1 as 1 | -1 }); // +1 positive probe, Alt toggles -1

  const stateRef = useRef<
    | {
        w: number;
        h: number;
        rails: Array<{
          y: number;
          thickness: number;
          voltage: number; // volts
          carriers: Array<{ x: number; v: number }>;
        }>;
        signals: Signal[];
        floaters: Floater[];
      }
    | null
  >(null);

  const rand = (a: number, b: number) => Math.random() * (b - a) + a;

  // Build a left-to-right polyline with slight vertical variation
  const makeSignal = (w: number, y: number, dpr: number, label: string, color: string, stiffness: number, tubeR: number): Signal => {
    const points: Array<{ x0: number; y0: number; x: number; y: number }> = [];
    const cols = 6;
    for (let i = 0; i < cols; i++) {
      const x = (i / (cols - 1)) * (w - 40 * dpr) + 20 * dpr; // 20px margin
      const yj = y + rand(-8, 8) * dpr;
      points.push({ x0: x, y0: yj, x, y: yj });
    }
    // Segments and total length
    const segs: Array<{ ax: Vec2; bx: Vec2; len: number }> = [];
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const ax = { x: points[i].x, y: points[i].y };
      const bx = { x: points[i + 1].x, y: points[i + 1].y };
      const len = Math.hypot(bx.x - ax.x, bx.y - ax.y);
      segs.push({ ax, bx, len });
      total += len;
    }
    const carriers = new Array(9).fill(0).map((_, i) => ({ s: (i / 9) * total, v: rand(0.045, 0.08) * dpr, charge: 1 as 1 }));
    return { points, segs, total, carriers, color, tubeR, label, stiffness };
  };

  const pointAt = (sig: Signal, s: number): Vec2 => {
    // wrap s into [0,total]
    let d = s % sig.total; if (d < 0) d += sig.total;
    for (let i = 0; i < sig.segs.length; i++) {
      const seg = sig.segs[i];
      if (d <= seg.len) {
        const t = seg.len ? d / seg.len : 0;
        return { x: seg.ax.x + (seg.bx.x - seg.ax.x) * t, y: seg.ax.y + (seg.bx.y - seg.ax.y) * t };
      }
      d -= seg.len;
    }
    // fallback end
    const last = sig.segs[sig.segs.length - 1];
    return { x: last.bx.x, y: last.bx.y };
  };

  // Symbols removed per request (hidden)

  const init = useCallback(() => {
    const sCanvas = staticRef.current;
    const dCanvas = dynamicRef.current;
    if (!sCanvas || !dCanvas) return;

    const rect = sCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75); // cap for perf
    dprRef.current = dpr;
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    sCanvas.width = w; sCanvas.height = h;
    dCanvas.width = w; dCanvas.height = h;

    // Multiple power rails (common voltages), thicker and more carriers
    const railYs = [0.12, 0.18, 0.24, 0.30, 0.36].map((f) => Math.round(h * f));
    const railVs = [48.0, 24.0, 12.0, 5.0, 3.3];
    const rails = railYs.map((y, i) => ({
      y,
      thickness: Math.max(6, 8 * dpr),
      voltage: railVs[i],
      carriers: new Array(28).fill(0).map(() => ({ x: Math.random() * w, v: (0.075 + Math.random() * 0.06) * dpr }))
    }));

    // Signals: lower voltage -> easier to deflect (lower stiffness)
    // Logic-level signals (all under 3.3V): 0.6V, 0.85V, 1.05V, 1.2V, 1.8V, 2.5V
    const railThickness = Math.max(6, 8 * dpr);
    const tube = Math.max(railThickness * 1.4, 12 * dpr);
  // Higher voltages on top -> smaller y values first
  const s6 = makeSignal(w, Math.round(h * 0.50), dpr, '2.5V', 'rgba(99,102,241,0.65)', 0.11, tube);
  const s5 = makeSignal(w, Math.round(h * 0.58), dpr, '1.8V', 'rgba(59,130,246,0.65)', 0.09, tube);
  const s4 = makeSignal(w, Math.round(h * 0.66), dpr, '1.2V', 'rgba(250,204,21,0.65)', 0.07, tube);
  const s3 = makeSignal(w, Math.round(h * 0.74), dpr, '1.05V', 'rgba(168,85,247,0.65)', 0.06, tube);
  const s2 = makeSignal(w, Math.round(h * 0.82), dpr, '0.85V', 'rgba(34,197,94,0.70)', 0.05, tube);
  const s1 = makeSignal(w, Math.round(h * 0.90), dpr, '0.6V', 'rgba(56,189,248,0.7)', 0.04, tube);
    // Increase carriers per signal (more particles per wire)
  for (const sig of [s6, s5, s4, s3, s2, s1]) {
      const count = 30; const total = sig.total;
      sig.carriers = new Array(count).fill(0).map((_, i) => ({ s: (i / count) * total, v: rand(0.06, 0.10) * dpr, charge: 1 as 1 }));
    }
  const signals = [s6, s5, s4, s3, s2, s1];

    // Floating electrons
    const floaters: Floater[] = new Array(26).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: rand(-0.02, 0.02) * dpr,
      vy: rand(-0.02, 0.02) * dpr,
      charge: -1 as -1
    }));

    stateRef.current = { w, h, rails, signals, floaters };

    // Static background: grid, power rail base, symbols, labels
    const sctx = sCanvas.getContext('2d');
    if (!sctx) return;
    sctx.clearRect(0, 0, w, h);

    // PCB grid
    sctx.save();
    sctx.strokeStyle = 'rgba(8,145,178,0.18)';
    sctx.lineWidth = 1 * dpr;
    const step = 72 * dpr;
    for (let x = 0; x < w; x += step) { sctx.beginPath(); sctx.moveTo(x, 0); sctx.lineTo(x, h); sctx.stroke(); }
    for (let y = 0; y < h; y += step) { sctx.beginPath(); sctx.moveTo(0, y); sctx.lineTo(w, y); sctx.stroke(); }
    sctx.restore();

    // Power rails (multiple) with plus marks and voltage labels
    sctx.fillStyle = 'rgba(239,68,68,0.85)';
    sctx.font = `${Math.max(10, 11 * dpr)}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    sctx.textAlign = 'left'; sctx.textBaseline = 'middle';
    for (const rail of rails) {
      const grad = sctx.createLinearGradient(0, rail.y, w, rail.y);
      grad.addColorStop(0, 'rgba(239,68,68,0.35)');
      grad.addColorStop(1, 'rgba(239,68,68,0.55)');
      sctx.strokeStyle = grad;
      sctx.lineWidth = rail.thickness;
      sctx.beginPath(); sctx.moveTo(0, rail.y); sctx.lineTo(w, rail.y); sctx.stroke();
      for (let x = 24 * dpr; x < w; x += 110 * dpr) sctx.fillText('+', x, rail.y - 7 * dpr);
      sctx.fillText(`${rail.voltage.toFixed(1)}V`, 18 * dpr, rail.y - 18 * dpr);
    }
  }, []);

  const step = (dt: number) => {
    const st = stateRef.current; const canvas = dynamicRef.current;
    if (!st || !canvas) return;
  const { w, h, rails, signals, floaters } = st; const dpr = dprRef.current;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    timeRef.current += dt;

    // Clear dynamic layer
    ctx.clearRect(0, 0, w, h);

    // Light wobble of signal control points (lower voltage -> looser)
    for (const sig of signals) {
      for (let i = 0; i < sig.points.length; i++) {
        const p = sig.points[i];
        // Keep x fixed; modulate y slightly
        const a = (1 - sig.stiffness) * 5 * dpr; // amplitude
        const wv = 0.001 + sig.stiffness * 0.003; // frequency
        p.y = p.y0 + a * Math.sin((timeRef.current + i * 350) * wv);
      }
      // Recompute segments and total
      sig.segs.length = 0; sig.total = 0;
      for (let i = 0; i < sig.points.length - 1; i++) {
        const ax = { x: sig.points[i].x, y: sig.points[i].y };
        const bx = { x: sig.points[i + 1].x, y: sig.points[i + 1].y };
        const len = Math.hypot(bx.x - ax.x, bx.y - ax.y);
        sig.segs.push({ ax, bx, len }); sig.total += len;
      }
    }

  // Draw signals (wire) and carriers (+); increase carrier count handled in init
    ctx.lineWidth = 1 * dpr;
    ctx.font = `${Math.max(8, 9 * dpr)}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const sig of signals) {
      // wire
  ctx.strokeStyle = sig.color;
  ctx.lineWidth = Math.max(6, 8 * dpr); // match rail thickness
  ctx.beginPath();
      for (let i = 0; i < sig.points.length; i++) {
        const p = sig.points[i]; if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
  // label
  const mid = pointAt(sig, sig.total * 0.08);
  ctx.fillStyle = 'rgba(148,163,184,0.9)';
  ctx.fillText(sig.label, mid.x + 8 * dpr, mid.y - Math.max(16, 18 * dpr));

      // carriers
      for (const c of sig.carriers) {
        c.s += c.v * dt; if (c.s > sig.total) c.s -= sig.total;
        const base = pointAt(sig, c.s);

    // Cursor interaction: cursor repels carriers (easier to push off trace)
        let drawX = base.x, drawY = base.y;
        if (mouse.current.active) {
          const mx = mouse.current.x * dpr, my = mouse.current.y * dpr;
          const dx = drawX - mx, dy = drawY - my; const r2 = dx * dx + dy * dy;
          const R = (sig.tubeR * 5) ** 2; // influence area ~ 5x tube
          if (r2 < R) {
            const inv = 1 / Math.sqrt(r2 + 0.0001);
            const dirx = dx * inv, diry = dy * inv;
      const strength = (1 - r2 / R) * (2.0 - sig.stiffness) * 34 * dpr; // easier displacement
      drawX += dirx * strength; // always repulsive
      drawY += diry * strength;
          }
        }

        // tube halo when displaced
        const displaced = Math.hypot(drawX - base.x, drawY - base.y) > sig.tubeR * 0.6;
        if (displaced) {
          ctx.save();
          ctx.strokeStyle = sig.color.replace('0.7', '0.25').replace('0.65', '0.25').replace('0.6', '0.25');
          ctx.lineWidth = 2 * dpr;
          ctx.beginPath(); ctx.moveTo(base.x, base.y); ctx.lineTo(drawX, drawY); ctx.stroke();
          ctx.restore();
        }

        // carrier dot (unified dark blue, larger)
        ctx.fillStyle = 'rgba(30,58,138,0.95)'; // blue-900-ish
        ctx.beginPath(); ctx.arc(drawX, drawY, Math.max(2.6 * dpr, 2.2), 0, Math.PI * 2); ctx.fill();
      }
    }

  // Power rail electrons (−) repel from cursor for all rails
  ctx.fillStyle = 'rgba(30,58,138,0.95)'; // same dark blue
    for (const rail of rails) {
      for (const e of rail.carriers) {
        e.x += e.v * dt; if (e.x > w + 10 * dpr) e.x -= (w + 20 * dpr);
        let ex = e.x, ey = rail.y;
        if (mouse.current.active) {
          const mx = mouse.current.x * dpr, my = mouse.current.y * dpr;
          const dx = ex - mx, dy = ey - my; const r2 = dx * dx + dy * dy;
          const R = (80 * dpr) ** 2;
          if (r2 < R) {
            const inv = 1 / Math.sqrt(r2 + 0.0001);
            const dirx = dx * inv, diry = dy * inv;
      const strength = (1 - r2 / R) * 8 * dpr; // mild repulsion
      ex += dirx * strength;
      ey += diry * strength;
          }
        }
  ctx.beginPath(); ctx.arc(ex, ey, Math.max(2.6 * dpr, 2.2), 0, Math.PI * 2); ctx.fill();
      }
    }

  // Floating electrons (−) that are repelled by cursor
    for (const f of floaters) {
      // random gentle drift
      f.vx += rand(-0.0008, 0.0008) * dpr * dt;
      f.vy += rand(-0.0008, 0.0008) * dpr * dt;
      // cursor influence (stronger, long-range)
      if (mouse.current.active) {
        const mx = mouse.current.x * dpr, my = mouse.current.y * dpr;
        const dx = f.x - mx, dy = f.y - my; const r2 = dx * dx + dy * dy + 0.001;
        const R = (160 * dpr) ** 2;
        if (r2 < R) {
          const inv = 1 / Math.sqrt(r2);
          const dirx = dx * inv, diry = dy * inv;
      const accel = (1 - r2 / R) * 0.08 * dpr; // repulsive
      f.vx += dirx * accel;
      f.vy += diry * accel;
        }
      }
      // damping
      f.vx *= 0.985; f.vy *= 0.985;
      // move and wrap
      f.x += f.vx * dt; f.y += f.vy * dt;
      if (f.x < -10 * dpr) f.x = w + 10 * dpr; else if (f.x > w + 10 * dpr) f.x = -10 * dpr;
      if (f.y < -10 * dpr) f.y = h + 10 * dpr; else if (f.y > h + 10 * dpr) f.y = -10 * dpr;
      // draw
  ctx.fillStyle = 'rgba(30,58,138,0.95)';
  ctx.beginPath(); ctx.arc(f.x, f.y, Math.max(2.6 * dpr, 2.2), 0, Math.PI * 2); ctx.fill();
    }

    // Cursor glyph (probe)
    if (mouse.current.active) {
      ctx.save();
      const mx = mouse.current.x * dpr, my = mouse.current.y * dpr;
      const col = mouse.current.charge > 0 ? 'rgba(239,68,68,0.75)' : 'rgba(59,130,246,0.75)';
      ctx.strokeStyle = col; ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath(); ctx.arc(mx, my, 14 * dpr, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = `${Math.max(10, 11 * dpr)}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
      ctx.fillText(mouse.current.charge > 0 ? '+' : '-', mx, my);
      ctx.restore();
    }
  };

  useEffect(() => {
    const sCanvas = staticRef.current; const dCanvas = dynamicRef.current;
    if (!sCanvas || !dCanvas) return;

    if (reduceMotion) { init(); return; }
    init();

    let last = performance.now(), accum = 0;
    const tick = (now: number) => {
      if (!runningRef.current) return;
      const frame = now - last; last = now; accum += frame;
      if (accum >= 33) { const dt = Math.min(33, accum); accum = 0; step(dt); }
      rafRef.current = requestAnimationFrame(tick);
    };
    const start = () => { if (runningRef.current) return; runningRef.current = true; last = performance.now(); rafRef.current = requestAnimationFrame(tick); };
    const stop = () => { runningRef.current = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = null; };

    // Pause when offscreen
    const io = new IntersectionObserver((entries) => { for (const e of entries) { if (e.isIntersecting) start(); else stop(); } }, { root: null, threshold: 0.05 });
    io.observe(dCanvas);

    // Resize
    const onResize = () => init();
    window.addEventListener('resize', onResize);

    // Mouse: positive by default, hold Alt to flip to negative; use canvas-relative coords
    const onMove = (e: MouseEvent) => {
      const dc = dCanvas.getBoundingClientRect();
      mouse.current.x = e.clientX - dc.left;
      mouse.current.y = e.clientY - dc.top;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };
    const onKey = (e: KeyboardEvent) => { mouse.current.charge = e.altKey ? -1 : 1; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);

    return () => {
      stop(); io.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKey);
    };
  }, [reduceMotion, init]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0" aria-hidden>
      <canvas ref={staticRef} className="absolute inset-0 w-full h-full" />
      <canvas ref={dynamicRef} className="absolute inset-0 w-full h-full" />
  {/* Bottom edge fade to smoothly transition into content */}
      <div className="absolute inset-x-0 bottom-0 h-24" style={{
        background: 'linear-gradient(to top, rgba(255,255,255,1.0), rgba(255,255,255,0))'
      }} /> 
    </div>
  );
};

export default CircuitField;
