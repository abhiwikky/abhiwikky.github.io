import { useEffect, useRef } from "react";

const GridBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0 grid-background"
      style={{
        maskImage: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(0,0,0,0.15), transparent 70%)",
        WebkitMaskImage: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(0,0,0,0.15), transparent 70%)",
      }}
    />
  );
};

export default GridBackground;
