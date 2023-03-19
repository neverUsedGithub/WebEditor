import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { svelte } from "@replit/codemirror-lang-svelte";
import { html } from "@codemirror/lang-html";
import { keymap } from '@codemirror/view';
import { expandAbbreviation } from '@emmetio/codemirror6-plugin';
import { markdown } from "@codemirror/lang-markdown"
import { css } from "@codemirror/lang-css";

export const languages = [
  {
    name: "javascript",
    extensions: [ ".js" ],
    mode: javascript()
  },
  {
    name: "jsx",
    extensions: [ ".jsx" ],
    mode: javascript({ jsx: true })
  },
  {
    name: "typescript",
    extensions: [ ".ts" ],
    mode: javascript({ typescript: true })
  },
  {
    name: "tsx",
    extensions: [ ".tsx" ],
    mode: javascript({ typescript: true, jsx: true })
  },
  {
    name: "json",
    extensions: [ ".json" ],
    mode: json()
  },
  {
    name: "svelte",
    extensions: [ ".svelte" ],
    mode: svelte()
  },
  {
    name: "html",
    extensions: [ ".html" ],
    mode: html(),
    codemirror_ext: [
      keymap.of([{
        key: "Tab",
        run: expandAbbreviation
      }])
    ]
  },
  {
    name: "markdown",
    extensions: [ ".md" ],
    mode: markdown()
  },
  {
    name: "css",
    extensions: [ ".css" ],
    mode: css()
  }
]

export const getLanguage = (file) => {
  for (const language of languages) {
    for (const ext of language.extensions) {
      if (file.endsWith(ext))
        return language;
    }
  }

  return null;
}