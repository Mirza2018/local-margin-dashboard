import React, { useState } from "react";
import Editor from "../../../../Components/DataManegementPages/Editor";
import { usePrivacyTermsMutation } from "../../../../redux/api/settingsApi";
import { toast } from "sonner";

const QuickStartGuide = () => {
  const [staticContent] = usePrivacyTermsMutation();
  const [content, setContent] = useState("");
  const handleOnSave = async () => {
    console.log(content);
    const toastId = toast.loading("Quick start is Posting");
    const data = {
      type: "quick-start",
      content: content,
    };
    try {
      const res = await staticContent(data).unwrap();
      console.log(res);
      toast.success("privacy policy Updated Successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during posting Privacy policy",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  return (
    <div>
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Quick Start Guide
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

export default QuickStartGuide;
