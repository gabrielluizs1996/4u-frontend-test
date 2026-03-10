import { X, ChevronLeft, ChevronRight, DollarSign, Medal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  type Achievement,
  rarityLabels,
  rarityColors,
} from "@/data/achievements";

interface Props {
  achievement: Achievement | null;
  onClose: () => void;
  onNavigate: (dir: "prev" | "next") => void;
}

const AchievementDetailModal = ({ achievement, onClose, onNavigate }: Props) => {
  if (!achievement) return null;

  const formatDate = (d: string | null) => {
    if (!d) return "--";
    const date = new Date(d);
    return `${date.toLocaleDateString("pt-BR")} • ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-lg bg-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black px-6 py-4">
            <div className="flex items-center gap-5">
              <Medal className="h-6 w-6 text-white" />
              <span className="font-display text-lg font-semibold text-muted-foreground">
                Conquistas neste jogo
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-white bg-black transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Achievement Info */}
          <div className="px-6 py-5">
            <div className="mb-5 flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-lg bg-surface-elevated p-2">
                <img
                  src={achievement.icon}
                  alt={achievement.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-display text-xl font-semibold text-muted-foreground">
                {achievement.title}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InfoField label="plataforma:" value={achievement.platform} />
              <InfoField label="nickname:" value={achievement.nickname} />
              <div className="col-span-2">
                <InfoField label="evento:" value={achievement.event || "--"} />
              </div>
              <InfoField label="data da conquista:" value={formatDate(achievement.unlockDate)} />
              <InfoField label="data de validade:" value={formatDate(achievement.expirationDate)} />
              <InfoField
                label="tipo de conquista:"
                value={
                  <span
                    className={`inline-block rounded-full px-4 py-1 text-xs font-semibold text-accent-foreground ${rarityColors[achievement.rarity]}`}
                  >
                    {rarityLabels[achievement.rarity]}
                  </span>
                }
              />
              <InfoField label="% de players:" value={`${achievement.percentUnlocked}%`} />
              <div className="col-span-2">
                <InfoField label="descrição:" value={achievement.description} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 border-t border-black px-6 py-4">
            <button
              onClick={() => onNavigate("prev")}
              className="rounded-full border border-border bg-secondary p-2.5 text-foreground transition-colors hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-secondary py-2.5 font-display text-sm font-semibold text-foreground transition-colors hover:bg-muted">
              <DollarSign className="h-4 w-4" />
              marcar como venda
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-secondary py-2.5 font-display text-sm font-semibold text-foreground transition-colors hover:bg-muted">
              <Medal className="h-4 w-4" />
              fixar
            </button>
            <button
              onClick={() => onNavigate("next")}
              className="rounded-full border border-border bg-secondary p-2.5 text-foreground transition-colors hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const InfoField = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="rounded-lg bg-secondary px-4 py-3">
    <p className="mb-0.5 font-body text-xs text-muted-foreground">{label}</p>
    <div className="font-body text-sm text-foreground">{value}</div>
  </div>
);

export default AchievementDetailModal;
