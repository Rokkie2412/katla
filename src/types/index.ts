export type ColorStatus = "idle" | "gray" | "yellow" | "green" | "notFound";

export interface gridItem {
  letter: string;
  status: ColorStatus;
}

export interface LocalStorageItem {
  id: string;
  winStreak: number;
  activeIndex: number;
  grid: gridItem[][];
  activeWord: string[] | null;
}
