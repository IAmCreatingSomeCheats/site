import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PlayerCount({ className = "" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.mcsrvstat.us/3/smp.3deaths.net")
      .then((r) => r.json())
      .then((json) => {
        setData({
          online: json.online ?? false,
          players: json.players?.online ?? 0,
          max: json.players?.max ?? 0,
        });
      })
      .catch(() => setData({ online: false, players: 0, max: 0 }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" />
        <span className="text-xs text-muted-foreground font-body">—</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <motion.span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          data.online ? "bg-soul-cyan" : "bg-muted-foreground/40"
        }`}
        animate={data.online ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-xs font-body text-muted-foreground">
        {data.online ? (
          <>
            <span className="text-soul-cyan font-bold">{data.players}</span>
            <span className="text-muted-foreground">/{data.max} online</span>
          </>
        ) : (
          <span className="text-muted-foreground/60">offline</span>
        )}
      </span>
    </div>
  );
}