<script>
  export let hasLoaded;
  export let _class = "";
</script>

<div class={"wrapper" + (_class ? " " + _class : "")} class:loading={!hasLoaded}>
  {#if hasLoaded}
    <slot></slot>
  {:else}
    <div class="spinner"></div>
  {/if}
</div>

<style>
  .wrapper {
    background: #282c34;
    max-width: 100%;
  }
  .wrapper.loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .spinner {
    width: 30px;
    height: 30px;
    border-radius: 1000px;
    border: 2px solid var(--level-upper);
    border-bottom-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>