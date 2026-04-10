/**
 * LIIV Atlanta Social Media Management Proposal
 * Design: Urban Gospel Manifesto
 * Colors: Near-black, LIIV Yellow (#F5C200), Coral (#E85D3A), Electric Green (#2ECC40)
 * Typography: Barlow Condensed (display) + IBM Plex Sans (body)
 * Layout: Full-bleed color-blocked sections, editorial grid, off-axis content
 */

import { useEffect, useRef, useState } from "react";

// Asset CDN URLs
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029617589/iFbBgfje6Pge5Lz45y7TZJ/hero-bg-nUuKjvFDm2FYGq29XWM2KA.webp";
const SOCIAL_VISUAL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029617589/iFbBgfje6Pge5Lz45y7TZJ/social-media-visual-HQwhjB9PzzKXqFEU8pwUQw.webp";
const VIDEO_VISUAL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029617589/iFbBgfje6Pge5Lz45y7TZJ/video-production-BF7XrA3M5Aa5xhxdFK8pYh.webp";
const BRANDING_VISUAL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029617589/iFbBgfje6Pge5Lz45y7TZJ/branding-visual-Q4iKfJPgsa944gJ2iMcx78.webp";
const WORSHIP_VISUAL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029617589/iFbBgfje6Pge5Lz45y7TZJ/church-worship-ELxZfiwozBQXqSrb4keeBK.webp";

// Counter animation hook
function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

// Stats section with counter
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const posts = useCountUp(52, 1800, started);
  const clips = useCountUp(52, 1800, started);
  const ebooks = useCountUp(12, 1800, started);
  const platforms = useCountUp(5, 1500, started);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-0">
      {[
        { num: posts, label: "POSTS PER YEAR", suffix: "+", color: "bg-liiv-yellow", text: "text-black" },
        { num: clips, label: "VIDEO CLIPS PER YEAR", suffix: "+", color: "bg-liiv-coral", text: "text-white" },
        { num: ebooks, label: "EBOOKS PER YEAR", suffix: "", color: "bg-liiv-black border border-white/10", text: "text-white" },
        { num: platforms, label: "PLATFORMS MANAGED", suffix: "+", color: "bg-liiv-green", text: "text-black" },
      ].map((stat, i) => (
        <div key={i} className={`${stat.color} ${stat.text} p-8 md:p-12 flex flex-col justify-center`}>
          <div className="font-display text-7xl md:text-9xl leading-none">
            {stat.num}{stat.suffix}
          </div>
          <div className="font-body text-xs md:text-sm font-500 mt-3 tracking-widest opacity-80">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// Service card component
function ServiceCard({
  number,
  title,
  description,
  image,
  accentColor,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  image: string;
  accentColor: string;
  delay?: number;
}) {
  return (
    <div
      className="reveal group relative overflow-hidden bg-liiv-dark border border-white/5 hover:border-white/20 transition-all duration-500"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div
          className="absolute top-4 left-4 font-display text-6xl leading-none opacity-30"
          style={{ color: accentColor }}
        >
          {number}
        </div>
      </div>
      <div className="p-6">
        <div className="w-8 h-1 mb-4" style={{ backgroundColor: accentColor }} />
        <h3 className="font-display text-2xl mb-3 text-white">{title}</h3>
        <p className="font-body text-sm text-white/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Deliverable row
function DeliverableRow({
  icon,
  title,
  items,
  accent,
}: {
  icon: string;
  title: string;
  items: string[];
  accent: string;
}) {
  return (
    <div className="reveal border-b border-white/10 py-8 grid md:grid-cols-3 gap-6 items-start">
      <div className="flex items-center gap-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="font-display text-xl" style={{ color: accent }}>{title}</h3>
      </div>
      <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
            <span className="font-body text-sm text-white/70">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-liiv-black text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Atlanta skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-6">
          <div className="font-display text-sm tracking-widest text-white/60">
            PREPARED FOR
          </div>
          <div className="font-display text-lg tracking-wider text-white flex items-center gap-3">
            <span className="w-6 h-px bg-liiv-yellow inline-block" />
            LIIV ATLANTA
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 px-6 md:px-12 pb-16 md:pb-24">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-liiv-yellow" />
              <span className="font-body text-xs tracking-widest text-liiv-yellow uppercase">
                Social Media Management Proposal — 2026
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.88] mb-8 text-white">
              AMPLIFY<br />
              <span className="liiv-yellow">YOUR</span><br />
              MISSION
            </h1>

            {/* Sub headline */}
            <p className="font-body text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10">
              A comprehensive digital strategy to grow LIIV Atlanta's reach, 
              build Pastor Mayo's personal brand, and turn every Sunday service 
              into a week-long content engine.
            </p>

            {/* CTA strip */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#pricing"
                className="bg-liiv-yellow text-black font-display text-xl px-10 py-4 hover:bg-white transition-colors duration-300"
              >
                VIEW INVESTMENT →
              </a>
              <a
                href="#services"
                className="font-display text-lg text-white/60 hover:text-white transition-colors duration-300 tracking-wider"
              >
                SEE WHAT'S INCLUDED ↓
              </a>
            </div>
          </div>
        </div>

        {/* Bottom accent stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-liiv-yellow" />
          <div className="flex-1 bg-liiv-coral" />
          <div className="flex-1 bg-liiv-green" />
        </div>
      </section>

      {/* ── INTRO STATEMENT ── */}
      <section className="bg-liiv-yellow py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-black mb-6">
                A CHURCH FROM ATLANTA,<br />FOR ATLANTA — AND<br />NOW FOR THE WORLD.
              </h2>
            </div>
            <div className="md:col-span-2">
              <p className="font-body text-black/80 text-base leading-relaxed">
                LIIV Atlanta is already doing the work. Pastor Mayo and Kai Sowell are 
                building something extraordinary — a church that sees ALL people flourish. 
                This proposal is about making sure the world sees it too. Every sermon, 
                every Sunday, every story — amplified, automated, and strategically distributed 
                across every major platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <StatsSection />

      {/* ── SERVICES ── */}
      <section id="services" className="bg-liiv-black py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="reveal flex items-end justify-between mb-16 border-b border-white/10 pb-8">
            <div>
              <span className="font-display text-sm tracking-widest text-liiv-yellow block mb-3">
                01 — WHAT WE DO
              </span>
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-white">
                THE FULL<br />PACKAGE
              </h2>
            </div>
            <div className="hidden md:block font-body text-sm text-white/40 max-w-xs text-right">
              Six core service pillars working together to build LIIV Atlanta's digital presence
            </div>
          </div>

          {/* Service cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            <ServiceCard
              number="01"
              title="Social Media Management"
              description="Full management of LIIV Atlanta's Instagram, Facebook, TikTok, YouTube, and X accounts. Automated scheduling, engagement monitoring, community management, and strategic content calendars."
              image={SOCIAL_VISUAL}
              accentColor="#F5C200"
              delay={0}
            />
            <ServiceCard
              number="02"
              title="Weekly Video Clips"
              description="Every Sunday service captured and transformed into powerful weekly short-form clips. Edited, captioned, and distributed across all platforms to keep the message alive all week long."
              image={VIDEO_VISUAL}
              accentColor="#E85D3A"
              delay={100}
            />
            <ServiceCard
              number="03"
              title="Monthly eBook"
              description="One professionally designed and written eBook per month, derived directly from Pastor Mayo's sermons. Builds authority, grows email lists, and creates a lasting resource library for the congregation."
              image={BRANDING_VISUAL}
              accentColor="#2ECC40"
              delay={200}
            />
            <ServiceCard
              number="04"
              title="SEO & Hashtag Strategy"
              description="Data-driven SEO optimization for all content. Researched hashtag sets, keyword-rich captions, and platform-specific optimization to maximize organic reach and discoverability."
              image={WORSHIP_VISUAL}
              accentColor="#F5C200"
              delay={300}
            />
            <ServiceCard
              number="05"
              title="Pastor Mayo Personal Brand"
              description="A complete personal brand identity for Pastor Mayo Sowell — custom logo, color palette, brand guidelines, and a professional personal website that positions him as a thought leader."
              image={BRANDING_VISUAL}
              accentColor="#E85D3A"
              delay={400}
            />
            <ServiceCard
              number="06"
              title="Pastor Mayo Social Profiles"
              description="Dedicated, fully managed social media profiles for Pastor Mayo across all major platforms — separate from the church accounts, building his personal audience and influence."
              image={SOCIAL_VISUAL}
              accentColor="#2ECC40"
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES BREAKDOWN ── */}
      <section className="bg-liiv-dark py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-16">
            <span className="font-display text-sm tracking-widest text-liiv-coral block mb-3">
              02 — WHAT YOU GET
            </span>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-white">
              EVERY<br />DELIVERABLE
            </h2>
          </div>

          <DeliverableRow
            icon="📱"
            title="Social Media Management"
            accent="#F5C200"
            items={[
              "Instagram, Facebook, TikTok, YouTube & X management",
              "Automated post scheduling (weekly cadence)",
              "Custom graphics and branded content for each post",
              "Community engagement & comment responses",
              "Monthly analytics reports with growth insights",
              "Platform-specific content strategy",
            ]}
          />
          <DeliverableRow
            icon="🎬"
            title="Weekly Video Clips"
            accent="#E85D3A"
            items={[
              "Full Sunday service recording (post-service edit)",
              "4–6 short-form clips per service (60–90 seconds)",
              "Captioned and formatted for Reels, TikTok & Shorts",
              "Branded lower thirds and intro/outro graphics",
              "Automated weekly distribution across all platforms",
              "Sermon highlight reels for YouTube",
            ]}
          />
          <DeliverableRow
            icon="📖"
            title="Monthly eBook"
            accent="#2ECC40"
            items={[
              "One professionally written eBook per month",
              "Content sourced from Pastor Mayo's sermon series",
              "Custom designed PDF with LIIV branding",
              "Lead magnet strategy for email list growth",
              "Distributed via social media and website",
              "12 eBooks per year — a full digital library",
            ]}
          />
          <DeliverableRow
            icon="🔍"
            title="SEO & Hashtag Strategy"
            accent="#F5C200"
            items={[
              "Keyword research for church & faith-based content",
              "Optimized captions with SEO-rich copy",
              "Custom hashtag sets for each content category",
              "YouTube video SEO (titles, descriptions, tags)",
              "Google Business Profile optimization",
              "Monthly SEO performance review",
            ]}
          />
          <DeliverableRow
            icon="✦"
            title="Pastor Mayo Personal Brand"
            accent="#E85D3A"
            items={[
              "Custom personal brand identity & logo design",
              "Brand color palette, typography & style guide",
              "Professional personal website (5–7 pages)",
              "Speaker/author bio and press kit",
              "Personal brand social media profile setup",
              "Brand consistency across all touchpoints",
            ]}
          />
          <DeliverableRow
            icon="👤"
            title="Pastor Mayo Social Profiles"
            accent="#2ECC40"
            items={[
              "Dedicated Instagram, TikTok, Facebook & X profiles",
              "Full profile optimization and branded visuals",
              "Weekly content separate from church accounts",
              "Personal thought leadership content strategy",
              "Cross-promotion between personal & church accounts",
              "Monthly growth and engagement reporting",
            ]}
          />
        </div>
      </section>

      {/* ── WORKFLOW ── */}
      <section className="bg-liiv-black py-20 md:py-32 px-6 md:px-12 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-16">
            <span className="font-display text-sm tracking-widest text-liiv-green block mb-3">
              03 — HOW IT WORKS
            </span>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-white">
              THE WEEKLY<br />WORKFLOW
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

            {[
              {
                day: "SUNDAY",
                title: "Service Day — Capture Everything",
                desc: "Every Sunday service is recorded in full. After the service concludes, the raw footage is handed off for immediate processing. Nothing is missed.",
                color: "#F5C200",
              },
              {
                day: "MONDAY",
                title: "Edit & Clip — Content Creation",
                desc: "The week's sermon is cut into 4–6 powerful short-form clips. Captions are added, graphics applied, and each clip is formatted for every platform.",
                color: "#E85D3A",
              },
              {
                day: "TUESDAY–THURSDAY",
                title: "Schedule & Distribute — Automated Posting",
                desc: "All clips, graphics, and posts are scheduled and auto-published throughout the week. SEO-optimized captions, hashtags, and platform-specific formatting applied.",
                color: "#2ECC40",
              },
              {
                day: "ONGOING",
                title: "Engage & Optimize — Community Management",
                desc: "Comments are monitored and responded to. Analytics are tracked. The strategy is continuously refined based on what's performing best.",
                color: "#F5C200",
              },
              {
                day: "MONTHLY",
                title: "eBook Release — Authority Building",
                desc: "A full eBook is written, designed, and released based on the month's sermon series. Distributed as a lead magnet to grow the email list and digital library.",
                color: "#E85D3A",
              },
            ].map((step, i) => (
              <div key={i} className="reveal flex gap-8 mb-12 md:pl-16 relative">
                <div className="hidden md:flex absolute left-0 w-12 h-12 items-center justify-center bg-liiv-dark border border-white/10 rounded-full z-10">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: step.color }} />
                </div>
                <div className="flex-1 bg-liiv-dark border border-white/5 p-6 md:p-8">
                  <div className="font-display text-xs tracking-widest mb-2" style={{ color: step.color }}>
                    {step.day}
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3">{step.title}</h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THIS MATTERS ── */}
      <section
        className="relative py-24 md:py-40 px-6 md:px-12 overflow-hidden"
        style={{
          backgroundImage: `url(${WORSHIP_VISUAL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="reveal">
            <span className="font-display text-sm tracking-widest text-liiv-green block mb-6">
              04 — THE VISION
            </span>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.88] text-white mb-8">
              YOUR MESSAGE<br />
              <span className="liiv-yellow">DESERVES</span><br />
              TO BE HEARD
            </h2>
            <p className="font-body text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Pastor Mayo Sowell's story — from pain to purpose, from the streets to the pulpit — 
              is one of the most powerful narratives in Atlanta. The mission of LIIV Atlanta to see 
              ALL people flourish is urgent and necessary. This digital strategy ensures that message 
              reaches beyond the walls of Sandy Springs and Brookhaven and into every home, every 
              phone, every heart in Atlanta and beyond.
            </p>
            <blockquote className="font-display text-2xl md:text-3xl text-liiv-yellow italic leading-snug max-w-2xl mx-auto">
              "The righteous will flourish like a palm tree... planted in the house of the Lord."<br />
              <span className="font-body text-sm text-white/50 not-italic mt-2 block">— Psalm 92:12-13</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="bg-liiv-yellow py-24 md:py-40 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-16">
            <span className="font-display text-sm tracking-widest text-black/50 block mb-3">
              05 — INVESTMENT
            </span>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-black">
              ONE FLAT RATE.<br />EVERYTHING INCLUDED.
            </h2>
          </div>

          <div className="reveal grid md:grid-cols-2 gap-px">
            {/* Price block */}
            <div className="bg-black text-white p-10 md:p-16 flex flex-col justify-between">
              <div>
                <div className="font-display text-sm tracking-widest text-liiv-yellow mb-6">
                  MONTHLY RETAINER
                </div>
                <div className="font-display text-[clamp(5rem,15vw,10rem)] leading-none text-white mb-2">
                  $3,500
                </div>
                <div className="font-body text-white/50 text-sm mb-8">per month / billed monthly</div>
                <div className="w-12 h-px bg-liiv-yellow mb-8" />
                <p className="font-body text-white/70 text-sm leading-relaxed">
                  No hidden fees. No per-post charges. No surprise invoices. 
                  One monthly investment covers everything — from Sunday service clips 
                  to Pastor Mayo's personal brand website.
                </p>
              </div>
              <div className="mt-10">
                <a
                  href="mailto:hello@liivatl.com"
                  className="block bg-liiv-yellow text-black font-display text-xl text-center py-4 px-8 hover:bg-white transition-colors duration-300"
                >
                  LET'S GET STARTED →
                </a>
              </div>
            </div>

            {/* What's included */}
            <div className="bg-black/10 p-10 md:p-16">
              <div className="font-display text-sm tracking-widest text-black/60 mb-8">
                EVERYTHING INCLUDED
              </div>
              {[
                { item: "Social Media Management (5 Platforms)", value: "✓" },
                { item: "Weekly Video Clips from Sunday Service", value: "✓" },
                { item: "Monthly eBook from Pastor Mayo's Sermons", value: "✓" },
                { item: "SEO Optimization & Hashtag Strategy", value: "✓" },
                { item: "Pastor Mayo Personal Brand Identity", value: "✓" },
                { item: "Pastor Mayo Personal Website", value: "✓" },
                { item: "Pastor Mayo Social Media Profiles", value: "✓" },
                { item: "Monthly Analytics & Performance Reports", value: "✓" },
                { item: "Community Engagement & Management", value: "✓" },
                { item: "Content Calendar & Strategy", value: "✓" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-black/15 last:border-0"
                >
                  <span className="font-body text-sm text-black/80">{row.item}</span>
                  <span className="font-display text-lg text-black font-bold">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value callout */}
          <div className="reveal mt-8 bg-black/10 p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-6 text-black">
              <div>
                <div className="font-display text-4xl mb-2">$116/day</div>
                <div className="font-body text-sm text-black/60">Cost per day — less than a tank of gas</div>
              </div>
              <div>
                <div className="font-display text-4xl mb-2">6 Services</div>
                <div className="font-body text-sm text-black/60">Included per month across all pillars</div>
              </div>
              <div>
                <div className="font-display text-4xl mb-2">100% Done-For-You</div>
                <div className="font-body text-sm text-black/60">You focus on ministry. We handle the digital.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TERMS ── */}
      <section className="bg-liiv-dark py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-12">
            <span className="font-display text-sm tracking-widest text-white/40 block mb-3">
              06 — TERMS & TIMELINE
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.9] text-white">
              HOW WE KICK OFF
            </h2>
          </div>

          <div className="reveal grid md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                phase: "WEEK 1",
                title: "Onboarding & Strategy",
                desc: "Brand audit, account access, content calendar setup, and strategy alignment call with LIIV leadership.",
                color: "#F5C200",
              },
              {
                phase: "WEEK 2–3",
                title: "Brand Build",
                desc: "Pastor Mayo's personal brand identity designed, website built, and all social profiles created and optimized.",
                color: "#E85D3A",
              },
              {
                phase: "WEEK 4+",
                title: "Full Execution",
                desc: "All systems live. Weekly clips, automated posting, SEO content, and community management running at full speed.",
                color: "#2ECC40",
              },
            ].map((phase, i) => (
              <div key={i} className="bg-liiv-black p-8 md:p-10">
                <div className="font-display text-xs tracking-widest mb-4" style={{ color: phase.color }}>
                  {phase.phase}
                </div>
                <h3 className="font-display text-2xl text-white mb-4">{phase.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-8 grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div>
              <h4 className="font-display text-lg text-liiv-yellow mb-3">CONTRACT TERMS</h4>
              <ul className="space-y-2">
                {[
                  "Month-to-month agreement — no long-term lock-in",
                  "30-day written notice to cancel",
                  "Payment due on the 1st of each month",
                  "First month includes full brand build at no extra cost",
                ].map((t, i) => (
                  <li key={i} className="font-body text-sm text-white/60 flex items-start gap-2">
                    <span className="text-liiv-yellow mt-1">→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg text-liiv-coral mb-3">WHAT WE NEED FROM YOU</h4>
              <ul className="space-y-2">
                {[
                  "Access to Sunday service recordings (post-service)",
                  "Social media account credentials",
                  "Brand assets (logos, photos, existing guidelines)",
                  "Monthly 30-minute strategy check-in call",
                ].map((t, i) => (
                  <li key={i} className="font-body text-sm text-white/60 flex items-start gap-2">
                    <span className="text-liiv-coral mt-1">→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="bg-liiv-black py-24 md:py-40 px-6 md:px-12 text-center relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="font-display text-[40vw] leading-none text-white select-none pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
            LIIV
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="reveal">
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-3 h-3 bg-liiv-yellow rounded-full" />
              <div className="w-3 h-3 bg-liiv-coral rounded-full" />
              <div className="w-3 h-3 bg-liiv-green rounded-full" />
            </div>
            <h2 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] text-white mb-8">
              READY TO<br />
              <span className="liiv-yellow">FLOURISH?</span>
            </h2>
            <p className="font-body text-lg text-white/60 mb-12 leading-relaxed">
              Let's build something that lasts. LIIV Atlanta's message is too important 
              to stay within four walls. Let's take it to the world — together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@liivatl.com"
                className="bg-liiv-yellow text-black font-display text-xl px-12 py-5 hover:bg-white transition-colors duration-300"
              >
                ACCEPT PROPOSAL →
              </a>
              <a
                href="tel:+14045550000"
                className="border border-white/30 text-white font-display text-xl px-12 py-5 hover:border-white hover:bg-white/5 transition-colors duration-300"
              >
                SCHEDULE A CALL
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-liiv-dark border-t border-white/5 py-8 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-sm tracking-widest text-white/30">
            PROPOSAL PREPARED FOR LIIV ATLANTA — 2026
          </div>
          <div className="flex items-center gap-6">
            <div className="w-4 h-px bg-liiv-yellow" />
            <div className="w-4 h-px bg-liiv-coral" />
            <div className="w-4 h-px bg-liiv-green" />
          </div>
          <div className="font-body text-xs text-white/30">
            $3,500 / MONTH · ALL INCLUSIVE
          </div>
        </div>
      </footer>

    </div>
  );
}
