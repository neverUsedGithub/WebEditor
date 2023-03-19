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

  $: {
    if (termEl) {
      terminal.open(termEl);
      terminal.loadAddon(fitAddon);
      terminal.loadAddon(new WebglAddon());

      fitAddon.fit();
    }
  }

  async function mountBash() {
    const bashTask = await container.spawn("jsh");
    bashTask.output.pipeTo(new WritableStream({
      write: (data) => terminal.write(data)
    }))

    const bashWriter = bashTask.input.getWriter();

    terminal.onData(data => {
      bashWriter.write(data);
    })

    await bashTask.exit;

    mountBash();
  }

  $: if (container) mountBash();

  $: if (termEl) {
    fitAddon.fit();
    new ResizeObserver(() => fitAddon.fit()).observe(termEl);
  }
  
  export const clear = () => terminal.clear();
</script>

<svelte:window on:resize={() => fitAddon.fit()} />
<PanelWrapper hasLoaded={container}>
  <div class="terminal" bind:this={termEl}></div>
</PanelWrapper>

<style>
  .terminal {
    height: 100%;
    overflow: hidden;
  }

  :global(.xterm) {
    height: 100%;
  }
</style>
