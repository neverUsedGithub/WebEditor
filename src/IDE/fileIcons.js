const fileIcons = [
  {
    icon: "icons/default.svg",
    priority: -1
  },
  {
    icon: "icons/javascript.svg",
    extensions: [ ".js", ".jsx" ]
  },
  {
    icon: "icons/typescript.svg",
    extensions: [ ".ts", ".tsx" ]
  },
  {
    icon: "icons/json.svg",
    extensions: [ ".json" ]
  },
  {
    icon: "icons/npm.svg",
    fileNames: [ "package.json", "package-lock.json" ],
    priority: 1
  },
  {
    icon: "icons/svelte.svg",
    extensions: [ ".svelte" ]
  },
  {
    icon: "icons/html.svg",
    extensions: [ ".html" ]
  },
  {
    icon: "icons/markdown.svg",
    extensions: [ ".md" ]
  },
  {
    icon: "icons/css.svg",
    extensions: [ ".css" ]
  }
]

export const folderIcons = [
  {
    icon: "icons/folder.svg",
    iconOpen: "icons/folder-open.svg",
    priority: -1
  },
  {
    icon: "icons/folder-node.svg",
    iconOpen: "icons/folder-node-open.svg",
    names: [ "node_modules" ]
  }
]

export function getFileIcon(name) {
  const foundMatches = [];
  
  for (const def of fileIcons) {
    let foundExt;

    if (!def.extensions && !def.fileNames) {
      foundMatches.push(def);
      continue;
    }

    if (def.extensions)
      for (const ext of def.extensions)
        if (name.endsWith(ext)) {
          foundMatches.push(def);
          foundExt = true;
          break;
        }
    
    if (!foundExt && def.fileNames)
      for (const fname of def.fileNames)
        if (name === fname) {
          foundMatches.push(def);
          break;
        }
  }

  return foundMatches.sort((a, b) => (a.priority || 0) < (b.priority || 0) ? 1 : -1)[0];
}

export function getFolderIcon(name) {
  const foundMatches = [];
  
  for (const def of folderIcons) {
    if (!def.names) {
      foundMatches.push(def);
      continue;
    }

    for (const fname of def.names) {
      if (fname === name) {
        foundMatches.push(def);
        break;
      }
    }
  }

  return foundMatches.sort((a, b) => (a.priority || 0) < (b.priority || 0) ? 1 : -1)[0];
}