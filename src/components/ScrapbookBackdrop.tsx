import type { CSSProperties } from "react";
import family1 from "@/assets/family-1.png";
import family2 from "@/assets/family-2.png";
import family3 from "@/assets/family-3.png";
import family4 from "@/assets/family-4.png";
import family5 from "@/assets/family-5.png";
import family6 from "@/assets/family-6.png";
import family7 from "@/assets/family-7.png";
import momCenter from "@/assets/mom-centerpiece.png";

type Polaroid = {
  src: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  rotate: number;
  opacity: number;
  z?: number;
};

const POLAROIDS: Polaroid[] = [
  { src: family1, top: "4%",  left: "1%",   width: "clamp(120px,14vw,210px)", rotate: -7, opacity: 0.55 },
  { src: family3, top: "26%", left: "-1%",  width: "clamp(110px,12vw,180px)", rotate: 5,  opacity: 0.5 },
  { src: family5, top: "55%", left: "1%",   width: "clamp(120px,13vw,200px)", rotate: -4, opacity: 0.55 },
  { src: family7, top: "82%", left: "2%",   width: "clamp(120px,14vw,210px)", rotate: 6,  opacity: 0.5 },
  { src: family2, top: "6%",  right: "1%",  width: "clamp(120px,14vw,210px)", rotate: 6,  opacity: 0.55 },
  { src: family4, top: "30%", right: "-1%", width: "clamp(110px,12vw,180px)", rotate: -5, opacity: 0.5 },
  { src: family6, top: "60%", right: "1%",  width: "clamp(120px,13vw,200px)", rotate: 4,  opacity: 0.55 },
  { src: family1, top: "85%", right: "2%",  width: "clamp(110px,12vw,180px)", rotate: -6, opacity: 0.45 },
];

function Polaroid({ p }: { p: Polaroid }) {
  return (
    <div
      className="absolute"
      style={{
        top: p.top,
        bottom: p.bottom,
        left: p.left,
        right: p.right,
        width: p.width,
        transform: `rotate(${p.rotate}deg)`,
        opacity: p.opacity,
        zIndex: p.z ?? 0,
        background: "oklch(0.98 0.012 85)",
        padding: "8px 8px 28px",
        boxShadow:
          "0 18px 36px -18px oklch(0.32 0.14 265 / 0.45), 0 4px 10px -4px oklch(0 0 0 / 0.18)",
        borderRadius: "3px",
        filter: "saturate(0.92)",
      }}
    >
      <div style={{ aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "2px" }}>
        <img
          src={p.src}
          alt=""
          aria-hidden
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
}

function Rose({ className = "", color = "oklch(0.7 0.15 15)", style }: { className?: string; color?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden>
      <g fill={color} opacity="0.85">
        <circle cx="32" cy="32" r="9" />
        <path d="M32 14c5 4 9 9 9 14s-4 10-9 10-9-5-9-10 4-10 9-14z" opacity="0.7" />
        <path d="M14 32c4-5 9-9 14-9s10 4 10 9-5 9-10 9-10-4-14-9z" opacity="0.7" />
        <path d="M50 32c-4 5-9 9-14 9s-10-4-10-9 5-9 10-9 10 4 14 9z" opacity="0.55" />
        <path d="M32 50c-5-4-9-9-9-14s4-10 9-10 9 5 9 10-4 10-9 14z" opacity="0.55" />
      </g>
      <g fill="oklch(0.6 0.15 145)" opacity="0.8">
        <path d="M10 48 q 10 -8 22 -4" stroke="oklch(0.55 0.15 145)" strokeWidth="1.2" fill="none" />
        <path d="M16 50 q 4 -6 10 -6 q -2 6 -10 6 z" />
      </g>
    </svg>
  );
}

function Leaf({ className = "", rotate = 0, style }: { className?: string; rotate?: number; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 80 40"
      className={className}
      style={{ ...style, transform: `${style?.transform ?? ""} rotate(${rotate}deg)` }}
      aria-hidden
    >
      <g fill="none" stroke="oklch(0.55 0.13 145)" strokeWidth="1.2" opacity="0.7">
        <path d="M2 20 Q 30 -2 78 18" />
        <path d="M14 18 q 6 -8 14 -6" />
        <path d="M30 14 q 6 -8 16 -4" />
        <path d="M48 12 q 6 -6 18 -2" />
      </g>
      <g fill="oklch(0.65 0.15 145)" opacity="0.55">
        <ellipse cx="22" cy="14" rx="6" ry="3" transform="rotate(-25 22 14)" />
        <ellipse cx="40" cy="10" rx="7" ry="3.2" transform="rotate(-20 40 10)" />
        <ellipse cx="58" cy="9"  rx="7" ry="3" transform="rotate(-15 58 9)" />
      </g>
    </svg>
  );
}

function Sparkle({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" fill="oklch(0.85 0.14 80)" opacity="0.85" />
    </svg>
  );
}

export function ScrapbookBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, oklch(0.99 0.02 85) 0%, oklch(0.965 0.03 80) 45%, oklch(0.93 0.045 78) 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(0.32 0.14 265) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "clamp(280px, 38vw, 520px)",
          opacity: 0.18,
          filter: "blur(1.5px) saturate(0.85)",
          mixBlendMode: "multiply",
        }}
      >
        <div
          style={{
            aspectRatio: "3 / 4",
            background: `url(${momCenter}) center/cover no-repeat`,
            borderRadius: "50% / 42%",
            boxShadow: "0 0 120px 40px oklch(0.97 0.025 85) inset",
          }}
        />
      </div>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "clamp(360px, 46vw, 640px)",
          aspectRatio: "1 / 1.15",
          border: "1px dashed oklch(0.78 0.13 75 / 0.35)",
          opacity: 0.6,
        }}
      />

      {POLAROIDS.map((p, i) => (
        <Polaroid p={p} key={i} />
      ))}

      <Rose  className="absolute size-20 md:size-28" style={{ top: "1%",  left: "12%",  transform: "rotate(-15deg)", opacity: 0.55 }} />
      <Rose  className="absolute size-16 md:size-24" style={{ top: "0%",  right: "14%", transform: "rotate(20deg)",  opacity: 0.55 }} color="oklch(0.78 0.14 5)" />
      <Rose  className="absolute size-20 md:size-28" style={{ bottom: "2%", left: "18%", transform: "rotate(15deg)", opacity: 0.5 }} color="oklch(0.72 0.15 25)" />
      <Rose  className="absolute size-16 md:size-24" style={{ bottom: "3%", right: "20%", transform: "rotate(-10deg)", opacity: 0.55 }} color="oklch(0.7 0.15 15)" />

      <Leaf className="absolute w-40 md:w-64" style={{ top: "16%", left: "18%" }} rotate={-10} />
      <Leaf className="absolute w-40 md:w-64" style={{ top: "18%", right: "18%" }} rotate={190} />
      <Leaf className="absolute w-40 md:w-64" style={{ bottom: "14%", left: "16%" }} rotate={170} />
      <Leaf className="absolute w-40 md:w-64" style={{ bottom: "12%", right: "16%" }} rotate={-15} />

      <Sparkle className="absolute size-5" style={{ top: "12%", left: "44%" }} />
      <Sparkle className="absolute size-3" style={{ top: "22%", left: "60%" }} />
      <Sparkle className="absolute size-4" style={{ top: "70%", left: "38%" }} />
      <Sparkle className="absolute size-3" style={{ top: "55%", right: "42%" }} />
      <Sparkle className="absolute size-4" style={{ bottom: "20%", right: "48%" }} />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.985 0.012 85 / 0.85) 0%, oklch(0.985 0.012 85 / 0.55) 45%, transparent 80%)",
        }}
      />
    </div>
  );
}
