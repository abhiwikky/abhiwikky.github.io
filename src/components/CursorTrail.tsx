import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  birth: number;
}

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let lastNodeTime = 0;
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      if (now - lastNodeTime > 60) {
        nodesRef.current.push({ x: e.clientX, y: e.clientY, birth: now });
        lastNodeTime = now;
        if (nodesRef.current.length > 30) nodesRef.current.shift();
      }
    };
    window.addEventListener("mousemove", handleMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const lifetime = 1200;

      nodesRef.current = nodesRef.current.filter((n) => now - n.birth < lifetime);

      for (const node of nodesRef.current) {
        const age = (now - node.birth) / lifetime;
        const alpha = Math.max(0, 1 - age) * 0.6;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(210, 100%, 50%, ${alpha})`;
        ctx.fill();

        // Draw connections to nearby nodes
        for (const other of nodesRef.current) {
          if (other === node) continue;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const otherAge = (now - other.birth) / lifetime;
            const lineAlpha = Math.max(0, 1 - Math.max(age, otherAge)) * 0.2 * (1 - dist / 100);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(210, 100%, 50%, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

export default CursorTrail;
