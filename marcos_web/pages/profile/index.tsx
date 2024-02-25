import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const UploadFiles = () => {
  const [htmlFile, setHtmlFile] = useState(null);
  const [cssFile, setCssFile] = useState(null);
  const [jsFile, setJsFile] = useState(null);
  const [category, setCategory] = useState("");
  const { data: session } = useSession();

  const handleFileChange = (event: any, setFile: any) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleUpload = async () => {
    if (!htmlFile) {
      alert("Please select the HTML file.");
      return;
    }

    const readAsText = (file: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
    };

    try {
      const htmlContent = await readAsText(htmlFile);

      if (typeof htmlContent !== "string") {
        throw new Error("HTML content is not a string.");
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const bodyContent = doc.body.innerHTML;

      const cssContent = cssFile ? await readAsText(cssFile) : "";

      if (typeof cssContent !== "string") {
        throw new Error("CSS content is not a string.");
      }

      let cleanedCssContent = cssContent.replace(
        /(body|html|\*)\s*{[^}]*}/g,
        ""
      );
      cleanedCssContent =
        `a {
        pointer-event: none;
      }` + cleanedCssContent;

      const jsContent = jsFile ? await readAsText(jsFile) : "";

      const data = {
        htmlContent: bodyContent,
        cssContent: cleanedCssContent,
        jsContent,
        user: session?.user.id,
        category,
      };
      console.log(data);

      try {
        axios
          .post("api/crud/create_component", data)
          .then(function (response) {
            console.log(response.data.message);
            if (response.data.message) toast.success(response.data.message);
            else toast.error(response.data.error);

            // console.log("Upload successful:", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error: any) {
        console.error("Error fetching test details:", error.message);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <Toaster />
      {!session && <h1>Please login</h1>}
      {session && (
        <div>
          <div className="text-center">
            <div className="text-3xl font-bold">Profile</div>
            <img
              src={session.user.image || "/default-profile-image.jpg"} // Replace with the actual image URL or a default image
              alt="User Profile"
              className="rounded-full h-48 w-48 mx-auto mb-2"
            />
            <h2 className="text-xl font-bold mb-2">{session.user.name}</h2>
            <p>{session.user.email}</p>
          </div>

          <div className="flex flex-col justify-center items-center mt-16">
            <p className="my-6 text-2xl">Contribute to our Website</p>
            <div className="flex space-x-4 mb-4">
              <label htmlFor="html">HTML File</label>
              <input
                name="html"
                type="file"
                accept=".html"
                onChange={(e) => handleFileChange(e, setHtmlFile)}
              />

              <label htmlFor="css">CSS File</label>

              <input
                name="css"
                type="file"
                accept=".css"
                onChange={(e) => handleFileChange(e, setCssFile)}
              />
              <label htmlFor="js">JS File</label>

              <input
                name="js"
                type="file"
                accept=".js"
                onChange={(e) => handleFileChange(e, setJsFile)}
              />
              <div className="mb-4 text-black">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-2"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="navbar">Navbar</option>
                  <option value="footer">Footer</option>
                  <option value="card">Card</option>
                  <option value="slider">Slider</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Upload Files
            </button>
            <a
              href="/"
              className="bg-gray-500 my-5 text-white py-2 px-4 rounded"
            >
              Back
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFiles;
