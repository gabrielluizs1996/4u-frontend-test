import heroStorm from "@/assets/achievement-hero-storm.png";
import gunsmith from "@/assets/achievement-gunsmith.png";
import husks from "@/assets/achievement-husks.png";
import treasure from "@/assets/achievement-treasure.png";
import crown from "@/assets/achievement-crown.png";
import target from "@/assets/achievement-target.png";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: Rarity;
  unlockDate: string | null;
  expirationDate: string | null;
  platform: string;
  nickname: string;
  event: string | null;
  percentUnlocked: number;
  isPinned: boolean;
  isUnlocked: boolean;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  achievements: string[]; // achievement ids unlocked
}

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "Hero of the Storm",
    description: "Vença 50 partidas no modo tempestade",
    icon: heroStorm,
    rarity: "rare",
    unlockDate: "2024-01-01T16:30:00",
    expirationDate: null,
    platform: "Epic Games",
    nickname: "jolivit",
    event: null,
    percentUnlocked: 20,
    isPinned: true,
    isUnlocked: true,
  },
  {
    id: "2",
    title: "Gunsmith",
    description: "Personalize 25 armas diferentes",
    icon: gunsmith,
    rarity: "uncommon",
    unlockDate: "2024-02-15T10:00:00",
    expirationDate: null,
    platform: "Epic Games",
    nickname: "jolivit",
    event: null,
    percentUnlocked: 35,
    isPinned: true,
    isUnlocked: true,
  },
  {
    id: "3",
    title: "Take Out Those Husks",
    description: "Elimine 1000 husks no Salvar o Mundo",
    icon: husks,
    rarity: "rare",
    unlockDate: "2024-01-01T16:30:00",
    expirationDate: null,
    platform: "Epic Games",
    nickname: "jolivit",
    event: null,
    percentUnlocked: 19,
    isPinned: true,
    isUnlocked: true,
  },
  {
    id: "4",
    title: "Treasure Hunter",
    description: "Encontre 100 baús lendários",
    icon: treasure,
    rarity: "legendary",
    unlockDate: "2024-03-20T14:00:00",
    expirationDate: "2025-03-20T14:00:00",
    platform: "Epic Games",
    nickname: "jolivit",
    event: "Temporada Dourada",
    percentUnlocked: 5,
    isPinned: false,
    isUnlocked: true,
  },
  {
    id: "5",
    title: "Royal Champion",
    description: "Alcance o rank Campeão",
    icon: crown,
    rarity: "epic",
    unlockDate: null,
    expirationDate: null,
    platform: "Epic Games",
    nickname: "jolivit",
    event: null,
    percentUnlocked: 8,
    isPinned: false,
    isUnlocked: false,
  },
  {
    id: "6",
    title: "Sharpshooter",
    description: "Acerte 500 headshots",
    icon: target,
    rarity: "common",
    unlockDate: null,
    expirationDate: null,
    platform: "Epic Games",
    nickname: "jolivit",
    event: null,
    percentUnlocked: 45,
    isPinned: false,
    isUnlocked: false,
  },
];

export const friends: Friend[] = [
  {
    id: "f1",
    name: "Luiza Soares",
    avatar: avatar1,
    achievements: ["1", "2", "3", "4"],
  },
  {
    id: "f2",
    name: "Carlos Lima",
    avatar: avatar2,
    achievements: ["1", "3", "5"],
  },
];

export const games = ["Fortnite", "Rocket League", "Valorant", "Apex Legends"];

export const rarityColors: Record<Rarity, string> = {
  common: "bg-rarity-common",
  uncommon: "bg-rarity-uncommon",
  rare: "bg-rarity-rare",
  epic: "bg-rarity-epic",
  legendary: "bg-rarity-legendary",
};

export const rarityLabels: Record<Rarity, string> = {
  common: "Comum",
  uncommon: "Incomum",
  rare: "Raro",
  epic: "Épico",
  legendary: "Lendário",
};
