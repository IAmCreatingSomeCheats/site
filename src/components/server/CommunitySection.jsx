import { motion } from "framer-motion";
import { MessageCircle, BookOpen, Globe } from "lucide-react";

const COMMUNITY_IMG = "https://media.base44.com/images/public/69ec9d2220cde9dc531cc8ce/4eb64b89d_generated_36fd2599.png";

const LINKS = [
  {
    icon: MessageCircle,
    label: "Discord",
    desc: "Join the community hub — alliances, events, and lore.",
    href: "#",
  },
  {
    icon: BookOpen,
    label: "Rules",
    desc: "Read the laws of the realm before entering.",
    href: "#",
  },
  {
    icon: Globe,
    label: "Live Map",
    desc: "Explore the world in real-time from your browser.",
    href: "#",
  },
];

export default function CommunitySection() {
  return (
    <section id="community" className="relative py-32 px-6 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={COMMUNITY_IMG}
          alt="Massive gothic cathedral under a blood moon in Minecraft"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-void-bg/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-xl"
        >
          <span className="text-soul-cyan text-sm font-bold tracking-[0.3em] uppercase">
            The Nexus
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-bone mt-3">
            Join the Void
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            Connect with fellow survivors, study the rules, and explore the living world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-obsidian/80 backdrop-blur-sm border border-soul-cyan/10 hover:border-soul-cyan/40 p-8 transition-all duration-500"
            >
              <link.icon className="w-8 h-8 text-soul-cyan mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display font-bold text-xl text-bone mb-2">
                {link.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {link.desc}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}