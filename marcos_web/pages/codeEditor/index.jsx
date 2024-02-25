import Button from "../../components/codeEditor/Button";
import Editor from "../../components/codeEditor/Editor";
import React, { useState, useEffect, useRouter, useCallback } from "react";

function App() {
  const [openedEditor, setOpenedEditor] = useState("html");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState(` `);

  const lfun = useCallback(async () => {
    const myData = await JSON.parse(data);

    myData.map((code, index) => {
      setHtml((prev) => {
        var newHtml =
          prev +
          `<div class=${code.id}>
          ${code.html}
        </div>`;
        return newHtml;
      });

      setCss((prev) => {
        var newCss =
          prev +
          `.${code.id} {
          ${code.css}
        }`;
        return newCss;
      });

      setJs((prev) => {
        var newJs = prev + code.js;
        return newJs;
      });
    }, []);
    useEffect(() => {
      lfun();

      setSrcDoc(
        `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `
      );
    });
    setSrcDoc(
      `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `
    );
  }, [html, css, js]);

  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
  };

  return (
    <>
      <div className="App">
        <p>Welcome to the editor!</p>
        <div className="tab-button-container">
          <Button
            title="HTML"
            onClick={() => {
              onTabClick("html");
            }}
          />
          <Button
            title="CSS"
            onClick={() => {
              onTabClick("css");
            }}
          />
          <Button
            title="JavaScript"
            onClick={() => {
              onTabClick("js");
            }}
          />
        </div>

        <div className="editor-container">
          {openedEditor === "html" ? (
            <Editor value={html} setEditorState={setHtml} />
          ) : openedEditor === "css" ? (
            <Editor value={css} setEditorState={setCss} />
          ) : (
            <Editor value={js} setEditorState={setJs} />
          )}
        </div>

        <div>
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </>
  );
}
export default App;
