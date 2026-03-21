"use client";

import { GithubLogo } from "@phosphor-icons/react";
import { useId, useState } from "react";
import { GithubCalendar } from "@/components/ui/github-calendar";
import { MacKeyboard } from "@/components/ui/mac-keyboard";

type Work = {
  title: string;
  description: string;
  githubHref: string;
  demoHref?: string;
};

const works: Work[] = [
  {
    title: "Hello Space",
    description:
      "Spatial layouts and interface experiments—playing with depth, motion, and structure in the browser.",
    githubHref: "https://github.com/dinesh-kondapalli/hello-space",
    demoHref: "https://hellooo-space.vercel.app/",
  },
  {
    title: "Betternote",
    description:
      "A calm, focused note-taking surface on the web—minimal chrome and quick capture.",
    githubHref: "https://github.com/dinesh-kondapalli/betternote",
    demoHref: "https://betternote.vercel.app/",
  },
  {
    title: "T1Chat",
    description:
      "Real-time chat UI: rooms, messaging flow, and a tight loop between design and implementation.",
    githubHref: "https://github.com/dinesh-kondapalli/t1.chat",
    demoHref: "https://t1chat.vercel.app/",
  },
  {
    title: "Blockchain Explorer",
    description:
      "A block explorer for reading on-chain activity—accounts, transactions, and blocks in one clear view.",
    githubHref: "https://github.com/dinesh-kondapalli/blockchain-explorer",
    demoHref: "https://xyz-explorer.vercel.app/",
  },
  {
    title: "Port Killer",
    description:
      "Collaboration on the open-source CLI that frees stuck dev ports. I built and shipped the Windows version.",
    githubHref: "https://github.com/productdevbook/port-killer",
  },
];

const linkClass =
  "text-muted-foreground text-sm transition-colors hover:text-foreground";

const sectionShell = "mx-auto w-full max-w-5xl";
const textColumn = "w-full max-w-lg";

const typingLineClass =
  "min-h-[1.75rem] w-full resize-none overflow-x-auto overflow-y-hidden border-0 bg-transparent py-1 text-foreground text-base font-medium leading-normal outline-none focus-visible:outline-none focus-visible:ring-0 caret-foreground sm:min-h-[2rem] sm:text-lg [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap";

const githubIconClass =
  "size-5 shrink-0 text-muted-foreground transition-colors hover:text-foreground";

export function PortfolioContent() {
  const [draft, setDraft] = useState("");
  const typingFieldId = useId();
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
          <div className={sectionShell}>
            <div className={textColumn}>
              <h2
                id="works-heading"
                className="font-medium text-lg tracking-tight"
              >
                Works
              </h2>
              <p className="mt-2 text-muted-foreground text-xs sm:text-sm">
                Repos on GitHub; live demos where deployed.
              </p>
              <ul className="mt-10 flex flex-col gap-11 sm:gap-12">
                {works.map((w) => {
                  const primaryHref = w.demoHref ?? w.githubHref;
                  return (
                    <li key={w.githubHref} className="flex gap-3">
                      <a
                        href={w.githubHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                        aria-label={`${w.title} on GitHub`}
                      >
                        <GithubLogo
                          className={githubIconClass}
                          weight="regular"
                          aria-hidden
                        />
                      </a>
                      <div className="min-w-0 flex-1">
                        <a
                          href={primaryHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground text-sm transition-colors hover:text-muted-foreground"
                        >
                          {w.title}
                          {w.demoHref ? (
                            <span className="sr-only"> (opens live demo)</span>
                          ) : (
                            <span className="sr-only"> (opens GitHub)</span>
                          )}
                        </a>
                        <p className="mt-1.5 max-w-md text-muted-foreground text-sm leading-relaxed">
                          {w.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section
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
                Focus the field and type—the layout lights up with you.
              </p>
            </div>
            <label className="sr-only" htmlFor={typingFieldId}>
              Keyboard input
            </label>
            <textarea
              id={typingFieldId}
              rows={1}
              value={draft}
              spellCheck={false}
              aria-label="Keyboard input"
              className={typingLineClass}
              onChange={(e) => {
                const el = e.target;
                const next = el.value.replace(/\r?\n/g, "");
                setDraft(next);
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    el.scrollLeft = el.scrollWidth;
                  });
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
            <div className="w-full min-w-0 pb-2">
              <MacKeyboard soundSrc="" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
