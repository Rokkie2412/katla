import id from "../routes/game/id.json" with { type: "json" };
import type { ColorStatus, LocalStorageItem, gridItem } from "../types/index.ts";

const regexOnlyAlphabeth = /^[a-zA-Z]+$/;

export function useStorable(key: string, initialValue: LocalStorageItem) {
  let data = $state<LocalStorageItem>(initialValue);

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    if (stored) {
      data = JSON.parse(stored);
    }
  }

  $effect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  });

  return {
    get value() {
      return data;
    },
    set value(newValue: LocalStorageItem) {
      data = newValue;
    },
  };
}

export const onHandleInput =
  (
    currentIndex: number,
    guess: gridItem[][],
    activeIndex: number,
    inputs: HTMLInputElement[][],
  ) =>
    (): void => {
      guess[activeIndex][currentIndex].letter =
        guess[activeIndex][currentIndex].letter.toUpperCase();

      if (!regexOnlyAlphabeth.test(guess[activeIndex][currentIndex].letter)) {
        guess[activeIndex][currentIndex].letter = "";
      }

      if (currentIndex < 4 && guess[activeIndex][currentIndex].letter !== "") {
        inputs[activeIndex][currentIndex + 1]?.focus();
      }
    };

export const getWord = (): string[] => {
  const randomIndex = Math.floor(Math.random() * id.length);
  const randomWord = id[randomIndex];

  return [...randomWord.toUpperCase()];
};

export const checkItemColors = (
  currentGuess: gridItem[],
  availableTargetLetters: string[],
  status: gridItem[],
) => {
  let evaluatedStatuses = ["notFound", "notFound", "notFound", "notFound", "notFound"];

  let tempTarget = [...availableTargetLetters];


  currentGuess.forEach((item, i) => {
    if (item.letter === tempTarget[i]) {
      evaluatedStatuses[i] = "green";
      tempTarget[i] = "";
    }
  });

  currentGuess.forEach((item, i) => {
    if (evaluatedStatuses[i] !== "green") {
      let foundIndex = tempTarget.indexOf(item.letter);

      if (foundIndex !== -1) {
        evaluatedStatuses[i] = "yellow";
        tempTarget[foundIndex] = "";
      } else {
        evaluatedStatuses[i] = "notFound";
      }
    }
  });

  evaluatedStatuses.forEach((resultColor, i) => {
    setTimeout(() => {
      (status[i].status as ColorStatus) = resultColor as ColorStatus;
    }, i * 300);
  });
};

export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const initializeUserId = (): string | null => {
  if (typeof window !== "undefined") {
    let currentUserId = localStorage.getItem("katla_user_id");

    if (!currentUserId) {
      currentUserId = generateUUID();
      localStorage.setItem(
        "katla_user_id",
        JSON.stringify({
          id: currentUserId,
          score: 0,
          winStreak: 0,
          currentGuess: null,
          status: null,
        }),
      );
    }

    return currentUserId;
  }

  return null;
};

export const initializeUserEn = (): string | null => {
  if (typeof window !== "undefined") {
    let currentUserId = localStorage.getItem("katla_user_en");

    if (!currentUserId) {
      currentUserId = generateUUID();
      localStorage.setItem("katla_user_en", currentUserId);
    }

    return currentUserId;
  }

  return null;
};

export const refocus =
  (activeIndex: number, guess: gridItem[][], inputs: HTMLInputElement[][]) =>
    (): void => {
      if (activeIndex > 5) return;

      let targetIndex = guess[activeIndex].findIndex(
        (item) => item.letter === "",
      );

      if (targetIndex === -1) {
        targetIndex = 4;
      }

      inputs[activeIndex][targetIndex]?.focus();
    };

export const getItemLocalStorage = (session?: string): LocalStorageItem => {
  return JSON.parse(localStorage.getItem("katla_user_id") || "{}");
};
