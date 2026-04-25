import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Skull, ShieldX, Swords, Ban, Volume2, HeartHandshake, AlertTriangle, Gavel } from "lucide-react";
import TallyMarks from "./TallyMarks";

const RULE_CATEGORIES = [
  {
    id: "deaths",
    icon: Skull,
    accent: "blood-tax",
    label: "The 3 Deaths Mechanic",
    summary: "The core rule of this realm.",
    rules: [
      "Every player starts with exactly 3 lives. No exceptions, no refunds.",
      "Dying in any way — PvP, mobs, void, lava, fall damage — costs you one life.",
      "When all 3 lives are lost you are permanently eliminated from the current season.",
      "Eliminated players may spectate but cannot interact with the world until the next season.",
      "Logging out to avoid death is bannable. The world doesn't pause for cowards.",
      "Staff-verified deaths will be tracked publicly on the leaderboard.",
    ],
  },
  {
    id: "pvp",
    icon: Swords,
    accent: "blood-tax",
    label: "PvP & Combat",
    summary: "Fight with honor — or face the consequences.",
    rules: [
      "PvP is enabled everywhere outside of designated Safe Zones.",
      "Trapping players in unescapable situations counts as a kill — the death is recorded.",
      "No combat-logging. Disconnecting during active PvP results in an automatic death penalty.",
      "Spawn-killing (attacking within 10 seconds of a player respawning) is prohibited.",
      "Do not kill AFK players. Wait for them to return or move on.",
      "Bowing through walls, exploiting hitbox glitches, or duplication glitches = instant ban.",
    ],
  },
  {
    id: "griefing",
    icon: ShieldX,
    accent: "soul-cyan",
    label: "Griefing & Theft",
    summary: "Raid strategically. Destroy nothing for spite.",
    rules: [
      "Raiding unlocked chests and stealing resources is allowed — it's survival.",
      "Destroying another player's base purely for grief (no strategic gain) is banned.",
      "Lava-casting, world-burning, and mass TNT detonation in player settlements are prohibited.",
      "Do not destroy community infrastructure: roads, bridges, public farms, or shared utilities.",
      "Griefing within Safe Zones is a permanent ban.",
      "Any grief must be reported with evidence. Staff will assess intent.",
    ],
  },
  {
    id: "cheating",
    icon: Ban,
    accent: "blood-tax",
    label: "Cheating & Exploits",
    summary: "Zero tolerance. No second chances.",
    rules: [
      "No hacked clients, X-ray resource packs, or cheat mods of any kind.",
      "No exploiting game bugs to duplicate items, gain infinite resources, or bypass mechanics.",
      "Auto-clickers, macros, and AFK machines that simulate active play are banned.",
      "VPNs are not permitted on the server (used to evade bans).",
      "If you find a bug or exploit, report it to staff immediately — exploiting it is a ban.",
      "Any evidence of cheating results in permanent elimination, no life deduction — just a ban.",
    ],
  },
  {
    id: "conduct",
    icon: Volume2,
    accent: "soul-cyan",
    label: "Community Conduct",
    summary: "Respect the realm and its people.",
    rules: [
      "No hate speech, slurs, or harassment of any kind in chat, signs, or builds.",
      "No spamming, excessive caps, or flooding the chat with repeated messages.",
      "Keep chat in English in global channels so moderators can read it.",
      "No sharing personal information (real names, locations, social accounts) of other players.",
      "Respect all players regardless of playstyle, skill level, age, or background.",
      "Threatening real-world harm to any player results in an immediate permanent ban.",
    ],
  },
  {
    id: "safety",
    icon: HeartHandshake,
    accent: "soul-cyan",
    label: "Safety & Inclusion",
    summary: "Compliant with Mojang's community standards.",
    rules: [
      "This server is appropriate for all ages and complies with Mojang's Usage Guidelines.",
      "Sexual, violent-extremist, or hateful content in builds, signs, or chat is permanently banned.",
      "Bullying, intimidation, or targeted harassment of any player will result in removal.",
      "We have a public contact email for players and parents: admin@3deaths.net",
      "Staff are active moderators — report concerns via Discord or in-game /report.",
      "We participate in the Official Minecraft Server List's safety review process.",
    ],
  },
];

const PENALTIES = [
  { offense: "Minor rule break (first time)", consequence: "Verbal warning", color: "text-soul-cyan" },
  { offense: "Spawn-killing / minor grief", consequence: "Temporary mute or 24h ban", color: "text-soul-cyan" },
  { offense: "Combat logging / AFK kill", consequence: "1 life deducted", color: "text-bone" },
  { offense: "Major grief / harassment", consequence: "3–7 day ban", color: "text-blood-tax" },
  { offense: "Cheating / hacks detected", consequence: "Permanent ban", color: "text-blood-tax" },
  { offense: "Hate speech / real-world threats", consequence: "Permanent ban + report to Mojang", color: "text-blood-tax" },
];

function RuleCategory({ cat, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      className={`border transition-all duration-300 ${
        isOpen ? "border-soul-cyan/30 bg-obsidian/60" : "border-soul-cyan/10 bg-obsidian/20 hover:border-soul-cyan/20"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <cat.icon
            className={`w-5 h-5 flex-shrink-0 ${
              cat.accent === "blood-tax" ? "text-blood-tax" : "text-soul-cyan"
            }`}
          />
          <div>
            <h3 className="font-display font-bold text-base md:text-lg text-bone">{cat.label}</h3>
            <p className="text-muted-foreground text-sm mt-0.5">{cat.summary}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="px-6 pb-6 space-y-3">
              {cat.rules.map((rule, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                >
                  <span
                    className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      cat.accent === "blood-tax" ? "bg-blood-tax" : "bg-soul-cyan"
                    }`}
                  />
                  {rule}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RulesSection() {
  const [openId, setOpenId] = useState("deaths");

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section id="rules" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-blood-tax text-sm font-bold tracking-[0.3em] uppercase">
            The Law of the Land
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-bone mt-3 mb-6">
            Server Rules
          </h2>
          <div className="flex items-start gap-4 p-5 border border-soul-cyan/20 bg-soul-cyan/5">
            <AlertTriangle className="w-5 h-5 text-soul-cyan flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              By joining the 3Deaths SMP you agree to these rules in full. Ignorance of a rule is not 
              a valid defense. Rules are enforced by staff at their discretion. Decisions made by senior 
              staff are final.
            </p>
          </div>
        </motion.div>

        {/* Life summary visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-px mb-16 bg-soul-cyan/10"
        >
          {[
            { label: "Full Lives", lives: 3, status: "You're safe. Stay sharp.", color: "text-soul-cyan" },
            { label: "Last Warning", lives: 1, status: "One death = eliminated.", color: "text-blood-tax" },
            { label: "Eliminated", lives: 0, status: "Season is over for you.", color: "text-muted-foreground" },
          ].map((s) => (
            <div key={s.label} className="bg-void-bg p-6 text-center">
              <div className="flex justify-center mb-3">
                <TallyMarks livesRemaining={s.lives} size="lg" />
              </div>
              <p className={`font-display font-bold text-sm ${s.color}`}>{s.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.status}</p>
            </div>
          ))}
        </motion.div>

        {/* Rule categories */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 mb-20"
        >
          {RULE_CATEGORIES.map((cat) => (
            <RuleCategory
              key={cat.id}
              cat={cat}
              isOpen={openId === cat.id}
              onToggle={() => toggle(cat.id)}
            />
          ))}
        </motion.div>

        {/* Penalty table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Gavel className="w-5 h-5 text-blood-tax" />
            <h3 className="font-display font-bold text-2xl text-bone">Penalty Matrix</h3>
          </div>

          <div className="border border-soul-cyan/10 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-obsidian/50">
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground tracking-wider uppercase">
                    Offense
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground tracking-wider uppercase">
                    Consequence
                  </th>
                </tr>
              </thead>
              <tbody>
                {PENALTIES.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-soul-cyan/5 hover:bg-obsidian/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-bone">{row.offense}</td>
                    <td className={`px-6 py-4 text-sm font-bold font-display ${row.color}`}>
                      {row.consequence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}