import id from '../routes/game/id.json' with { type: 'json' };

const regexOnlyAlphabeth = /^[a-zA-Z]+$/;

export const onHandleInput = (currentIndex: number, guess: string[][], activeIndex: number, inputs: HTMLInputElement[][]) => (): void => {
  guess[activeIndex][currentIndex] = guess[activeIndex][currentIndex].toUpperCase();

  if (!regexOnlyAlphabeth.test(guess[activeIndex][currentIndex])) {
    guess[activeIndex][currentIndex] = ''
  }

  if (currentIndex < 4 && guess[activeIndex][currentIndex] !== '') {
    inputs[activeIndex][currentIndex + 1]?.focus();
  }
}

export const getWord = (): string[] => {
  const randomIndex = Math.floor(Math.random() * id.length);
  const randomWord = id[randomIndex];

  return [...randomWord.toUpperCase()];
}

export const checkItemColors = (currentGuess: string[], availableTargetLetters: string[], status: string[]) => {
  currentGuess.forEach((letter, index) => {
    if (letter === availableTargetLetters[index]) {
      status[index] = 'green';
      availableTargetLetters[index] = '';
    }
  });

  currentGuess.forEach((letter, index) => {
    if (status[index] !== 'green') {
      let foundIndex = availableTargetLetters.indexOf(letter);

      if (foundIndex !== -1) {
        status[index] = 'yellow';
        availableTargetLetters[foundIndex] = '';
      }
    }
  });
}

export const setStyleClassInput = (statues: string[], activeIndex: number, inputs: HTMLInputElement[][]) => {
  statues.forEach((status, index) => {
    setTimeout(() => {
      inputs[activeIndex][index].classList.add('animate-flip');

      if (status === 'green') {
        inputs[activeIndex][index].classList.add('bg-green-500', 'text-white', 'border-green-500');
      } else if (status === 'yellow') {
        inputs[activeIndex][index].classList.add('bg-yellow-500', 'text-white', 'border-yellow-500');
      } else {
        inputs[activeIndex][index].classList.add('bg-gray-500', 'text-white', 'border-gray-500');
      }
    }, index * 300);
  });
}

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const initializeUserId = (): string | null => {
  if (typeof window !== 'undefined') {
    let currentUserId = localStorage.getItem('katla_user_id');

    if (!currentUserId) {
      currentUserId = generateUUID();
      localStorage.setItem('katla_user_id', JSON.stringify({
        id: currentUserId,
        score: 0,
        winStreak: 0,
        currentGuess: null,
        status: null
      }));
    }

    return currentUserId;
  }

  return null;
};

export const initializeUserEn = (): string | null => {
  if (typeof window !== 'undefined') {
    let currentUserId = localStorage.getItem('katla_user_en');

    if (!currentUserId) {
      currentUserId = generateUUID();
      localStorage.setItem('katla_user_en', currentUserId);
    }

    return currentUserId;
  }
  
  return null;
};