import { motion } from "framer-motion";
import IPCopyBar from "./IPCopyBar";
import TallyMarks from "./TallyMarks";

export default function FooterSection() {
  return (
    <footer className="relative py-24 px-6 border-t border-soul-cyan/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-display font-black text-3xl md:text-5xl text-bone mb-4">
            Enter the Void
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
            Your three lives await. Copy the server IP and begin your legacy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <IPCopyBar variant="large" />
        </motion.div>

        <div className="flex items-center gap-3 mb-6">
          <TallyMarks livesRemaining={3} size="sm" />
          <span className="font-display font-bold text-sm tracking-wider text-bone">
            3DEATHS SMP
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} 3Deaths SMP. Not affiliated with Mojang or Microsoft.
        </p>
      </div>
    </footer>
  );
}