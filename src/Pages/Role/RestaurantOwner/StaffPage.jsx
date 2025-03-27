import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StaffTable from "../../../Components/StaffPage/StaffTable";
import ViewStaffDetails from "../../../Components/StaffPage/ViewStaffDetails";
import { useGetAllStaffListQuery } from "../../../redux/api/usersApi";
import { useLocation } from "react-router-dom";

//* Modal Table

// import AllServiceUserTable from "../../Components/Tables/Admin/AllServiceUserTable";
// import ViewAdminServiceUserModal from "../../Components/Modal/Admin/ViewAdminServiceUserModal";

const StaffPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialLimit = parseInt(queryParams.get("limit")) || 12;
  const initialSearchTerm = queryParams.get("searchTerm") || "";
  const initialFilter = queryParams.get("filter") || "";
 
  // State for pagination and filters
  const [paginationData, setPaginationData] = useState({
    page: initialPage,
    limit: initialLimit,
  });
  const [searchText, setSearchText] = useState(initialSearchTerm);
  const [filter, setFilter] = useState(initialFilter);

  const { data: StaffData, isFetching: isLoading } = useGetAllStaffListQuery({
    ...paginationData,
    searchTerm: searchText,
    filter,
  }); 
  //* Store Search Value
  console.log(StaffData, isLoading);

  //* It's Use to Show Modal
  const [isServiceUserViewModalVisible, setIsServiceUserViewModalVisible] =
    useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentRecord, setCurrentRecord] = useState(null);


  const onSearch = (value) => {
    setSearchText(value);
  };

  const showViewServiceUserModal = (record) => {
    setCurrentRecord(record);
    setIsServiceUserViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsServiceUserViewModalVisible(false);
  };

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Staff List
          </p>
          <div className="flex gap-4 items-center">
            <ConfigProvider
              theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
            >
              <Input
                placeholder="Search Staff..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className="text-primary-color font-semibold !border-primary-color !bg-transparent py-2 !rounded-full"
                prefix={
                  <SearchOutlined className="text-primary-color font-bold text-lg mr-2" />
                }
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
 
      {/* Table  */}
      <div className="px-10 py-10">
        <StaffTable
          data={StaffData?.data}
          loading={isLoading}
          showViewServiceUserModal={showViewServiceUserModal}
          setPaginationData={setPaginationData}
          pageSize={paginationData.limit}
          meta={StaffData?.meta}
          setFilter={setFilter}
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

export default StaffPage;
