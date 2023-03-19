<script>
  export let fileChanged;
  export let openedFile;
  export let container;
  
  import CodeMirror from "svelte-codemirror-editor";
  import { oneDark } from "@codemirror/theme-one-dark";
  import PanelWrapper from "./PanelWrapper.svelte";
  import { getLanguage } from "../languages.js"

  let value = "";
  let currentLanguage;

  async function loadFileContent() {
    value = await container.fs.readFile($openedFile, "utf8");
  }

  async function changeEvent(event) {
    if (!$openedFile) return;
    fileChanged({ path: $openedFile });
    
    await container.fs.writeFile($openedFile, event.detail);
  }

  $: if ($openedFile)
    loadFileContent();

  $: if ($openedFile) currentLanguage = getLanguage($openedFile);
</script>

<PanelWrapper hasLoaded={container && $openedFile} _class="editor-wrapper">
  <CodeMirror
    bind:value
    lang={currentLanguage?.mode || null}
    extensions={currentLanguage?.codemirror_ext || []}
    theme={oneDark}
    on:change={changeEvent}
  />
</PanelWrapper>

<style>
  :global(.editor-wrapper) {
    overflow-x: hidden;
  }
  
  :global(.codemirror-wrapper) {
    overflow-x: hidden;
    height: 100%;
  }
  
  :global(.cm-editor) {
    height: 100%;
    font-size: inherit;
    font-family: Source Code Pro;
  }
</style>