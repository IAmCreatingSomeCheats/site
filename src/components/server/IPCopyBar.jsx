import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

export default function IPCopyBar({ variant = "default" }) {
  const [copied, setCopied] = useState(false);
  const ip = "SMP.3DEATHS.NET";

  const handleCopy = () => {
    navigator.clipboard.writeText(ip.toLowerCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`group relative flex items-center justify-center gap-3 px-8 py-4 border border-soul-cyan/30 bg-obsidian/80 backdrop-blur-sm transition-all duration-500 hover:border-soul-cyan/60 cursor-pointer ${
        variant === "large" ? "w-full max-w-2xl" : "w-auto"
      } ${copied ? "soul-glow" : ""}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="font-display font-black text-lg md:text-2xl tracking-[0.3em] text-bone">
        {ip}
      </span>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Check className="w-5 h-5 text-soul-cyan" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Copy className="w-5 h-5 text-muted-foreground group-hover:text-soul-cyan transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>

      {copied && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 text-sm text-soul-cyan font-medium"
        >
          Copied to clipboard
        </motion.span>
      )}
    </motion.button>
  );
}