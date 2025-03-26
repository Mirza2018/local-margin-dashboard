/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Modal } from "antd";
import { AllImages } from "../../../public/images/AllImages";
import { toast } from "sonner";
import { useStaffActionMutation } from "../../redux/api/usersApi";
import { getImageUrl } from "../../redux/getBaseUrl";
import { FaUserCircle } from "react-icons/fa";

const ViewStaffDetails = ({
  isServiceUserViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [userAction] = useStaffActionMutation();

  const userActions = async (action) => {
    const toastId = toast.loading("Blocking user...");
    const id = currentRecord?._id;
    let data;

    if (action == "del") {
      data = {
        action: "delete",
      };
    } else if (currentRecord?.status == "ACTIVE") {
      data = {
        action: "block",
      };
    } else {
      data = {
        action: "unblock",
      };
    }

    try {
      const res = await userAction({ data, id }).unwrap();
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
// console.log(getImageUrl() + currentRecord?.profile?.profileImage);

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
              onClick={() => userActions("del")}
              type="primary"
              className="text-base px-9  font-mediumtext-white rounded-none"
            >
              Delete user
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
              onClick={userActions}
              type="primary"
              className="text-base  font-mediumtext-white rounded-none"
            >
              {currentRecord?.status == "ACTIVE"
                ? "Block user"
                : "Unblock user"}
              {/* Block User */}
            </Button>
          </ConfigProvider>
        </div>,
      ]}
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="flex flex-col justify-center items-center ">
        {/* Avatar */}
        {currentRecord?.profile?.profileImage ? (
          <img
            src={getImageUrl() + currentRecord?.profile?.profileImage}
            alt={currentRecord?.profile?.name}
            className="h-32 aspect-square object-cover rounded-lg"
          />
        ) : (
          <div>
            <FaUserCircle className="text-7xl" />
          </div>
        )}

        <div className="mt-[6px ] flex flex-col justify-center items-center gap-[12px] text-black">
          <h1 className="text-base font-semibold">
            {currentRecord?.profile?.name}
          </h1>
          {/* <h1 className="text-base font-medium">
            Join Date : {currentRecord?.joinDate}
          </h1> */}
          <h1 className="text-base font-medium">
            Total Queries : {currentRecord?.profile?.totalQuery}
          </h1>
          <h1 className="text-base font-medium">
            Feedback : {currentRecord?.profile?.feedback}
          </h1>
        </div>
      </div>
    </Modal>
  );
};

export default ViewStaffDetails;
