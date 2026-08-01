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

/** Frosted card face + light-catching rim, as on the reference cards. */
const cardFace =
  "border border-transparent [background:linear-gradient(160deg,rgba(255,255,255,0.74),rgba(255,255,255,0.5))_padding-box,linear-gradient(150deg,rgba(255,255,255,0.95),rgba(255,255,255,0.1))_border-box] shadow-[0_30px_60px_rgba(0,0,0,0.06)] backdrop-blur-[10px] [transform:translateZ(0)]";

export function Trust() {
  return (
    <section
      style={stageStyle}
      className="relative w-full overflow-hidden bg-[hsl(var(--beige-1))] text-[hsl(var(--ink-1))]"
    >
      <div style={scale} className="relative w-full lg:h-[calc(603*var(--s))]">
        {/* drag handle above the panel lip */}
        <div className="absolute left-1/2 top-[10px] z-10 h-[6px] w-[64px] -translate-x-1/2 rounded-full bg-[rgba(20,20,20,0.16)] lg:top-[calc(12*var(--s))] lg:h-[calc(7*var(--s))] lg:w-[calc(76*var(--s))]" />

        {/* ---------- glass panel ---------- */}
        <div className="relative mx-3 mt-6 overflow-hidden rounded-[28px] border border-white/60 [background:radial-gradient(120%_95%_at_72%_28%,rgba(246,242,60,0.13),rgba(246,242,60,0)_55%),linear-gradient(158deg,rgba(255,255,255,0.66)_0%,rgba(255,255,255,0.46)_55%,rgba(252,250,230,0.5)_100%)] px-5 py-10 shadow-[0_-26px_70px_rgba(0,0,0,0.10),0_40px_90px_rgba(0,0,0,0.07)] backdrop-blur-[30px] backdrop-saturate-150 [transform:translateZ(0)] lg:absolute lg:left-[calc(4*var(--s))] lg:top-[calc(8*var(--s))] lg:mx-0 lg:mt-0 lg:h-[calc(537*var(--s))] lg:w-[calc(1664*var(--s))] lg:rounded-[calc(44*var(--s))] lg:p-0">
          {/* yellow bloom behind the stat cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[calc(826*var(--s))] top-[calc(82*var(--s))] hidden h-[calc(340*var(--s))] w-[calc(560*var(--s))] rounded-[50%] bg-[radial-gradient(closest-side,rgba(246,242,60,0.34),rgba(246,242,60,0))] blur-[calc(28*var(--s))] lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[calc(876*var(--s))] top-[calc(142*var(--s))] hidden h-[calc(230*var(--s))] w-[calc(210*var(--s))] rounded-[50%] bg-[radial-gradient(closest-side,rgba(246,242,60,0.4),rgba(246,242,60,0))] blur-[calc(18*var(--s))] lg:block"
          />

          {/* badge — ref 103,82 · 58 tall */}
          <div className="relative inline-flex h-[52px] items-center gap-[12px] whitespace-nowrap rounded-full border border-white/85 bg-white/[0.72] px-[24px] text-[16px] font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur-[10px] lg:absolute lg:left-[calc(99*var(--s))] lg:top-[calc(74*var(--s))] lg:h-[calc(58*var(--s))] lg:gap-[calc(12*var(--s))] lg:px-[calc(24*var(--s))] lg:text-[calc(16*var(--s))]">
            <ShieldCheck className="h-[20px] w-[20px] lg:h-[calc(20*var(--s))] lg:w-[calc(20*var(--s))]" />
            Trusted by teams worldwide
          </div>

          {/* headline — ref cap-top 170, 50px/57 */}
          <h2 className="relative mt-7 text-[clamp(2rem,7.6vw,50px)] font-extrabold leading-[1.14] tracking-[-0.028em] lg:absolute lg:left-[calc(105*var(--s))] lg:top-[calc(152*var(--s))] lg:mt-0 lg:w-[calc(760*var(--s))] lg:text-[calc(50*var(--s))] lg:leading-[1.14]">
            Turning Ideas Into
            <br />
            <span className="text-[hsl(var(--yellow))]">Production-Ready</span>{" "}
            Products<span className="text-[hsl(var(--yellow))]">.</span>
          </h2>

          {/* sub copy — ref cap-top 300 */}
          <p className="relative mt-5 max-w-[560px] text-[17px] leading-[1.5] text-[hsl(var(--ink-2))] lg:absolute lg:left-[calc(106*var(--s))] lg:top-[calc(285*var(--s))] lg:mt-0 lg:max-w-none lg:w-[calc(575*var(--s))] lg:text-[calc(19*var(--s))] lg:leading-[calc(28*var(--s))]">
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
            className="absolute left-[calc(1322*var(--s))] top-[calc(86*var(--s))] hidden h-[calc(28*var(--s))] w-[calc(46*var(--s))] lg:block"
          >
            <path d="M40 6C30 4 12 6 6 20" />
            <path d="M3 12l3 9 8-5" />
          </svg>
          <p className="font-hand absolute right-[calc(97*var(--s))] top-[calc(72*var(--s))] hidden whitespace-nowrap text-[calc(21*var(--s))] font-semibold lg:block">
            Real impact, not just code.
          </p>

          {/* ---------- stat cards — ref 868..1620, top 144, 238 tall ---------- */}
          <div className="relative mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:absolute lg:left-[calc(864*var(--s))] lg:top-[calc(136*var(--s))] lg:mt-0 lg:flex lg:h-[calc(238*var(--s))] lg:w-[calc(752*var(--s))] lg:gap-[calc(25*var(--s))]">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={value}
                className={`flex flex-col rounded-[22px] p-[20px] ${cardFace} lg:flex-1 lg:rounded-[calc(26*var(--s))] lg:p-[calc(27*var(--s))]`}
              >
                <span className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[hsl(var(--yellow))] lg:h-[calc(48*var(--s))] lg:w-[calc(48*var(--s))] lg:rounded-[calc(13*var(--s))]">
                  <Icon
                    className="h-[22px] w-[22px] lg:h-[calc(24*var(--s))] lg:w-[calc(24*var(--s))]"
                    strokeWidth={2.3}
                  />
                </span>
                <div className="mt-6 text-[32px] font-extrabold leading-none tracking-[-0.02em] lg:mt-[calc(24*var(--s))] lg:text-[calc(37*var(--s))]">
                  {value}
                </div>
                <div className="mt-[8px] text-[15px] leading-[1.44] text-[hsl(var(--ink-2))] lg:mt-[calc(10*var(--s))] lg:text-[calc(16*var(--s))] lg:leading-[calc(23*var(--s))]">
                  {label[0]}
                  <br />
                  {label[1]}
                </div>
              </div>
            ))}
          </div>

          {/* ---------- trusted-for strip — ref 48,424 · 1568x96 ---------- */}
          <div
            className={`relative mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 rounded-[20px] px-6 py-6 ${cardFace} lg:absolute lg:left-[calc(48*var(--s))] lg:top-[calc(424*var(--s))] lg:mt-0 lg:h-[calc(96*var(--s))] lg:w-[calc(1568*var(--s))] lg:flex-nowrap lg:justify-between lg:gap-0 lg:rounded-[calc(24*var(--s))] lg:px-[calc(44*var(--s))] lg:py-0`}
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
    </section>
  );
}
