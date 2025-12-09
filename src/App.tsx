import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Scale,
  BookOpen,
  Users,
  Landmark,
  ArrowRight,
} from "lucide-react";

/**
 * Multi-page (hash-routed) marketing site inspired by the screenshots you shared.
 *
 * This stays in a single file for easy preview here, but the structure mirrors
 * separate pages: Home / News / Events / Partners.
 */

const BRAND = {
  name: "Creative Origin",
  tagline:
    "Empowering Ethical AI Innovation in the Creative Industries and Media",
  missionShort:
    "Shape an inclusive, equitable Creative AI ecosystem that empowers artists and upholds ethical standards.",
  about: [
    "Creative Origin is an alliance of the creative industry, artists, technology companies, legal experts, and policymakers focused on the intersection of AI and creative industries.",
    "We track developments in Creative AI, monitor copyright regulations, promote ethical AI development, protect artists' ownership rights, and encourage transparency and innovation.",
    "Our shared goal is to balance technological advancement with creative rights in the evolving landscape of AI-generated content.",
  ],
};

const NEWS = [
  {
    date: "Oct 14, 2024",
    title: "How Can CIOs Prepare for AI Data Regulation Changes?",
    excerpt:
      "Governments are racing to create ethical frameworks for AI. For CIOs and especially those in AI companies, the speed of change can feel like uncertainty at scale.",
    tag: "Regulation",
  },
  {
    date: "Sep 9, 2024",
    title:
      "Put levy on smartphones to help creatives survive AI threat, top UK artists tell Labour",
    excerpt:
      "An open letter to the culture secretary proposes new mechanisms to support creative workers and champion fair conditions in an AI-shaped economy.",
    tag: "UK Policy",
  },
  {
    date: "May 24, 2019",
    title:
      "The AI-focused COPIED Act would make removing digital watermarks illegal",
    excerpt:
      "A bipartisan proposal aimed at protecting journalists and artists from unauthorized AI use of their work and preserving origin information.",
    tag: "Legislation",
  },
  {
    date: "May 24, 2019",
    title: "OpenAI supports California bill requiring AI watermarking",
    excerpt:
      "Support for transparency-focused policy that would require watermarking of AI-generated content.",
    tag: "US Policy",
  },
  {
    date: "May 24, 2019",
    title:
      "Why creatives need a new alliance to face the existential threat of AI",
    excerpt:
      "The creative industries continue to search for practical, collective responses as AI tools reshape ownership, value, and livelihoods.",
    tag: "Ecosystem",
  },
];

const EVENTS = [
  {
    dateBadge: "FEB 25",
    title: "Shaping the Future of Digital Rights",
    time: "6:00 PM – 9:00 PM",
    location: "Flare Taipei",
    excerpt:
      "A RightsCon side event exploring authenticated digital content, accountability, and new models for trust in the AI era.",
    image:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop",
    format: "In-person",
  },
  {
    dateBadge: "FEB 14–19",
    title: "Future Vision: Pyro Image X Numbers Photography Exhibition",
    time: "Opening week",
    location: "City venue (TBA)",
    excerpt:
      "A showcase of photography and responsible innovation, highlighting how provenance and ethical tooling can protect creators and audiences.",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200&auto=format&fit=crop",
    format: "Exhibition",
  },
  {
    dateBadge: "NOV 21",
    title:
      "The Creator's Playbook: Mastering Monetization & Ownership in Digital Age",
    time: "8:00 PM – 9:00 PM (Online)",
    location: "Global",
    excerpt:
      "A practical workshop on control, licensing, and new revenue patterns for creators navigating AI-enabled distribution.",
    image:
      "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop",
    format: "Online",
  },
  {
    dateBadge: "NOV 20–21",
    title: "Towards a National Collection Two-Day Conference 2024",
    time: "All day",
    location: "Manchester, United Kingdom",
    excerpt:
      "A hybrid conference exploring digital collections, innovation, and the future of cultural infrastructure.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    format: "Hybrid",
  },
  {
    dateBadge: "OCT 03",
    title: "The impact of AI on the Creative Economy",
    time: "7:00 PM – 10:30 PM",
    location: "Tate Modern",
    excerpt:
      "An evening conversation with leading thinkers on the societal, economic, and artistic implications of generative AI.",
    image:
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1200&auto=format&fit=crop",
    format: "In-person",
  },
  {
    dateBadge: "JUN 25",
    title: "SXSW London",
    time: "9:00 AM – 10:00 AM",
    location: "London, United Kingdom",
    excerpt:
      "A new chapter of the SXSW experience, covering AI, society, climate, and culture with global innovators.",
    image:
      "https://images.unsplash.com/photo-1515165562835-c4c053c9d8b6?q=80&w=1200&auto=format&fit=crop",
    format: "Festival",
  },
];

const PURPOSE = [
  {
    icon: Scale,
    title: "Copyright",
    desc: "Advocate for creators' rights, addressing copyright issues and art ownership.",
  },
  {
    icon: Landmark,
    title: "Policy",
    desc: "Engage with policymakers in UK, USA, and EU to influence AI-related change in creative industries.",
  },
  {
    icon: ShieldCheck,
    title: "Guidelines",
    desc:
      "Develop ethical guidelines for Generative AI that represent artists' interests and protect cultural value.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc:
      "Coordinate stakeholders across tech, legal, policy, and creative sectors to align on trusted AI practices.",
  },
  {
    icon: BookOpen,
    title: "Education",
    desc:
      "Run workshops with cultural organizations on navigating generative AI, licensing, and provenance literacy.",
  },
];

const PARTNER_PLACEHOLDERS = [
  "Cultural Orgs",
  "Creator Unions",
  "Tech Labs",
  "Policy Groups",
  "Newsrooms",
  "Academic Centers",
];

const HERO_CAPTURE_ASSET = {
  nid: "bafybeib63x3bcpzq6p2wclcbz2uzocfy4gkrdarvcufc6gnouylaqrk34a",
  imageUrl:
    "https://ipfs-pin.numbersprotocol.io/ipfs/bafybeib63x3bcpzq6p2wclcbz2uzocfy4gkrdarvcufc6gnouylaqrk34a",
  assetUrl:
    "https://asset.captureapp.xyz/bafybeib63x3bcpzq6p2wclcbz2uzocfy4gkrdarvcufc6gnouylaqrk34a",
  actionButtonUrl:
    "https://dashboard.captureapp.xyz/showcase/bafybeib63x3bcpzq6p2wclcbz2uzocfy4gkrdarvcufc6gnouylaqrk34a",
  engagementImage:
    "https://static-cdn.numbersprotocol.io/capture-eye/capture-ad.png",
  engagementLink: "https://captureapp.xyz",
};

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

// ------------------------------
// Hash Router
// ------------------------------

type Route = "home" | "news" | "events" | "partners";

function getRouteFromHash(): Route {
  if (typeof window === "undefined") return "home";
  const raw = window.location.hash || "";
  const cleaned = raw.replace(/^#\/?/, "");
  const seg = cleaned.split("/")[0].trim().toLowerCase();

  if (seg === "news") return "news";
  if (seg === "events" || seg === "event") return "events";
  if (seg === "partners" || seg === "partner") return "partners";
  return "home";
}

function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => getRouteFromHash());

  useEffect(() => {
    const handler = () => setRoute(getRouteFromHash());
    handler();
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (r: Route) => {
    window.location.hash = r === "home" ? "#/" : `#/${r}`;
  };

  return { route, navigate };
}

// ------------------------------
// Shared UI
// ------------------------------

function LogoMark({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
          dark ? "bg-black" : "bg-white/90"
        }`}
      >
        <span
          className={`h-3.5 w-3.5 rounded-full ${dark ? "bg-white" : "bg-black"}`}
        />
      </span>
      <span
        className={`text-lg font-semibold tracking-tight ${
          dark ? "text-black" : "text-white"
        }`}
      >
        {BRAND.name}
      </span>
    </div>
  );
}

function NavBar({
  route,
  onNavigate,
  onApply,
}: {
  route: Route;
  onNavigate: (r: Route) => void;
  onApply: () => void;
}) {
  const links: { label: string; route: Route }[] = [
    { label: "Home", route: "home" },
    { label: "News", route: "news" },
    { label: "Events", route: "events" },
    { label: "Partners", route: "partners" },
  ];

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <button
          onClick={() => onNavigate("home")}
          className="hover:opacity-90"
          aria-label="Go to Home"
        >
          <LogoMark />
        </button>

        <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          {links.map((l) => {
            const active = route === l.route;
            return (
              <button
                key={l.label}
                onClick={() => onNavigate(l.route)}
                className={`transition hover:text-white ${
                  active ? "text-white" : "text-white/70"
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onApply} variant="inverse" className="rounded-none">
            Apply to Join
          </Button>
        </div>
      </div>
    </div>
  );
}

function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <motion.div
      {...fadeUp}
      className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-black md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-sm text-black/60 md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {right}
    </motion.div>
  );
}

function Footer({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <button onClick={() => onNavigate("home")} className="text-left">
          <div className="flex items-center gap-3">
            <LogoMark dark />
            <div className="hidden sm:block">
              <div className="text-xs text-black/50">
                Ethical AI for creative futures.
              </div>
            </div>
          </div>
        </button>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-black/60">
          <button className="hover:text-black" onClick={() => onNavigate("news")}>
            News
          </button>
          <button className="hover:text-black" onClick={() => onNavigate("events")}>
            Events
          </button>
          <button
            className="hover:text-black"
            onClick={() => onNavigate("partners")}
          >
            Partners
          </button>
          <a className="hover:text-black" href="#">
            Contact
          </a>
        </div>

        <div className="text-xs text-black/40">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ------------------------------
// Home Sections
// ------------------------------

function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-40 bottom-[-180px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <motion.div {...fadeUp} className="relative">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            {BRAND.tagline}
          </h1>
          <div className="mt-6 h-px w-14 bg-white/30" />

          <div className="mt-6 space-y-4">
            {BRAND.about.map((p) => (
              <p
                key={p}
                className="text-sm leading-relaxed text-white/70 md:text-base"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button onClick={onApply} variant="inverse" className="rounded-none">
              Apply to Join
            </Button>
            <Badge
              variant="outline"
              className="rounded-none border-white/30 text-white/80"
            >
              Alliance for creators + AI ethics
            </Badge>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="relative"
        >
          <div className="aspect-[4/3] w-full overflow-hidden rounded-none border border-white/10 bg-white/5">
            <capture-eye
              className="block"
              nid={HERO_CAPTURE_ASSET.nid}
              position="top left"
              visibility="hover"
              layout="curated"
              cz-title="Produced for"
              heading-source="abstract"
              action-button-text="View provenance"
              action-button-link={HERO_CAPTURE_ASSET.actionButtonUrl}
              eng-img={HERO_CAPTURE_ASSET.engagementImage}
              eng-link={HERO_CAPTURE_ASSET.engagementLink}
            >
              <img
                src={HERO_CAPTURE_ASSET.imageUrl}
                alt="Creative community"
                className="h-full w-full object-cover opacity-90"
              />
            </capture-eye>
          </div>
          <div className="mt-3 text-xs text-white/60">
            Provenance powered by Capture Eye.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PurposeGrid() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <PageHeader title="Purpose" />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PURPOSE.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.05 * idx }}
              >
                <Card className="rounded-none border-black/10 shadow-none">
                  <CardHeader>
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-none border border-black/10">
                      <Icon className="h-5 w-5 text-black" />
                    </div>
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-black/70">
                      {p.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NewsPreview({ onNavigate }: { onNavigate: (r: Route) => void }) {
  const preview = NEWS.slice(0, 3);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <motion.div {...fadeUp} className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-5xl">
            News
          </h2>
          <div className="hidden gap-2 md:flex">
            <Badge variant="secondary" className="rounded-none">
              Creative AI
            </Badge>
            <Badge variant="secondary" className="rounded-none">
              Copyright
            </Badge>
            <Badge variant="secondary" className="rounded-none">
              Policy
            </Badge>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {preview.map((n, idx) => (
            <motion.div
              key={n.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.05 * idx }}
            >
              <Card className="rounded-none border-black/10 shadow-none">
                <CardHeader className="space-y-2">
                  <div className="text-xs text-black/50">{n.date}</div>
                  <CardTitle className="text-lg leading-snug">
                    {n.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="w-fit rounded-none border-black/20 text-black/70"
                  >
                    {n.tag}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-sm text-black/70">
                    {n.excerpt}
                  </CardDescription>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-black underline-offset-4 hover:underline"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => onNavigate("news")}
            className="rounded-none border-black/20 bg-transparent text-black hover:bg-black/5"
          >
            VIEW ALL
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Backward-compatible adapter */
function CTASection({ onApply }: { onApply: () => void }) {
  return <SlimJoinBar onApply={onApply} />;
}

function SlimJoinBar({ onApply }: { onApply: () => void }) {
  return (
    <section className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-wider text-black/40">
            Join the alliance
          </div>
          <div className="mt-2 text-lg font-semibold tracking-tight text-black md:text-xl">
            Help shape ethical Creative AI standards and sustainable creator
            economies.
          </div>
          <div className="mt-1 text-sm text-black/60">
            Artists, cultural institutions, newsrooms, policymakers, and builders
            are welcome.
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="hidden items-center gap-2 md:flex">
            <Badge variant="secondary" className="rounded-none">
              Copyright
            </Badge>
            <Badge variant="secondary" className="rounded-none">
              Policy
            </Badge>
            <Badge variant="secondary" className="rounded-none">
              Guidelines
            </Badge>
          </div>
          <Button
            onClick={onApply}
            className="rounded-none bg-black px-7 text-white hover:bg-black/90"
          >
            Apply to Join
          </Button>
        </div>
      </div>
    </section>
  );
}

// ------------------------------
// News Page
// ------------------------------

function NewsPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return NEWS;
    return NEWS.filter((n) =>
      [n.title, n.excerpt, n.tag, n.date].some((t) =>
        t.toLowerCase().includes(needle)
      )
    );
  }, [q]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <PageHeader
          title="News"
          subtitle="Policy updates, creator-rights signals, and the evolving governance of Creative AI."
          right={
            <div className="w-full md:w-72">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search news"
                className="w-full rounded-none border border-black/20 px-3 py-2 text-sm outline-none transition focus:border-black"
              />
            </div>
          }
        />

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {filtered.map((n, idx) => (
            <motion.div
              key={`${n.title}-${idx}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.03 * idx }}
            >
              <Card className="rounded-none border-black/10 shadow-none">
                <CardHeader className="space-y-2">
                  <div className="text-xs text-black/50">{n.date}</div>
                  <CardTitle className="text-lg leading-snug">
                    {n.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="w-fit rounded-none border-black/20 text-black/70"
                  >
                    {n.tag}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-sm text-black/70">
                    {n.excerpt}
                  </CardDescription>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-black underline-offset-4 hover:underline"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {!filtered.length && (
          <div className="mt-10 text-sm text-black/50">
            No results. Try a different keyword.
          </div>
        )}
      </div>
    </section>
  );
}

// ------------------------------
// Events Page
// ------------------------------

function EventRow({ e, flip = false }: { e: any; flip?: boolean }) {
  return (
    <div
      className={`grid gap-8 md:grid-cols-2 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative">
        <div className="absolute right-4 top-4 z-10 rounded-none bg-white/90 px-3 py-2 text-xs font-semibold text-black shadow-sm">
          {e.dateBadge}
        </div>
        <div className="aspect-[16/9] overflow-hidden rounded-none border border-black/10 bg-black/5">
          <img
            src={e.image}
            alt={e.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="rounded-none">
            {e.format}
          </Badge>
          <span className="text-xs text-black/50">{e.time}</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-black md:text-3xl">
          {e.title}
        </h3>
        <div className="mt-2 text-sm text-black/60">{e.location}</div>
        <p className="mt-4 text-sm leading-relaxed text-black/70 md:text-base">
          {e.excerpt}
        </p>
        <div className="mt-6">
          <Button className="rounded-none bg-black text-white hover:bg-black/90">
            View Event <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <PageHeader
          title="Events"
          subtitle="Conferences, workshops, exhibitions, and community gatherings exploring responsible AI, creator rights, and sustainable creative economies."
        />

        <div className="mt-12 space-y-14">
          {EVENTS.map((e, i) => (
            <motion.div
              key={e.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.04 * i }}
            >
              <EventRow e={e} flip={i % 2 === 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------
// Partners Page
// ------------------------------

function PartnersPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <PageHeader
          title="Partners"
          subtitle="We collaborate with cultural institutions, creator communities, technology builders, and policy networks to co-design practical standards and real-world pilots."
          right={
            <Badge variant="secondary" className="w-fit rounded-none">
              Alliance Network
            </Badge>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {PARTNER_PLACEHOLDERS.map((p, i) => (
            <motion.div
              key={p}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.03 * i }}
              className="border border-black/10 p-6"
            >
              <div className="text-sm font-medium text-black">{p}</div>
              <div className="mt-2 text-xs text-black/50">
                Replace with logos + short partner blurbs.
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 border border-black/10 p-8">
          <div className="text-sm font-medium text-black">Become a partner</div>
          <p className="mt-2 max-w-2xl text-sm text-black/60">
            If you represent a creator community, cultural institution, newsroom,
            policy body, or technology organization working on ethical Creative AI,
            we’d love to explore collaboration.
          </p>
          <div className="mt-4">
            <Button className="rounded-none bg-black text-white hover:bg-black/90">
              Contact partnership team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------
// Apply Modal
// ------------------------------

function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative mx-4 w-full max-w-lg rounded-none border border-black/10 bg-white p-6 shadow-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-black">Apply to Join</h3>
            <p className="mt-1 text-sm text-black/60">
              This is a placeholder application panel. Connect it to your form
              (Typeform, Google Form, or your own API).
            </p>
          </div>
          <Button variant="ghost" onClick={onClose} className="rounded-none">
            Close
          </Button>
        </div>

        <div className="mt-6 space-y-3 border-t border-black/10 pt-5">
          <div className="text-sm text-black">Suggested fields:</div>
          <ul className="list-disc space-y-1 pl-5 text-sm text-black/70">
            <li>Organization / Individual name</li>
            <li>Role (artist, newsroom, policy, tech, legal, etc.)</li>
            <li>Region</li>
            <li>Why you want to join</li>
            <li>What you can contribute</li>
          </ul>
          <div className="pt-2">
            <Button className="rounded-none bg-black text-white hover:bg-black/90">
              Connect Application Form
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ------------------------------
// Home Page
// ------------------------------

function HomePage({
  onApply,
  onNavigate,
}: {
  onApply: () => void;
  onNavigate: (r: Route) => void;
}) {
  return (
    <>
      <Hero onApply={onApply} />
      {/* Home order: Purpose before News */}
      <PurposeGrid />
      <NewsPreview onNavigate={onNavigate} />
    </>
  );
}

// ------------------------------
// Root
// ------------------------------

export default function App() {
  const { route, navigate } = useHashRoute();
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar
        route={route}
        onNavigate={navigate}
        onApply={() => setApplyOpen(true)}
      />

      {route === "home" && (
        <HomePage onApply={() => setApplyOpen(true)} onNavigate={navigate} />
      )}
      {route === "news" && <NewsPage />}
      {route === "events" && <EventsPage />}
      {route === "partners" && <PartnersPage />}

      <SlimJoinBar onApply={() => setApplyOpen(true)} />
      <Footer onNavigate={navigate} />
      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}
