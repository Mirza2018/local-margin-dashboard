/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Modal } from "antd";
import { AllImages } from "../../../public/images/AllImages";

const ViewRestaurantDetails = ({
  isServiceUserViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
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
                  colorPrimary: "#0694FF",
                  colorPrimaryActive: "#0694FF",
                  colorPrimaryBg: "#0694FF",
                  colorPrimaryBgHover: "#256fa8",
                  colorPrimaryHover: "#256fa8",
                  colorPrimaryTextActive: "#0694FF",
                },
              },
            }}
          >
            <Button
              onClick={handleCancel}
              type="primary"
              className="text-base px-9  font-mediumtext-white rounded-none"
            >
              Cancel
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
              type="primary"
              className="text-base  font-mediumtext-white rounded-none"
            >
              Delete User
            </Button>
          </ConfigProvider>
        </div>,
      ]}
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="flex flex-col justify-center items-center ">
        {/* Avatar */}
        <img
          src={AllImages.userImage}
          alt={currentRecord?.userName}
          className="h-32 aspect-square object-cover rounded-lg"
        />
        <div className="mt-[6px ] flex flex-col justify-center items-center gap-[12px] text-black">
          <h1 className="text-base font-semibold">{currentRecord?.name}</h1>
          <h1 className="text-base font-medium">
            Join Date : {currentRecord?.joinDate}
          </h1>
          <h1 className="text-base font-medium">
            Total Queries : {currentRecord?.queries}
          </h1>
          <h1 className="text-base font-medium">
            Feedback : {currentRecord?.feedback}
          </h1>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRestaurantDetails;
