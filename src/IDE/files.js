export function transformFiles(files) {
  const transformed = {};

  for (const file of files) {
    if (file.isDirectory())
      transformed[file.name] = {
        directory: {}
      }
    else
      transformed[file.name] = {
        file: {}
      }
  }

  return transformed;
}

export function join(...paths) {
  return paths.map(x => x.split("/").filter(Boolean)).flat(100).join("/")
}