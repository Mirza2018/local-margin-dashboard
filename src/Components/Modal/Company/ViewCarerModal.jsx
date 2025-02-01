/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";

const ViewCarerModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  handleBlock,
}) => {
  return (
    <Modal
      title={
        <div className="pt-7 text-center">
          <h2 className="text-secondary-color text-4xl ">Carer Details</h2>
          <p className="text-[#989898] mt-3 text-xl">
            See all details about {currentRecord?.name}
          </p>
        </div>
      }
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <div className="flex justify-center items-center p-4">
            {/* Avatar */}
            <img
              src={AllImages.userImage}
              alt={currentRecord?.userName}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
            <div className="text-xl sm:text-2xl font-bold">
              {currentRecord?.name}
            </div>
          </div>

          <div className="mt-2">
            <h2 className="text-base-color font-semibold text-3xl mb-5">
              Carer Information
            </h2>
            <div className="text-lg w-[90%] mx-auto">
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Name:</div>
                <div>{currentRecord?.name}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Phone:</div>
                <div>{currentRecord?.phone}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Email:</div>
                <div>{currentRecord?.email}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Location:</div>
                <div>{currentRecord?.location}</div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleBlock(currentRecord)}
          className="bg-secondary-color text-primary-color py-3 text-xl font-semibold rounded-lg mt-8 w-full"
        >
          Block
        </button>
      </div>
    </Modal>
  );
};

export default ViewCarerModal;
