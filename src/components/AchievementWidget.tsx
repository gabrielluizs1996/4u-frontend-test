import { useState } from "react";
import { Trophy, ChevronRight, Pencil, Star } from "lucide-react";
import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import AchievementModal from "./AchievementModal";

const AchievementWidget = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const pinnedAchievements = achievements.filter((a) => a.isPinned);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl rounded-lg border border-border bg-card p-5"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-neon-purple" />
            <span className="font-display text-lg font-semibold text-muted-foreground">
              Conquistas neste jogo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-full border border-border bg-secondary px-4 py-1.5 font-body text-sm font-medium text-secondary-foreground transition-colors hover:bg-muted"
            >
              ver tudo
            </button>
            <button className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground">
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex items-center gap-1">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {pinnedAchievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex min-w-[100px] flex-col items-center gap-2"
              >
                <div className="relative">
                  <div className="h-20 w-20 overflow-hidden rounded-lg border border-border bg-surface-elevated p-2">
                    <img
                      src={achievement.icon}
                      alt={achievement.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-sm bg-neon-purple">
                    <Star className="h-3 w-3 text-primary-foreground" fill="currentColor" />
                  </div>
                </div>
                <span className="text-center font-body text-xs text-muted-foreground leading-tight">
                  {achievement.title}
                </span>
              </motion.div>
            ))}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="ml-2 flex-shrink-0 rounded-full p-1 text-foreground transition-colors hover:text-neon-cyan"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      <AchievementModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default AchievementWidget;
