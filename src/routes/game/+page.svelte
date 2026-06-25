<script lang="ts">
  import { Toaster, toast } from 'svelte-sonner';
  import id from './id.json' with { type: 'json' };

  const getWord = () => {
    const randomIndex = Math.floor(Math.random() * id.length);
    const randomWord = id[randomIndex];
    return randomWord.toUpperCase().split('');
  }

  const regexOnlyAlphabeth = /^[a-zA-Z]+$/;
	let guess = $state([
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', '']
	]);

	let inputs: HTMLInputElement[][] = [
    [], [], [], [], [], []
  ];
  let activeIndex = $state(0)
  
  const onCompleteRow = (currentIndex: number) => {
    if(guess[activeIndex].includes('')) {
      toast.error('Please fill all the words')
      return
    }

    if (activeIndex < 5) {
      activeIndex += 1;
      
      setTimeout(() => {
        inputs[activeIndex][0]?.focus();
      }, 0);
    }
  }

  const onHandleChange = (currentIndex: number) => () => {
    guess[activeIndex][currentIndex] = guess[activeIndex][currentIndex].toUpperCase();

    if(!regexOnlyAlphabeth.test(guess[activeIndex][currentIndex])) {
      guess[activeIndex][currentIndex] = ''
    }

    if (currentIndex < 4 && guess[activeIndex][currentIndex] !== '') {
      inputs[activeIndex][currentIndex + 1]?.focus();
    }
  }

  const onKeydownPress = (currentIndex: number) => (event: { key: string; }) => {
    if (event.key === 'Backspace') {
      if (currentIndex > 0 && guess[activeIndex][currentIndex] === '') {
        inputs[activeIndex][currentIndex - 1]?.focus();
      }
      return
    }
    if (event.key === 'Enter') {
      console.log('enter');
      onCompleteRow(currentIndex);
    }
  }
</script>


<main class="flex flex-col items-center h-dvh gap-3 text-center ">
  <div class="flex flex-col gap-2">
      {#each guess as row, i}
        <div class="flex flex-row justify-center items-center gap-2">
          {#each row as words, index}
            <input
              disabled={activeIndex !== i}
              bind:this={inputs[i][index]}
              bind:value={guess[i][index]}
              type="text"
              maxlength="1"
              oninput={onHandleChange(index)}
              onkeydown={onKeydownPress(index)}
              class="border-2 w-15 h-15 text-3xl text-center"
              placeholder=""
            />
          {/each}
        </div>
      {/each}
  </div>
  <Toaster position="top-center" richColors closeButton visibleToasts={3} duration={1000} />
</main>
