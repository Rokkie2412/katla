<script>
	let guess = [
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', '']
	];

	let inputs = [];
  let activeIndex = 0

</script>


<main class="flex flex-col items-center h-dvh gap-3 text-center ">
  <div class="flex flex-col gap-2">
      {#each guess as row, i}
        <div class="flex flex-row justify-center items-center gap-2">
          {#each row as words, index}
            <input
              disabled={activeIndex !== i}
              bind:this={inputs[index]}
              type="text"
              maxlength="1"
              bind:value={words[index]}
              class="border-2 w-15 h-15 text-3xl text-center"
              placeholder=""
            />
          {/each}
        </div>
      {/each}
  </div>
</main>
