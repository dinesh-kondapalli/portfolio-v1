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
import { useTheme } from "next-themes";
import * as React from "react";
import { cn } from "@/lib/utils";

// Context to share active keys state, Caps Lock LED, and on-screen key presses
const KeyboardContext = React.createContext<{
  activeKeys: Set<string>;
  capsLockOn: boolean;
  activateVirtualKey: (code: string) => void;
}>({
  activeKeys: new Set(),
  capsLockOn: false,
  activateVirtualKey: () => {},
});

/** Resolved from next-themes so light styling is not tied to Tailwind's `dark:` variant. */
const KeyboardAppearanceContext = React.createContext<{ isDark: boolean }>({
  isDark: true,
});

function useKeyboardAppearance() {
  return React.useContext(KeyboardAppearanceContext);
}

function CapsLockIndicator() {
  const { capsLockOn } = React.useContext(KeyboardContext);
  const { isDark } = useKeyboardAppearance();
  return (
    <div
      aria-hidden
      className={cn(
        "absolute top-1.5 left-3 size-[5px] rounded-full transition-all duration-200",
        capsLockOn
          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
          : isDark
            ? "bg-zinc-700"
            : "bg-[#AEAEB2]",
      )}
    />
  );
}

/**
 * Vector Touch ID disc: concentric circles + radial gradients avoid stacked
 * HTML borders (which alias and show seams when zoomed).
 */
function TouchIdSensorGraphic({ isDark }: { isDark: boolean }) {
  const uid = React.useId().replace(/:/g, "");
  const L = {
    g0: `tid0l-${uid}`,
    g1: `tid1l-${uid}`,
    g2: `tid2l-${uid}`,
    g3: `tid3l-${uid}`,
    g4: `tid4l-${uid}`,
    gSh: `tid-shl-${uid}`,
    gSpec: `tid-spl-${uid}`,
  };
  const D = {
    g0: `tid0-${uid}`,
    g1: `tid1-${uid}`,
    g2: `tid2-${uid}`,
    g3: `tid3-${uid}`,
    g4: `tid4-${uid}`,
    gSh: `tid-sh-${uid}`,
    gSpec: `tid-sp-${uid}`,
  };

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
        {/* Light mode — airy graphite lens; center stays mid-gray (not black) — shadow kept very soft */}
        <radialGradient id={L.g0} cx="50%" cy="34%" r="68%" fx="50%" fy="30%">
          <stop offset="0%" stopColor="#c4c4c8" />
          <stop offset="50%" stopColor="#d0d0d5" />
          <stop offset="78%" stopColor="#e2e2e7" />
          <stop offset="92%" stopColor="#efeff2" />
          <stop offset="100%" stopColor="#f4f4f6" />
        </radialGradient>
        <radialGradient id={L.g1} cx="50%" cy="38%" r="56%" fx="50%" fy="34%">
          <stop offset="0%" stopColor="#a8a8ae" />
          <stop offset="35%" stopColor="#b4b4ba" />
          <stop offset="58%" stopColor="#c4c4c8" />
          <stop offset="82%" stopColor="#d6d6db" />
          <stop offset="100%" stopColor="#e3e3e8" />
        </radialGradient>
        <radialGradient id={L.g2} cx="50%" cy="41%" r="44%">
          <stop offset="0%" stopColor="#9a9a9f" />
          <stop offset="38%" stopColor="#a5a5aa" />
          <stop offset="62%" stopColor="#b6b6bc" />
          <stop offset="100%" stopColor="#c7c7cc" />
        </radialGradient>
        <radialGradient id={L.g3} cx="50%" cy="44%" r="36%">
          <stop offset="0%" stopColor="#8e8e93" />
          <stop offset="45%" stopColor="#98989d" />
          <stop offset="100%" stopColor="#a6a6ab" />
        </radialGradient>
        <radialGradient id={L.g4} cx="50%" cy="32%" r="38%" fx="50%" fy="28%">
          <stop offset="0%" stopColor="#9c9ca1" />
          <stop offset="40%" stopColor="#949499" />
          <stop offset="72%" stopColor="#8e8e93" />
          <stop offset="100%" stopColor="#98989d" />
        </radialGradient>
        <radialGradient id={L.gSh} cx="50%" cy="112%" r="72%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0.045" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
        </radialGradient>
        <linearGradient id={L.gSpec} x1="50%" y1="0%" x2="50%" y2="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="24%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Dark mode — raised outer rim, space gray */}
        <radialGradient id={D.g0} cx="50%" cy="34%" r="68%" fx="50%" fy="30%">
          <stop offset="0%" stopColor="#383838" />
          <stop offset="12%" stopColor="#2a2a2a" />
          <stop offset="28%" stopColor="#1c1c1c" />
          <stop offset="48%" stopColor="#141414" />
          <stop offset="68%" stopColor="#0e0e0e" />
          <stop offset="88%" stopColor="#080808" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <radialGradient id={D.g1} cx="50%" cy="38%" r="56%" fx="50%" fy="34%">
          <stop offset="0%" stopColor="#222222" />
          <stop offset="22%" stopColor="#161616" />
          <stop offset="48%" stopColor="#101010" />
          <stop offset="72%" stopColor="#0b0b0b" />
          <stop offset="100%" stopColor="#060606" />
        </radialGradient>
        <radialGradient id={D.g2} cx="50%" cy="41%" r="44%">
          <stop offset="0%" stopColor="#181818" />
          <stop offset="18%" stopColor="#121212" />
          <stop offset="22%" stopColor="#0f0f0f" />
          <stop offset="38%" stopColor="#141414" />
          <stop offset="42%" stopColor="#0d0d0d" />
          <stop offset="58%" stopColor="#111111" />
          <stop offset="62%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#070707" />
        </radialGradient>
        <radialGradient id={D.g3} cx="50%" cy="44%" r="36%">
          <stop offset="0%" stopColor="#131313" />
          <stop offset="50%" stopColor="#0c0c0c" />
          <stop offset="100%" stopColor="#060606" />
        </radialGradient>
        <radialGradient id={D.g4} cx="50%" cy="32%" r="38%" fx="50%" fy="28%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="40%" stopColor="#0f0f0f" />
          <stop offset="100%" stopColor="#090909" />
        </radialGradient>
        <radialGradient id={D.gSh} cx="50%" cy="112%" r="72%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="45%" stopColor="#000000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </radialGradient>
        <linearGradient id={D.gSpec} x1="50%" y1="0%" x2="50%" y2="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.11" />
          <stop offset="18%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
      </defs>
      {isDark ? (
        <g>
          <circle cx="50" cy="50" r="50" fill={`url(#${D.g0})`} />
          <circle cx="50" cy="50" r="44.5" fill={`url(#${D.g1})`} />
          <circle cx="50" cy="50" r="35" fill={`url(#${D.g2})`} />
          <circle cx="50" cy="50" r="28" fill={`url(#${D.g3})`} />
          <circle cx="50" cy="50" r="19" fill={`url(#${D.g4})`} />
          <circle cx="50" cy="50" r="50" fill={`url(#${D.gSh})`} />
          <circle cx="50" cy="50" r="50" fill={`url(#${D.gSpec})`} />
        </g>
      ) : (
        <g>
          <circle cx="50" cy="50" r="50" fill={`url(#${L.g0})`} />
          <circle cx="50" cy="50" r="44.5" fill={`url(#${L.g1})`} />
          <circle cx="50" cy="50" r="35" fill={`url(#${L.g2})`} />
          <circle cx="50" cy="50" r="28" fill={`url(#${L.g3})`} />
          <circle cx="50" cy="50" r="19" fill={`url(#${L.g4})`} />
          <circle cx="50" cy="50" r="50" fill={`url(#${L.gSh})`} />
          <circle cx="50" cy="50" r="50" fill={`url(#${L.gSpec})`} />
        </g>
      )}
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
  /** When set with a single `keyCode`, pointer/keyboard activates the key (sound + pulse) */
  interactive?: boolean;
}

interface MacKeyboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default click sound (`KeyboardEvent.code` uses default when not in `keySoundMap`) */
  soundSrc?: string;
  /** Per-key sounds, keyed by `KeyboardEvent.code` (e.g. `Space`, `CapsLock`) */
  keySoundMap?: Partial<Record<string, string>>;
  /** Fires when Space is pressed (physical key or on-screen Space), after sound is triggered */
  onSpacePress?: () => void;
}

/** Layout width (px) used for scale-to-fit when the container is narrower */
const KEYBOARD_DESIGN_WIDTH = 820;

function getKeyboardChromeClass(isDark: boolean) {
  return isDark
    ? "flex shrink-0 flex-col gap-1 rounded-xl border border-white/[0.07] bg-[#050505] p-1.5 font-sans antialiased shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:gap-1.5 sm:p-2"
    : "flex shrink-0 flex-col gap-1 rounded-xl border border-black/[0.08] bg-[#D1D3D9] p-1.5 font-sans antialiased shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:gap-1.5 sm:p-2";
}

/**
 * Wide containers: keyboard stretches to full width (original large-screen behavior).
 * Narrow containers: fixed 820px layout scaled down so nothing is clipped.
 */
function KeyboardViewportFit({
  className,
  children,
  isDark,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { isDark: boolean }) {
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
    getKeyboardChromeClass(isDark),
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
  keySoundMap,
  onSpacePress,
  children,
  ...rest
}: MacKeyboardProps) {
  const onSpacePressRef = React.useRef(onSpacePress);
  React.useEffect(() => {
    onSpacePressRef.current = onSpacePress;
  }, [onSpacePress]);
  const [activeKeys, setActiveKeys] = React.useState<Set<string>>(new Set());
  const [capsLockOn, setCapsLockOn] = React.useState(false);
  /** Survives effect re-runs so keyup still pairs with keydown (closure `let` would reset). */
  const capsDownPendingRef = React.useRef(false);
  const capsNoKeyUpTimerRef = React.useRef<number | null>(null);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const buffersByUrlRef = React.useRef<Map<string, AudioBuffer>>(new Map());
  const virtualTimersRef = React.useRef<Map<string, number>>(new Map());

  const { resolvedTheme } = useTheme();
  const [themeReady, setThemeReady] = React.useState(false);
  React.useEffect(() => setThemeReady(true), []);
  /** Default dark until mounted — matches `defaultTheme="dark"` and avoids a light flash before hydration. */
  const isDark = !themeReady ? true : (resolvedTheme ?? "dark") === "dark";

  const fRowIconProps = React.useMemo(
    () => ({
      className: cn(
        "size-[11px] shrink-0 sm:size-[13px] lg:size-[15px]",
        isDark ? "text-zinc-100" : "text-[#6E6E73]",
      ),
      weight: "regular" as const,
      "aria-hidden": true as const,
    }),
    [isDark],
  );

  const modText = isDark ? "text-zinc-300" : "text-[#6E6E73]";
  const arrowFg = isDark ? "text-zinc-100" : "text-[#6E6E73]";

  React.useEffect(() => {
    const urls = new Set<string>();
    if (soundSrc) urls.add(soundSrc);
    for (const url of Object.values(keySoundMap ?? {})) {
      if (url) urls.add(url);
    }
    if (urls.size === 0) return;

    const ctx = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
    audioCtxRef.current = ctx;
    const map = new Map<string, AudioBuffer>();
    buffersByUrlRef.current = map;

    let cancelled = false;
    for (const url of urls) {
      fetch(url)
        .then((res) => res.arrayBuffer())
        .then((ab) => ctx.decodeAudioData(ab))
        .then((decoded) => {
          if (!cancelled) map.set(url, decoded);
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
      ctx.close().catch(() => {});
    };
  }, [soundSrc, keySoundMap]);

  const playForCode = React.useCallback(
    (code: string) => {
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const customUrl = keySoundMap?.[code];
      let buffer: AudioBuffer | undefined;
      let gainValue = 0.15;
      if (customUrl) {
        buffer = buffersByUrlRef.current.get(customUrl);
        gainValue = 0.42;
      } else if (soundSrc) {
        buffer = buffersByUrlRef.current.get(soundSrc);
      }
      if (!buffer) return;

      const play = () => {
        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const gain = ctx.createGain();
        gain.gain.value = gainValue;

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
    },
    [keySoundMap, soundSrc],
  );

  const activateVirtualKey = React.useCallback(
    (code: string) => {
      const prev = virtualTimersRef.current.get(code);
      if (prev !== undefined) window.clearTimeout(prev);

      if (code === "CapsLock") {
        setCapsLockOn((v) => !v);
      }

      setActiveKeys((p) => {
        const n = new Set(p);
        n.add(code);
        return n;
      });
      const t = window.setTimeout(() => {
        setActiveKeys((prev) => {
          const n = new Set(prev);
          n.delete(code);
          return n;
        });
        virtualTimersRef.current.delete(code);
      }, 140);
      virtualTimersRef.current.set(code, t);

      playForCode(code);
      if (code === "Space") onSpacePressRef.current?.();
    },
    [playForCode],
  );

  React.useEffect(() => {
    return () => {
      for (const id of virtualTimersRef.current.values()) {
        window.clearTimeout(id);
      }
      virtualTimersRef.current.clear();
    };
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

      playForCode(e.code);
      if (e.code === "Space") onSpacePressRef.current?.();
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
  }, [playForCode]);

  return (
    <KeyboardAppearanceContext.Provider value={{ isDark }}>
      <KeyboardContext.Provider
        value={{ activeKeys, capsLockOn, activateVirtualKey }}
      >
        {children ? (
          <div
            className={cn(
              isDark
                ? "inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-[#050505] p-2 font-sans antialiased shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                : "inline-flex items-center gap-1.5 rounded-xl border border-black/[0.08] bg-[#D1D3D9] p-2 font-sans antialiased shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]",
              className,
            )}
            {...rest}
          >
            {children}
          </div>
        ) : (
          <KeyboardViewportFit isDark={isDark} className={className} {...rest}>
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
              className={cn(
                "!rounded-[6px] p-[8%]",
                isDark
                  ? "!shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-1px_0_rgba(0,0,0,0.5)]"
                  : "!shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(0,0,0,0.06)]",
              )}
              aria-label="Touch ID"
            >
              <div className="flex h-full min-h-0 w-full items-center justify-center">
                <div className="aspect-square w-[max(22px,min(31px,54%))] transform-gpu [contain:paint]">
                  <TouchIdSensorGraphic isDark={isDark} />
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
              interactive
              className={cn(
                "relative items-start pl-2 pr-2 sm:pl-4 sm:pr-3",
                modText,
              )}
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
                <span
                  className={cn(
                    "text-[8px] font-normal leading-none",
                    modText,
                  )}
                >
                  fn
                </span>
                <Globe
                  className={cn("h-3.5 w-3.5 shrink-0", modText)}
                />
              </div>
              <span
                className={cn(
                  "pointer-events-none absolute top-1.5 right-2 z-10 hidden text-[10px] font-normal leading-none sm:block",
                  modText,
                )}
              >
                fn
              </span>
              <Globe
                className={cn(
                  "pointer-events-none absolute bottom-2 left-2 hidden h-[18px] w-[18px] sm:block",
                  modText,
                )}
              />
            </MacKey>
            <MacKey
              width={1}
              keyCode="ControlLeft"
              className="relative items-center justify-center p-0"
            >
              <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-0.5 py-1 sm:hidden">
                <ChevronUp className={cn("h-3.5 w-3.5 shrink-0", modText)} />
                <span className={cn(
                  "text-center text-[7px] font-normal leading-none",
                  modText,
                )}>
                  control
                </span>
              </div>
              <ChevronUp
                  className={cn(
                    "pointer-events-none absolute top-1.5 right-2 z-10 hidden h-[18px] w-[18px] sm:block",
                    modText,
                  )}
                />
              <span className={cn(
                "pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-center text-[10px] font-normal leading-none whitespace-nowrap sm:block",
                modText,
              )}>
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
                  className={cn("h-3.5 w-3.5 shrink-0", modText)}
                />
                <span className={cn(
                  "text-center text-[7px] font-normal leading-none",
                  modText,
                )}>
                  option
                </span>
              </div>
              <Option
                aria-hidden
                className={cn(
                  "pointer-events-none absolute top-1.5 right-2 z-10 hidden h-[18px] w-[18px] sm:block",
                  modText,
                )}
              />
              <span className={cn(
                "pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-center text-[10px] font-normal leading-none whitespace-nowrap sm:block",
                modText,
              )}>
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
                  className={cn("h-3.5 w-3.5 shrink-0", modText)}
                />
                <span className={cn(
                  "text-center text-[7px] font-bold leading-none",
                  modText,
                )}>
                  command
                </span>
              </div>
              <Command
                aria-hidden
                className={cn(
                  "pointer-events-none absolute top-1.5 right-2 z-10 hidden h-[18px] w-[18px] sm:block",
                  modText,
                )}
              />
              <span className={cn(
                "pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-center text-[10px] font-bold leading-none whitespace-nowrap sm:block",
                modText,
              )}>
                command
              </span>
            </MacKey>
            {/* Spacebar */}
            <MacKey width={4} keyCode="Space" interactive aria-label="Space" />
            <MacKey
              width={1.5}
              keyCode="MetaRight"
              className="relative items-center justify-center p-0"
            >
              <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-0.5 py-1 sm:hidden">
                <Command
                  aria-hidden
                  className={cn("h-3.5 w-3.5 shrink-0", modText)}
                />
                <span className={cn(
                  "text-center text-[7px] font-bold leading-none",
                  modText,
                )}>
                  command
                </span>
              </div>
              <Command
                aria-hidden
                className={cn(
                  "pointer-events-none absolute top-1.5 left-2 z-10 hidden h-[18px] w-[18px] sm:block",
                  modText,
                )}
              />
              <span className={cn(
                "pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-center text-[10px] font-bold leading-none whitespace-nowrap sm:block",
                modText,
              )}>
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
                  className={cn("h-3.5 w-3.5 shrink-0", modText)}
                />
                <span className={cn(
                  "text-center text-[7px] font-normal leading-none",
                  modText,
                )}>
                  option
                </span>
              </div>
              <Option
                aria-hidden
                className={cn(
                  "pointer-events-none absolute top-1.5 left-2 z-10 hidden h-[18px] w-[18px] sm:block",
                  modText,
                )}
              />
              <span className={cn(
                "pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-center text-[10px] font-normal leading-none whitespace-nowrap sm:block",
                modText,
              )}>
                option
              </span>
            </MacKey>

            {/* Arrow keys */}
            <div
              style={{ flex: 3 }}
              className="grid h-full grid-cols-3 items-end gap-1 pl-0.5 sm:gap-1.5"
            >
              <MacKey width={1} keyCode="ArrowLeft" className="h-full">
                <ArrowLeft
                  className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", arrowFg)}
                />
              </MacKey>
              <div className="flex h-full min-h-0 flex-col gap-1 sm:gap-1.5">
                <MacKey
                  width={1}
                  noAspectRatio
                  keyCode="ArrowUp"
                  style={{ flex: 1 }}
                  className="!min-h-0 items-center justify-center p-0 !rounded-[4px]"
                >
                  <ArrowUp
                    className={cn("h-2.5 w-2.5 sm:h-3 sm:w-3", arrowFg)}
                  />
                </MacKey>
                <MacKey
                  width={1}
                  noAspectRatio
                  keyCode="ArrowDown"
                  style={{ flex: 1 }}
                  className="!min-h-0 items-center justify-center p-0 !rounded-[4px]"
                >
                  <ArrowDown
                    className={cn("h-2.5 w-2.5 sm:h-3 sm:w-3", arrowFg)}
                  />
                </MacKey>
              </div>
              <MacKey width={1} keyCode="ArrowRight" className="h-full">
                <ArrowRight
                  className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", arrowFg)}
                />
              </MacKey>
            </div>
          </Row>
        </KeyboardViewportFit>
        )}
      </KeyboardContext.Provider>
    </KeyboardAppearanceContext.Provider>
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
  interactive,
  onPointerDown,
  onKeyDown,
  ...props
}: MacKeyProps) {
  const { activeKeys, activateVirtualKey } = React.useContext(KeyboardContext);
  const { isDark } = useKeyboardAppearance();

  const interactCode =
    interactive && typeof keyCode === "string" ? keyCode : null;

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

  const faceClassName = cn(
    "group relative flex h-full w-full min-w-0 select-none flex-col items-center justify-center overflow-hidden rounded-[4px]",
    isDark
      ? "border border-white/[0.05] bg-[#121212] text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.65),0_1px_0_rgba(0,0,0,0.4)]"
      : "border border-black/[0.07] bg-[#F4F4F6] text-[#6E6E73] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.06),0_0.5px_1px_rgba(0,0,0,0.06)]",
    isActive &&
      (isDark
        ? "translate-y-px scale-[0.99] border-white/[0.04] bg-[#0a0a0a] shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)]"
        : "translate-y-px scale-[0.99] border-black/[0.06] bg-[#E8E8ED] shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]"),
    "transition-all duration-100 active:translate-y-px active:scale-[0.99]",
    interactCode && "cursor-pointer",
    className,
  );

  const faceInner = (
    <>
      {/* Icon only keys (F-keys) */}
      {icon && !label && !subLabel && !children && (
        <div
          className={cn(
            "flex h-full min-h-0 flex-col items-center justify-between py-1 sm:py-2",
            isDark ? "text-zinc-100" : "text-[#6E6E73]",
          )}
        >
          <span className="text-[12px] sm:text-[14px] lg:text-[15px]">
            {icon}
          </span>
          {iconLabel && (
            <span
              className={cn(
                "text-[5px] leading-none font-medium sm:text-[7px]",
                isDark ? "text-zinc-500" : "text-[#86868B]",
              )}
            >
              {iconLabel}
            </span>
          )}
        </div>
      )}

      {/* Number/Symbol keys */}
      {subLabel && (
        <div className="flex h-full min-h-0 flex-col items-center justify-between py-1 sm:py-2">
          <span
            className={cn(
              "text-[9px] font-normal sm:text-xs",
              isDark ? "text-zinc-500" : "text-[#86868B]",
            )}
          >
            {subLabel}
          </span>
          <span
            className={cn(
              "text-[11px] font-medium sm:text-sm",
              isDark ? "text-zinc-100" : "text-[#6E6E73]",
            )}
          >
            {label}
          </span>
        </div>
      )}

      {/* Letter keys */}
      {!subLabel &&
        !icon &&
        typeof label === "string" &&
        label.length === 1 && (
          <span
            className={cn(
              "font-medium text-sm sm:text-base lg:text-lg",
              isDark ? "text-zinc-100" : "text-[#6E6E73]",
            )}
          >
            {label}
          </span>
        )}

      {/* Modifier keys with text label */}
      {!subLabel &&
        !icon &&
        (typeof label !== "string" || label.length > 1) &&
        !children && (
          <span
            className={cn(
              "font-medium text-[9px] sm:text-xs",
              isDark ? "text-zinc-300" : "text-[#6E6E73]",
            )}
          >
            {label}
          </span>
        )}

      {children}
    </>
  );

  return (
    <div
      style={{
        flex: width,
        ...(applyAspectRatio ? { aspectRatio: `${width}/1` } : {}),
      }}
      className="min-w-0 self-stretch"
    >
      {interactCode ? (
        <button
          type="button"
          {...(props as unknown as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          className={faceClassName}
          onPointerDown={(e) => {
            onPointerDown?.(e as unknown as React.PointerEvent<HTMLDivElement>);
            if (e.button !== 0) return;
            e.preventDefault();
            activateVirtualKey(interactCode);
          }}
          onKeyDown={(e) => {
            onKeyDown?.(e as unknown as React.KeyboardEvent<HTMLDivElement>);
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              activateVirtualKey(interactCode);
            }
          }}
        >
          {faceInner}
        </button>
      ) : (
        <div
          {...props}
          className={faceClassName}
          {...(onPointerDown ? { onPointerDown } : {})}
          {...(onKeyDown ? { onKeyDown } : {})}
        >
          {faceInner}
        </div>
      )}
    </div>
  );
}
