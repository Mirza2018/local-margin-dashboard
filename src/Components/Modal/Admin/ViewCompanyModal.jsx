/* eslint-disable react/prop-types */
import { Button, Modal, Tooltip } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

const ViewCompanyModal = ({
  isCompanyViewModalVisible,
  handleCancel,
  currentCompanyRecord,
  handleCompanyBlock,
}) => {
  return (
    <Modal
      title={
        <div className="pt-7 text-center">
          <h2 className="text-secondary-color text-4xl ">Company Details</h2>
          <p className="text-[#989898] mt-3 text-xl">
            See all details about {currentCompanyRecord?.companyName}
          </p>
        </div>
      }
      open={isCompanyViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="px-5 pb-5">
        <div className="">
          <div className="flex justify-center items-center p-4">
            {/* Avatar */}
            <img
              src={AllImages.yellow}
              alt={currentCompanyRecord?.companyName}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
            <div className="text-xl sm:text-2xl font-bold">
              {currentCompanyRecord?.companyName}
            </div>
          </div>

          <div className="mt-2">
            <h2 className="text-base-color font-semibold text-3xl mb-5">
              Company Information
            </h2>
            <div className="text-lg w-[90%] mx-auto">
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Company Name:</div>
                <div>{currentCompanyRecord?.companyName}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Phone:</div>
                <div>{currentCompanyRecord?.phone}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Email:</div>
                <div>{currentCompanyRecord?.email}</div>
              </div>
              <div className="sm:flex gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Location:</div>
                <div>{currentCompanyRecord?.location}</div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Service User:</div>
                <div>{currentCompanyRecord?.serviceuser}</div>
                <Tooltip placement="right" title="View users of this company">
                  <Link
                    to={`/admin/service-User?company=${currentCompanyRecord?.companyName}`}
                  >
                    <Button
                      className="!p-0"
                      style={{
                        background: "#FFFFFF",
                        border: "none",
                        color: "#222222",
                      }}
                    >
                      <HiOutlineExternalLink style={{ fontSize: "24px" }} />
                    </Button>
                  </Link>
                </Tooltip>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 mb-2">
                <div className="font-bold">Carer:</div>
                <div>{currentCompanyRecord?.carer}</div>
                <Tooltip placement="right" title="View carers of this company">
                  <Link
                    to={`/admin/carer?company=${currentCompanyRecord?.companyName}`}
                  >
                    <Button
                      className="!p-0"
                      style={{
                        background: "#FFFFFF",
                        border: "none",
                        color: "#222222",
                      }}
                    >
                      <HiOutlineExternalLink style={{ fontSize: "24px" }} />
                    </Button>
                  </Link>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleCompanyBlock(currentCompanyRecord)}
          className="bg-secondary-color text-primary-color py-3 text-xl font-semibold rounded-lg mt-8 w-full"
        >
          Block
        </button>
      </div>
    </Modal>
  );
};

export default ViewCompanyModal;
