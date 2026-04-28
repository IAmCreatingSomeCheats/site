import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import TallyMarks from "./TallyMarks";
import PlayerCount from "./PlayerCount";

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Rules", href: "#rules" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-void-bg/90 backdrop-blur-md border-b border-soul-cyan/10"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TallyMarks livesRemaining={3} size="md" />
          <span className="font-display font-black text-lg tracking-wider text-bone">
            3DEATHS
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-soul-cyan transition-colors tracking-wide uppercase"
            >
              {item.label}
            </button>
          ))}
          <PlayerCount />
          <button
            onClick={() => scrollTo("#hero")}
            className="px-4 py-2 border border-soul-cyan/30 text-soul-cyan text-sm font-bold tracking-wider hover:bg-soul-cyan/10 transition-all"
          >
            PLAY NOW
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-bone"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-void-bg/95 backdrop-blur-md border-b border-soul-cyan/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-soul-cyan transition-colors tracking-wide uppercase"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#hero")}
                className="px-4 py-2 border border-soul-cyan/30 text-soul-cyan text-sm font-bold tracking-wider hover:bg-soul-cyan/10 transition-all w-fit"
              >
                PLAY NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}