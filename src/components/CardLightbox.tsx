import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type CardItem = {
  src: string | null;
  label: string;
  name: string;
};

type Props = {
  cards: CardItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function CardLightbox({ cards, index, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrev, onNext]);

  if (index === null) return null;
  const card = cards[index];

  let touchX = 0;
  const onTouchStart = (e: React.TouchEvent) => {
    touchX = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (dx > 50) onPrev();
    else if (dx < -50) onNext();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-royal/80 backdrop-blur-md animate-fade-up"
      style={{ backgroundColor: "oklch(0.18 0.08 265 / 0.85)" }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Cerrar"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 size-12 rounded-full bg-cream/90 text-royal hover:bg-cream shadow-keepsake flex items-center justify-center transition-transform hover:scale-105"
      >
        <X className="size-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Anterior"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 size-12 md:size-14 rounded-full bg-cream/90 text-royal hover:bg-cream shadow-keepsake flex items-center justify-center transition-transform hover:scale-105"
      >
        <ChevronLeft className="size-6 md:size-7" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Siguiente"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 size-12 md:size-14 rounded-full bg-cream/90 text-royal hover:bg-cream shadow-keepsake flex items-center justify-center transition-transform hover:scale-105"
      >
        <ChevronRight className="size-6 md:size-7" />
      </button>

      <div
        className="flex flex-col items-center gap-4 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {card.src ? (
          <img
            src={card.src}
            alt={card.label}
            style={{ maxWidth: "90vw", maxHeight: "82vh", objectFit: "contain" }}
            className="rounded-lg shadow-keepsake"
          />
        ) : (
          <div
            style={{ width: "min(90vw, 500px)", height: "82vh" }}
            className="rounded-lg bg-cream flex items-center justify-center text-royal/60 font-display text-2xl px-8 text-center"
          >
            Tarjeta próximamente
          </div>
        )}
        <p className="font-script text-3xl md:text-4xl text-cream drop-shadow-lg">
          {card.label}
        </p>
      </div>
    </div>
  );
}
