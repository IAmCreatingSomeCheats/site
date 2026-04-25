import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Mail, FileText, Users, ExternalLink, CheckCircle, Circle } from "lucide-react";

const BADGES = [
  {
    icon: ShieldCheck,
    name: "Community Basics",
    desc: "Published community rules, a public contact email, and Minecraft Usage Guidelines compliance.",
    status: "required",
    met: true,
  },
  {
    icon: BadgeCheck,
    name: "Builder's Benchmark",
    desc: "Completed GamerSafer's safety workbook confirming our moderation structure and community practices.",
    status: "required",
    met: true,
  },
  {
    icon: Users,
    name: "Safe Community",
    desc: "Active moderators, enforced anti-harassment policies, and zero-tolerance hate speech stance.",
    status: "optional",
    met: true,
  },
  {
    icon: FileText,
    name: "Age-Appropriate Content",
    desc: "All builds, signs, and chat are monitored to ensure content suitable for players of all ages.",
    status: "optional",
    met: true,
  },
  {
    icon: Mail,
    name: "Parent Contact Available",
    desc: "Public admin email (admin@3deaths.net) for players and parents to reach staff directly.",
    status: "optional",
    met: true,
  },
];

const REQUIREMENTS = [
  { text: "Minecraft Usage Guidelines compliance verified", done: true },
  { text: "Official contact email published (admin@3deaths.net)", done: true },
  { text: "Server purpose and audience documented", done: true },
  { text: "Community rules publicly available on this page", done: true },
  { text: "Foundational community management practices established", done: true },
  { text: "GamerSafer safety workbook submitted", done: true },
  { text: "Periodic check-in compliance maintained", done: true },
];

export default function ServerListingSection() {
  return (
    <section id="listing" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-soul-cyan text-sm font-bold tracking-[0.3em] uppercase">
            Official Recognition
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-bone mt-3 mb-4">
            Mojang Verified
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            3Deaths SMP is listed on the{" "}
            <a
              href="https://findmcserver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soul-cyan hover:underline"
            >
              Official Minecraft Server List
            </a>{" "}
            — a partnership between Mojang Studios and GamerSafer. Servers on this list
            have been reviewed for compliance with the{" "}
            <a
              href="https://www.minecraft.net/en-us/community-standards"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soul-cyan hover:underline"
            >
              Minecraft Community Standards
            </a>{" "}
            and Usage Guidelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Badge grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display font-bold text-xl text-bone mb-8 flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-soul-cyan" />
              Our Earned Badges
            </h3>
            <div className="space-y-3">
              {BADGES.map((badge, i) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-obsidian/50 border border-soul-cyan/10 hover:border-soul-cyan/25 transition-all duration-300"
                >
                  <badge.icon className="w-5 h-5 text-soul-cyan flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-bold text-sm text-bone">{badge.name}</span>
                      <span
                        className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 ${
                          badge.status === "required"
                            ? "bg-blood-tax/15 text-blood-tax border border-blood-tax/20"
                            : "bg-soul-cyan/10 text-soul-cyan border border-soul-cyan/20"
                        }`}
                      >
                        {badge.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{badge.desc}</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-soul-cyan flex-shrink-0 mt-0.5" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Checklist + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display font-bold text-xl text-bone mb-8 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-soul-cyan" />
              Listing Requirements
            </h3>

            <div className="space-y-3 mb-10">
              {REQUIREMENTS.map((req, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  {req.done ? (
                    <CheckCircle className="w-4 h-4 text-soul-cyan flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm text-muted-foreground leading-relaxed">{req.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Key info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="p-4 border border-soul-cyan/15 bg-obsidian/40">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Contact</p>
                <p className="text-sm font-bold text-bone">admin@3deaths.net</p>
              </div>
              <div className="p-4 border border-soul-cyan/15 bg-obsidian/40">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Audience</p>
                <p className="text-sm font-bold text-bone">All ages (13+)</p>
              </div>
              <div className="p-4 border border-soul-cyan/15 bg-obsidian/40">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Mode</p>
                <p className="text-sm font-bold text-bone">Java Edition SMP</p>
              </div>
              <div className="p-4 border border-soul-cyan/15 bg-obsidian/40">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Listed Since</p>
                <p className="text-sm font-bold text-bone">Season 1 — 2025</p>
              </div>
            </div>

            <a
              href="https://findmcserver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-soul-cyan/30 text-soul-cyan text-sm font-bold tracking-wider hover:bg-soul-cyan/10 transition-all"
            >
              VIEW ON OFFICIAL SERVER LIST
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-muted-foreground mt-16 max-w-3xl border-t border-soul-cyan/10 pt-8"
        >
          The Official Minecraft Server List is operated by GamerSafer in partnership with Mojang Studios.
          Listing on this site is not a guarantee of absolute safety. We are committed to ongoing compliance
          and periodic review check-ins as required by the program. To report a concern, contact{" "}
          <a href="mailto:admin@3deaths.net" className="text-soul-cyan">admin@3deaths.net</a> or{" "}
          <a href="https://aka.ms/mce-reportserver" target="_blank" rel="noopener noreferrer" className="text-soul-cyan">
            report directly to Mojang
          </a>.
        </motion.p>
      </div>
    </section>
  );
}