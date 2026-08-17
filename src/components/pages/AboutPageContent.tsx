import { AboutCaseNotes } from "@/components/about/AboutCaseNotes";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutExperience } from "@/components/about/AboutExperience";
import { AboutFaq } from "@/components/about/AboutFaq";
import { AboutFocus } from "@/components/about/AboutFocus";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutHowIWork } from "@/components/about/AboutHowIWork";
import { AboutStack } from "@/components/about/AboutStack";
import { AboutThinking } from "@/components/about/AboutThinking";
import { RevealContainer } from "@/components/motion/RevealContainer";

/**
 * /about — the full personal page.
 *
 * Nine sections on the shared 1620x875 canvas. Four pin with scrubbed
 * choreography; five scroll at canvas width. The split is by reading behaviour
 * rather than importance: what people read is pinned, what people scan is not.
 * A visitor hunting for a date in the job history should not have to scrub a
 * timeline to reach it.
 *
 * `RevealContainer` drives the `data-reveal` entrances inside the scrolling
 * sections; the pinned sections own their own sequences.
 *
 * Design: docs/superpowers/specs/2026-08-09-about-page-redesign-design.md
 */
export function AboutPageContent() {
  return (
    <RevealContainer>
      <AboutHero />
      <AboutHowIWork />
      <AboutExperience />
      <AboutCaseNotes />
      <AboutStack />
      <AboutFocus />
      <AboutThinking />
      <AboutFaq />
      <AboutCta />
    </RevealContainer>
  );
}
