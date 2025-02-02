import React, { useState } from "react";
import Editor from "../../../../Components/DataManegementPages/Editor";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  const handleOnSave = () => {
    console.log(content);
  };

  return (
    <div>
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Privacy Policy
          </p>
        </div>
      </div>
      <Editor
        content={content}
        setContent={setContent}
        handleOnSave={handleOnSave}
      />
    </div>
  );
};

export default PrivacyPolicy;
