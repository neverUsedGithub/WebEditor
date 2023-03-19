export default {
  "node-project": {
    name: "NodeJS",
    description: "A basic NodeJS program.",
    icon: "templates/node.svg",
    files: {
      "index.js": {
        file: {
          contents: `console.log("Hello, World!")`
        }
      },
      "package.json": {
        file: {
          contents: JSON.stringify({
            "name": "node-project",
            "version": "0.0.0",
            "scripts": {
              "start": "node index.js"
            },
            "dependencies": {}
          }, null, 2).trim()
        }
      }
    }
  },
  "express-project": {
    name: "ExpressJS",
    description: "A webserver using Express.",
    icon: "templates/express.svg",
    files: {
      "index.js": {
        file: {
          contents: `const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Listening on :3000");
});`
        }
      },
      "package.json": {
        file: {
          contents: JSON.stringify({
            "name": "express-project",
            "version": "0.0.0",
            "scripts": {
              "start": "node index.js"
            },
            "dependencies": {
              "express": "latest"
            }
          }, null, 2).trim()
        }
      }
    }
  },
  "react-project": {
    name: "React",
    description: "A website using React and vite.",
    icon: "templates/react.svg",
    files: {
      "index.html": {
        file: {
          contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React Project</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="main.jsx" type="module"></script>
  </body>
</html>`
        }
      },
      "main.jsx": {
        file: {
          contents: `import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);`
        }
      },
      "App.jsx": {
        file: {
          contents: `import React from "react";

function App() {
  return (
    <h1>Hello, World!</h1>
  );
}

export default App;`
        }
      },
      "package.json": {
        file: {
          contents: JSON.stringify({
            "name": "react-project",
            "version": "0.0.0",
            "scripts": {
              "start": "vite --host"
            },
            "type": "module",
            "dependencies": {
              "react-dom": "latest",
              "react": "latest",
              "vite": "latest"
            }
          }, null, 2).trim()
        }
      }
    }
  },
  "svelte-project": {
    name: "Svelte",
    description: "A website using Svelte and vite.",
    icon: "templates/svelte.svg",
    files: {
      "index.html": {
        file: {
          contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Svelte Project</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="main.js" type="module"></script>
  </body>
</html>`
        }
      },
      "main.js": {
        file: {
          contents: `import App from "./App.svelte";

const app = new App({
  target: document.getElementById("root")
});

export default app;`
        }
      },
      "App.svelte": {
        file: {
          contents: `<h1>Hello, World!</h1>`
        }
      },
      "vite.config.js": {
        file: {
          contents: `import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [ svelte() ]
});`
        }
      },
      "package.json": {
        file: {
          contents: JSON.stringify({
            "name": "svelte-project",
            "version": "0.0.0",
            "scripts": {
              "start": "vite --host"
            },
            "type": "module",
            "dependencies": {
              "svelte": "latest",
              "vite": "latest",
              "@sveltejs/vite-plugin-svelte": "latest"
            }
          }, null, 2).trim()
        }
      }
    }
  },
  "static-website": {
    name: "HTML & CSS & JS",
    description: "A static HTML, CSS & JS website.",
    icon: "icons/html.svg",
    config: {
      hidden: [ "__host__server.js", "package.json", "package-lock.json", "node_modules" ]
    },
    files: {
      "index.html": {
        file: {
          contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML Project</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Hello, WebEditor!</h1>
  </body>
</html>`
        }
      },
      "style.css": {
        file: {
          contents: `h1 {
  color: red;
}`
        }
      },
      "index.js": {
        file: {
          contents: `console.log("Hello, World!");`
        }
      },
      "__host__server.js": {
        file: {
          contents: `const express = require("express");
const app = express();

app.use(express.static(__dirname));

app.listen(300);`
        }
      },
      "package.json": {
        file: {
          contents: JSON.stringify({
            "name": "html-project",
            "version": "0.0.0",
            "scripts": {
              "start": "node __host__server.js"
            },
            "dependencies": {
              "express": "latest"
            }
          }, null, 2).trim()
        }
      }
    }
  }
}

export const defaultWebeditorConfig = {
  "run": "npm run start",
  "packager": {
    "autoInstall": true
  },
  "hidden": []
}