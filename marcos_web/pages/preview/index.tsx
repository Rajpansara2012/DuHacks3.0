import React, { useEffect, useState } from "react";
import Button from "@/components/codeEditor/Button";
import Editor from "@/components/codeEditor/Editor";

import Draggable from "react-draggable";
import Link from "next/link";
import MyModal from "@/components/MyModal";
import { useRouter } from "next/navigation";
import JSZip from "jszip";

interface Code {
  _id: string;
  html: string;
  css: string;
  js: string;
}
const index = () => {
  // const[codes, setCodes] = useState()
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [show, setShow] = useState("hidden");
  const [openModal, setOpenModal] = useState(false);
  const [openedEditor, setOpenedEditor] = useState("html");
  const [allComps, setAllComps] = useState<Code[]>([]);

  const onTabClick = (editorName: any) => {
    setOpenedEditor(editorName);
  };
  const router = useRouter();

  const [codes, setCodes] = useState([]);
  useEffect(() => {
    const c: any = JSON.parse(localStorage.getItem("codes")!);
    console.log(c);
    setCodes(c);
  }, []);

  useEffect(() => {
    let newHtml = "";
    let newCss = "";
    let newJs = "";
    codes.forEach((code: any, index: any) => {
      let id = code._id;

      id = id
        .split("")
        .map((ch: any, index: any) => {
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

    setHtml(newHtml);
    setCss(newCss);
    setJs(newJs);
  }, [codes]);

  const handleExport = async () => {
    const zip = new JSZip();

    let tempHtml = html;
    tempHtml =
      '<head><link rel="stylesheet" type="text/css" href="styles.css"><script src="script.js"></script></head>' +
      tempHtml;
    zip.file("index.html", tempHtml);

    // CSS code
    zip.file("styles.css", css);

    // JS code
    zip.file("script.js", js);

    const blob = await zip.generateAsync({ type: "blob" });

    // Create a link to download the blob
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "code.zip";

    // Trigger a click on the link to start the download
    link.click();

    // Redirect back to the home page or any other desired page
    router.push("/");
  };
  return (
    <>
      <div className="App">
        <div>
          <div>
            <Draggable
              axis="both"
              handle=".handle"
              defaultPosition={{ x: 0, y: 0 }}
              // @ts-ignore
              position={null}
              grid={[25, 25]}
              scale={1}
            >
              <div
                className={`${show}  bg-black shadow-sm p-5 rounded-md  shadow-gray-200 absolute top-[50%] right-10 w-1/2`}
              >
                <div className="flex relative flex-col items-center text-center">
                  <div className="flex handle cursor-grab active:cursor-grabbing gap-x-1  text-gray-400 font-semibold text-2xl">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                  <div className="absolute right-0 flex gap-2">
                    <div
                      className="cursor-pointer px-6 py-1 border-2 border-gray-300 rounded-md"
                      onClick={() => {
                        setShow("hidden");
                      }}
                    >
                      Close
                    </div>
                    <div
                      className="cursor-pointer px-6 py-1 border-2 border-gray-300 rounded-md"
                      onClick={handleExport}
                    >
                      Export
                    </div>
                  </div>
                </div>
                <div className={` flex flex-col`}>
                  <div className="flex mb-5">
                    <Button
                      title="HTML"
                      onClick={() => {
                        onTabClick("html");
                      }}
                      //@ts-ignore
                      isActive={openedEditor === "html"}
                    />
                    <Button
                      title="CSS"
                      onClick={() => {
                        onTabClick("css");
                      }}
                      //@ts-ignore

                      isActive={openedEditor === "css"}
                    />
                    <Button
                      title="JavaScript"
                      onClick={() => {
                        onTabClick("js");
                      }}
                      //@ts-ignore

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
        <div
          onClick={() => setShow("visible")}
          className={
            show == "visible"
              ? "hidden"
              : "visible" +
                ` absolute bottom-0 right-10 px-6 py-1 border-2 border-b-0 border-gray-300 rounded-md rounded-b-none cursor-pointer`
          }
        >
          Code
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="fixed text-center bottom-10 px-4 py-2 rounded-md left-10 bg-green-500"
        >
          Add More
        </button>
      </div>
      {openModal && (
        <MyModal
          isModalOpen={openModal}
          closeModal={() => {
            setOpenModal(false);
          }}
          allComps={allComps}
          setCodes={setCodes}
          setAllComps={setAllComps}
          setIsModalOpen={setOpenModal}
        />
      )}
    </>
  );
};

export default index;
