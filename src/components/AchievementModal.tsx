import { useState, useMemo } from "react";
import {
  X,
  Search,
  Users,
  Info,
  Medal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  achievements,
  friends,
  games,
  rarityLabels,
  rarityColors,
  type Achievement,
  type Friend,
} from "@/data/achievements";
import AchievementDetailModal from "./AchievementDetailModal";

interface AchievementModalProps {
  open: boolean;
  onClose: () => void;
}

const AchievementModal = ({ open, onClose }: AchievementModalProps) => {
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<Friend[]>([]);
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [detailAchievement, setDetailAchievement] =
    useState<Achievement | null>(null);

  const unlockedAchievements = achievements.filter((a) => a.isUnlocked);
  const lockedAchievements = achievements.filter((a) => !a.isUnlocked);
  const totalAchievements = achievements.length;
  const unlockedCount = unlockedAchievements.length;
  const percentage = Math.round((unlockedCount / totalAchievements) * 100);

  const filteredUnlocked = useMemo(
    () =>
      unlockedAchievements.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const filteredLocked = useMemo(
    () =>
      lockedAchievements.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const handleNavigate = (direction: "prev" | "next") => {
    if (!detailAchievement) return;
    const allFiltered = [...filteredUnlocked, ...filteredLocked];
    const idx = allFiltered.findIndex((a) => a.id === detailAchievement.id);
    const newIdx =
      direction === "next"
        ? (idx + 1) % allFiltered.length
        : (idx - 1 + allFiltered.length) % allFiltered.length;
    setDetailAchievement(allFiltered[newIdx]);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative mx-4 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-card"
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
            <div className="flex items-center gap-3">
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="rounded-full border-r-8 bg-secondary px-4 py-2 font-body text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
              >
                {games.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <button
                onClick={onClose}
                className="rounded-full bg-black p-1.5 text-white transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="border-b border-black px-6 py-4">
            <div className="mb-3 flex gap-2">
              {achievements.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  className={`h-14 w-14 overflow-hidden rounded-lg border-2 p-1 ${
                    a.isPinned ? "border-primary-blue" : "border-black"
                  } bg-surface-elevated`}
                >
                  <img
                    src={a.icon}
                    alt={a.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {unlockedCount} de {totalAchievements} alcançadas
              </span>
              <span>{percentage}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-secondary-blue"
              />
            </div>
          </div>

          {/* Search & Compare */}
          <div className="flex items-center gap-3 border-b border-black px-6 py-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-black px-3 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar conquista"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent font-body text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="relative w-2/5">
              <button
                onClick={() => setShowFriendPicker(!showFriendPicker)}
                className="flex items-center w-full gap-2 rounded-lg bg-secondary px-4 py-2 font-body text-sm text-foreground transition-colors hover:bg-muted"
              >
                <div className="flex flex-1 items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-full bg-muted-foreground p-2">
                      <Users className="h-4 w-4" />
                    </div>
                    <span className="pr-5">Comparar com</span>
                  </div>
                  <ChevronDown className="h-3 w-3 text-white" />
                </div>
              </button>
              {showFriendPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 left-0 top-full z-10 mt-1  overflow-hidden rounded-lg bg-card shadow-xl"
                >
                  {friends.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setSelectedFriend((prevState) => {
                          const alreadySelected = prevState.some(
                            (friend) => friend.id === f.id,
                          );

                          if (alreadySelected) {
                            return prevState.filter(
                              (friend) => friend.id !== f.id,
                            );
                          }

                          return [...prevState, f];
                        });
                        setShowFriendPicker(false);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left font-body text-sm text-foreground transition-colors hover:bg-secondary"
                    >
                      <img
                        src={f.avatar}
                        alt={f.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      {f.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Achievement List */}
          <div className="flex-1 overflow-y-auto px-6 py-3">
            {filteredUnlocked.map((a) => (
              <AchievementRow
                key={a.id}
                achievement={a}
                friend={selectedFriend}
                onClick={() => setDetailAchievement(a)}
              />
            ))}

            {filteredLocked.length > 0 && (
              <>
                <p className="mb-2 mt-4 font-display text-sm font-semibold text-muted-foreground">
                  Não alcançadas
                </p>
                {filteredLocked.map((a) => (
                  <AchievementRow
                    key={a.id}
                    achievement={a}
                    friend={selectedFriend}
                    onClick={() => setDetailAchievement(a)}
                  />
                ))}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>

      <AchievementDetailModal
        achievement={detailAchievement}
        onClose={() => setDetailAchievement(null)}
        onNavigate={handleNavigate}
      />
    </AnimatePresence>
  );
};

const AchievementRow = ({
  achievement,
  friend,
  onClick,
}: {
  achievement: Achievement;
  friend: Friend[];
  onClick: () => void;
}) => {
  return (
    <motion.button
      whileHover={{ backgroundColor: "hsl(220 16% 14%)" }}
      onClick={onClick}
      className={`mb-1 flex w-full items-center gap-3 px-3 py-3 text-left transition-colors bg-secondary ${
        !achievement.isUnlocked ? "opacity-50" : ""
      }`}
    >
      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-surface-elevated p-1">
        <img
          src={achievement.icon}
          alt={achievement.title}
          className={`h-full w-full object-contain ${!achievement.isUnlocked ? "grayscale" : ""}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold text-foreground">
            {achievement.title}
          </span>
          <Info className="h-3.5 w-3.5 text-yellow-400" />
        </div>
        <p className="truncate font-body text-xs text-muted-foreground">
          {achievement.description.substring(0, 20)}...
        </p>
        <p className="font-body text-xs text-muted-foreground">
          Alcançado por {achievement.percentUnlocked}% dos jogadores.
        </p>
      </div>
      {friend.map((f) => {
        const friendHas = f.achievements.includes(achievement.id);
        return (
          <div className="flex -space-x-2">
            <img
              src={f.avatar}
              alt={f.name}
              className={`h-8 w-8 rounded-full border-2 border-card object-cover ${
                !friendHas ? "grayscale opacity-40" : ""
              }`}
            />
          </div>
        );
      })}
    </motion.button>
  );
};

export default AchievementModal;
