/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Modal } from "antd";
import { AllImages } from "../../../public/images/AllImages";
import { toast } from "sonner";
import { useFeedbackActionMutation } from "../../redux/api/queryApi";

const ViewFeedbackDetails = ({
  isServiceUserViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [feedbackAction] = useFeedbackActionMutation();

  const resolveActions = async (action) => {
    const toastId = toast.loading("Blocking user...");
    const id = currentRecord?._id;

    let data;
    if (action == "del") {
      data = {
        status: "rejected",
      };
    } else if (action == "res") {
      data = {
        status: "resolved",
      };
    }

    try {
      const res = await feedbackAction({ data, id }).unwrap();
      console.log(res);
      toast.success(res?.message || res?.data?.message || "User is Blocked", {
        id: toastId,
        duration: 2000,
      });
      handleCancel();
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during blocked user",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  return (
    <Modal
      title={[]}
      open={isServiceUserViewModalVisible}
      onCancel={handleCancel}
      centered
      footer={[
        <div className="flex justify-center items-center gap-2">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#f34747",
                  colorPrimaryActive: "#f34747",
                  colorPrimaryBg: "#f34747",
                  colorPrimaryBgHover: "#df5555",
                  colorPrimaryHover: "#df5555",
                  colorPrimaryTextActive: "#f34747",
                },
              },
            }}
          >
            <Button
              onClick={() => resolveActions("del")}
              type="primary"
              className="text-base px-9  font-mediumtext-white rounded-none"
            >
              Reject
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#FF8510",
                  colorPrimaryActive: "#FF8510",
                  colorPrimaryBg: "#FF8510",
                  colorPrimaryBgHover: "#ce7a2b",
                  colorPrimaryHover: "#ce7a2b",
                  colorPrimaryTextActive: "#FF8510",
                },
              },
            }}
          >
            <Button
              onClick={() => resolveActions("res")}
              type="primary"
              className="text-base  font-mediumtext-white rounded-none"
            >
              Resolve
            </Button>
          </ConfigProvider>
        </div>,
      ]}
      style={{ textAlign: "center" }}
      // className="w-[500px]"
    >
      <h1 className="text-xl font-semibold mb-10">Resolve this FeedBack</h1>
    </Modal>
  );
};

export default ViewFeedbackDetails;
