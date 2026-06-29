<script lang="ts">
  type Props = {
    label: string;
    onClick?: () => void;
  };

  const props: Props = $props();
</script>

<button
  onclick={props.onClick}
  class="
    btn
    btn-outline
    bg-transparent
    border-gray-200
    hover:bg-gray-700
    hover:text-white
    w-full h-auto
    p-3
  "
>
  {props.label}
</button>
