import { createFileRoute } from "@tanstack/react-router";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Heart, Sparkles, BookOpen, ChevronRight } from "lucide-react";
import cardAlex from "@/assets/card-alex.png";
import cardMartin from "@/assets/card-martin.png";
import cardIly from "@/assets/card-ily.png";
import cardEdgar from "@/assets/card-edgar.png";
import cardAri from "@/assets/card-ari.png";
import cardMax from "@/assets/card-max.png";
import cardDad from "@/assets/card-dad.png";
import cardNancy from "@/assets/card-nancy.png";
import cardHero from "@/assets/card-hero.png";
import cardHeroMain from "@/assets/card-hero-main.png";
import { type CardItem } from "@/components/CardLightbox";
import { FloralDivider } from "@/components/FloralDivider";
import { ClickerPicker } from "@/components/ClickerPicker";
import { FlipCard } from "@/components/FlipCard";
import { ScrapbookBackdrop } from "@/components/ScrapbookBackdrop";
import { CardCloseup } from "@/components/CardCloseup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa de Mamá — Un rincón de amor para Mamá" },
      {
        name: "description",
        content:
          "Un álbum digital de tarjetas, recuerdos y palabras de amor de toda la familia para celebrar el Día de las Madres.",
      },
      { property: "og:title", content: "Casa de Mamá" },
      {
        property: "og:description",
        content: "Un rincón de amor para la reina de nuestra familia.",
      },
      { property: "og:image", content: cardHero },
    ],
  }),
  component: Index,
});

const cards: CardItem[] = [
  { src: cardAlex, label: "De Tu Primer Hijo", name: "Alex" },
  { src: cardMartin, label: "De Tu Segundo Hijo", name: "Martin" },
  { src: cardIly, label: "De Tu Hija", name: "Ily" },
  { src: cardEdgar, label: "De Tu Hijo Favorito", name: "Edgar" },
  { src: cardAri, label: "From Your First Granddaughter", name: "Ari" },
  { src: cardMax, label: "From Max", name: "Max" },
  { src: cardDad, label: "De Tu Esposo", name: "Dad" },
  { src: cardNancy, label: "De Tu Nuera Nancy", name: "Nancy" },
];

function Index() {
  
  const [bookOpen, setBookOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [pageTurning, setPageTurning] = useState(false);
  const letterRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const [closeProgress, setCloseProgress] = useState(0);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const [zoomSide, setZoomSide] = useState<"front" | "back">("front");

  const handleOpenBook = () => {
    if (bookOpen) return;
    setBookOpen(true);
    window.setTimeout(() => {
      setRevealed(true);
      window.setTimeout(() => {
        letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }, 1100);
  };

  const handleNextPage = () => {
    if (showGallery) {
      galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setPageTurning(true);
    window.setTimeout(() => {
      setShowGallery(true);
      setPageTurning(false);
      window.setTimeout(() => {
        galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }, 850);
  };

  const handleBackToLetter = () => {
    letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const CLOSE_AT = 80;
    const RANGE = 600;
    const onScroll = () => {
      const y = window.scrollY;
      const progress = Math.max(0, Math.min(1, (RANGE - y) / (RANGE - CLOSE_AT)));
      setCloseProgress(progress);
      if (y < CLOSE_AT) {
        setBookOpen((wasOpen) => {
          if (wasOpen) {
            setRevealed(false);
            setShowGallery(false);
          }
          return false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative min-h-screen">
      <ScrapbookBackdrop />
      <div className="relative" style={{ zIndex: 1 }}>
      <ClickerPicker />
      <BookCloseProgress visible={bookOpen && revealed} progress={closeProgress} />
      {/* HERO / BOOK COVER */}
      <section className="relative overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, oklch(0.32 0.14 265) 1px, transparent 2px), radial-gradient(circle at 70% 60%, oklch(0.78 0.13 75) 1px, transparent 2px)",
            backgroundSize: "60px 60px, 80px 80px",
          }}
        />
        <FloatingPetals />
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 mb-6 text-gold animate-fade-up">
            <Sparkles className="size-4" />
            <span className="font-script text-2xl">Feliz Día de las Madres</span>
            <Sparkles className="size-4" />
          </div>
          <h1
            className="font-script text-6xl md:text-8xl lg:text-9xl gradient-gold-text leading-none mb-4 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Casa de Mamá
          </h1>
          <p
            className="font-display text-xl md:text-2xl text-royal italic mb-12 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            Un rincón de amor para celebrar a Mamá
          </p>

          {/* BOOK */}
          <div
            className="relative mx-auto book-perspective animate-fade-up"
            style={{ animationDelay: "0.45s", maxWidth: "600px" }}
          >
            {/* Soft gold glow halo */}
            <div
              aria-hidden
              className="absolute -inset-8 md:-inset-12 rounded-[2.5rem] blur-3xl opacity-60 pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, oklch(0.78 0.13 75 / 0.55), transparent 70%)",
              }}
            />

            {/* Book wrapper */}
            <div
              className="relative mx-auto"
              style={{ aspectRatio: "1041 / 1471" }}
            >
              {/* Inner pages (visible behind/under cover when open) */}
              <div className="book-pages" />
              {/* Spine */}
              <div className="book-spine" />

              {/* Cover (the artwork) */}
              <button
                type="button"
                onClick={handleOpenBook}
                aria-label="Abrir el libro de Mamá"
                className={`book-cover absolute inset-0 gold-frame shadow-keepsake hover:shadow-glow ${
                  bookOpen ? "is-open" : ""
                }`}
                style={{ borderRadius: "calc(var(--radius))" }}
              >
                <CornerAccent className="absolute -top-3 -left-3 size-8 z-10" />
                <CornerAccent className="absolute -top-3 -right-3 size-8 rotate-90 z-10" />
                <CornerAccent className="absolute -bottom-3 -left-3 size-8 -rotate-90 z-10" />
                <CornerAccent className="absolute -bottom-3 -right-3 size-8 rotate-180 z-10" />
                <div
                  className="relative w-full h-full bg-cream rounded-md overflow-hidden flex items-center justify-center"
                >
                  <img
                    src={cardHeroMain}
                    alt="Feliz Día de las Madres — La Reina de Nuestro Jardín"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/40 rounded-md" />
                  <div className="book-shimmer" />
                </div>
              </button>
            </div>

            {/* Open prompt */}
            <div
              className={`mt-8 flex flex-col items-center gap-3 transition-opacity duration-500 ${
                bookOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <button
                onClick={handleOpenBook}
                className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-royal text-cream font-display text-base md:text-lg shadow-keepsake hover:shadow-glow transition-all duration-500 hover:scale-105"
              >
                <BookOpen className="size-5 text-gold" />
                Haz clic para abrir
                <Heart className="size-4 fill-gold text-gold animate-shimmer" />
              </button>
              <p className="font-script text-xl text-royal/70">Open the book</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSIDE THE BOOK — revealed after open */}
      {revealed && (
        <>
          <LetterPage
            ref={letterRef}
            onNext={handleNextPage}
            turning={pageTurning}
          />

          {showGallery && (
            <>
              <section
                id="gallery"
                ref={galleryRef}
                className="relative px-6 pb-24 animate-page-flip"
              >
                <FloralDivider />
                <div className="max-w-7xl mx-auto text-center mb-6">
                  <div className="inline-block px-8 py-3 rounded-full border border-gold/40 bg-cream/60 backdrop-blur-sm mb-8">
                    <p className="font-script text-2xl md:text-3xl text-royal">
                      Pasa adelante, Mamá. Esta casa está llena de amor para ti.
                    </p>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-royal mb-4 leading-tight max-w-4xl mx-auto text-balance">
                    De <span style={{ color: "oklch(0.55 0.2 25)" }}>tu esposo</span>, <span style={{ color: "oklch(0.5 0.2 305)" }}>tus hijos</span>, <span style={{ color: "oklch(0.55 0.17 145)" }}>tus nietos</span>, y Nancy
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Cada tarjeta guarda un pedacito de amor, recuerdos, y gratitud para ti.
                  </p>
                  <button
                    onClick={handleBackToLetter}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/50 bg-cream/70 text-royal hover:text-gold hover:shadow-glow transition text-sm uppercase tracking-[0.2em]"
                  >
                    <BookOpen className="size-4" />
                    Volver a la carta
                  </button>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12">
                  {cards.map((card, i) => (
                    <div
                      key={card.name}
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <FlipCard
                        src={card.src}
                        label={card.label}
                        name={card.name}
                        onZoom={(side) => { setZoomSide(side); setZoomIndex(i); }}
                      />
                    </div>
                  ))}
                </div>
              </section>

              <footer className="relative bg-gradient-to-b from-transparent to-secondary/60 px-6 pt-8 pb-16 text-center animate-reveal">
                <FloralDivider />
                <p className="font-display italic text-2xl md:text-3xl text-royal max-w-3xl mx-auto leading-relaxed">
                  “Todos somos parte de tu jardín, y todos florecemos gracias a ti.”
                </p>
                <div className="mt-10 flex items-center justify-center gap-3 text-gold">
                  <span className="h-px w-12 bg-gold/60" />
                  <Heart className="size-4 fill-gold" />
                  <span className="h-px w-12 bg-gold/60" />
                </div>
                <p className="mt-8 font-script text-3xl md:text-4xl gradient-gold-text">
                  With all our love,
                </p>
                <p className="font-display text-xl md:text-2xl text-royal mt-2">
                  Happy Mother's Day, Mamá.
                </p>
              </footer>
            </>
          )}
        </>
      )}
      </div>
      {zoomIndex !== null && (
        <CardCloseup
          cards={cards}
          index={zoomIndex}
          initialSide={zoomSide}
          onClose={() => setZoomIndex(null)}
          onPrev={() => setZoomIndex((i) => (i === null ? null : (i - 1 + cards.length) % cards.length))}
          onNext={() => setZoomIndex((i) => (i === null ? null : (i + 1) % cards.length))}
        />
      )}
    </main>
  );
}

const LetterPage = forwardRef<HTMLElement, { onNext: () => void; turning: boolean }>(
  function LetterPage({ onNext, turning }, ref) {
    return (
      <section
        ref={ref}
        className={`relative px-4 sm:px-6 py-16 md:py-24 animate-reveal ${
          turning ? "animate-page-turn" : ""
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-md shadow-keepsake border border-gold/40 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.965 0.03 85) 0%, oklch(0.94 0.04 78) 100%)",
              backgroundImage: [
                "radial-gradient(circle at 12% 18%, oklch(0.78 0.13 75 / 0.10) 0%, transparent 35%)",
                "radial-gradient(circle at 88% 82%, oklch(0.88 0.06 25 / 0.18) 0%, transparent 40%)",
                "radial-gradient(circle at 50% 50%, oklch(0.32 0.14 265 / 0.03) 0%, transparent 70%)",
                "linear-gradient(135deg, oklch(0.965 0.03 85) 0%, oklch(0.94 0.04 78) 100%)",
              ].join(", "),
            }}
          >
            {/* Inner gold border */}
            <div className="pointer-events-none absolute inset-3 sm:inset-5 border border-gold/40 rounded-sm" />
            <div className="pointer-events-none absolute inset-4 sm:inset-6 border border-gold/20 rounded-sm" />

            {/* Floral corners */}
            <FloralCorner className="absolute top-2 left-2 sm:top-3 sm:left-3" />
            <FloralCorner className="absolute top-2 right-2 sm:top-3 sm:right-3 -scale-x-100" />
            <FloralCorner className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 -scale-y-100" />
            <FloralCorner className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 -scale-100" />

            <div className="relative px-6 sm:px-12 md:px-16 py-12 md:py-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 text-gold mb-3">
                  <Heart className="size-4 fill-gold" />
                  <span className="uppercase tracking-[0.3em] text-xs">Página 1</span>
                  <Heart className="size-4 fill-gold" />
                </div>
                <h2 className="font-script text-5xl md:text-7xl gradient-gold-text leading-none">
                  Para Mamá
                </h2>
                <p className="font-display italic text-royal/70 mt-2">
                  Una carta del corazón
                </p>
                <FloralDivider />
              </div>

              <div className="font-body text-royal text-base md:text-lg leading-[1.85] space-y-5">
                <p className="font-script text-3xl text-royal mb-2">Hey Mamá,</p>
                <p>
                  Unfortunately, I couldn't be there in person today, and that hurts
                  me a little more as the years pass and I find myself home a little
                  less. But even though I'm not there physically, I wanted to make
                  this extra special for you, because that's exactly what you are to me.
                </p>
                <p>
                  No matter how far I am, I always want you to feel the love you
                  deserve. Whether I'm one foot away or a few states away, you are
                  always close to my heart.
                </p>
                <p>
                  Aunque no estoy ahí ahorita, deseo que tengas el mejor día posible,
                  porque te lo mereces más que nadie. Eres la mujer más paciente,
                  trabajadora y amable que he conocido en mi vida. Eres la mujer que
                  me ha dado tantos ejemplos de fuerza, amor, sacrificio y bondad.
                </p>
                <p>
                  Tú no solamente eres mi mamá. Eres mi hogar, mi apoyo, mi ejemplo
                  y una de las razones por las que siempre quiero seguir adelante.
                  Todo lo bueno que soy lleva un pedacito de ti.
                </p>
                <p>
                  Gracias por todo lo que has hecho por mí, por mis hermanos, por
                  tus nietos, y por nuestra familia. Gracias por cada sacrificio,
                  cada consejo, cada abrazo, cada regaño, cada comida, cada risa, y
                  cada momento en el que nos has dado tu amor sin pedir nada a cambio.
                </p>
                <p>
                  Espero que esta pequeña página te recuerde cuánto te queremos y
                  cuánto significas para todos nosotros. Aunque ningún regalo puede
                  igualar todo lo que tú nos has dado, espero que esto te haga
                  sonreír y sentir lo amada que eres.
                </p>
                <p className="font-display italic text-xl">
                  Feliz Día de las Madres, Mamá.
                </p>
                <div className="pt-2">
                  <p>Te amo muchísimo,</p>
                  <p className="font-script text-5xl gradient-gold-text leading-none mt-2">
                    Edgar
                  </p>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center gap-3">
                <p className="font-script text-2xl text-royal/80">
                  Hay más amor esperándote.
                </p>
                <button
                  onClick={onNext}
                  className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-royal text-cream font-display text-base md:text-lg shadow-keepsake hover:shadow-glow transition-all duration-500 hover:scale-105"
                >
                  Siguiente página
                  <ChevronRight className="size-5 text-gold transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={`size-12 sm:size-16 text-gold/70 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M4 4 Q 30 6 40 28 Q 50 6 76 4" />
      <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="22" cy="22" r="2" fill="currentColor" opacity="0.5" />
      <path
        d="M8 8 Q 18 18 28 18 Q 22 26 22 36"
        opacity="0.6"
      />
      <path d="M40 12 q -3 -4 -7 -4 q 0 6 7 10 q 7 -4 7 -10 q -4 0 -7 4 z" fill="currentColor" opacity="0.5" />
      <circle cx="40" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}
function CornerAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-6 text-gold drop-shadow-sm ${className}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
    </svg>
  );
}

function FloatingPetals() {
  const petals = Array.from({ length: 8 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map((_, i) => (
        <div
          key={i}
          className="absolute animate-shimmer"
          style={{
            top: `${(i * 13) % 90}%`,
            left: `${(i * 23) % 95}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <svg viewBox="0 0 20 20" className="size-3 md:size-4 text-gold/50" fill="currentColor">
            <path d="M10 2c-1 3-3 5-6 6 3 1 5 3 6 6 1-3 3-5 6-6-3-1-5-3-6-6z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

function BookCloseProgress({ visible, progress }: { visible: boolean; progress: number }) {
  const size = 56;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * progress;
  const nearClose = progress > 0.85;
  return (
    <div
      aria-hidden={!visible}
      className={`fixed top-5 right-5 z-40 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
    >
      <div className="relative flex items-center justify-center rounded-full bg-cream/90 backdrop-blur-md border border-gold/40 shadow-keepsake p-1.5">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="oklch(0.78 0.13 75 / 0.2)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#bcp-gold)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
            style={{ transition: "stroke-dasharray 0.15s linear" }}
          />
          <defs>
            <linearGradient id="bcp-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.12 80)" />
              <stop offset="100%" stopColor="oklch(0.72 0.14 70)" />
            </linearGradient>
          </defs>
        </svg>
        <BookOpen
          className={`absolute size-5 transition-colors ${
            nearClose ? "text-gold" : "text-royal/70"
          }`}
        />
      </div>
      <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-royal/70 text-center font-display">
        {nearClose ? "Cerrar libro" : "Volver arriba"}
      </p>
    </div>
  );
}
