import React, { useState } from "react";
import Editor from "../../../../Components/DataManegementPages/Editor";
import { toast } from "sonner";
import { useAiInputMutation } from "../../../../redux/api/settingsApi";
import { Form, Input } from "antd";
import { useGetProfileQuery } from "../../../../redux/api/profileApi";

const AiInput = () => {
  const [staticContent] = useAiInputMutation();
  const { data, isLoading } = useGetProfileQuery();
  const restaurentName = data?.data[0]?.myRestaurant?.restaurantName;
  const [form] = Form.useForm();
  const date = new Date().toDateString();

  console.log(data?.data[0]?.myRestaurant?.restaurantName);

  const handleOnSave = async (value) => {
    const toastId = toast.loading("Ai Input is Posting");
    const data = {
      prompt: `Today date is ${date}, and My restaurent name is ${restaurentName} ,  ${value.aiInput}`,
    };

    // console.log(data);

    try {
      const res = await staticContent(data).unwrap();
      console.log(res);
      form.resetFields();
      toast.success("Ai Input is post Successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during posting Ai Input",
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
          <p className="text-3xl text-primary-color font-semibold">AI Input</p>
        </div>
      </div>
      {/* <Editor
        content={content}
        setContent={setContent}
        handleOnSave={handleOnSave}
      /> */}
      <div className=" min-h-[90vh]  rounded-xl mt-10">
        <Form form={form} onFinish={handleOnSave} layout="vertical">
          <Form.Item
            name="aiInput"
            label="Ai Input"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Input you ai input" rows={8} />
          </Form.Item>

          <div className="flex justify-end items-center gap-3">
            {/* <button
         
              className="border border-[#EF4A00] text-[#EF4A00] hover:border-[#bc4812] transition delay-150 duration-100 py-3 px-8 rounded-xl"
            >
              Cancel
            </button> */}
            <button className="bg-secondary-color hover:bg-[#f1ae31] transition delay-150 duration-100 py-3 px-8 rounded-xl text-white">
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AiInput;
