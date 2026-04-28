import { motion } from "framer-motion";
import { Skull, Shield, Swords, Users, Map, Crown } from "lucide-react";

const FEATURES = [
  {
    icon: Skull,
    title: "3 Lives System",
    desc: "Each player gets exactly three lives. Die three times and you're permanently eliminated from the world.",
    accent: "blood-tax",
  },
  {
    icon: Shield,
    title: "Grief Protection",
    desc: "Core builds are protected. Strategic PvP is encouraged—griefing isn't.",
    accent: "soul-cyan",
  },
  {
    icon: Swords,
    title: "PvP Enabled",
    desc: "Every encounter could be your last. Fight smart, or don't fight at all.",
    accent: "blood-tax",
  },
  {
    icon: Users,
    title: "Active Community",
    desc: "Join a thriving Discord with alliances, lore, and player-driven events.",
    accent: "soul-cyan",
  },
  {
    icon: Map,
    title: "Custom World",
    desc: "A hand-crafted seed with hidden dungeons, custom structures, and secrets waiting to be found.",
    accent: "soul-cyan",
  },
  {
    icon: Crown,
    title: "Seasonal Resets",
    desc: "Each season brings a fresh start—new world, new lives, new legends.",
    accent: "blood-tax",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-soul-cyan text-sm font-bold tracking-[0.3em] uppercase">
              The Rules of the Realm
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-bone mt-3">
              Survive or Perish
            </h2>
          </div>
          {/* Pixel icon row */}
          <div className="flex items-center gap-4 opacity-60">
            <img
              src="https://media.base44.com/images/public/69ec9d2220cde9dc531cc8ce/7289bc253_generated_image.png"
              alt="swords"
              className="w-12 h-12 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
            <img
              src="https://media.base44.com/images/public/69ec9d2220cde9dc531cc8ce/07463d132_generated_image.png"
              alt="skull"
              className="w-12 h-12 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-soul-cyan/10">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-void-bg p-8 md:p-10 group hover:bg-obsidian/50 transition-all duration-500"
            >
              <feat.icon
                className={`w-8 h-8 mb-6 ${
                  feat.accent === "blood-tax" ? "text-blood-tax" : "text-soul-cyan"
                } group-hover:scale-110 transition-transform duration-300`}
              />
              <h3 className="font-display font-bold text-xl text-bone mb-3">
                {feat.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}