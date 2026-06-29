<script lang="ts">
  import { Toaster, toast } from "svelte-sonner";
  import { keyboardRows } from "../../../config/index.ts";
  import Key from "../../../ui/keyboardKey.svelte";
  import {
    checkItemColors,
    generateUUID,
    getWord,
    onHandleInput,
    refocus,
    setStyleClassInput,
    useStorable,
  } from "../../../utils/index.svelte.ts";
  import id from "../../game/id.json" with { type: "json" };

  const gameStore = useStorable("katla_user_id", {
    id: generateUUID(),
    score: 0,
    winStreak: 0,
    activeIndex: 0,
    activeWord: [],
    grid: Array(6)
      .fill(null)
      .map(() =>
        Array(5)
          .fill(null)
          .map(() => ({
            letter: "",
            status: "idle",
          })),
      ),
  });

  let guess = gameStore.value.grid!;

  let inputs: HTMLInputElement[][] = [[], [], [], [], [], []];
  let activeIndex = $state(gameStore.value.activeIndex!);
  gameStore.value.activeWord = getWord();

  const onCompleteRow = () => {
    if (guess[activeIndex].some((cell) => cell.letter === "")) {
      toast.error("Please fill all the words in the row", { duration: 1000 });
      return;
    }

    let currentGuess = guess[activeIndex];
    let availableTargetLetters = [...gameStore.value.activeWord];

    if (
      !id.includes(
        currentGuess.map((item) => item.letter).join("").toLowerCase(),
      )
    ) {
      toast.error(
        `"${currentGuess.map((item) => item.letter).join("").toUpperCase()}" is not a valid word`,
        { duration: 1000 },
      );
      return;
    }

    checkItemColors(currentGuess, availableTargetLetters, guess[activeIndex]);
    setStyleClassInput(guess[activeIndex], activeIndex, inputs);

    if (activeIndex < 5) {
      setTimeout(() => {
        activeIndex += 1;
        setTimeout(() => {
          inputs[activeIndex][0]?.focus();
        }, 0);
      }, 1800);
    } else {
      setTimeout(() => {
        toast.error("You failed to guess the word!", { duration: 1000 });
      }, 1800);
    }
  };

  const onKeydownPress = (currentIndex: number) => (event: { key: string }) => {
    if (event.key === "Backspace") {
      if (currentIndex > 0 && guess[activeIndex][currentIndex].letter === "") {
        inputs[activeIndex][currentIndex - 1]?.focus();
      }
      return;
    }
    if (event.key === "Enter") {
      onCompleteRow();
      return;
    }
  };
</script>

<svelte:window onclick={refocus(activeIndex, guess, inputs)} />

<main class="flex flex-col items-center h-dvh gap-3 text-center w-full">
  <div class="flex flex-col gap-2 h-dvh w-full justify-between items-center">
    <header class="flex flex-col items-center justify-center w-1/2 px-4 py-4 border-b-2 border-gray-200 dark:border-gray-700">
      <h1 class="text-3xl md:text-5xl font-extrabold tracking-widest text-gray-900 dark:text-white">
        WORDLE
      </h1>
      <div class="flex items-center gap-4 mt-2 text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300">
        <button
          class="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors border-b-2 border-transparent hover:border-black dark:hover:border-white pb-0.5"
        >
          <span class="text-lg">🇮🇩</span> ID
        </button>
        <span class="text-gray-300 dark:text-gray-600">|</span>
        <button
          class="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors border-b-2 border-transparent hover:border-black dark:hover:border-white pb-0.5"
        >
          <span class="text-lg">🇬🇧</span> EN
        </button>
      </div>
    </header>

    <div class="flex flex-col gap-2">
      {#each guess as row, i}
        <div class="flex flex-row justify-center items-center gap-2">
          {#each row, index}
            <input
              disabled={activeIndex !== i}
              bind:this={inputs[i][index]}
              bind:value={guess[i][index].letter}
              type="text"
              maxlength="1"
              onmousedown={(e) => e.preventDefault()}
              oninput={onHandleInput(index, guess, activeIndex, inputs)}
              onkeydown={onKeydownPress(index)}
              class="border-2 rounded-none! w-15 h-15 text-3xl text-center caret-transparent cursor-default focus:rounded-none! focus:outline-none focus:ring-0 md:w-18 md:h-18"
              placeholder=""
            />
          {/each}
        </div>
      {/each}
    </div>

    <div class="flex w-full h-auto justify-center items-center mb-4">
      <div class="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        {#each keyboardRows as keyRow, index}
          <div class="flex flex-row justify-center items-center gap-1 m-1">
            {#each keyRow as key}
              <Key letter={key} onPress={() => console.log(key)} status />
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <Toaster
    position="top-center"
    richColors
    closeButton
    visibleToasts={3}
    duration={1000}
  />
</main>
