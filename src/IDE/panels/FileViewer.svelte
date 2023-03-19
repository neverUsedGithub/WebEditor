<script>
  export let container;
  export let projectFiles;
  export let openedFile;

  import { faPlus, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import PanelWrapper from "./PanelWrapper.svelte";
  import { transformFiles, join } from "../files.js";
  import FileList from "../components/FileList.svelte";
  import IconButton from "../components/IconButton.svelte";
  import { writable } from "svelte/store";
  import { getIDEConfig } from "../config.js";
  import { onMount } from "svelte";

  const addFileClick = () => {
    if (!isAddingFolder) isAddingFile = true;
  }
  
  const addFolderClick = () => {
    if (!isAddingFile) isAddingFolder = true;
  }
  
  let isAddingFile;
  let isAddingFolder;
  let hiddenFiles = writable(null);
  let selectedFile = writable(null);
  
  async function folderCreated(file) {
    await container.fs.mkdir(file);
    projectFiles.set({
      ...$projectFiles,
      [file]: {
        directory: {}
      }
    });
  }
  
  async function fileCreated(file) {
    await container.fs.writeFile(file, "");
    projectFiles.set({
      ...$projectFiles,
      [file]: {
        file: { contents: "" }
      }
    });
  }

  export async function setHiddenFiles() {
    const config = await getIDEConfig(container);
    hiddenFiles.set(config.hidden);
  }

  $: if (container) setHiddenFiles();
</script>

<PanelWrapper hasLoaded={container && $projectFiles} _class="wrapper-files">
  <div class="file-header">
    <span class="header-name">Files</span>
    <div class="button-group">
      <IconButton click={addFileClick}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
      <IconButton click={addFolderClick}>
        <FontAwesomeIcon icon={faFolderPlus} />
      </IconButton>
    </div>
  </div>
  <FileList
    files={projectFiles}
    {openedFile}
    {selectedFile}
    {container}
    {fileCreated}
    {folderCreated}
    {isAddingFile}
    {isAddingFolder}
    {hiddenFiles}
    focusLost={() => { isAddingFile = false; isAddingFolder = false; }}
    parentDir="."
  />
</PanelWrapper>

<style>
  :global(.wrapper-files) {
    max-width: 300px !important;
    overflow-y: scroll;
  }

  .file-header {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-name {
    font-weight: 500;
    font-size: 16px;
  }

  .button-group {
    display: flex;
    gap: 4px;
  }
</style>