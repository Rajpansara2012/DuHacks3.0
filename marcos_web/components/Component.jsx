import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Editor from "./codeEditor/Editor";
import Button from "./codeEditor/Button";
import Draggable from "react-draggable";
import toast, { Toaster } from "react-hot-toast";

const Component = (props) => {
  const { components, changeComponents } = props;

  // const [code, setCode] = useState(components);

  const [indexComponent, setIndexComponent] = useState(-1);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [openedEditor, setOpenedEditor] = useState("html");
  const [show, setShow] = useState("hidden");

  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
  };

  const setHtmlCode = (value) => {
    setHtml((prev) => {
      props.changeCodes(value, css, js, indexComponent);
      return value;
    });
  };

  const setCssCode = (value) => {
    setCss((prev) => {
      props.changeCodes(html, value, js, indexComponent);
      return value;
    });
  };

  const setJsCode = (value) => {
    setJs((prev) => {
      props.changeCodes(html, css, value, indexComponent);
      return value;
    });
  };
  const moveElementUp = (index) => {
    if (index > 0) {
      const updatedComponents = [...components];
      [updatedComponents[index - 1], updatedComponents[index]] = [
        updatedComponents[index],
        updatedComponents[index - 1],
      ];
      changeComponents(updatedComponents);
    }
    toast("Component moved up", {
      icon: "⬆️",
    });
  };

  const moveElementDown = (index) => {
    if (index < components.length - 1) {
      const updatedComponents = [...components];
      [updatedComponents[index], updatedComponents[index + 1]] = [
        updatedComponents[index + 1],
        updatedComponents[index],
      ];
      changeComponents(updatedComponents);
    }
    toast("Component moved down", {
      icon: "⬇️",
    });
  };

  const deleteElement = (index) => {
    const updatedComponents = [...components];
    updatedComponents.splice(index, 1);
    changeComponents(updatedComponents);
    toast.success("Component deleted successfully");
  };

  return (
    <div className="container mx-auto px-16 my-10">
      <Toaster />
      {/* <div className="grid grid-cols-1 mx-10 md:grid-cols-2 gap-10 justify-center items-center"> */}
      <div>
        {components.map((code, index) => (
          <div key={index} className="my-5 p-5">
            <div className="cursor-pointer flex justify-center items-center">
              <iframe
                className="object-contain w-[88vw] h-[88vh]"
                srcDoc={`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${code.css}</style></head><body>${code.html}</body>
              <script>${code.js}</script></html>`}
                frameborder="0"
              ></iframe>
            </div>
            <div className="flex justify-between items-center my-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => moveElementUp(index)}
                  className="px-6 py-1 border-2 ml-2 border-blue-500 text-blue-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                >
                  Move Up
                </button>
                <button
                  onClick={() => moveElementDown(index)}
                  className="px-6 py-1 border-2 ml-2 border-blue-500 text-blue-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                >
                  Move Down
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setHtml(code.html);
                    setCss(code.css);
                    setJs(code.js);
                    setShow("visible");
                    setIndexComponent(index);
                  }}
                  className="px-6 py-1 border-2 ml-2 border-green-500 text-green-500 rounded-md cursor-pointer hover:bg-green-500 hover:text-white"
                >
                  Code
                </button>
                <button
                  onClick={() => deleteElement(index)}
                  className="px-6 py-1 border-2 ml-2 border-red-500 text-red-500 rounded-md cursor-pointer hover:bg-red-500 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
            <hr className="bg-white" />
          </div>
        ))}

        {components.length > 0 && (
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
                      <Editor value={html} setEditorState={setHtmlCode} />
                    ) : openedEditor === "css" ? (
                      <Editor value={css} setEditorState={setCssCode} />
                    ) : (
                      <Editor value={js} setEditorState={setJsCode} />
                    )}
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
        )}
      </div>
    </div>
  );
};

export default Component;
