import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { abcdef, abcdefInit } from "@uiw/codemirror-theme-abcdef";

import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

const themeArray = ["abcdef", "abcdefInit"];

const Editor = ({ value, setEditorState }) => {
  const [theme, setTheme] = useState("abcdef");

  const handleChange = (value) => {
    // console.log(value);
    setEditorState(value);
  };

  return (
    <div className="editor-container">
      
      <CodeMirror
        onChange={handleChange}
        value={value}
        height="200px"
        theme={abcdefInit({
          settings: {
            caret: "#c6c6c6",
            fontFamily: "monospace",
          },
        })}
      />
    </div>
  );
};
export default Editor;
