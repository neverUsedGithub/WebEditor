<script>
  export let tabs;

  import PanelWrapper from "../panels/PanelWrapper.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  let selectedTab = writable(tabs[0]);

  setContext("tabContext", {
    getSelected: () => selectedTab
  });
</script>

<PanelWrapper hasLoaded={true}>
  <div class="inside">
    <div class="tabs">
      {#each tabs as tab}
        <div
          class="tab"
          on:click={() => selectedTab.set(tab)}
          class:selected={$selectedTab === tab}
        >{tab}</div>
      {/each}
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</PanelWrapper>

<style>
  .tabs {
    display: flex;
    padding: 6px;
    align-items: center;
    gap: 4px;
    border-bottom: 1px solid var(--level-upper);
  }

  .tab {
    padding: 4px 8px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    user-select: none;
    transition: .2s;
  }

  .tab.selected, .tab:hover {
    background: var(--level-upper);
  }
  .tab.selected:hover {
    background: var(--level-upperer);
  }

  .inside {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    display: flex;
    position: relative;
  }

  .content > :global(*) {
    flex: 1;
    flex-basis: 0;
  }
</style>