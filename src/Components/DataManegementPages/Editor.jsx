import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ content, setContent, handleOnSave }) => {
  return (
    <div className=" min-h-[90vh]  rounded-xl mt-10">
      <div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="h-96  mb-20"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              ["link"],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              ["blockquote", "code-block"],
              ["clean"], // "Clean" button to remove formatting
            ],
          }}
          formats={[
            "header",
            "font",
            "list",
            "align",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "link",
            "image",
            "script",
            "indent",
            "blockquote",
            "code-block",
            "clean",
          ]}
        />
      </div>
      <div className="flex justify-end items-center gap-3">
        <button
          onClick={() => setContent("")} // Clears the editor content
          className="border border-[#EF4A00] text-[#EF4A00] hover:border-[#bc4812] transition delay-150 duration-100 py-3 px-8 rounded-xl"
        >
          Cancel
        </button>
        <button
          onClick={handleOnSave}
          className="bg-secondary-color hover:bg-[#f1ae31] transition delay-150 duration-100 py-3 px-8 rounded-xl text-white"
        >
          Save Change
        </button>
      </div>
    </div>
  );
};

export default Editor;
