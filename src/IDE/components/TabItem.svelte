<script>
  export let name;
  
  import { getContext } from "svelte";
  const { getSelected } = getContext("tabContext");
  
  let selected = getSelected();
</script>

<div
  style={`visibility: ${$selected === name ? "visible" : "hidden"};`}
  class="container"
>
  <slot></slot>
</div>

<style>
  .container {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .container > :global(*) {
    flex: 1;
    flex-basis: 0;
  }
</style>