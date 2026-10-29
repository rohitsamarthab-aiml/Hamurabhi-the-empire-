"use client";

import { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  originZ: number;
  size: number;
  color: string;
}

export function CyberMatrix3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for 3D parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
      targetRotY = mouseX * 0.35; // rotate around Y
      targetRotX = -mouseY * 0.25; // rotate around X
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Generate 3D point cloud
    const nodeCount = Math.min(80, Math.floor((width * height) / 18000));
    const spread = Math.min(width, height) * 0.8;
    const depth = 600;
    const nodes: Node3D[] = [];

    const colors = [
      "rgba(139, 92, 246, ", // Nexus purple
      "rgba(34, 211, 238, ",  // Nexus cyan
      "rgba(167, 139, 250, ", // Purple light
      "rgba(103, 232, 249, ", // Cyan light
    ];

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * spread * 2;
      const y = (Math.random() - 0.5) * spread * 1.5;
      const z = (Math.random() - 0.5) * depth;
      nodes.push({
        x,
        y,
        z,
        originX: x,
        originY: y,
        originZ: z,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const fov = 450;
    let time = 0;

    const render = () => {
      time += 0.005;

      // Smooth camera interpolation
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY + time * 0.2);
      const sinY = Math.sin(currentRotY + time * 0.2);

      const cx = width / 2;
      const cy = height / 2;

      // Projected points cache
      const projected = nodes.map((node) => {
        // Slow subtle drift
        const dx = node.originX + Math.sin(time + node.originY * 0.01) * 20;
        const dy = node.originY + Math.cos(time + node.originX * 0.01) * 20;
        const dz = node.originZ;

        // 3D rotation Y
        const x1 = dx * cosY - dz * sinY;
        const z1 = dz * cosY + dx * sinY;

        // 3D rotation X
        const y2 = dy * cosX - z1 * sinX;
        const z2 = z1 * cosX + dy * sinX;

        const distanceZ = z2 + 500;
        if (distanceZ <= 0) return null;

        const scale = fov / distanceZ;
        const projX = cx + x1 * scale;
        const projY = cy + y2 * scale;
        const alpha = Math.min(1, Math.max(0.1, (1 - (z2 + 300) / 900) * 0.7));

        return {
          x: projX,
          y: projY,
          z: z2,
          scale,
          alpha,
          color: node.color,
          size: node.size * scale,
        };
      });

      // Draw 3D connection lines between nearby nodes
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (!p1) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (!p2) continue;

          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.2 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw projected nodes with 3D glowing blur
      for (const p of projected) {
        if (!p) continue;

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow aura for closer nodes
        if (p.size > 2) {
          ctx.fillStyle = `${p.color}${p.alpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.65 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
