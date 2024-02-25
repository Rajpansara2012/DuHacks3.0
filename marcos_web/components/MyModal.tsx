import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

interface Code {
  _id: string;
  html: string;
  css: string;
  js: string;
}

const MyModal = (props: any) => {
  const {
    isModalOpen,
    closeModal,
    setCodes,
    allComps,
    setAllComps,
    setIsModalOpen,
  } = props;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCodeIndex, setSelectedCodeIndex] = useState<number | null>(
    null
  );
  const customModalStyles = {
    content: {
      backgroundColor: "black",
      color: "white",
      padding: "20px",
      maxWidth: "80%", // Adjust the maximum width as needed
      margin: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the transparency if needed
    },
  };
  const fetchComponentsByCategory = (index: number) => {
    // Fetch components based on the selected category
    console.log(categories[index]);
    const data = { catagory: categories[index].toLowerCase() };
    axios
      .post("api/crud/read_component", data)
      .then(function (response: any) {
        const { components } = response.data;
        console.log(components);
        setAllComps(components);
        setSelectedCategory(categories[index]);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  const openModal = (index: number) => {
    setSelectedCodeIndex(index);
    fetchComponentsByCategory(index);
    setIsModalOpen(true);
  };
  const categories = ["Navbar", "Footer", "Card", "Slider"];
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <div className="flex flex-wrap justify-center">
          {categories.map((category: any, index: any) => (
            <div
              key={index}
              className="px-6 py-1 border-2 ml-2 border-blue-500 text-blue-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={() => openModal(index)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="absolute right-5 top-0 flex justify-center mt-5">
          <button
            onClick={closeModal}
            className="px-6 py-1 border-2 ml-2 border-red-500 text-red-500 rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
        {selectedCategory && (
          <>
            <div className="text-white mb-3">
              Components under selected category:
            </div>
            {allComps.map((code: any, index: any) => (
              <div key={index} className="px-5">
                <div>
                  <iframe
                    className="w-[70vw] h-[70vh]"
                    srcDoc={`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${code.css}</style></head><body>${code.html}</body><script>${code.js}</script></html>`}
                  ></iframe>
                </div>
                <div className="mb-5 flex justify-center">
                  <button
                    onClick={() => {
                      toast.success("Component added successfully");
                      setCodes((prevCode: any) => {
                        const newCode: Code = {
                          _id: code._id,
                          html: code.html,
                          css: code.css,
                          js: code.js,
                        };
                        localStorage.setItem(
                          "codes",
                          JSON.stringify([...prevCode, newCode])
                        );
                        return [...prevCode, newCode];
                      });
                    }}
                    className="px-6 py-1 border-2 ml-2 border-green-500 text-green-500 rounded-md cursor-pointer"
                  >
                    Choose
                  </button>
                </div>
                <hr className="bg-white" />
              </div>
            ))}
          </>
        )}
      </Modal>
    </div>
  );
};

export default MyModal;
