import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MousePointer2, X } from "lucide-react";
import emilio from "@/assets/clicker-emilio.png";
import luca from "@/assets/clicker-luca.png";
import max from "@/assets/clicker-max.png";
import ari from "@/assets/clicker-ari.png";
import dad from "@/assets/clicker-dad.png";
import ily from "@/assets/clicker-ily.png";
import alex from "@/assets/clicker-alex.png";
import cruz from "@/assets/clicker-cruz.png";
import bulmaro from "@/assets/clicker-bulmaro.png";
import emilioAlt from "@/assets/clicker-emilio-alt.png";
import mikey from "@/assets/clicker-mikey.png";

type Clicker = { id: string; name: string; src: string };

const CLICKERS: Clicker[] = [
  { id: "emilio", name: "Emilio", src: emilio },
  { id: "luca", name: "Luca", src: luca },
  { id: "max", name: "Max", src: max },
  { id: "ari", name: "Ari", src: ari },
  { id: "dad", name: "Dad", src: dad },
  { id: "ily", name: "Ily", src: ily },
  { id: "alex", name: "Alex", src: alex },
  { id: "cruz", name: "Cruz", src: cruz },
  { id: "bulmaro", name: "Bulmaro", src: bulmaro },
  { id: "emilio-alt", name: "Emilio (alt)", src: emilioAlt },
  { id: "mikey", name: "Mikey", src: mikey },
];

const STORAGE_KEY = "casa-mama:clicker";
const PICKED_KEY = "casa-mama:clicker-picked";
const SIZE_KEY = "casa-mama:clicker-size";
const DEFAULT_ID = "max";

type SizeKey = "sm" | "md" | "lg" | "xl";
const SIZES: { key: SizeKey; label: string; px: number }[] = [
  { key: "sm", label: "S", px: 60 },
  { key: "md", label: "M", px: 90 },
  { key: "lg", label: "L", px: 130 },
  { key: "xl", label: "XL", px: 180 },
];

export function ClickerPicker() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_ID);
  const [hasPicked, setHasPicked] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [sizeKey, setSizeKey] = useState<SizeKey>("md");
  const cursorRef = useRef<HTMLDivElement | null>(null);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && CLICKERS.find((c) => c.id === saved)) {
      setSelectedId(saved);
    }
    const savedSize = localStorage.getItem(SIZE_KEY) as SizeKey | null;
    if (savedSize && SIZES.find((s) => s.key === savedSize)) {
      setSizeKey(savedSize);
    }
    setHasPicked(localStorage.getItem(PICKED_KEY) === "1");

    const mq = window.matchMedia("(pointer: coarse)");
    setIsCoarse(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Hide native cursor on desktop while custom cursor is active
  useEffect(() => {
    if (isCoarse) {
      document.documentElement.classList.remove("clicker-active");
      return;
    }
    document.documentElement.classList.add("clicker-active");
    return () => document.documentElement.classList.remove("clicker-active");
  }, [isCoarse]);

  // Follow mouse
  useEffect(() => {
    if (isCoarse) return;
    const el = cursorRef.current;
    if (!el) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          raf = 0;
        });
      }
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    const onEnter = () => {
      el.style.opacity = "1";
    };
    const spawnFlame = (cx: number, cy: number) => {
      const burst = document.createElement("div");
      burst.className = "flame-burst";
      burst.style.left = `${cx}px`;
      burst.style.top = `${cy}px`;
      const particleCount = 14;
      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("span");
        p.className = "flame-particle";
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.4;
        const dist = 40 + Math.random() * 40;
        p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
        p.style.animationDelay = `${Math.random() * 60}ms`;
        burst.appendChild(p);
      }
      const core = document.createElement("span");
      core.className = "flame-core";
      burst.appendChild(core);
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 750);
    };
    const onDown = (e: MouseEvent) => {
      el.classList.add("is-down");
      spawnFlame(e.clientX, e.clientY);
    };
    const onUp = () => {
      el.classList.remove("is-down");
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isCoarse]);

  const selected = CLICKERS.find((c) => c.id === selectedId) ?? CLICKERS[2];

  const choose = (c: Clicker) => {
    setSelectedId(c.id);
    localStorage.setItem(STORAGE_KEY, c.id);
    if (!hasPicked) {
      localStorage.setItem(PICKED_KEY, "1");
      setHasPicked(true);
    }
  };

  const sizePx = (SIZES.find((s) => s.key === sizeKey) ?? SIZES[1]).px;

  return (
    <>
      {/* Floating custom cursor */}
      {!isCoarse &&
        createPortal(
          <div
            ref={cursorRef}
            aria-hidden
            className="clicker-cursor"
            style={{
              backgroundImage: `url(${selected.src})`,
              width: `${sizePx}px`,
              height: `${sizePx}px`,
            }}
          />,
          document.body
        )}

      {/* Pick Clicker button */}
      <button
        id="pick-clicker-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Pick Clicker"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-royal text-cream shadow-keepsake hover:shadow-glow transition border border-gold/40 font-display text-sm"
      >
        <MousePointer2 className="size-4 text-gold" />
        Pick Clicker
      </button>

      {/* Floating arrow prompt — shown until first manual pick */}
      {!hasPicked && !open && (
        <div
          className="fixed z-50 pointer-events-none flex flex-col items-end"
          style={{ bottom: "70px", right: "24px" }}
        >
          <div className="flex flex-col items-center mr-3 mb-1 animate-arrow-bounce">
            <span className="font-script text-2xl text-gold drop-shadow mb-1">
              Pick your clicker
            </span>
            <svg
              width="42"
              height="56"
              viewBox="0 0 42 56"
              fill="none"
              className="text-gold drop-shadow"
            >
              <path
                d="M21 4 C 21 24, 21 36, 21 50"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M10 38 L 21 52 L 32 38"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Picker modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-cream rounded-2xl shadow-glow border border-gold/40 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gold/10 text-royal/70"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <div className="text-center mb-5">
              <h2 className="font-script text-3xl gradient-gold-text">Pick your Clicker</h2>
              <p className="text-sm text-muted-foreground">
                Choose a face to use as your cursor.
              </p>
            </div>

            {/* Cursor size toggle */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mr-1">
                Size
              </span>
              {SIZES.map((s) => {
                const active = sizeKey === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => {
                      setSizeKey(s.key);
                      localStorage.setItem(SIZE_KEY, s.key);
                    }}
                    className={`min-w-9 px-3 py-1.5 rounded-full text-xs font-display border transition ${
                      active
                        ? "bg-royal text-cream border-gold shadow-glow"
                        : "bg-cream text-royal border-gold/30 hover:border-gold"
                    }`}
                    aria-pressed={active}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {CLICKERS.map((c) => {
                const active = selectedId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => choose(c)}
                    className={`group flex flex-col items-center gap-2 p-2 rounded-xl transition ${
                      active
                        ? "bg-gold/15 ring-2 ring-gold"
                        : "hover:bg-gold/5 ring-1 ring-transparent"
                    }`}
                  >
                    <div
                      className={`relative size-16 md:size-20 rounded-full overflow-hidden flex items-center justify-center ${
                        active ? "ring-2 ring-gold shadow-glow" : ""
                      }`}
                    >
                      <img
                        src={c.src}
                        alt={c.name}
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    </div>
                    <span className="text-xs font-display text-royal">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
