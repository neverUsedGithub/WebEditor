<script>
  import PanelWrapper from "./PanelWrapper.svelte";
  import { faArrowUpRightFromSquare, faRotateRight } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import IconButton from "../components/IconButton.svelte";
  export let container;
  
  let frameSource;
  let frameEl;
  let nextUrl;

  export const setSource = (src) => {
    if (frameSource === src) {
      frameSource = null;
      nextUrl = src;
    }
    else
      frameSource = src
  };

  function processNextUrl() {
    if (nextUrl) {
      frameSource = nextUrl;
      nextUrl = null;
    }
  }

  function openUrl() {
    const url = frameSource ? frameSource : nextUrl ? nextUrl : null;

    if (url)
      window.open(url);
  }

  function selectUrl() {
    this.select();
  }

  function reloadUrl() {
    nextUrl = frameSource;
    frameSource = null;
  }
</script>

{#if frameSource || nextUrl}
  <PanelWrapper hasLoaded={container}>
    <div class="webview">
      <div class="header">
        <input
          class="web-url"
          spellcheck="false"
          readonly
          on:click={selectUrl}
          value={frameSource ? frameSource : nextUrl ? nextUrl : ""}
        >
        <IconButton click={reloadUrl}>
          <FontAwesomeIcon icon={faRotateRight} size="sm" />
        </IconButton>
        <IconButton click={openUrl}>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
        </IconButton>
      </div>
      <iframe
        on:load={processNextUrl}
        on:error={processNextUrl}
        src={frameSource}
        bind:this={frameEl}
        title="Webview"
      ></iframe>
    </div>
  </PanelWrapper>
{/if}

<style>
  .webview {
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
  }

  .header {
    height: 40px;
    width: 100%;
    background: #282c34;
    display: flex;
    align-items: center;
    padding: 0 8px;
    gap: 8px;
  }

  .web-url {
    flex: 1;
    font-size: 12px;
    background: var(--level-upper);
    padding: 6px;
    border-radius: 8px;
    outline: none;
    border: none;
    color: inherit;
    font-family: inherit;
  }

  iframe {
    flex: 1;
    border: none;
    outline: none;
    background: white;
  }
</style>