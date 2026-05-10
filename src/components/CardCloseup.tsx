import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Heart, RotateCcw } from "lucide-react";
import { ACCENTS, MESSAGES } from "./FlipCard";
import edgarFlex from "@/assets/edgar-flex.png";
import type { CardItem } from "./CardLightbox";

type Side = "front" | "back";

type Props = {
  cards: CardItem[];
  index: number;
  initialSide: Side;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function FloralCornerSmall({ className = "", color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`size-10 ${className}`} aria-hidden>
      <g fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
        <path d="M2 12 Q 10 4, 18 8" />
        <path d="M4 4 Q 12 10, 8 18" />
        <circle cx="10" cy="10" r="2.5" fill={color} opacity="0.6" />
        <circle cx="16" cy="6" r="1.2" fill={color} opacity="0.5" />
        <circle cx="6" cy="16" r="1.2" fill={color} opacity="0.5" />
      </g>
    </svg>
  );
}

export function CardCloseup({ cards, index, initialSide, onClose, onPrev, onNext }: Props) {
  const [side, setSide] = useState<Side>(initialSide);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setSide(initialSide), [index, initialSide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  let touchX = 0;
  const onTouchStart = (e: React.TouchEvent) => { touchX = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (dx > 60) onPrev();
    else if (dx < -60) onNext();
  };

  if (!mounted) return null;
  const card = cards[index];
  const accent = ACCENTS[card.name] ?? ACCENTS.default;
  const message = MESSAGES[card.name];

  const pillBase =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/95 border border-gold/50 text-royal text-sm uppercase tracking-[0.2em] shadow-keepsake hover:bg-cream hover:shadow-glow transition";
  const pillActive = "bg-royal text-cream border-royal/60";

  const node = (
    <div
      className="fixed inset-0 flex items-center justify-center animate-fade-up"
      style={{ zIndex: 9999, background: "oklch(0.18 0.08 265 / 0.78)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Cerrar"
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 size-11 sm:size-12 rounded-full bg-cream/95 text-royal border border-gold/50 hover:bg-cream shadow-keepsake flex items-center justify-center transition hover:scale-105"
      >
        <X className="size-5" />
      </button>

      {/* Prev / Next */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Anterior"
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 size-11 sm:size-14 rounded-full bg-cream/95 text-royal border border-gold/50 hover:bg-cream shadow-keepsake flex items-center justify-center transition hover:scale-105"
      >
        <ChevronLeft className="size-5 sm:size-6" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Siguiente"
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 size-11 sm:size-14 rounded-full bg-cream/95 text-royal border border-gold/50 hover:bg-cream shadow-keepsake flex items-center justify-center transition hover:scale-105"
      >
        <ChevronRight className="size-5 sm:size-6" />
      </button>

      {/* Content */}
      <div
        className="relative flex flex-col items-center gap-4 px-4 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {side === "front" ? (
          card.src ? (
            <img
              src={card.src}
              alt={card.label}
              draggable={false}
              style={{ maxWidth: "92vw", maxHeight: "78vh", objectFit: "contain" }}
              className="rounded-md shadow-keepsake"
            />
          ) : (
            <div
              style={{ width: "min(92vw, 520px)", height: "78vh" }}
              className="rounded-md bg-cream flex items-center justify-center text-royal/60 font-display text-2xl px-8 text-center"
            >
              Tarjeta próximamente
            </div>
          )
        ) : (
          <div
            className="rounded-md shadow-keepsake"
            style={{
              width: "min(92vw, 720px)",
              maxHeight: "78vh",
              padding: "12px",
              background: `linear-gradient(135deg, ${accent.border}, oklch(0.78 0.13 75), ${accent.border})`,
              boxShadow: `0 30px 80px -20px ${accent.glow}`,
            }}
          >
            <div
              className="relative w-full rounded-md overflow-hidden flex flex-col"
              style={{
                maxHeight: "calc(78vh - 24px)",
                background:
                  "linear-gradient(135deg, oklch(0.965 0.03 85) 0%, oklch(0.94 0.04 78) 100%)",
                backgroundImage: [
                  "radial-gradient(circle at 12% 18%, oklch(0.78 0.13 75 / 0.10) 0%, transparent 35%)",
                  "radial-gradient(circle at 88% 82%, oklch(0.88 0.06 25 / 0.18) 0%, transparent 40%)",
                  "linear-gradient(135deg, oklch(0.965 0.03 85) 0%, oklch(0.94 0.04 78) 100%)",
                ].join(", "),
              }}
            >
              <div
                className="pointer-events-none absolute inset-3 border rounded-sm"
                style={{ borderColor: accent.border, opacity: 0.7 }}
              />
              <div
                className="pointer-events-none absolute inset-4 border rounded-sm"
                style={{ borderColor: accent.flourish, opacity: 0.3 }}
              />
              <FloralCornerSmall className="absolute top-2 left-2" color={accent.flourish} />
              <FloralCornerSmall className="absolute top-2 right-2 -scale-x-100" color={accent.flourish} />
              <FloralCornerSmall className="absolute bottom-2 left-2 -scale-y-100" color={accent.flourish} />
              <FloralCornerSmall className="absolute bottom-2 right-2 -scale-100" color={accent.flourish} />

              <div className="relative overflow-y-auto px-6 sm:px-12 py-12 sm:py-14 flex flex-col items-center text-center" style={{ minHeight: "min(70vh, 600px)" }}>
                {card.name === "Edgar" ? (
                  <div className="relative w-full flex-1 flex items-center justify-center" style={{ minHeight: "min(60vh, 520px)" }}>
                    <div
                      aria-hidden
                      className="absolute inset-x-12 bottom-6 h-8 rounded-full"
                      style={{
                        background: "radial-gradient(ellipse at center, oklch(0.32 0.14 265 / 0.28) 0%, transparent 70%)",
                        filter: "blur(10px)",
                      }}
                    />
                    <img
                      src={edgarFlex}
                      alt="Edgar"
                      draggable={false}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "min(70vh, 600px)",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        filter: "drop-shadow(0 18px 28px oklch(0.32 0.14 265 / 0.32))",
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-script text-3xl sm:text-5xl mb-3" style={{ color: accent.text }}>
                      {card.label}
                    </p>
                    <div className="h-px w-20 mb-6" style={{ background: accent.flourish, opacity: 0.5 }} />
                    {message ? (
                      <p
                        className="font-body text-base sm:text-xl leading-[1.85] whitespace-pre-line max-w-2xl"
                        style={{ color: accent.text }}
                      >
                        {message}
                      </p>
                    ) : (
                      <div className="flex flex-col items-center gap-3 mt-4" style={{ color: accent.text }}>
                        <Heart className="size-8 opacity-50" />
                        <p className="font-script text-2xl italic opacity-80">Mensaje próximamente</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Side toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          <button
            type="button"
            onClick={() => setSide("front")}
            className={`${pillBase} ${side === "front" ? pillActive : ""}`}
          >
            Portada
          </button>
          <button
            type="button"
            onClick={() => setSide(side === "front" ? "back" : "front")}
            className={pillBase}
            aria-label="Voltear"
          >
            <RotateCcw className="size-4" />
            Voltear
          </button>
          <button
            type="button"
            onClick={() => setSide("back")}
            className={`${pillBase} ${side === "back" ? pillActive : ""}`}
          >
            Mensaje
          </button>
        </div>

        <p className="font-script text-2xl sm:text-3xl text-cream drop-shadow-lg mt-1">
          {card.label}
        </p>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
