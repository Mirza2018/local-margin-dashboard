/* eslint-disable react/no-unescaped-entities */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Collapse, ConfigProvider } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  useGetFaqQuery,
  usePrivacyTermsMutation,
} from "../../../redux/api/settingsApi";

const { Panel } = Collapse;

const FAQ = () => {
  const [staticContent] = usePrivacyTermsMutation();
  const { data: faqData, isFetching } = useGetFaqQuery();
  const length = faqData?.data?.faq?.length;
  console.log(faqData?.data?.faq, isFetching);

  const editor = useRef(null);
  // State to hold the FAQ list and active panel key
  const [faqList, setFaqList] = useState([{ title: "", content: "" }]); // Initial Q/A pair
  const [activeKey, setActiveKey] = useState([0]); // Track the active panel

  // Function to save all Q/A pairs

  const handleOnSave = async () => {
    const toastId = toast.loading("Faq is Posting");
    const data = {
      type: "faq",
      faq: faqList,
    };

    console.log(data);

    try {
      const res = await staticContent(data).unwrap();
      console.log(res);
      toast.success("Faq Updated Successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during posting Faq",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  // Function to add a new Q/A pair
  const handleAddQus = () => {
    const newFaqList = [...faqList, { title: "", content: "" }]; // Add new Q/A pair
    setFaqList(newFaqList);
    setActiveKey([newFaqList.length - 1]); // Set the new panel as active
  };

  // Function to update question text
  const handleQuestionChange = (index, value) => {
    const newFaqList = [...faqList];
    newFaqList[index].title = value;
    setFaqList(newFaqList);
  };

  // Function to update answer text
  const handleAnswerChange = (index, value) => {
    const newFaqList = [...faqList];
    newFaqList[index].content = value;
    setFaqList(newFaqList);
  };

  // Function to remove a Q/A pair
  const handleRemoveQus = (index) => {
    if (faqList.length > 1) {
      const newFaqList = faqList.filter((_, i) => i !== index); // Remove the item at the given index
      setFaqList(newFaqList);
      setActiveKey([Math.max(0, index - 1)]); // Set the previous panel as active or default to the first one
    }
  };

  return (
    <div className="min-h-screen rounded-lg">
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">FAQ</p>
        </div>
      </div>
      <div className="p-2 rounded flex flex-col gap-5 w-full  mx-auto">
        {/* Q/A Portions */}
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                colorTextHeading: "#222222",
                // colorBorder: "#FEEBEA",
                colorText: "#222222",
                borderRadiusLG: 0,
                headerPadding: "12px 20px",
                contentBg: "rgb(255,255,255)",
                headerBg: "rgb(255,255,255)",
              },
            },
          }}
        >
          <Collapse
            accordion
            activeKey={activeKey}
            onChange={setActiveKey}
            className="bg-primary-color"
          >
            {faqList.map((faq, index) => (
              <Panel
                header={`Question ${length + index + 1}`}
                key={index}
                className="!text-base-color bg-primary-color flex flex-col gap-1"
                extra={
                  faqList.length > 1 && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveQus( index)}
                    >
                      Remove
                    </button>
                  )
                }
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <p className="text-base-color text-xl font-medium">{`Question ${
                      length + index + 1
                    }`}</p>
                    <Input
                      placeholder="Type your question"
                      value={faq.title}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      className="h-10  border !border-secondary-color !text-base-color placeholder:text-gray-600"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-base-color text-xl font-medium">
                      Answer
                    </p>
                    <JoditEditor
                      ref={editor}
                      value={faq.content}
                      config={{ height: 300, theme: "light", readonly: false }}
                      onBlur={(newContent) =>
                        handleAnswerChange(index, newContent)
                      }
                    />
                  </div>
                </div>
              </Panel>
            ))}
          </Collapse>
        </ConfigProvider>
        <div>
          <Button
            block
            onClick={handleAddQus}
            style={{
              padding: "1px",
              fontSize: "24px",
              fontWeight: "500",
              color: "#222222",
              background: "transparent",
              height: "40px",
              border: "1px solid #999999",
            }}
          >
            <PlusOutlined />
            Add More Questions
          </Button>
          <Button block type="primary mt-5 py-5" onClick={handleOnSave}>
            Save
          </Button>
        </div>
      </div>
      {faqData?.data?.faq.slice(0, 6).map((faq, index) => (
        <div key={index} className="p-2">
          <p className="text-xl font-medium">Question: {faq?.title}</p>
          <p className="text-xl">Answer: {faq?.content}</p>
        </div>
      ))}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
