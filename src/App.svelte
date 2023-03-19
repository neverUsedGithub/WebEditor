<script>
  import IDE from "./IDE/IDE.svelte";
  import templates, { defaultWebeditorConfig } from "./templates.js";

  let projectFiles;

  function setPickedTemplate(template) {
    projectFiles = {
      ...template.files,
      "webeditor.config.js": {
        file: {
          contents: JSON.stringify(
            Object.assign({}, defaultWebeditorConfig, template.config || {})
          , null, 2)
        }
      }
    }
  }
</script>

{#if !projectFiles}
  <main>
    <h1>Create a Project</h1>
    <div class="templates">
      {#each Object.values(templates) as template}
        <button class="template" on:click={() => setPickedTemplate(template)}>
          <img src={template.icon} class="icon" alt="icon">
          <div class="right">
            <div class="name">{template.name}</div>
            <div class="description">{template.description}</div>
          </div>
        </button>
      {/each}
    </div>
  </main>
{:else}
  <IDE files={projectFiles} defaultConfig={defaultWebeditorConfig} />
{/if}

<style>
  :global(html, body) {
    margin: 0;
    height: 100vh;
    background: #282c34;
  }

  :global(*) {
    box-sizing: border-box;
  }
  
  :root {
    font-family: IBM Plex Sans;
    --level-upper: rgba(200, 200, 220, 0.1);
    --level-upperer: rgba(200, 200, 220, 0.2);
    --level-upperest: rgba(200, 200, 220, 0.4);
    --level-lower: rgba(0, 0, 10, 0.3);
    --color-blue: #548cd7;
    --color-blue-lighter: ##cddcef;
  }

  :global(::-webkit-scrollbar) {
    background: transparent;
    width: 10px;
  }

  :global(::-webkit-scrollbar-thumb) {
    background: var(--level-upper);
    cursor: default;
  }
  
  main {
    max-width: 80%;
    margin: 0 auto;
    color: white;
    overflow: hidden;
  }

  h1 {
    text-align: center;
  }

  .templates {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }

  .template {
    flex: 1;
    gap: 10px;
    display: flex;
    background: var(--level-upper);
    padding: 16px;
    border-radius: 16px;
    align-items: center;
    cursor: pointer;
    user-select: none;
    width: 50%;
    margin: 0 auto;
    transition: .2s;
    border: none;
    outline: none;
    text-align: left;
    color: inherit;
  }

  .template:hover {
    background: var(--level-upperer);
  }

  .icon {
    height: 64px;
    width: auto;
    padding: 8px;
    background: var(--level-upper);
    border-radius: inherit;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .name {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .description {
    color: var(--level-upperest);
  }
</style>