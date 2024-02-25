import React, { useEffect, useState } from "react";
import Button from "./codeEditor/Button";
import Editor from "./codeEditor/Editor";
import Draggable from "react-draggable";
function Preview() {
  const c = localStorage.getItem("codes");
  const codes = JSON.parse(c);
  console.log(codes);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [show, setShow] = useState("visible");

  const [openedEditor, setOpenedEditor] = useState("html");

  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
  };

  useEffect(() => {
    let newHtml = "";
    let newCss = "";
    let newJs = "";
    codes.forEach((code, index) => {
      let id = code._id;

      id = id
        .split("")
        .map((ch, index) => {
          if (ch >= "0" && ch <= "9") {
            ch = String.fromCharCode("a".charCodeAt(0) + parseInt(ch));
          }
          return ch;
        })
        .join("");

      newHtml += `<div class=\"${id}\">${code.html}</div>`;
      newCss += `.${id} { ${code.css} }`;
      newJs += code.js;
    });

    newHtml += "<body>";
    setHtml(newHtml);
    setCss(newCss);
    setJs(newJs);
  }, []);

  return (
    <>
      <div className="App">
        <div>
          <div>
            <Draggable
              axis="both"
              handle=".handle"
              defaultPosition={{ x: 0, y: 0 }}
              position={null}
              grid={[25, 25]}
              scale={1}
            >
              <div
                className={`${show} handle bg-black shadow-sm p-5 rounded-md  shadow-gray-200 absolute top-[50%] right-10 w-1/2`}
              >
                <div className="flex cursor-grab active:cursor-grabbing  flex-col items-center text-center">
                  <div className="flex  gap-x-1  text-gray-400 font-semibold text-2xl">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                  <div
                    className="absolute left-[90%]"
                    onClick={() => {
                      setShow("hidden");
                    }}
                  >
                    Close
                  </div>
                </div>
                <div className={` flex flex-col`}>
                  <div className="flex mb-5">
                    <Button
                      title="HTML"
                      onClick={() => {
                        onTabClick("html");
                      }}
                      isActive={openedEditor === "html"}
                    />
                    <Button
                      title="CSS"
                      onClick={() => {
                        onTabClick("css");
                      }}
                      isActive={openedEditor === "css"}
                    />
                    <Button
                      title="JavaScript"
                      onClick={() => {
                        onTabClick("js");
                      }}
                      isActive={openedEditor === "js"}
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
                </div>
              </div>
            </Draggable>
          </div>
        </div>
        <div className="tab-button-container">
          <div>
            <iframe
              className="w-[100vw] h-[100vh]"
              srcDoc={`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style></head><body>${html}</body><script>${js}</script></html>`}
              title="output"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Preview;
