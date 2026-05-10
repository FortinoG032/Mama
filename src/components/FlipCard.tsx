import { useState } from "react";
import { Heart, Mail, RotateCcw, Maximize2 } from "lucide-react";
import { SurprisePopup } from "./SurprisePopup";
import edgarFlex from "@/assets/edgar-flex.png";

type Accent = {
  border: string;
  glow: string;
  text: string;
  flourish: string;
};

export const ACCENTS: Record<string, Accent> = {
  Nancy:  { border: "oklch(0.82 0.01 250)", glow: "oklch(0.85 0.01 250 / 0.5)", text: "oklch(0.35 0.02 250)", flourish: "oklch(0.7 0.02 250)" },
  Ily:    { border: "oklch(0.7 0.13 305)",  glow: "oklch(0.78 0.15 305 / 0.45)", text: "oklch(0.35 0.12 305)", flourish: "oklch(0.6 0.18 305)" },
  Max:    { border: "oklch(0.65 0.14 145)", glow: "oklch(0.78 0.15 145 / 0.45)", text: "oklch(0.32 0.1 150)",  flourish: "oklch(0.55 0.16 150)" },
  Ari:    { border: "oklch(0.78 0.14 5)",   glow: "oklch(0.85 0.12 10 / 0.5)",   text: "oklch(0.42 0.15 5)",   flourish: "oklch(0.7 0.17 5)" },
  Alex:   { border: "oklch(0.78 0.13 75)",  glow: "oklch(0.85 0.12 80 / 0.5)",   text: "oklch(0.42 0.12 70)",  flourish: "oklch(0.65 0.15 70)" },
  Dad:    { border: "oklch(0.55 0.2 25)",   glow: "oklch(0.65 0.22 25 / 0.5)",   text: "oklch(0.4 0.18 25)",   flourish: "oklch(0.78 0.13 75)" },
  Martin: { border: "oklch(0.55 0.18 250)", glow: "oklch(0.65 0.2 250 / 0.5)",   text: "oklch(0.35 0.15 255)", flourish: "oklch(0.78 0.13 75)" },
  default:{ border: "oklch(0.78 0.13 75)",  glow: "oklch(0.85 0.12 80 / 0.4)",   text: "oklch(0.32 0.14 265)", flourish: "oklch(0.65 0.15 70)" },
};

export const MESSAGES: Record<string, string> = {
  Nancy: "Happy mothers day thank you for raising a wonderful son and welcoming me into your family love you 😘",
  Ily: "Feliz Día de las Madres a la mejor mamá!\nGracias por todo lo que haces y por siempre estar para mi , y tus nietos. Te aprecio más de lo que te imaginas y somos muy suertudos en tener te . Eres lo que aspiro a ser como mama , esposa y hija \nTe quiero mucho",
  Max: "Happy Mother's Day, Mama. Thank you for always loving me and being there and I need you. You deserve this day. Very lucky to have you as my if I didn't I don't know what I would do. Happy Mother's Day.Love you",
  Ari: "Happy Mother's Day mama!Thank you for always being so caring, and loving. I'm really grateful for all the time we spend together and for everything you do for me. You always know how to make me happy and I'm so lucky to have you as my grandma. I hope you have an amazing Mother's Day, I love you!💗 — Ari",
  Alex: "Love you very much Mom thanks for being you",
  Dad: "Mi apa is hombre de muy pocas palabras... creo que no me mando nada para poner aqui porque te lo queria decir en persona",
  Martin: "Neta ma, este cabron no contesta, pero como el sigue con sus estupideses te tengo algo mejor...",
};

function FloralCornerSmall({ className = "", color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`size-8 ${className}`} aria-hidden>
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

type Props = {
  src: string | null;
  label: string;
  name: string;
  onZoom?: (side: "front" | "back") => void;
};

export function FlipCard({ src, label, name, onZoom }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [surpriseOpened, setSurpriseOpened] = useState(false);
  const [sparkleKey, setSparkleKey] = useState(0);
  const accent = ACCENTS[name] ?? ACCENTS.default;
  const message = MESSAGES[name];

  const triggerFlip = () => {
    setFlipped((f) => !f);
    setSparkleKey((k) => k + 1);
  };

  const sparkles = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 60 + Math.random() * 90;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const size = 6 + Math.random() * 12;
    const delay = Math.random() * 120;
    return { i, dx, dy, size, delay };
  });

  return (
    <div className="flex flex-col items-center animate-fade-up w-full">
      <div
        className="relative w-full"
        style={{ aspectRatio: "2 / 3", perspective: "1800px" }}
      >
        <div
          className="relative w-full h-full transition-transform duration-[900ms] cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          onClick={triggerFlip}
          role="button"
          tabIndex={0}
          aria-label={`${label} — clic para ${flipped ? "ver portada" : "ver mensaje"}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              triggerFlip();
            }
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 gold-frame shadow-keepsake hover:shadow-glow transition-shadow"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <div
              className="relative w-full h-full rounded-md overflow-hidden flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.97 0.025 85) 0%, oklch(0.94 0.035 80) 100%)",
              }}
            >
              {/* Inner mat padding so image sits nicely inside the gold frame */}
              <div className="absolute inset-[4px] sm:inset-[6px] flex items-center justify-center">
                {src ? (
                  <img
                    src={src}
                    alt={label}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                    draggable={false}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-4 text-royal/60">
                    <Heart className="size-10 mb-3 text-gold/60" />
                    <p className="font-script text-2xl mb-2">Próximamente</p>
                  </div>
                )}
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-md" />
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-md shadow-keepsake"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              padding: "10px",
              background: `linear-gradient(135deg, ${accent.border}, oklch(0.78 0.13 75), ${accent.border})`,
              boxShadow: `0 20px 50px -20px ${accent.glow}`,
            }}
          >
            <div
              className="relative w-full h-full rounded-md overflow-hidden flex flex-col"
              style={{
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
                className="pointer-events-none absolute inset-2 border rounded-sm"
                style={{ borderColor: accent.border, opacity: 0.7 }}
              />
              <div
                className="pointer-events-none absolute inset-3 border rounded-sm"
                style={{ borderColor: accent.flourish, opacity: 0.3 }}
              />
              <FloralCornerSmall className="absolute top-1 left-1" color={accent.flourish} />
              <FloralCornerSmall className="absolute top-1 right-1 -scale-x-100" color={accent.flourish} />
              <FloralCornerSmall className="absolute bottom-1 left-1 -scale-y-100" color={accent.flourish} />
              <FloralCornerSmall className="absolute bottom-1 right-1 -scale-100" color={accent.flourish} />

              <div
                className="relative flex-1 overflow-y-auto px-6 sm:px-8 pt-10 pb-14 flex flex-col items-center text-center"
              >
                {name === "Edgar" ? (
                  <div className="relative w-full flex-1 flex items-center justify-center">
                    <div
                      aria-hidden
                      className="absolute inset-x-6 bottom-6 h-6 rounded-full"
                      style={{
                        background: "radial-gradient(ellipse at center, oklch(0.32 0.14 265 / 0.25) 0%, transparent 70%)",
                        filter: "blur(6px)",
                      }}
                    />
                    <img
                      src={edgarFlex}
                      alt="Edgar"
                      draggable={false}
                      style={{
                        maxWidth: "92%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        filter: "drop-shadow(0 12px 18px oklch(0.32 0.14 265 / 0.28))",
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <p
                      className="font-script text-2xl sm:text-3xl mb-3"
                      style={{ color: accent.text }}
                    >
                      {label}
                    </p>
                    <div
                      className="h-px w-16 mb-4"
                      style={{ background: accent.flourish, opacity: 0.5 }}
                    />
                    {message ? (
                      <p
                        className="font-body text-sm sm:text-base leading-relaxed whitespace-pre-line"
                        style={{ color: accent.text }}
                      >
                        {message}
                      </p>
                    ) : (
                      <div className="flex flex-col items-center gap-3 mt-4" style={{ color: accent.text }}>
                        <Heart className="size-8 opacity-50" />
                        <p className="font-script text-xl italic opacity-80">
                          Mensaje próximamente
                        </p>
                      </div>
                    )}
                    {name === "Martin" && (
                      <div className="relative mt-6 flex flex-col items-center">
                        {!surpriseOpened && (
                          <div
                            className="mb-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cream border-2 shadow-keepsake animate-bounce"
                            style={{ borderColor: accent.border, color: accent.text }}
                          >
                            ¡Click me!
                            <span
                              className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 border-r-2 border-b-2"
                              style={{ background: "var(--cream, oklch(0.97 0.025 85))", borderColor: accent.border }}
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSurpriseOpened(true);
                            setSurpriseOpen(true);
                          }}
                          aria-label="Abrir sorpresa"
                          className="inline-flex items-center justify-center rounded-full p-3 bg-cream/80 border-2 hover:bg-cream hover:scale-110 active:scale-95 transition-transform shadow-keepsake animate-envelope-wobble cursor-pointer"
                          style={{ borderColor: accent.border, color: accent.text, boxShadow: `0 8px 24px -8px ${accent.glow}` }}
                        >
                          <Mail className="size-9" strokeWidth={1.6} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); triggerFlip(); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream/90 border text-xs uppercase tracking-[0.2em] hover:bg-cream transition shadow"
                  style={{ borderColor: accent.border, color: accent.text }}
                >
                  <RotateCcw className="size-3" />
                  Voltear
                </button>
                {onZoom && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onZoom("back"); }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream/90 border text-xs uppercase tracking-[0.2em] hover:bg-cream transition shadow"
                    style={{ borderColor: accent.border, color: accent.text }}
                  >
                    <Maximize2 className="size-3" />
                    Ver grande
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sparkle burst on flip */}
        <div
          key={sparkleKey}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 overflow-visible"
        >
          {sparkleKey > 0 &&
            sparkles.map((s) => (
              <span
                key={s.i}
                className="flip-sparkle"
                style={{
                  ["--dx" as never]: `${s.dx}px`,
                  ["--dy" as never]: `${s.dy}px`,
                  ["--c" as never]: accent.flourish,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  animationDelay: `${s.delay}ms`,
                } as React.CSSProperties}
              />
            ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-2">
        <span className="font-script text-2xl md:text-3xl text-royal">
          {label}
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {name}
        </span>
        <div className="mt-2 flex items-center gap-2 flex-wrap justify-center">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); triggerFlip(); }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cream border border-gold/50 text-royal text-[11px] uppercase tracking-[0.22em] hover:shadow-glow shadow-keepsake transition"
          >
            <RotateCcw className="size-3.5 text-gold" />
            Voltear
          </button>
          {onZoom && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onZoom(flipped ? "back" : "front"); }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cream border border-gold/50 text-royal text-[11px] uppercase tracking-[0.22em] hover:shadow-glow shadow-keepsake transition"
            >
              <Maximize2 className="size-3.5 text-gold" />
              Ver grande
            </button>
          )}
        </div>
      </div>
      {surpriseOpen && <SurprisePopup onClose={() => setSurpriseOpen(false)} />}
    </div>
  );
}
