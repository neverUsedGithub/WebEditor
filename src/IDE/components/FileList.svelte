<script>
  export let files;
  export let selectedFile;
  export let openedFile;
  export let fileCreated;
  export let folderCreated;
  export let isAddingFile;
  export let isAddingFolder;
  export let focusLost;
  export let parentDir;
  export let container;
  export let hiddenFiles;

  import { getFileIcon, getFolderIcon } from "../fileIcons.js";
  import { join, transformFiles } from "../files.js";
  import { writable } from "svelte/store";
  import { minimatch } from "minimatch";

  let expandedFolders = [];
  let fileInputValue;
  let folderInputValue;
  let showableFiles;
  
  const inputLoaded = el => el.focus();
  const hideInput = () => { focusLost(); fileInputValue = ""; };

  /*
  async function fileClicked__(file) {
    if ($projectFiles[file].file) return selectedFile.set(file)

    projectFiles.set({
      ...$projectFiles,
      [file]: {
        directory: transformFiles(await container.fs.readdir(join(parentDir, file)))
      }
    });
    expandedFolders.push(file)
  }*/
  
  async function fileClicked(file) {
    selectedFile.set(join(parentDir, file))
    
    if ($files[file].file)
      return openedFile.set(join(parentDir, file))

    if (!expandedFolders.includes(file)) {
      files.set({
        ...$files,
        [file]: {
          directory: writable(transformFiles(
            await container.fs.readdir(join(parentDir, file), { withFileTypes: true })
          ))
        }
      });
      expandedFolders = [ ...expandedFolders, file ];
    } else {
      expandedFolders = expandedFolders.filter(x => x !== file);
    }
  }
  
  async function inputPressed(e, isFolder) {
    if (e.key !== "Enter") return;

    if (!isFolder) fileCreated(fileInputValue);
    else folderCreated(folderInputValue);
    
    fileInputValue = "";
    folderInputValue = "";
    hideInput();
  }

  function isNotHidden(file) {
    if (!$hiddenFiles) return true;
    
    for (const toHide of $hiddenFiles) {
      if (minimatch(join(parentDir, file), toHide))
        return false;
    }
    return true;
  }

  $: {
    $hiddenFiles, $files;
    console.log("setting showable")
    showableFiles = Object.keys($files).filter(isNotHidden);
    console.log(showableFiles)
  }
</script>

<div class="files">
  {#each showableFiles as file}
    <button
      class="file"
      on:click={() => fileClicked(file)}
      class:selected={$selectedFile === join(parentDir, file)}
    >
      <img src={$files[file].file ? getFileIcon(file).icon : (expandedFolders.includes(file) ? getFolderIcon(file).iconOpen : getFolderIcon(file).icon)} alt={"icon"} class="file-icon">
      <span class="name">{file}</span>
    </button>
    {#if expandedFolders.includes(file)}
      <div class="folder-content">
        <svelte:self
          files={$files[file].directory}
          {selectedFile}
          {openedFile}
          {container}
          {fileCreated}
          {hiddenFiles}
          isAddingFile={false}
          parentDir={join(parentDir, file)}
        />
      </div>
    {/if}
  {/each}
  {#if isAddingFile}
    <div class="input-container">
      <img src={getFileIcon(fileInputValue || "").icon} alt={"icon"} class="file-icon">
      <input
        type="text"
        class="file-input"
        bind:value={fileInputValue}
        on:blur={hideInput}
        on:keypress={(e) => inputPressed(e, false)}
        use:inputLoaded
        spellcheck="false"
      >
    </div>
  {/if}
  {#if isAddingFolder}
    <div class="input-container">
      <img src={getFolderIcon(folderInputValue || "").icon} alt={"icon"} class="file-icon">
      <input
        type="text"
        class="file-input"
        bind:value={folderInputValue}
        on:blur={hideInput}
        on:keypress={(e) => inputPressed(e, true)}
        use:inputLoaded
        spellcheck="false"
      >
    </div>
  {/if}
</div>

<style>
  
  .files {
    overflow: hidden;
    padding: 8px;
    display: flex;
    flex-direction: column;
  }

  .file-icon {
    width: 25px;
    height: 25px;
  }

  .file-input {
    color: inherit;
    font-family: Source Code Pro;
    border: none;
    outline: none;
    background: transparent;
    flex: 1;
    padding: 0;
    height: 25px;
    font-size: 12px;
  }

  .input-container {
    display: flex;
    outline: 1px solid var(--color-blue);
    border-radius: 8px;
    min-height: 25px;
    padding: 4px 8px;
    background: var(--level-upper);
    gap: 5px;
    align-items: center;
  }

  .file {
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 4px 8px;
    border-radius: 8px;
    transition: .2s;
    color: white;
    background: transparent;
    text-align: left;
    font-family: Source Code Pro;
    font-size: 12px;
    width: 100%;
    cursor: pointer;
    user-select: none;
    outline: none;
    border: none;
    height: 35px;
  }

  .file .name {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .file:hover {
    background: var(--level-upper);
  }

  .file.selected {
    background: var(--level-upperer);
  }

  .folder-content {
    padding-left: 12px;
  }
  .folder-content > :global(.files) {
    padding: 0;
  }
</style>