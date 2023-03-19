<script>
  export let files;
  export let defaultConfig;
  
  import Webview from "./panels/Webview.svelte";
  import Terminal from "./panels/Terminal.svelte";
  import CodeEditor from "./panels/CodeEditor.svelte";
  import FileViewer from "./panels/FileViewer.svelte";
  import Shell from "./panels/Shell.svelte";
  import MultiTab from "./components/MultiTab.svelte";
  import TabItem from "./components/TabItem.svelte";
  
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
  import { createContainer } from "./containers.js";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { transformFiles, join } from "./files.js";
  import { getIDEConfig, setDefaultConfig } from "./config.js";
  let openedFile = writable(null);
  let projectFiles = writable({});
  let container;

  $: setDefaultConfig(defaultConfig);

  onMount(async () => {
    container = await createContainer(files);

    container.on("server-ready", (port, url) => {
      webviewComponent.setSource(url);
    });

    loadProjectRoot();
    runProject();
    
    setInterval(async () => {
      const changes = transformFiles(await container.fs.readdir(".", { withFileTypes: true }));
      const tomerge = {};

      for (const file of Object.keys(changes)) {
        if (!$projectFiles[file]) tomerge[file] = changes[file];
      }

      if (Object.keys(tomerge).length !== 0)
        projectFiles.set(Object.assign({}, $projectFiles, tomerge));
    }, 1000);
  })

  const ProjectState = { Stopped: 0, Running: 1, Loading: 2 }
  
  let webviewComponent;
  let terminalComponent;
  let fileViewerComponent;
  let runTask;
  let projectState = ProjectState.Loading;

  async function runProject() {
    projectState = ProjectState.Stopped;
    if ((await getIDEConfig(container)).packager.autoInstall) {
      projectState = ProjectState.Loading;
      const installTask = await container.spawn("npm", [ "install" ]);
      installTask.output.pipeTo(new WritableStream({
        write(data) {
          terminalComponent.write(data);
        }
      }))
      await installTask.exit;
      projectState = ProjectState.Stopped;
    }
    // terminalComponent.clear();
    terminalComponent.write(`\nPress the Run button to start your project.\n`);
    
    // runClicked();
  }

  async function loadProjectRoot() {
    projectFiles.set(
      transformFiles(await container.fs.readdir(".", { withFileTypes: true }))
    );
    openedFile.set(join(".", Object.keys($projectFiles)[0]));
  }

  async function runClicked() {
    if (projectState === ProjectState.Loading) return;
    
    if (projectState === ProjectState.Running) {
      projectState = ProjectState.Loading;
      await runTask.kill();
      projectState = ProjectState.Stopped;
      runTask = null;
      return;
    }

    terminalComponent.clear();
    projectState = ProjectState.Loading;
    const [ cmd, ...args ] = (await getIDEConfig(container)).run;
    runTask = await container.spawn(cmd, args);
    projectState = ProjectState.Running;
    console.log("setting terminal writer")
    terminalComponent.setWriter(runTask.input.getWriter());
    
    runTask.output.pipeTo(new WritableStream({
      write(data) {
        terminalComponent.write(data);
      }
    }))
    const status = await runTask.exit;
    projectState = ProjectState.Stopped;
    runTask = null;
    terminalComponent.write(`\nExited with status ${status}.\n`);
  }

  function handleFileChange({ path }) {
    if (path === "./webeditor.config.js") {
      fileViewerComponent.setHiddenFiles();
    }
  }

</script>

<main class:loading={!container}>
  <div class="header">
    <button class="run-button" class:run={projectState === ProjectState.Stopped} on:click={runClicked}>
      {#if projectState === ProjectState.Stopped}
        <FontAwesomeIcon icon={faPlay} />
        <span>Run</span>
      {:else if projectState === ProjectState.Running}
        <FontAwesomeIcon icon={faStop} />
        <span>Stop</span>
      {:else}
        <div class="load-spinner"></div>
        <span>Loading</span>
      {/if}
    </button>
  </div>
  <div class="panels">
    <FileViewer bind:this={fileViewerComponent} {projectFiles} {openedFile} {container} />
    <CodeEditor fileChanged={handleFileChange} {openedFile} {container} />
    <div class="panels vertical">
      <Webview bind:this={webviewComponent} {container} />
      <MultiTab tabs={[ "Terminal", "Shell" ]}>
        <TabItem name="Terminal"><Terminal bind:this={terminalComponent} {container} /></TabItem>
        <TabItem name="Shell"><Shell {container} /></TabItem>
      </MultiTab>
    </div>
  </div>
</main>

<style>
  main {
    position: relative;
    height: 100%;
    font-size: 17px;
    color: white;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .header {
    height: 80px;
    background: #282c34;
    border-bottom: 1px solid var(--level-upper);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .run-button {
    border: none;
    outline: none;
    height: 3rem;
    width: 8rem;
    padding: 0px 16px;
    font-size: 16px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
    background: var(--level-upper);
    color: inherit;
    transition: .2s;
  }

  .run-button > span {
    height: 1rem;
  }
  
  .run-button.run {
    background: var(--color-blue);
    color: var(--color-blue-lighter);
  }

  .load-spinner {
    width: 1rem;
    height: 1rem;
    border-radius: 1000px;
    border: 2px solid var(--level-upper);
    border-bottom-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .panels {
    flex: 1;
    height: 100%;
    display: flex;
    gap: 1px;
    background: #3e4146;
    overflow: hidden;
  }

  .panels > :global(*) {
    flex: 1;
    flex-basis: 0;
  }

  .vertical {
    flex-direction: column;
  }
</style>
