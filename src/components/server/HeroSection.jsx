import { motion } from "framer-motion";
import IPCopyBar from "./IPCopyBar";
import PlayerCount from "./PlayerCount";

const HERO_IMG = "https://media.base44.com/images/public/69ec9d2220cde9dc531cc8ce/fdf8f2cf8_generated_image.png";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Desolate Minecraft landscape with obsidian monolith and soul light"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void-bg/60 via-void-bg/40 to-void-bg" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Ghost mortality counter */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <span className="font-display font-black text-[20vw] text-bone leading-none">
          III
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-soul-cyan text-sm md:text-base font-bold tracking-[0.4em] uppercase">
            Three Lives. One World. No Mercy.
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-bone leading-[0.9] mb-6"
        >
          3DEATHS
          <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground mt-2">
            SMP
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-foreground text-base md:text-lg max-w-xl mb-10 leading-relaxed"
        >
          Every death costs you a life. Lose all three and you're gone forever.
          Build empires, forge alliances, and survive—or become a legend lost to the void.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <IPCopyBar variant="large" />
          <PlayerCount />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 border border-soul-cyan/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 bg-soul-cyan rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}