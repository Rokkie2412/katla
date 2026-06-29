<script lang="ts">
  type Props = {
    label: string;
    href: string;
    image?: string;
  };

  const props: Props = $props();
</script>

<a
  href={props.href}
  class="
    btn
    btn-outline
    bg-transparent
    border-2
    border-gray-200
    hover:bg-gray-800
    hover:text-white
    hover:border-[#00ADB5]
    w-full
    h-auto
    p-3
  "
>
  {props.label}
  {#if props.image}
    <img src={props.image} alt={props.label} class="rounded-sm" />
  {/if}
</a>
