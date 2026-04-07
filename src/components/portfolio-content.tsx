"use client";

import { GithubLogo } from "@phosphor-icons/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import * as React from "react";
import { GithubCalendar } from "@/components/ui/github-calendar";
import { MacKeyboard } from "@/components/ui/mac-keyboard";
import { useThemeToggle } from "@/components/ui/skiper-ui/skiper26";
import { cn } from "@/lib/utils";

type Work = {
  title: string;
  description: string;
  githubHref: string;
  demoHref?: string;
  /** Preview image path under `public`, e.g. `works/hello-space.webp`. Falls back to a shared placeholder. */
  imageSrc?: string;
};

const works: Work[] = [
  {
    title: "Hello Space",
    description:
      "Spatial layouts and interface experiments—playing with depth, motion, and structure in the browser.",
    githubHref: "https://github.com/dinesh-kondapalli/hello-space",
    demoHref: "https://hellooo-space.vercel.app/",
    imageSrc: "/works/hello-space.png",
  },
  {
    title: "Betternote",
    description:
      "A calm, focused note-taking surface on the web—minimal chrome and quick capture.",
    githubHref: "https://github.com/dinesh-kondapalli/betternote",
    demoHref: "https://betternote.vercel.app/",
    imageSrc: "/better-note.png",
  },
  {
    title: "Port Killer",
    description:
      "Collaboration on the open-source CLI that frees stuck dev ports. I built and shipped the Windows version.",
    githubHref: "https://github.com/productdevbook/port-killer",
    imageSrc: "/works/port-killer.png",
  },
];

const linkClass =
  "text-muted-foreground text-sm transition-colors hover:text-foreground";

const sectionShell = "mx-auto w-full max-w-5xl";
const textColumn = "w-full max-w-lg";

const githubIconClass =
  "size-5 shrink-0 text-muted-foreground transition-colors hover:text-foreground";

const workCardShell =
  "group/card bg-muted/80 dark:bg-[#1a1a1a] border-border/80 hover:bg-muted dark:hover:bg-[#222222] relative flex h-[280px] cursor-pointer flex-col overflow-hidden rounded-[20px] border p-3 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] transition-[background-color,box-shadow] duration-300 hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]";

const workThumbWrap =
  "border-border/70 bg-muted/40 dark:bg-black/30 relative min-h-0 w-full flex-1 overflow-hidden rounded-2xl border";

function WorkCard({ work }: { work: Work }) {
  const primaryHref = work.demoHref ?? work.githubHref;
  const thumb = work.imageSrc ?? "/works/placeholder.svg";

  return (
    <li className="flex justify-center">
      <article className={cn(workCardShell, "w-full max-w-[26rem]")}>
        <a
          href={work.githubHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "absolute top-4 right-4 z-20 flex size-8 items-center justify-center",
            "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] transition-transform duration-300",
            "hover:scale-105 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
          aria-label={`${work.title} on GitHub`}
          onClick={(e) => e.stopPropagation()}
        >
          <GithubLogo className="size-[18px]" weight="fill" aria-hidden />
          <span className="sr-only">GitHub</span>
        </a>

        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          title={work.description}
          className="relative flex min-h-0 min-w-0 flex-1 flex-col rounded-[20px] outline-offset-2 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className={workThumbWrap}>
            <Image
              src={thumb}
              alt={`${work.title} preview`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <div className="mt-2 flex shrink-0 items-center justify-between gap-3 px-0.5 pt-1">
            <p className="truncate font-medium text-foreground">{work.title}</p>
            <div className="flex shrink-0 items-center gap-2">
              {work.demoHref ? (
                <span className="text-foreground/50 text-sm font-medium">
                  Live
                </span>
              ) : (
                <span className="text-muted-foreground text-sm font-medium">
                  Repo
                </span>
              )}
            </div>
          </div>
        </a>
      </article>
    </li>
  );
}

/** Sounds for the on-screen Space / Caps Lock keys (files in `/public`) */
const INTERACTIVE_KEY_SOUNDS: Partial<Record<string, string>> = {
  Space: "/star-platinum-part-6-time-stop-sound-effect.mp3",
  CapsLock: "/thehand.mp3",
};

export function PortfolioContent() {
  const { resolvedTheme } = useTheme();
  const { setCrazyLightTheme, setCrazyDarkTheme } = useThemeToggle({
    variant: "circle",
    start: "bottom-center",
  });

  const keyboardSectionRef = React.useRef<HTMLElement>(null);
  const [keyboardInView, setKeyboardInView] = React.useState(false);

  React.useEffect(() => {
    const el = keyboardSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setKeyboardInView(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onSpaceSecret = React.useCallback(() => {
    if (!keyboardInView) return;
    if (resolvedTheme !== "light") {
      setCrazyLightTheme();
    } else {
      setCrazyDarkTheme();
    }
  }, [keyboardInView, resolvedTheme, setCrazyLightTheme, setCrazyDarkTheme]);

  return (
    <div className="relative isolate min-h-dvh text-foreground">
      <div className="relative z-10">
        <section
          className="px-4 pt-20 pb-16 sm:px-8 md:px-12"
          aria-labelledby="hero-heading"
        >
          <div className={sectionShell}>
            <div className={textColumn}>
              <h1
                id="hero-heading"
                className="font-medium text-3xl tracking-tight sm:text-4xl"
              >
                Dinesh
              </h1>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed sm:text-base">
                Software engineer. Interfaces, tools, and the space between.
              </p>
              <p className="mt-6 text-muted-foreground text-sm leading-relaxed sm:text-base">
                I design and build web products, mostly with React and Next.js,
                with attention to interaction, performance, and maintainable UI.
                I also ship cross platform tooling when the problem calls for
                it.
              </p>
              <nav
                className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
                aria-label="Social links"
              >
                <a
                  className={linkClass}
                  href="https://github.com/dinesh-kondapalli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  className={linkClass}
                  href="https://www.linkedin.com/in/kdinesh24/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className={linkClass}
                  href="mailto:dinesh.1124k@gmail.com"
                  title="dinesh.1124k@gmail.com"
                  aria-label="Send email to dinesh.1124k@gmail.com"
                >
                  Email
                </a>
              </nav>
            </div>
            <div className="mt-10 w-full min-w-0 pb-1">
              <GithubCalendar
                username="dinesh-kondapalli"
                colorSchema="gray"
                fullWidth
                className="w-full min-w-0 max-w-full bg-transparent p-0"
              />
            </div>
          </div>
        </section>

        <section
          className="px-4 py-20 sm:px-8 md:px-12"
          aria-labelledby="works-heading"
        >
          <div className={`${sectionShell} flex flex-col gap-10`}>
            <div className="max-w-lg">
              <h2
                id="works-heading"
                className="font-medium text-lg tracking-tight"
              >
                Works
              </h2>
              <p className="mt-2 text-muted-foreground text-xs sm:text-sm">
                Selected projects—open the card for the live app or repo; GitHub
                is always one click on the badge.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {works.map((w) => (
                <WorkCard key={w.githubHref} work={w} />
              ))}
            </ul>
          </div>
        </section>

        <section
          ref={keyboardSectionRef}
          className="px-4 py-20 sm:px-8 md:px-12"
          aria-labelledby="interactive-keys-heading"
        >
          <div className={`${sectionShell} flex flex-col gap-8`}>
            <div className={textColumn}>
              <h2
                id="interactive-keys-heading"
                className="font-medium text-lg tracking-tight"
              >
                Interactive keys
              </h2>
              <p className="mt-2 text-muted-foreground text-xs sm:text-sm">
                Press keys or click Space and Caps Lock—the layout lights up and
                plays sound.
              </p>
            </div>
            <div className="w-full min-w-0 pb-2">
              <MacKeyboard
                soundSrc=""
                keySoundMap={INTERACTIVE_KEY_SOUNDS}
                onSpacePress={onSpaceSecret}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
