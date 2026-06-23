<script lang="ts">
  let word: string[] = $state(['', '', '', '', '']);
  let inputs = []
</script>

<main>
  {#each word as item, index}
    <input
      bind:value={word[index]}
      bind:this={inputs[index]}
      type="text"
      maxlength="1"
      class="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    
  {/each}
</main>