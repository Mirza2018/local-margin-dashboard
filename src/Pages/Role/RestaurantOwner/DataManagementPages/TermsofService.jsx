import React, { useState } from "react";
import Editor from "../../../../Components/DataManegementPages/Editor";
import { toast } from "sonner";
import { usePrivacyTermsMutation } from "../../../../redux/api/settingsApi";

const TermsofService = () => {
  const [staticContent] = usePrivacyTermsMutation();
  const [content, setContent] = useState("");
  const handleOnSave = async () => {
    console.log(content);
    const toastId = toast.loading("Terms & conditions is Posting");
    const data = {
      type: "terms-and-conditions",
      content: content,
    };
    try {
      const res = await staticContent(data).unwrap();
      console.log(res);
      toast.success("Terms & conditions Updated Successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during posting Terms & conditions",
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
            Terms of Service
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

export default TermsofService;
