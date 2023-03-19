import { join } from "./files.js";

let defaultConfig;

export async function getIDEConfig(container) {
  const text = await container.fs.readFile(join(".", "webeditor.config.js"), "utf8");
  if (!text) return;

  let ideConf = defaultConfig;
  
  try {
    ideConf = Object.assign({}, defaultConfig, JSON.parse(text));
  } catch {
    terminalComponent.write("\x1b[1m\x1b[31mAn error occoured during the parsing of 'webeditor.config.js'\x1b[0m\n");
  }

  if (typeof ideConf.run === "string")
    ideConf.run = ideConf.run.split(" ");

  return ideConf;
}

export function setDefaultConfig(config) {
  defaultConfig = config;
}