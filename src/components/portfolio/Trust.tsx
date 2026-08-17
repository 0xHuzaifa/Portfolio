import {
  Building2,
  Clock,
  Cloud,
  Code,
  Globe,
  Monitor,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
} from "lucide-react";

/**
 * Geometry is a 1:1 port of the 1672x603 design reference; every number below
 * is a measured reference pixel and `--s` scales the stage with its own width.
 * Unlike the hero this section scrolls, so it only fits to width.
 */
const stageStyle = { containerType: "inline-size" } as const;
const scale = { ["--s" as string]: "calc(100cqw/1672)" };

const stats = [
  { icon: Code, value: "80+", label: ["Projects", "Delivered"] },
  { icon: Users, value: "30+", label: ["Happy", "Clients"] },
  { icon: Globe, value: "8+", label: ["Industries", "Served"] },
  { icon: Clock, value: "99%", label: ["On-Time", "Delivery"] },
] as const;

const trustedFor = [
  { icon: Cloud, label: "SaaS Platforms" },
  { icon: Building2, label: "Real Estate Systems" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Sparkles, label: "AI-Powered Apps" },
  { icon: Settings, label: "Business Automation" },
  { icon: Monitor, label: "Custom Web Apps" },
] as const;

/**
 * Frosted glass for the `Trusted for` strip: milky face, lit rim, no accent
 * glow — the strip sits below the warm zone in the reference.
 *
 * The stat cards are NOT styled here. They are a five-layer treatment with two
 * pseudo-elements and a keyframe, which lives in globals.css under `.trust-card`
 * where those things can be expressed properly.
 */
const stripFace =
  "border border-transparent [background:linear-gradient(150deg,rgba(255,255,255,0.70),rgba(255,255,255,0.44)_52%,rgba(255,255,255,0.56))_padding-box,linear-gradient(160deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.35)_45%,rgba(255,255,255,0.75)_100%)_border-box] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_40px_rgba(0,0,0,0.05)] backdrop-blur-[20px] backdrop-saturate-150 [transform:translateZ(0)]";

export function Trust() {
  return (
    <section
      style={stageStyle}
      className="trust-section relative w-full overflow-hidden bg-[hsl(var(--beige-1))] text-[hsl(var(--ink-1))]"
    >
      <div style={scale} className="relative w-full lg:h-[calc(603*var(--s))]">
        {/* drag handle above the panel lip */}
        <div className="trust-handle absolute left-1/2 top-[10px] z-10 h-[6px] w-[64px] -translate-x-1/2 rounded-full bg-[rgba(20,20,20,0.16)] lg:top-[calc(12*var(--s))] lg:h-[calc(7*var(--s))] lg:w-[calc(76*var(--s))]" />

        {/* The drop that the surface grows out of. Only ever visible while the
            scroll sequence is running; inert (display:none) otherwise. */}
        <div aria-hidden="true" className="trust-drop">
          <span className="trust-drop-gloss" />
        </div>

        {/* ---------- glass panel ---------- */}
        <div className="trust-surface relative mx-3 mt-6 overflow-hidden rounded-[28px] border border-white/60 [background:radial-gradient(120%_95%_at_72%_28%,rgba(246,242,60,0.13),rgba(246,242,60,0)_55%),linear-gradient(158deg,rgba(255,255,255,0.66)_0%,rgba(255,255,255,0.46)_55%,rgba(252,250,230,0.5)_100%)] px-5 py-10 shadow-[0_-26px_70px_rgba(0,0,0,0.10),0_40px_90px_rgba(0,0,0,0.07)] backdrop-blur-[30px] backdrop-saturate-150 lg:absolute lg:left-[calc(4*var(--s))] lg:top-[calc(8*var(--s))] lg:mx-0 lg:mt-0 lg:h-[calc(537*var(--s))] lg:w-[calc(1664*var(--s))] lg:rounded-[calc(44*var(--s))] lg:p-0">
          {/* Ambient warmth behind the stat cards — one broad, shapeless wash.
              Deliberately NOT a `rounded-[50%]` pool: the cards are translucent
              glass, and any bloom with a discernible edge reads straight
              through their faces as a circle sitting in the middle of the card.
              The falloff is stretched to 72% and the whole thing is heavily
              blurred so it has no edge to show. The tight glow that hugs each
              card in the reference is the card's own box-shadow, not this. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[calc(790*var(--s))] top-[calc(70*var(--s))] hidden h-[calc(400*var(--s))] w-[calc(900*var(--s))] bg-[radial-gradient(60%_55%_at_38%_58%,rgba(246,242,60,0.34),rgba(246,242,60,0)_72%)] blur-[calc(46*var(--s))] lg:block"
          />

          {/* Everything that rises out of the water. On lg this is pinned to
              the panel's padding box so the measured child coordinates below
              still resolve against the panel, exactly as before the split. */}
          <div className="trust-content lg:absolute lg:inset-0">
            {/* badge — ref 103,82 · 58 tall */}
            {/* Nowrap only once there is room for the line. At 320px the pill
                ran past the screen edge: 26 characters that cannot break,
                inside a panel with 64px of its own horizontal padding. */}
            <div className="trust-text relative inline-flex min-h-[52px] items-center gap-[10px] rounded-full border border-white/85 bg-white/[0.72] px-[16px] py-[10px] text-[14px] font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur-[10px] sm:h-[52px] sm:gap-[12px] sm:whitespace-nowrap sm:px-[24px] sm:py-0 sm:text-[16px] lg:absolute lg:left-[calc(99*var(--s))] lg:top-[calc(74*var(--s))] lg:h-[calc(58*var(--s))] lg:gap-[calc(12*var(--s))] lg:px-[calc(24*var(--s))] lg:text-[calc(16*var(--s))]">
              <ShieldCheck className="h-[20px] w-[20px] lg:h-[calc(20*var(--s))] lg:w-[calc(20*var(--s))]" />
              Trusted by teams worldwide
            </div>

            {/* headline — ref cap-top 170, 50px/57 */}
            <h2 className="trust-text relative mt-7 text-[clamp(2rem,7.6vw,50px)] font-extrabold leading-[1.14] tracking-[-0.028em] lg:absolute lg:left-[calc(105*var(--s))] lg:top-[calc(152*var(--s))] lg:mt-0 lg:w-[calc(760*var(--s))] lg:text-[calc(50*var(--s))] lg:leading-[1.14]">
              Turning Ideas Into
              <br />
              <span className="text-[hsl(var(--yellow-deep))]">
                Production-Ready
              </span>{" "}
              Products<span className="text-[hsl(var(--yellow-deep))]">.</span>
            </h2>

            {/* sub copy — ref cap-top 300 */}
            <p className="trust-text relative mt-5 max-w-[560px] text-[17px] leading-[1.5] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(106*var(--s))] lg:top-[calc(285*var(--s))] lg:mt-0 lg:max-w-none lg:w-[calc(575*var(--s))] lg:text-[calc(19*var(--s))] lg:leading-[calc(28*var(--s))]">
              Businesses trust me to design, build, and ship systems that work
              reliably — at scale, in the real world.
            </p>

            {/* handwritten aside — ref arrow 1349,86 · text ends 1567 */}
            <svg
              aria-hidden="true"
              viewBox="0 0 42 40"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="trust-text absolute left-[calc(1322*var(--s))] top-[calc(86*var(--s))] hidden h-[calc(28*var(--s))] w-[calc(46*var(--s))] lg:block"
            >
              <path d="M40 6C30 4 12 6 6 20" />
              <path d="M3 12l3 9 8-5" />
            </svg>
            <p className="trust-text font-hand absolute right-[calc(97*var(--s))] top-[calc(72*var(--s))] hidden whitespace-nowrap text-[calc(21*var(--s))] font-semibold lg:block">
              Real impact, not just code.
            </p>

            {/* ---------- stat cards — ref 868..1620, top 144, 238 tall ---------- */}
            <div className="relative mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:absolute lg:left-[calc(864*var(--s))] lg:top-[calc(136*var(--s))] lg:mt-0 lg:flex lg:h-[calc(238*var(--s))] lg:w-[calc(752*var(--s))] lg:gap-[calc(25*var(--s))]">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={value}
                  className="trust-card flex flex-col rounded-[18px] p-[20px] lg:flex-1 lg:rounded-[calc(20*var(--s))] lg:p-[calc(24*var(--s))]"
                >
                  {/* Float and hover-lift live here, not on the card: GSAP owns
                      the card's transform through P4 and P5. */}
                  <div className="trust-card-inner flex flex-1 flex-col">
                    <span className="trust-card-icon flex h-[44px] w-[44px] items-center justify-center rounded-[12px] lg:h-[calc(48*var(--s))] lg:w-[calc(48*var(--s))] lg:rounded-[calc(13*var(--s))]">
                      <Icon
                        className="h-[22px] w-[22px] lg:h-[calc(24*var(--s))] lg:w-[calc(24*var(--s))]"
                        strokeWidth={2.3}
                      />
                    </span>
                    <div className="trust-card-value mt-6 text-[32px] font-extrabold leading-none tracking-[-0.02em] lg:mt-[calc(24*var(--s))] lg:text-[calc(37*var(--s))]">
                      {value}
                    </div>
                    <div className="mt-[8px] text-[15px] leading-[1.44] text-[hsl(var(--ink-2))] lg:mt-[calc(10*var(--s))] lg:text-[calc(16*var(--s))] lg:leading-[calc(23*var(--s))]">
                      {label[0]}
                      <br />
                      {label[1]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ---------- trusted-for strip — ref 48,424 · 1568x96 ---------- */}
            <div
              className={`trust-strip relative mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 rounded-[20px] px-6 py-6 ${stripFace} lg:absolute lg:left-[calc(48*var(--s))] lg:top-[calc(424*var(--s))] lg:mt-0 lg:h-[calc(96*var(--s))] lg:w-[calc(1568*var(--s))] lg:flex-nowrap lg:justify-between lg:gap-0 lg:rounded-[calc(24*var(--s))] lg:px-[calc(44*var(--s))] lg:py-0`}
            >
              <span className="text-[16px] font-extrabold tracking-[-0.01em] lg:text-[calc(16*var(--s))]">
                Trusted for
              </span>
              {trustedFor.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-[10px] whitespace-nowrap text-[15px] font-semibold lg:gap-[calc(12*var(--s))] lg:text-[calc(15*var(--s))] lg:before:mr-[calc(44*var(--s))] lg:before:h-[calc(34*var(--s))] lg:before:w-px lg:before:bg-[var(--ink-a12)] lg:before:content-['']"
                >
                  <Icon
                    className="h-[19px] w-[19px] lg:h-[calc(21*var(--s))] lg:w-[calc(21*var(--s))]"
                    strokeWidth={2}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
