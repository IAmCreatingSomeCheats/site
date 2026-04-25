import { motion } from "framer-motion";

export default function TallyMarks({ livesRemaining = 3, size = "md" }) {
  const heights = { sm: "h-4", md: "h-6", lg: "h-10" };
  const widths = { sm: "w-0.5", md: "w-1", lg: "w-1.5" };
  const h = heights[size];
  const w = widths[size];

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => {
        const alive = i < livesRemaining;
        return (
          <motion.div
            key={i}
            className={`${h} ${w} rounded-full ${
              alive
                ? livesRemaining === 1 && i === 0
                  ? "bg-blood-tax death-pulse"
                  : "bg-soul-cyan"
                : "bg-muted-foreground/20"
            }`}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        );
      })}
    </div>
  );
}