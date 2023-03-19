<script>
  export let container;
  
  import { WebglAddon } from 'xterm-addon-webgl';
  import { FitAddon } from 'xterm-addon-fit';
  import { Terminal } from "xterm";
  import PanelWrapper from './PanelWrapper.svelte';
  
  const terminal = new Terminal({
    rows: 0,
    cols: 0,
    fontSize: 16,
    fontFamily: "Source Code Pro, monospace",
    theme: {
      background: "#282c34"
    },
    convertEol: true
  });
  const fitAddon = new FitAddon();
  
  let termEl;
  let inputWriter;
  let mountedAlready;
  let addedListeners;

  $: {
    if (termEl && !mountedAlready) {
      mountedAlready = true;
      terminal.open(termEl);
      terminal.onData(data => {
        console.log("writing data", data)
        if (inputWriter) inputWriter.write(data);
      })
      
      terminal.loadAddon(fitAddon);
      terminal.loadAddon(new WebglAddon());

      fitAddon.fit();
    }
  }

  $: if (termEl && !addedListeners) {
    addedListeners = true;
    fitAddon.fit();
    new ResizeObserver(() => fitAddon.fit()).observe(termEl);
  }

  export const setWriter = writer => inputWriter = writer;
  export const clear = () => terminal.clear();
  export const write = (data) => terminal.write(data);
</script>

<svelte:window on:resize={() => fitAddon.fit()} />
<PanelWrapper hasLoaded={container}>
  <div class="terminal" bind:this={termEl}></div>
</PanelWrapper>

<style>
  .terminal {
    height: 100%;
    overflow: hidden;
    padding: 8px;
  }

  :global(.xterm) {
    height: 100%;
  }
</style>
