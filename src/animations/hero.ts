import { gsap } from "gsap";

/**
 * Hero intro choreography.
 *
 * The hero is meant to read as a scene being *assembled*, not a page loading —
 * so nothing animates in parallel unless the spec says it should. The order is
 * deliberately message-before-person: the visitor understands what the work is,
 * then meets who does it.
 *
 * Call inside `useGSAP(..., { scope })` so every selector resolves within the
 * hero and GSAP reverts the whole thing on unmount.
 */

/** Stage start times, in seconds. Mirrors the design spec's timing table. */
const AT = {
  wordmark: 0.3,
  columns: 0.8,
  support: 1.3,
  fill: 1.8,
  frame: 2.3,
  portrait: 2.8,
  cards: 4.0,
} as const;

const EASE = "power3.out";

/** Ambient motion holds off until the assembly has finished. */
const IDLE_START = 4.9;

export function heroIntro() {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // The nav lives in the root layout, outside the hero's scope, so it has to
    // be looked up by hand rather than through a scoped selector string.
    const nav = document.querySelector(".site-nav");

    const tl = gsap.timeline({ defaults: { ease: EASE } });

    // Stage 1 — the name rises out of its own box. The wrapper is clipped to
    // the word, so the reveal line is the wordmark's own baseline: it emerges
    // from where it already sits rather than travelling in from anywhere.
    tl.from(
      ".hero-wordmark-text",
      { yPercent: 100, duration: 1.1, ease: "power4.out" },
      AT.wordmark,
    );

    // Stage 2 — the two columns of the story arrive together, from opposite
    // sides, and land at the same moment.
    tl.from(
      ".hero-left",
      { opacity: 0, x: -40, duration: 0.8 },
      AT.columns,
    ).from(".hero-right", { opacity: 0, x: 40, duration: 0.8 }, AT.columns);

    // Stage 3 — supporting content. Label rises, buttons scale up.
    tl.from(
      ".hero-support",
      { opacity: 0, y: 16, duration: 0.5, stagger: 0.06 },
      AT.support,
    ).from(
      ".hero-cta",
      { opacity: 0, scale: 0.96, duration: 0.5, stagger: 0.08 },
      AT.support,
    );

    // Stage 4 — the primary button fills like liquid poured into a glass.
    // The surface keeps drifting sideways while it rises, so the top edge
    // reads as a moving meniscus rather than a wipe.
    tl.from(
      ".hero-fill",
      { yPercent: 100, duration: 0.9, ease: "power2.inOut" },
      AT.fill,
    )
      .fromTo(
        ".hero-wave",
        { xPercent: 0 },
        { xPercent: -50, duration: 0.9, ease: "none" },
        AT.fill,
      )
      .from(".hero-fill-icon", { opacity: 0, duration: 0.4 }, AT.fill + 0.75);

    // Stage 5 — the frame locks in: nav drops from above, strip rises from
    // below, pinning the composition in place.
    if (nav) {
      tl.from(nav, { opacity: 0, y: -24, duration: 0.7 }, AT.frame);
    }
    tl.from(".hero-strip", { opacity: 0, y: 48, duration: 0.8 }, AT.frame);

    // Stage 6 — the portrait resolves, like a lens pulling focus. No slide,
    // no pop; only clarity emerging.
    tl.from(
      ".hero-portrait",
      {
        opacity: 0,
        scale: 1.02,
        filter: "blur(18px)",
        duration: 1.2,
        ease: "power2.out",
      },
      AT.portrait,
    );

    // Stage 7 — the floating panels arrive one after another, never together.
    tl.from(
      ".hero-card",
      {
        opacity: 0,
        scale: 0.94,
        filter: "blur(10px)",
        duration: 0.7,
        stagger: 0.12,
      },
      AT.cards,
    );

    // If the page isn't being rendered yet (opened into a background tab), the
    // ticker is throttled: the `from()` start states land but nothing advances,
    // so the hero would sit blank. Hold at frame 0 and open the scene when the
    // visitor actually arrives.
    let onVisible: (() => void) | undefined;
    if (document.visibilityState === "hidden") {
      tl.pause(0);
      onVisible = () => {
        if (document.visibilityState === "visible") {
          tl.play();
          document.removeEventListener("visibilitychange", onVisible as never);
        }
      };
      document.addEventListener("visibilitychange", onVisible);
    }

    return () => {
      if (onVisible) {
        document.removeEventListener("visibilitychange", onVisible);
      }
      tl.kill();
    };
  });

  return () => mm.revert();
}

/**
 * Stage 8 — idle life. Deliberately below the threshold of notice: the page
 * should feel alive without asking for attention.
 */
export function heroIdle(root: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const q = gsap.utils.selector(root);
    const tweens: gsap.core.Tween[] = [];

    // Each panel drifts on its own clock and in its own direction, so they
    // never look like one group moving together. They wait for the intro to
    // finish first — overlapping the reveal tween made the drift stutter — and
    // ride a promoted layer, since moving a backdrop-filtered element forces a
    // re-rasterise on every frame.
    q(".hero-card").forEach((card, i) => {
      const drift = i % 2 === 0 ? 6 : -5;
      // set, not tweened: will-change is a hint, not an animatable value
      gsap.set(card, { willChange: "transform" });
      tweens.push(
        gsap.fromTo(
          card,
          { y: -drift / 2 },
          {
            y: drift / 2,
            duration: 7 + i * 1.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            force3D: true,
            delay: IDLE_START + i * 0.8,
          },
        ),
      );
    });

    // A single slow pulse on the yellow accents, rare enough to register as
    // life rather than as a blinking element.
    const accents = q(".hero-accent");
    if (accents.length) {
      tweens.push(
        gsap.to(accents, {
          opacity: 0.72,
          duration: 0.9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          repeatDelay: 8,
          stagger: 0.4,
          delay: IDLE_START,
        }),
      );
    }

    // Pointer parallax: the portrait leans toward the cursor, the background
    // wordmark drifts the other way. A few pixels, no more.
    const portrait = q(".hero-portrait")[0];
    const wordmark = q(".hero-wordmark")[0];
    const portraitX = portrait
      ? gsap.quickTo(portrait, "x", { duration: 0.9, ease: "power2.out" })
      : null;
    const portraitY = portrait
      ? gsap.quickTo(portrait, "y", { duration: 0.9, ease: "power2.out" })
      : null;
    const wordX = wordmark
      ? gsap.quickTo(wordmark, "x", { duration: 1.4, ease: "power2.out" })
      : null;

    const onMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      portraitX?.(nx * 6);
      portraitY?.(ny * 4);
      wordX?.(nx * -6);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      for (const tween of tweens) tween.kill();
    };
  });

  return () => mm.revert();
}
