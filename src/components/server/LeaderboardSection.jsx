import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Trophy, Flame, Skull } from "lucide-react";
import TallyMarks from "./TallyMarks";

const STATS_BG = "https://media.base44.com/images/public/69ec9d2220cde9dc531cc8ce/353a02a30_generated_ab329946.png";

const PLAYERS = [
  { rank: 1, name: "VoidWalker", kills: 47, deaths: 0, lives: 3, playtime: "142h" },
  { rank: 2, name: "SoulReaper_X", kills: 39, deaths: 1, lives: 2, playtime: "118h" },
  { rank: 3, name: "CrimsonBlade", kills: 33, deaths: 1, lives: 2, playtime: "105h" },
  { rank: 4, name: "ObsidianKing", kills: 28, deaths: 2, lives: 1, playtime: "98h" },
  { rank: 5, name: "PhantomAsh", kills: 25, deaths: 0, lives: 3, playtime: "87h" },
  { rank: 6, name: "NetherGhost", kills: 22, deaths: 2, lives: 1, playtime: "76h" },
  { rank: 7, name: "WitchBane", kills: 19, deaths: 1, lives: 2, playtime: "71h" },
  { rank: 8, name: "DarkMatter_MC", kills: 17, deaths: 0, lives: 3, playtime: "65h" },
];

export default function LeaderboardSection() {
  const [search, setSearch] = useState("");

  const filtered = PLAYERS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = PLAYERS.slice(0, 3);

  return (
    <section id="leaderboard" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={STATS_BG}
          alt="Deep misty ravine background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-void-bg/90" />

      <div className="relative z-10 max-w-7xl mx-auto">
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

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {top3.map((player, i) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
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
                  #{player.rank}
                </span>
              </div>

              <h3 className="font-display font-black text-2xl text-bone mb-4">
                {player.name}
              </h3>

              <div className="flex items-center gap-4 mb-6">
                <TallyMarks livesRemaining={player.lives} size="lg" />
                <span className="text-sm text-muted-foreground">
                  {player.lives}/3 lives
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-display font-bold text-xl text-blood-tax">
                    {player.kills}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Kills
                  </p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl text-bone">
                    {player.deaths}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Deaths
                  </p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl text-soul-cyan">
                    {player.playtime}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Time
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm mb-8">
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border border-soul-cyan/10 overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-obsidian/50 text-left">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">
                  Rank
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">
                  Player
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">
                  Lives
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">
                  Kills
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">
                  Deaths
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">
                  Playtime
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((player) => (
                <tr
                  key={player.name}
                  className="border-t border-soul-cyan/5 hover:bg-obsidian/30 transition-colors"
                >
                  <td className="px-6 py-4 font-display font-bold text-muted-foreground">
                    #{player.rank}
                  </td>
                  <td className="px-6 py-4 font-display font-bold text-bone">
                    {player.name}
                  </td>
                  <td className="px-6 py-4">
                    <TallyMarks livesRemaining={player.lives} size="sm" />
                  </td>
                  <td className="px-6 py-4 font-display font-bold text-blood-tax">
                    {player.kills}
                  </td>
                  <td className="px-6 py-4 font-display text-muted-foreground">
                    {player.deaths}
                  </td>
                  <td className="px-6 py-4 font-display text-soul-cyan">
                    {player.playtime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}