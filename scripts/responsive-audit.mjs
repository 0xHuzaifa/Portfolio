/**
 * Responsive audit.
 *
 * Loads every route at a set of widths and reports the two faults that a
 * screenshot at one size cannot show you: the page scrolling sideways, and
 * individual elements sticking out past the viewport.
 *
 * Uses the Chrome already installed on the machine (`channel: "chrome"`), so
 * there is no browser download and no second Chromium to keep updated.
 *
 *   node scripts/responsive-audit.mjs [baseUrl]
 */
import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:3002";

const ROUTES = [
  "/",
  "/about",
  "/systems",
  "/systems/crm-system",
  "/contact",
  "/experience",
  "/services",
  "/how-i-build-systems",
];

/** iPhone SE, iPhone 15, tablet portrait, the `lg` boundary, laptop, desktop. */
const WIDTHS = [320, 390, 768, 1024, 1280, 1536];

/** A few px of slack: sub-pixel layout rounding is not a bug worth reporting. */
const SLACK = 2;

const browser = await chromium.launch({ channel: "chrome" });
const findings = [];

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  for (const route of ROUTES) {
    try {
      await page.goto(`${BASE}${route}`, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
    } catch {
      findings.push({ width, route, kind: "load", detail: "timed out" });
      continue;
    }

    // Sections animate in on scroll; walk the page so everything has laid out
    // at its final size before measuring.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });

    // Intros slide content in from off its own position — measuring mid-tween
    // reports a transform as an overflow. Let the timelines land first.
    await page.waitForTimeout(2000);

    const result = await page.evaluate((slack) => {
      const vw = document.documentElement.clientWidth;
      const docWidth = document.documentElement.scrollWidth;

      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") continue;
        // Fixed overlays and deliberately cropped art sit outside the viewport
        // by design; only flow content can force the page sideways.
        if (style.position === "fixed") continue;

        const box = el.getBoundingClientRect();
        if (box.width === 0 || box.height === 0) continue;

        // A deliberate horizontal scroller (a chip rail, a card row) has
        // children past the right edge by design — that is what scrolling it
        // means. Only content that cannot be reached counts.
        let inScroller = false;
        for (let p = el.parentElement; p && p !== document.body; ) {
          const overflowX = getComputedStyle(p).overflowX;
          if (overflowX === "auto" || overflowX === "scroll") {
            inScroller = true;
            break;
          }
          p = p.parentElement;
        }
        if (inScroller) continue;

        const over = Math.round(box.right - vw);
        if (over > slack) {
          offenders.push({
            over,
            tag: el.tagName.toLowerCase(),
            cls: (el.className || "").toString().slice(0, 70),
            text: (el.textContent || "").trim().slice(0, 40),
          });
        }
      }

      // The widest offender that is not inside another offender is the cause;
      // the rest are its children reporting the same overflow.
      offenders.sort((a, b) => b.over - a.over);

      return {
        vw,
        docWidth,
        scrollsSideways: docWidth - vw > slack,
        offenders: offenders.slice(0, 4),
      };
    }, SLACK);

    if (result.scrollsSideways || result.offenders.length > 0) {
      findings.push({
        width,
        route,
        kind: result.scrollsSideways ? "h-scroll" : "overflow",
        detail: `doc ${result.docWidth} vs viewport ${result.vw}`,
        offenders: result.offenders,
      });
    }
  }

  await context.close();
}

await browser.close();

if (findings.length === 0) {
  console.log("clean — no horizontal scroll or overflowing elements");
} else {
  for (const f of findings) {
    console.log(`\n${f.width}px  ${f.route}  [${f.kind}]  ${f.detail ?? ""}`);
    for (const o of f.offenders ?? []) {
      console.log(`    +${o.over}px  <${o.tag}> ${o.cls}  "${o.text}"`);
    }
  }
  console.log(`\n${findings.length} finding(s)`);
}
