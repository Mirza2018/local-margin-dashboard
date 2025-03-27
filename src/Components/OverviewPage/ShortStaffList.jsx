import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StaffTable from "../StaffPage/StaffTable";
import ViewStaffDetails from "../StaffPage/ViewStaffDetails";

//* Modal Table

const ShortStafflist = ({
  title,
  isLoading,
  userData,
  setFilter,
  setPaginationData,
  pageSize,
}) => {
  //* It's Use to Show Modal
  const [isServiceUserViewModalVisible, setIsServiceUserViewModalVisible] =
    useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewServiceUserModal = (record) => {
    setCurrentRecord(record);
    setIsServiceUserViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsServiceUserViewModalVisible(false);
  };

  console.log(userData);

  return (
    <div
      className="bg-highlight-color   rounded-xl  ps-5"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <h1 className="text-2xl font-bold pt-5 ps-5">{title}</h1>

      {/* Table  */}
      <div className="px-10 py-10">
        <StaffTable
          data={userData?.data}
          loading={isLoading}
          showViewServiceUserModal={showViewServiceUserModal}
          setFilter={setFilter}
          setPaginationData={setPaginationData}
          pageSize={pageSize}
          meta={userData?.meta}
        /> 
      </div>

      {/* Modals */}

      <ViewStaffDetails
        isServiceUserViewModalVisible={isServiceUserViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default ShortStafflist;
