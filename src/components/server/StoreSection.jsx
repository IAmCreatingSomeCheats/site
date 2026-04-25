import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const STORE_IMG_RANKS = "https://media.base44.com/images/public/69ec9d2220cde9dc531cc8ce/37edcb380_generated_284fbab1.png";
const STORE_IMG_SWORD = "https://media.base44.com/images/public/69ec9d2220cde9dc531cc8ce/4fea2b21d_generated_57275e6c.png";
const STORE_IMG_SHIELD = "https://media.base44.com/images/public/69ec9d2220cde9dc531cc8ce/ce7fce1bc_generated_a1105d0c.png";

const ITEMS = [
  {
    name: "Phantom Rank",
    desc: "Unique title, cyan name tag, priority queue access, and exclusive emotes.",
    price: "$9.99",
    tag: "Popular",
    image: STORE_IMG_RANKS,
  },
  {
    name: "Soul Blade Kit",
    desc: "Start each season with an enchanted netherite sword and soul-fire arrows.",
    price: "$4.99",
    tag: null,
    image: STORE_IMG_SWORD,
  },
  {
    name: "Warden's Shield",
    desc: "Base protection totem — prevents one grief event per season. One-time use.",
    price: "$6.99",
    tag: "Season Exclusive",
    image: STORE_IMG_SHIELD,
  },
];

export default function StoreSection() {
  return (
    <section id="store" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-blood-tax text-sm font-bold tracking-[0.3em] uppercase">
            The Armory
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-bone mt-3">
            Legendary Artifacts
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-base leading-relaxed">
            Equip yourself with exclusive items, ranks, and season-limited relics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative bg-obsidian border border-soul-cyan/10 hover:border-soul-cyan/30 transition-all duration-500 overflow-hidden"
            >
              {/* Tag */}
              {item.tag && (
                <div className={`absolute top-4 right-4 z-10 px-3 py-1 text-xs font-bold tracking-wider uppercase ${
                  item.tag === "Season Exclusive"
                    ? "bg-blood-tax/20 text-blood-tax border border-blood-tax/30 glitch-text"
                    : "bg-soul-cyan/20 text-soul-cyan border border-soul-cyan/30"
                }`}>
                  {item.tag}
                </div>
              )}

              {/* Image */}
              <div className="aspect-square overflow-hidden bg-void-bg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-bone mb-2">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-2xl text-blood-tax">
                    {item.price}
                  </span>
                  <button className="flex items-center gap-2 px-4 py-2 border border-soul-cyan/30 text-soul-cyan text-sm font-bold tracking-wider hover:bg-soul-cyan/10 transition-all">
                    VIEW
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}