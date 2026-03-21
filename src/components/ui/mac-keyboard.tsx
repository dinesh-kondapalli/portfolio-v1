"use client";

import {
  Browsers,
  MagnifyingGlass,
  Microphone,
  Moon,
  PlayPause,
  SkipBack,
  SkipForward,
  SpeakerSimpleHigh,
  SpeakerSimpleLow,
  SpeakerSimpleSlash,
  Sun,
  SunDim,
} from "@phosphor-icons/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronUp,
  Command,
  Globe,
  Option,
} from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const fRowIconClass =
  "size-[11px] shrink-0 text-zinc-100 sm:size-[13px] lg:size-[15px]";
const fRowIconProps = {
  className: fRowIconClass,
  weight: "regular" as const,
  "aria-hidden": true,
};

// Context to share active keys state and OS Caps Lock (modifier) state
const KeyboardContext = React.createContext<{
  activeKeys: Set<string>;
  capsLockOn: boolean;
}>({
  activeKeys: new Set(),
  capsLockOn: false,
});

function CapsLockIndicator() {
  const { capsLockOn } = React.useContext(KeyboardContext);
  return (
    <div
      aria-hidden
      className={cn(
        "absolute top-1.5 left-3 size-[5px] rounded-full transition-all duration-200",
        capsLockOn
          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
          : "bg-zinc-700",
      )}
    />
  );
}

/**
 * Vector Touch ID disc: concentric circles + radial gradients avoid stacked
 * HTML borders (which alias and show seams when zoomed).
 */
function TouchIdSensorGraphic() {
  const uid = React.useId().replace(/:/g, "");
  const g0 = `tid0-${uid}`;
  const g1 = `tid1-${uid}`;
  const g2 = `tid2-${uid}`;
  const g3 = `tid3-${uid}`;
  const g4 = `tid4-${uid}`;
  const gSh = `tid-sh-${uid}`;
  const gSpec = `tid-sp-${uid}`;

  return (
    <svg
      viewBox="0 0 100 100"
      className="block size-full"
      aria-hidden
      focusable="false"
      role="presentation"
      shapeRendering="geometricPrecision"
    >
      <defs>
        {/* Raised outer rim — space gray, light from top */}
        <radialGradient id={g0} cx="50%" cy="34%" r="68%" fx="50%" fy="30%">
          <stop offset="0%" stopColor="#383838" />
          <stop offset="12%" stopColor="#2a2a2a" />
          <stop offset="28%" stopColor="#1c1c1c" />
          <stop offset="48%" stopColor="#141414" />
          <stop offset="68%" stopColor="#0e0e0e" />
          <stop offset="88%" stopColor="#080808" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        {/* First step — concave transition */}
        <radialGradient id={g1} cx="50%" cy="38%" r="56%" fx="50%" fy="34%">
          <stop offset="0%" stopColor="#222222" />
          <stop offset="22%" stopColor="#161616" />
          <stop offset="48%" stopColor="#101010" />
          <stop offset="72%" stopColor="#0b0b0b" />
          <stop offset="100%" stopColor="#060606" />
        </radialGradient>
        {/* Subtle concentric “rings” via stepped mid-tones */}
        <radialGradient id={g2} cx="50%" cy="41%" r="44%">
          <stop offset="0%" stopColor="#181818" />
          <stop offset="18%" stopColor="#121212" />
          <stop offset="22%" stopColor="#0f0f0f" />
          <stop offset="38%" stopColor="#141414" />
          <stop offset="42%" stopColor="#0d0d0d" />
          <stop offset="58%" stopColor="#111111" />
          <stop offset="62%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#070707" />
        </radialGradient>
        {/* Deep bowl */}
        <radialGradient id={g3} cx="50%" cy="44%" r="36%">
          <stop offset="0%" stopColor="#131313" />
          <stop offset="50%" stopColor="#0c0c0c" />
          <stop offset="100%" stopColor="#060606" />
        </radialGradient>
        {/* Flat sensor pad — faint top pool of light */}
        <radialGradient id={g4} cx="50%" cy="32%" r="38%" fx="50%" fy="28%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="40%" stopColor="#0f0f0f" />
          <stop offset="100%" stopColor="#090909" />
        </radialGradient>
        {/* Bottom-weighted shadow (concave) */}
        <radialGradient id={gSh} cx="50%" cy="112%" r="72%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="45%" stopColor="#000000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </radialGradient>
        {/* Top specular — very soft */}
        <linearGradient id={gSpec} x1="50%" y1="0%" x2="50%" y2="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.11" />
          <stop offset="18%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill={`url(#${g0})`} />
      <circle cx="50" cy="50" r="44.5" fill={`url(#${g1})`} />
      <circle cx="50" cy="50" r="35" fill={`url(#${g2})`} />
      <circle cx="50" cy="50" r="28" fill={`url(#${g3})`} />
      <circle cx="50" cy="50" r="19" fill={`url(#${g4})`} />
      <circle cx="50" cy="50" r="50" fill={`url(#${gSh})`} />
      <circle cx="50" cy="50" r="50" fill={`url(#${gSpec})`} />
    </svg>
  );
}

export interface MacKeyProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  subLabel?: React.ReactNode;
  icon?: React.ReactNode;
  iconLabel?: string;
  width?: number;
  keyCode?: string | string[]; // Can be a single code or array of codes
  noAspectRatio?: boolean; // Skip aspect-ratio on wrapper (for arrow half-height keys)
}

interface MacKeyboardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Optional prop to provide a custom sound URL
  soundSrc?: string;
}

/** Layout width (px) used for scale-to-fit when the container is narrower */
const KEYBOARD_DESIGN_WIDTH = 820;

const keyboardChromeClass =
  "flex shrink-0 flex-col gap-1 rounded-xl border border-white/[0.07] bg-[#050505] p-1.5 font-sans antialiased shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:gap-1.5 sm:p-2";

/**
 * Wide containers: keyboard stretches to full width (original large-screen behavior).
 * Narrow containers: fixed 820px layout scaled down so nothing is clipped.
 */
function KeyboardViewportFit({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scaledBoardRef = React.useRef<HTMLDivElement>(null);
  const [wide, setWide] = React.useState(true);
  const [scaled, setScaled] = React.useState({ scale: 1, clipHeight: 0 });

  const updateWide = React.useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const cw = c.clientWidth;
    if (cw < 1) return;
    setWide(cw >= KEYBOARD_DESIGN_WIDTH);
  }, []);

  React.useLayoutEffect(() => {
    updateWide();
    const c = containerRef.current;
    if (!c) return;
    const ro = new ResizeObserver(updateWide);
    ro.observe(c);
    return () => ro.disconnect();
  }, [updateWide]);

  const measureScaled = React.useCallback(() => {
    const c = containerRef.current;
    const board = scaledBoardRef.current;
    if (!c || !board) return;
    const cw = c.clientWidth;
    if (cw < 1) return;
    const scale = cw / KEYBOARD_DESIGN_WIDTH;
    const h = board.offsetHeight;
    setScaled({ scale, clipHeight: h * scale });
  }, []);

  React.useLayoutEffect(() => {
    if (wide) return;
    measureScaled();
    const c = containerRef.current;
    const board = scaledBoardRef.current;
    const ro = new ResizeObserver(measureScaled);
    if (c) ro.observe(c);
    if (board) ro.observe(board);
    return () => ro.disconnect();
  }, [wide, measureScaled]);

  const innerClass = cn(
    keyboardChromeClass,
    wide ? "w-full min-w-0 max-w-full" : "w-[820px]",
    className,
  );

  return (
    <div ref={containerRef} className="w-full max-w-5xl">
      {wide ? (
        <div className={innerClass} {...rest}>
          {children}
        </div>
      ) : (
        <div
          className="overflow-hidden"
          style={{
            width: KEYBOARD_DESIGN_WIDTH * scaled.scale,
            height: scaled.clipHeight || undefined,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            ref={scaledBoardRef}
            style={{
              width: KEYBOARD_DESIGN_WIDTH,
              transform: `scale(${scaled.scale})`,
              transformOrigin: "top left",
            }}
          >
            <div className={innerClass} {...rest}>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function MacKeyboard({
  className,
  soundSrc = "/audio/key-press.wav",
  children,
  ...rest
}: MacKeyboardProps) {
  const [activeKeys, setActiveKeys] = React.useState<Set<string>>(new Set());
  const [capsLockOn, setCapsLockOn] = React.useState(false);
  /** Survives effect re-runs so keyup still pairs with keydown (closure `let` would reset). */
  const capsDownPendingRef = React.useRef(false);
  const capsNoKeyUpTimerRef = React.useRef<number | null>(null);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const audioBufferRef = React.useRef<AudioBuffer | null>(null);

  React.useEffect(() => {
    if (!soundSrc) return;
    // Use Web Audio API for low-latency, short key click sounds
    const ctx = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
    audioCtxRef.current = ctx;

    fetch(soundSrc)
      .then((res) => res.arrayBuffer())
      .then((buf) => ctx.decodeAudioData(buf))
      .then((decoded) => {
        audioBufferRef.current = decoded;
      })
      .catch(() => {}); // Silently fail if audio can't load

    return () => {
      ctx.close().catch(() => {});
    };
  }, [soundSrc]);

  const playClick = React.useCallback(() => {
    const ctx = audioCtxRef.current;
    const buffer = audioBufferRef.current;
    if (!ctx || !buffer) return;

    const play = () => {
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const gain = ctx.createGain();
      gain.gain.value = 0.15; // Set volume very low (15%) so it's a subtle click

      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(0);
    };

    if (ctx.state === "suspended") {
      ctx
        .resume()
        .then(play)
        .catch(() => {});
    } else {
      play();
    }
  }, []);

  React.useEffect(() => {
    /**
     * LED latch: one toggle per physical Caps Lock *click* — not OS modifier state.
     * - Toggle on CapsLock keydown (Windows/Linux + macOS “on”).
     * - Matching keyup must not toggle again (release must not flip the LED).
     * - macOS “off” is often keyup-only: no keydown for that click → toggle on keyup.
     * - Pairing uses refs so Strict Mode / effect re-run between down and up cannot lose state.
     * - Do not call getModifierState on other keys — it would force the LED off while typing
     *   with OS caps still off, which feels like the light dying on key release.
     */
    const clearCapsNoKeyUpTimer = () => {
      if (capsNoKeyUpTimerRef.current !== null) {
        window.clearTimeout(capsNoKeyUpTimerRef.current);
        capsNoKeyUpTimerRef.current = null;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "CapsLock") {
        if (!e.repeat) {
          clearCapsNoKeyUpTimer();
          capsDownPendingRef.current = true;
          setCapsLockOn((v) => !v);
          capsNoKeyUpTimerRef.current = window.setTimeout(() => {
            capsDownPendingRef.current = false;
            capsNoKeyUpTimerRef.current = null;
          }, 4000);
        }
      }

      if (e.repeat) return;

      setActiveKeys((prev) => {
        const newSet = new Set(prev);
        newSet.add(e.code);
        return newSet;
      });

      playClick();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "CapsLock") {
        clearCapsNoKeyUpTimer();
        if (capsDownPendingRef.current) {
          capsDownPendingRef.current = false;
          /* Paired keyup — LED already updated on keydown */
        } else {
          setCapsLockOn((v) => !v);
        }
      }

      setActiveKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(e.code);
        return newSet;
      });
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);
    return () => {
      clearCapsNoKeyUpTimer();
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
    };
  }, [playClick]);

  return (
    <KeyboardContext.Provider value={{ activeKeys, capsLockOn }}>
      {children ? (
        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-[#050505] p-2 font-sans antialiased shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            className,
          )}
          {...rest}
        >
          {children}
        </div>
      ) : (
        <KeyboardViewportFit className={className} {...rest}>
          {/* Row 1: Esc, F1-F12, Touch ID */}
          <Row>
            <MacKey
              width={1.5}
              keyCode="Escape"
              className="text-[9px] items-start pl-2 sm:text-[10px] sm:pl-3"
            >
              esc
            </MacKey>
            <MacKey
              width={1}
              keyCode="F1"
              icon={<SunDim {...fRowIconProps} />}
              iconLabel="F1"
            />
            <MacKey
              width={1}
              keyCode="F2"
              icon={<Sun {...fRowIconProps} />}
              iconLabel="F2"
            />
            <MacKey
              width={1}
              keyCode="F3"
              icon={<Browsers {...fRowIconProps} />}
              iconLabel="F3"
            />
            <MacKey
              width={1}
              keyCode="F4"
              icon={<MagnifyingGlass {...fRowIconProps} />}
              iconLabel="F4"
            />
            <MacKey
              width={1}
              keyCode="F5"
              icon={<Microphone {...fRowIconProps} />}
              iconLabel="F5"
            />
            <MacKey
              width={1}
              keyCode="F6"
              icon={<Moon {...fRowIconProps} />}
              iconLabel="F6"
            />
            <MacKey
              width={1}
              keyCode="F7"
              icon={<SkipBack {...fRowIconProps} />}
              iconLabel="F7"
            />
            <MacKey
              width={1}
              keyCode="F8"
              icon={<PlayPause {...fRowIconProps} />}
              iconLabel="F8"
            />
            <MacKey
              width={1}
              keyCode="F9"
              icon={<SkipForward {...fRowIconProps} />}
              iconLabel="F9"
            />
            <MacKey
              width={1}
              keyCode="F10"
              icon={<SpeakerSimpleSlash {...fRowIconProps} />}
              iconLabel="F10"
            />
            <MacKey
              width={1}
              keyCode="F11"
              icon={<SpeakerSimpleLow {...fRowIconProps} />}
              iconLabel="F11"
            />
            <MacKey
              width={1}
              keyCode="F12"
              icon={<SpeakerSimpleHigh {...fRowIconProps} />}
              iconLabel="F12"
            />
            <MacKey
              width={1}
              className="!rounded-[6px] p-[8%] !shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-1px_0_rgba(0,0,0,0.5)]"
              aria-label="Touch ID"
            >
              <div className="flex h-full min-h-0 w-full items-center justify-center">
                <div className="aspect-square w-[max(22px,min(31px,54%))] transform-gpu [contain:paint]">
                  <TouchIdSensorGraphic />
                </div>
              </div>
            </MacKey>
          </Row>

          {/* Row 2: Numbers */}
          <Row>
            <MacKey width={1} label="`" subLabel="~" />
            <MacKey width={1} label="1" subLabel="!" />
            <MacKey width={1} label="2" subLabel="@" />
            <MacKey width={1} label="3" subLabel="#" />
            <MacKey width={1} label="4" subLabel="$" />
            <MacKey width={1} label="5" subLabel="%" />
            <MacKey width={1} label="6" subLabel="^" />
            <MacKey width={1} label="7" subLabel="&" />
            <MacKey width={1} label="8" subLabel="*" />
            <MacKey width={1} label="9" subLabel="(" />
            <MacKey width={1} label="0" subLabel=")" />
            <MacKey width={1} label="-" subLabel="_" />
            <MacKey width={1} label="=" subLabel="+" />
            <MacKey
              width={1.5}
              className="items-end pr-1.5 text-[10px] sm:pr-2.5 sm:text-xs [&>span]:block [&>span]:w-full [&>span]:text-end"
              label="delete"
            />
          </Row>

          {/* Row 3: Tab */}
          <Row>
            <MacKey
              width={1.5}
              className="items-start pl-2 text-[10px] sm:pl-3 sm:text-xs"
              label="tab"
            />
            <MacKey width={1} label="Q" />
            <MacKey width={1} label="W" />
            <MacKey width={1} label="E" />
            <MacKey width={1} label="R" />
            <MacKey width={1} label="T" />
            <MacKey width={1} label="Y" />
            <MacKey width={1} label="U" />
            <MacKey width={1} label="I" />
            <MacKey width={1} label="O" />
            <MacKey width={1} label="P" />
            <MacKey width={1} label="[" subLabel="{" />
            <MacKey width={1} label="]" subLabel="}" />
            <MacKey width={1} label="\" subLabel="|" />
          </Row>

          {/* Row 4: Caps */}
          <Row>
            <MacKey
              width={1.75}
              keyCode="CapsLock"
              className="relative items-start pl-2 pr-2 text-zinc-300 sm:pl-4 sm:pr-3"
            >
              <CapsLockIndicator />
              <span
                className="z-10 mt-0.5 max-w-[calc(100%-0.5rem)] pl-4 text-[8px] leading-none tracking-tight whitespace-nowrap sm:max-w-none sm:pl-0 sm:text-[10px] sm:tracking-normal"
                title="Caps lock"
              >
                <span className="sm:hidden">caps</span>
                <span className="hidden sm:inline">caps lock</span>
              </span>
            </MacKey>
            <MacKey width={1} label="A" />
            <MacKey width={1} label="S" />
            <MacKey width={1} label="D" />
            <MacKey width={1} label="F" />
            <MacKey width={1} label="G" />
            <MacKey width={1} label="H" />
            <MacKey width={1} label="J" />
            <MacKey width={1} label="K" />
            <MacKey width={1} label="L" />
            <MacKey width={1} label=";" subLabel=":" />
            <MacKey width={1} label="'" subLabel='"' />
            <MacKey
              width={1.75}
              className="items-end pr-1.5 text-[10px] sm:pr-2.5 sm:text-xs [&>span]:block [&>span]:w-full [&>span]:text-end"
              label="return"
            />
          </Row>

          {/* Row 5: Shift */}
          <Row>
            <MacKey
              width={2.25}
              keyCode="ShiftLeft"
              className="items-start pl-2 text-[10px] sm:pl-3 sm:text-xs"
              label="shift"
            />
            <MacKey width={1} label="Z" />
            <MacKey width={1} label="X" />
            <MacKey width={1} label="C" />
            <MacKey width={1} label="V" />
            <MacKey width={1} label="B" />
            <MacKey width={1} label="N" />
            <MacKey width={1} label="M" />
            <MacKey width={1} label="," subLabel="<" />
            <MacKey width={1} label="." subLabel=">" />
            <MacKey width={1} label="/" subLabel="?" />
            <MacKey
              width={2.25}
              keyCode="ShiftRight"
              className="items-end pr-1.5 text-[10px] sm:pr-2.5 sm:text-xs [&>span]:block [&>span]:w-full [&>span]:text-end"
              label="shift"
            />
          </Row>

          {/* Row 6: Bottom */}
          <Row>
            <MacKey
              width={1}
              className="relative items-center justify-center p-0"
            >
              <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-0.5 py-1 sm:hidden">
                <span className="text-[8px] font-normal leading-none text-zinc-300">
                  fn
                </span>
                <Globe className="h-3.5 w-3.5 shrink-0 text-zinc-300" />
              </div>
              <span className="pointer-events-none absolute top-1.5 right-2 z-10 hidden text-[10px] font-normal leading-none text-zinc-300 sm:block">
                fn
              </span>
              <Globe className="pointer-events-none absolute bottom-2 left-2 hidden h-[18px] w-[18px] text-zinc-300 sm:block" />
            </MacKey>
            <MacKey
              width={1}
              keyCode="ControlLeft"
              className="relative items-center justify-center p-0"
            >
              <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-0.5 py-1 sm:hidden">
                <ChevronUp className="h-3.5 w-3.5 shrink-0 text-zinc-300" />
                <span className="text-center text-[7px] font-normal leading-none text-zinc-300">
                  control
                </span>
              </div>
              <ChevronUp className="pointer-events-none absolute top-1.5 right-2 z-10 hidden h-[18px] w-[18px] text-zinc-300 sm:block" />
              <span className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-center text-[10px] font-normal leading-none whitespace-nowrap text-zinc-300 sm:block">
                control
              </span>
            </MacKey>
            <MacKey
              width={1.25}
              keyCode="AltLeft"
              className="relative items-center justify-center p-0"
            >
              <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-0.5 py-1 sm:hidden">
                <Option
                  aria-hidden
                  className="h-3.5 w-3.5 shrink-0 text-zinc-300"
                />
                <span className="text-center text-[7px] font-normal leading-none text-zinc-300">
                  option
                </span>
              </div>
              <Option
                aria-hidden
                className="pointer-events-none absolute top-1.5 right-2 z-10 hidden h-[18px] w-[18px] text-zinc-300 sm:block"
              />
              <span className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-center text-[10px] font-normal leading-none whitespace-nowrap text-zinc-300 sm:block">
                option
              </span>
            </MacKey>
            <MacKey
              width={1.5}
              keyCode="MetaLeft"
              className="relative items-center justify-center p-0"
            >
              <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-0.5 py-1 sm:hidden">
                <Command
                  aria-hidden
                  className="h-3.5 w-3.5 shrink-0 text-zinc-300"
                />
                <span className="text-center text-[7px] font-bold leading-none text-zinc-300">
                  command
                </span>
              </div>
              <Command
                aria-hidden
                className="pointer-events-none absolute top-1.5 right-2 z-10 hidden h-[18px] w-[18px] text-zinc-300 sm:block"
              />
              <span className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-center text-[10px] font-bold leading-none whitespace-nowrap text-zinc-300 sm:block">
                command
              </span>
            </MacKey>
            {/* Spacebar */}
            <MacKey width={4} keyCode="Space" />
            <MacKey
              width={1.5}
              keyCode="MetaRight"
              className="relative items-center justify-center p-0"
            >
              <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-0.5 py-1 sm:hidden">
                <Command
                  aria-hidden
                  className="h-3.5 w-3.5 shrink-0 text-zinc-300"
                />
                <span className="text-center text-[7px] font-bold leading-none text-zinc-300">
                  command
                </span>
              </div>
              <Command
                aria-hidden
                className="pointer-events-none absolute top-1.5 left-2 z-10 hidden h-[18px] w-[18px] text-zinc-300 sm:block"
              />
              <span className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-center text-[10px] font-bold leading-none whitespace-nowrap text-zinc-300 sm:block">
                command
              </span>
            </MacKey>
            <MacKey
              width={1.25}
              keyCode="AltRight"
              className="relative items-center justify-center p-0"
            >
              <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-0.5 py-1 sm:hidden">
                <Option
                  aria-hidden
                  className="h-3.5 w-3.5 shrink-0 text-zinc-300"
                />
                <span className="text-center text-[7px] font-normal leading-none text-zinc-300">
                  option
                </span>
              </div>
              <Option
                aria-hidden
                className="pointer-events-none absolute top-1.5 left-2 z-10 hidden h-[18px] w-[18px] text-zinc-300 sm:block"
              />
              <span className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-center text-[10px] font-normal leading-none whitespace-nowrap text-zinc-300 sm:block">
                option
              </span>
            </MacKey>

            {/* Arrow keys */}
            <div
              style={{ flex: 3 }}
              className="grid h-full grid-cols-3 items-end gap-1 pl-0.5 sm:gap-1.5"
            >
              <MacKey width={1} keyCode="ArrowLeft" className="h-full">
                <ArrowLeft className="h-3.5 w-3.5 text-zinc-100 sm:h-4 sm:w-4" />
              </MacKey>
              <div className="flex h-full min-h-0 flex-col gap-1 sm:gap-1.5">
                <MacKey
                  width={1}
                  noAspectRatio
                  keyCode="ArrowUp"
                  style={{ flex: 1 }}
                  className="!min-h-0 items-center justify-center p-0 !rounded-[4px]"
                >
                  <ArrowUp className="h-2.5 w-2.5 text-zinc-100 sm:h-3 sm:w-3" />
                </MacKey>
                <MacKey
                  width={1}
                  noAspectRatio
                  keyCode="ArrowDown"
                  style={{ flex: 1 }}
                  className="!min-h-0 items-center justify-center p-0 !rounded-[4px]"
                >
                  <ArrowDown className="h-2.5 w-2.5 text-zinc-100 sm:h-3 sm:w-3" />
                </MacKey>
              </div>
              <MacKey width={1} keyCode="ArrowRight" className="h-full">
                <ArrowRight className="h-3.5 w-3.5 text-zinc-100 sm:h-4 sm:w-4" />
              </MacKey>
            </div>
          </Row>
        </KeyboardViewportFit>
      )}
    </KeyboardContext.Provider>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full min-w-0 gap-1 sm:gap-1.5">{children}</div>;
}

export function MacKey({
  className,
  label,
  subLabel,
  icon,
  iconLabel,
  width = 1,
  children,
  keyCode,
  noAspectRatio,
  ...props
}: MacKeyProps) {
  const { activeKeys } = React.useContext(KeyboardContext);

  const isActive = React.useMemo(() => {
    // 1. Check explicit keyCode prop
    if (keyCode) {
      if (Array.isArray(keyCode)) {
        return keyCode.some((code) => activeKeys.has(code));
      }
      return activeKeys.has(keyCode);
    }

    // 2. Try to infer from label (simple cases)
    if (typeof label === "string") {
      const l = label.toLowerCase();

      // Numbers
      if (/^[0-9]$/.test(l)) return activeKeys.has(`Digit${l}`);

      // Letters
      if (/^[a-z]$/.test(l)) return activeKeys.has(`Key${l.toUpperCase()}`);

      // Common symbols
      const symbolMap: Record<string, string> = {
        "-": "Minus",
        "=": "Equal",
        "[": "BracketLeft",
        "]": "BracketRight",
        "\\": "Backslash",
        ";": "Semicolon",
        "'": "Quote",
        ",": "Comma",
        ".": "Period",
        "/": "Slash",
        "`": "Backquote",
        delete: "Backspace",
        tab: "Tab",
        "caps lock": "CapsLock",
        return: "Enter",
        space: "Space",
      };

      if (symbolMap[l]) return activeKeys.has(symbolMap[l]);
    }

    return false;
  }, [activeKeys, keyCode, label]);

  // For width=1 keys, use aspect-ratio to define the row height.
  // For wider keys, omit aspect-ratio so they stretch to the row height via align-items: stretch.
  const applyAspectRatio = !noAspectRatio;
  return (
    <div
      style={{
        flex: width,
        ...(applyAspectRatio ? { aspectRatio: `${width}/1` } : {}),
      }}
      className="min-w-0 self-stretch"
    >
      <div
        className={cn(
          "group relative flex h-full w-full min-w-0 select-none flex-col items-center justify-center overflow-hidden rounded-[4px] border border-white/[0.05] bg-[#121212] text-zinc-100",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.65),0_1px_0_rgba(0,0,0,0.4)]",
          isActive &&
            "translate-y-px scale-[0.99] border-white/[0.04] bg-[#0a0a0a] shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)]",
          "transition-all duration-100 active:translate-y-px active:scale-[0.99]",
          className,
        )}
        {...props}
      >
        {/* Icon only keys (F-keys) */}
        {icon && !label && !subLabel && !children && (
          <div className="flex h-full min-h-0 flex-col items-center justify-between py-1 text-zinc-100 sm:py-2">
            <span className="text-[12px] sm:text-[14px] lg:text-[15px]">
              {icon}
            </span>
            {iconLabel && (
              <span className="text-[5px] leading-none font-medium text-zinc-500 sm:text-[7px]">
                {iconLabel}
              </span>
            )}
          </div>
        )}

        {/* Number/Symbol keys */}
        {subLabel && (
          <div className="flex h-full min-h-0 flex-col items-center justify-between py-1 sm:py-2">
            <span className="text-[9px] font-normal text-zinc-500 sm:text-xs">
              {subLabel}
            </span>
            <span className="text-[11px] font-medium text-zinc-100 sm:text-sm">
              {label}
            </span>
          </div>
        )}

        {/* Letter keys */}
        {!subLabel &&
          !icon &&
          typeof label === "string" &&
          label.length === 1 && (
            <span className="font-medium text-sm text-zinc-100 sm:text-base lg:text-lg">
              {label}
            </span>
          )}

        {/* Modifier keys with text label */}
        {!subLabel &&
          !icon &&
          (typeof label !== "string" || label.length > 1) &&
          !children && (
            <span className="font-medium text-[9px] text-zinc-300 sm:text-xs">
              {label}
            </span>
          )}

        {children}
      </div>
    </div>
  );
}
