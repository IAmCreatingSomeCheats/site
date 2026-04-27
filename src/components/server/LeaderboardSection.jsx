import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trophy, Flame, Skull, Swords, AlertTriangle, HeartCrack, Zap } from "lucide-react";
import TallyMarks from "./TallyMarks";

const STATS_BG = "https://media.base44.com/images/public/69ec9d2220cde9dc531cc8ce/353a02a30_generated_ab329946.png";

const PLAYERS = [
  { rank: 1, name: "VoidWalker",    kills: 47, deaths: 0, lives: 3, playtime: "142h", kdr: "∞" },
  { rank: 2, name: "SoulReaper_X",  kills: 39, deaths: 1, lives: 2, playtime: "118h", kdr: "39.0" },
  { rank: 3, name: "CrimsonBlade",  kills: 33, deaths: 1, lives: 2, playtime: "105h", kdr: "33.0" },
  { rank: 4, name: "ObsidianKing",  kills: 28, deaths: 2, lives: 1, playtime: "98h",  kdr: "14.0" },
  { rank: 5, name: "PhantomAsh",    kills: 25, deaths: 0, lives: 3, playtime: "87h",  kdr: "∞" },
  { rank: 6, name: "NetherGhost",   kills: 22, deaths: 2, lives: 1, playtime: "76h",  kdr: "11.0" },
  { rank: 7, name: "WitchBane",     kills: 19, deaths: 1, lives: 2, playtime: "71h",  kdr: "19.0" },
  { rank: 8, name: "DarkMatter_MC", kills: 17, deaths: 0, lives: 3, playtime: "65h",  kdr: "∞" },
];

// Sorted by deaths desc for the "Death Count" leaderboard
const BY_DEATHS = [...PLAYERS].sort((a, b) => b.deaths - a.deaths || a.lives - b.lives);

const TABS = [
  { id: "kills",  label: "Most Kills",   icon: Swords },
  { id: "deaths", label: "Death Count",  icon: Skull  },
];

// Spotlight stats — who's most at risk
const AT_RISK = PLAYERS.filter(p => p.lives === 1).sort((a, b) => b.kills - a.kills);
const UNTOUCHABLE = PLAYERS.filter(p => p.deaths === 0).sort((a, b) => b.kills - a.kills);

function SpotlightCard({ player, accent, label, icon: Icon, stat, statLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden border p-6 bg-obsidian/60 flex flex-col gap-4 ${
        accent === "red"
          ? "border-blood-tax/30"
          : "border-soul-cyan/30"
      }`}
    >
      {/* Label tag */}
      <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase ${
        accent === "red" ? "text-blood-tax" : "text-soul-cyan"
      }`}>
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>

      <div>
        <p className="font-display font-black text-2xl text-bone">{player.name}</p>
        <div className="flex items-center gap-3 mt-2">
          <TallyMarks livesRemaining={player.lives} size="sm" />
          <span className="text-xs text-muted-foreground">{player.lives}/3 lives remaining</span>
        </div>
      </div>

      <div className={`text-4xl font-display font-black ${
        accent === "red" ? "text-blood-tax" : "text-soul-cyan"
      }`}>
        {stat}
        <span className="text-sm font-bold text-muted-foreground ml-2">{statLabel}</span>
      </div>

      {/* Decorative background numeral */}
      <div className={`absolute -right-4 -bottom-4 font-display font-black text-[6rem] leading-none select-none pointer-events-none ${
        accent === "red" ? "text-blood-tax/5" : "text-soul-cyan/5"
      }`}>
        {player.lives === 1 ? "!" : "0"}
      </div>
    </motion.div>
  );
}

export default function LeaderboardSection() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("kills");

  const sourceList = tab === "kills" ? PLAYERS : BY_DEATHS;
  const filtered = sourceList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const top3 = sourceList.slice(0, 3);

  return (
    <section id="leaderboard" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <img src={STATS_BG} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-void-bg/90" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-soul-cyan text-sm font-bold tracking-[0.3em] uppercase">
            Hall of Fates
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-bone mt-3">
            Leaderboard
          </h2>
        </motion.div>

        {/* Spotlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {/* Most at risk */}
          {AT_RISK[0] && (
            <SpotlightCard
              player={AT_RISK[0]}
              accent="red"
              label="On the Edge"
              icon={AlertTriangle}
              stat={AT_RISK[0].kills}
              statLabel="kills · 1 life left"
            />
          )}
          {/* Most kills with 0 deaths */}
          {UNTOUCHABLE[0] && (
            <SpotlightCard
              player={UNTOUCHABLE[0]}
              accent="cyan"
              label="Untouchable"
              icon={Zap}
              stat={UNTOUCHABLE[0].kills}
              statLabel="kills · 0 deaths"
            />
          )}
          {/* Most deaths still alive */}
          {BY_DEATHS[0] && (
            <SpotlightCard
              player={BY_DEATHS[0]}
              accent="red"
              label="Death Magnet"
              icon={HeartCrack}
              stat={BY_DEATHS[0].deaths}
              statLabel="deaths taken"
            />
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 mb-10 border border-soul-cyan/10 p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold font-display tracking-wider transition-all duration-200 ${
                tab === t.id
                  ? "bg-soul-cyan text-void-bg"
                  : "text-muted-foreground hover:text-bone"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {top3.map((player, i) => (
                <div
                  key={player.name}
                  className={`relative bg-obsidian border transition-all duration-500 p-8 ${
                    i === 0
                      ? "border-soul-cyan/40 md:order-2"
                      : i === 1
                      ? "border-soul-cyan/20 md:order-1"
                      : "border-soul-cyan/20 md:order-3"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {i === 0 ? (
                      <Trophy className="w-6 h-6 text-soul-cyan" />
                    ) : i === 1 ? (
                      <Flame className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <Skull className="w-6 h-6 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground font-bold tracking-wider">
                      #{i + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-bone mb-4">
                    {player.name}
                  </h3>

                  <div className="flex items-center gap-4 mb-6">
                    <TallyMarks livesRemaining={player.lives} size="lg" />
                    <span className="text-sm text-muted-foreground">{player.lives}/3 lives</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="font-display font-bold text-xl text-blood-tax">{player.kills}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Kills</p>
                    </div>
                    <div>
                      <p className={`font-display font-bold text-xl ${
                        tab === "deaths" ? "text-blood-tax" : "text-bone"
                      }`}>{player.deaths}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Deaths</p>
                    </div>
                    <div>
                      <p className="font-display font-bold text-xl text-soul-cyan">{player.kdr}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">K/D</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-sm mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search players..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-obsidian border border-soul-cyan/10 focus:border-soul-cyan/40 text-bone text-sm font-body outline-none transition-all placeholder:text-muted-foreground"
              />
            </div>

            {/* Table */}
            <div className="border border-soul-cyan/10 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-obsidian/50 text-left">
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">Rank</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">Player</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">Lives</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">Kills</th>
                    <th className={`px-6 py-4 text-xs font-bold tracking-wider uppercase ${
                      tab === "deaths" ? "text-blood-tax" : "text-muted-foreground"
                    }`}>Deaths</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">K/D</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">Playtime</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((player, i) => (
                    <tr key={player.name} className="border-t border-soul-cyan/5 hover:bg-obsidian/30 transition-colors">
                      <td className="px-6 py-4 font-display font-bold text-muted-foreground">#{i + 1}</td>
                      <td className="px-6 py-4 font-display font-bold text-bone">{player.name}</td>
                      <td className="px-6 py-4">
                        <TallyMarks livesRemaining={player.lives} size="sm" />
                      </td>
                      <td className="px-6 py-4 font-display font-bold text-blood-tax">{player.kills}</td>
                      <td className={`px-6 py-4 font-display font-bold ${
                        tab === "deaths" && player.deaths > 0 ? "text-blood-tax" : "text-muted-foreground"
                      }`}>{player.deaths}</td>
                      <td className="px-6 py-4 font-display text-soul-cyan">{player.kdr}</td>
                      <td className="px-6 py-4 font-display text-muted-foreground">{player.playtime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}