<script lang="ts">
  type Props = {
    onPress: () => void;
    letter: string;
    status?: boolean;
  };

  let { onPress, letter, status = true }: Props = $props();

  const statusClass = status
    ? "bg-gray-600 border-gray-300 text-gray-300"
    : "bg-slate-500 border-slate-600 text-gray-200";

  // Cek apakah ini tombol spesial
  const isSpecial = letter === "ENTER" || letter === "BACKSPACE";

  // Berikan ukuran dan teks yang berbeda untuk tombol spesial
  const sizeClass = isSpecial
    ? "flex-[1.6] text-[10px] sm:text-sm"
    : letter === ""
      ? "flex-[0.1] md:flex-[0.3] text-sm sm:text-lg"
      : "flex-[0.9] text-sm sm:text-lg";
</script>

<kbd
  onclick={onPress}
  class={`
  kbd
  cursor-pointer
  w-11
  sm:w-13
  h-11
  sm:h-13
  font-bold
  uppercase
  select-none
  transition-all
  hover:opacity-80
  active:scale-95
  active:translate-y-1
  ${letter === "" ? "invisible" : ""}
  ${sizeClass}
  ${statusClass}`}
>
  {#if letter === "BACKSPACE"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 sm:h-6 sm:w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
      />
    </svg>
  {:else}
    {letter}
  {/if}
</kbd>
