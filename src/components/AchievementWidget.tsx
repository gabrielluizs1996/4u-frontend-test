import { useState } from "react";
import { ChevronRight, Pencil, Star, Medal } from "lucide-react";
import { motion } from "framer-motion";
import { Achievement, achievements } from "@/data/achievements";
import AchievementModal from "./AchievementModal";
import AchievementDetailModal from "./AchievementDetailModal";

const AchievementWidget = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const pinnedAchievements = achievements.filter((a) => a.isPinned);
  const [detailAchievement, setDetailAchievement] = useState<Achievement | null>(null);

  const handleNavigate = (direction: "prev" | "next") => {
    if (!detailAchievement) return;

    const idx = pinnedAchievements.findIndex(
      (a) => a.id === detailAchievement.id,
    );

    const newIdx =
      direction === "next"
        ? (idx + 1) % pinnedAchievements.length
        : (idx - 1 + pinnedAchievements.length) % pinnedAchievements.length;

    setDetailAchievement(pinnedAchievements[newIdx]);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl flex flex-col bg-card rounded-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black min-h-[59px]">
          <div className="flex items-center gap-3 flex-1 justify-between px-5">
            <div className="flex items-center gap-5">
              <Medal className="h-6 w-6 text-white" />
              <span className="font-display text-lg font-semibold text-muted-foreground">
                Conquistas neste jogo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="rounded-lg border border-border font-bold bg-secondary px-6 py-1.5 font-body text-sm text-secondary-foreground transition-colors hover:bg-muted"
              >
                ver tudo
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 h-max border-l-2 border-black">
            <div className="flex items-center gap-2">
              <button className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground">
                <Pencil className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex items-center p-8">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide flex-1">
            {pinnedAchievements.map((achievement, i) => (
              <motion.button
                onClick={() => setDetailAchievement(achievement)}
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex min-w-[103px] flex-col items-center gap-2 rounded-lg p-1 hover:bg-primary-blue"
              >
                <div className="relative w-[103px] h-[103px]">
                  <div className="overflow-hidden rounded-lg bg-surface-elevated">
                    <img
                      src={achievement.icon}
                      alt={achievement.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="absolute left-0 top-0 flex w-[37px] h-[37px] items-center justify-center rounded-tl-lg rounded-br-lg bg-primary-blue">
                    <Star
                      className="h-3 w-3 text-primary-foreground"
                      fill="currentColor"
                    />
                  </div>
                </div>
                <span className="text-center max-w-[100px] font-body text-xs text-muted-foreground leading-tight">
                  {achievement.title}
                </span>
              </motion.button>
            ))}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="ml-2 flex-shrink-0 bg-black rounded-full p-2 text-foreground transition-colors hover:text-neon-cyan"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      <AchievementModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <AchievementDetailModal
        achievement={detailAchievement}
        onClose={() => setDetailAchievement(null)}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default AchievementWidget;
