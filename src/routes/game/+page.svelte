<script lang="ts">
  import { onMount } from "svelte";
  import { Toaster, toast } from "svelte-sonner";
  import {
    checkItemColors,
    getWord,
    onHandleInput,
    setStyleClassInput,
    refocus,
    initializeUserId,
  } from "../../utils/index.ts";
  import id from "../game/id.json" with { type: "json" };
  import { katlaStates } from "../states.svelte.ts";

  let guess = katlaStates.guessId;
  let inputs: HTMLInputElement[][] = [[], [], [], [], [], []];
  let activeIndex = $state(0);
  let word = getWord();

  onMount(() => {
    inputs[activeIndex][0]?.focus();
    initializeUserId();
  });

  const onCompleteRow = () => {
    if (guess[activeIndex].includes("")) {
      toast.error("Please fill all the words in the row", { duration: 1000 });
      return;
    }

    const status = ["gray", "gray", "gray", "gray", "gray"];
    let currentGuess = guess[activeIndex];
    let availableTargetLetters = [...word];

    if (!id.includes(currentGuess.join("").toLowerCase())) {
      toast.error(
        `"${currentGuess.join("").toUpperCase()}" is not a valid word`,
        { duration: 1000 },
      );
      return;
    }

    checkItemColors(currentGuess, availableTargetLetters, status);
    setStyleClassInput(status, activeIndex, inputs);

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
      if (currentIndex > 0 && guess[activeIndex][currentIndex] === "") {
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

<main class="flex flex-col items-center h-dvh gap-3 text-center">
  <div class="flex flex-col gap-2">
    {#each guess as row, i}
      <div class="flex flex-row justify-center items-center gap-2">
        {#each row, index}
          <input
            disabled={activeIndex !== i}
            bind:this={inputs[i][index]}
            bind:value={guess[i][index]}
            type="text"
            maxlength="1"
            onmousedown={(e) => e.preventDefault()}
            oninput={onHandleInput(index, guess, activeIndex, inputs)}
            onkeydown={onKeydownPress(index)}
            class="border-2 rounded-none! w-15 h-15 text-3xl text-center caret-transparent cursor-default focus:rounded-none! focus:outline-none focus:ring-0"
            placeholder=""
          />
        {/each}
      </div>
    {/each}
  </div>
  <Toaster
    position="top-center"
    richColors
    closeButton
    visibleToasts={3}
    duration={1000}
  />
</main>
