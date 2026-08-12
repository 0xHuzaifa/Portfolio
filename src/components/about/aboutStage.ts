/**
 * Flowing variant of the shared canvas, for the /about sections that scroll
 * rather than pin (Experience, Stack, Focus, FAQ).
 *
 * Same `--s` and the same 1620-unit width as every other section on the site,
 * so the page keeps one column edge from top to bottom — but the height is
 * whatever the content needs instead of exactly one screen. Reference content
 * is scanned, and a job timeline clipped to 875 units would either overflow or
 * force the type down to nothing.
 *
 * Defined here rather than added to `portfolio/stage.ts` to keep this page's
 * changes out of a file the /systems work is also using.
 */
export const flowSectionClass =
  "relative w-full overflow-hidden bg-[hsl(var(--beige-1))] text-[hsl(var(--ink-1))] lg:grid lg:place-items-center";

export const flowStageClass =
  "relative w-full px-6 py-16 md:px-8 lg:w-[calc(1620*var(--s))] lg:px-0 lg:py-[calc(130*var(--s))]";
