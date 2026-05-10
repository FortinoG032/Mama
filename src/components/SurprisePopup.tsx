import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import surpriseImg from "@/assets/martin-surprise.png";

type Props = { onClose: () => void };

type Piece = {
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  color: string;
  size: number;
  drift: number;
};

const COLORS = [
  "oklch(0.78 0.18 25)",
  "oklch(0.82 0.16 75)",
  "oklch(0.75 0.18 145)",
  "oklch(0.7 0.2 305)",
  "oklch(0.7 0.2 250)",
  "oklch(0.85 0.15 95)",
];

export function SurprisePopup({ onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const confetti = useMemo<Piece[]>(
    () =>
      Array.from({ length: 80 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.6 + Math.random() * 1.6,
        rotate: Math.random() * 720 - 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        drift: Math.random() * 200 - 100,
      })),
    [],
  );

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center cursor-pointer animate-fade-in"
      style={{
        zIndex: 9999,
        background: "oklch(0.2 0.05 270 / 0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      role="dialog"
      aria-label="Sorpresa"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((p, i) => (
          <span
            key={i}
            className="absolute block rounded-sm"
            style={{
              left: `${p.left}%`,
              top: "-5%",
              width: `${p.size}px`,
              height: `${p.size * 1.6}px`,
              background: p.color,
              animation: `confetti-fall ${p.duration}s ${p.delay}s cubic-bezier(0.2, 0.7, 0.3, 1) forwards`,
              ["--drift" as string]: `${p.drift}px`,
              ["--rot" as string]: `${p.rotate}deg`,
              opacity: 0.95,
              boxShadow: `0 0 6px ${p.color}`,
            }}
          />
        ))}
      </div>

      <div
        className="relative z-10 pointer-events-none"
        style={{ background: "transparent", boxShadow: "none", border: "none" }}
      >
        <img
          src={surpriseImg}
          alt="Sorpresa de Martin"
          draggable={false}
          className="max-w-[90vw] max-h-[85vh] w-auto h-auto select-none animate-surprise-pop"
          style={{
            background: "transparent",
            boxShadow: "none",
            border: "none",
            objectFit: "contain",
            animation:
              "surprise-pop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both, surprise-float 4.5s ease-in-out 600ms infinite",
          }}
        />
      </div>
    </div>,
    document.body,
  );
}
