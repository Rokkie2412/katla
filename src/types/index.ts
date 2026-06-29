export interface gridItem {
  letter: string;
  status: "idle" | "gray" | "yellow" | "green";
}

export interface LocalStorageItem {
  id: string;
  score: number;
  winStreak: number;
  activeIndex: number;
  grid: gridItem[][];
  activeWord: string[];
}
