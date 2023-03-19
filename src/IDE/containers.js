import { WebContainer } from "@webcontainer/api";

export async function createContainer(projectFiles) {
  const webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(projectFiles);
  return webcontainerInstance;
}