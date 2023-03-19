<script>
  export let click;
</script>

<button class="icon-button" on:click={click}>
  <slot></slot>
</button>

<style>
  .icon-button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
    color: inherit;
    transition: .2s;
    border-radius: 1000px;
    aspect-ratio: 1/1;
    outline: 0px solid transparent;
  }

  .icon-button:hover {
    background: var(--level-upper);
  }

  .icon-button:active {
    outline: 1px solid var(--color-blue);
  }
</style>