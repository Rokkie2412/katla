<script>
  import Button from '../ui/button.svelte'
</script>

<div class="w-full h-dvh flex flex-col justify-between">
  <header class="flex w-full justify-center items-center h-1/7">
    <h1 class="text-4xl font-bold text-gray-200 rounded-lg p-3 tracking-[4px]">Wordle</h1>
  </header>
  <main class="flex flex-col justify-center items-center h-4/6 gap-3 text-center ">
    <p class="text-2xl md:text-3xl font-bold text-gray-200 tracking-[4px] animate-bounce">Wordle</p>
    <p class="text-xl md:text-3xl font-bold text-[#00ADB5]">A Simple Word Guessing Game</p>
    <p class="text-md md:text-xl text-center text-gray-200 font-poppins">Each guess must be a valid 5 letter word. Hit the enter button to submit</p>
    <div class="flex gap-2.5 flex-row mt-2 w-1/4 md:w-1/7 justify-center">
      <Button label="English"/>
      <Button label="Indonesian"/>
    </div>
  </main>
  <footer class="flex flex-col w-full justify-center items-center h-1/7 border-t border-gray-400">
    <p class="text-md md:text-lg text-gray-300 font-bold">Created with ❤️ by <a href="https://github.com/rokkie2412">Rokkie2412</a></p>
    <p class="text-sm md:text-md text-gray-400">Powered by <a href="https://kit.svelte.dev">SvelteKit</a></p>
  </footer>
</div>