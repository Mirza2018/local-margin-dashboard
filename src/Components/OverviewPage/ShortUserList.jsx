import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import UserListTable from "../UserListPage/UserListTable";
import ViewUserDetails from "../UserListPage/ViewUserDetails";
import { useGetAllusersListQuery } from "../../redux/api/usersApi";

//* Modal Table

// import AllServiceUserTable from "../../Components/Tables/Admin/AllServiceUserTable";
// import ViewAdminServiceUserModal from "../../Components/Modal/Admin/ViewAdminServiceUserModal";

const ShortUserList = ({
  title,
  userData,
  isLoading,
  pageSize,
  setPaginationData,
  meta,
  setFilter,
}) => {
  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  //* Use to set user
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isServiceUserViewModalVisible, setIsServiceUserViewModalVisible] =
    useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentRecord, setCurrentRecord] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/data/staffData.json");
  //       setData(response?.data); // Make sure this is an array
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return userData?.data;
    return userData?.data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [userData, searchText]);

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
      className="bg-highlight-color   rounded-xl  ps-5"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      {/* <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Staff List
          </p>
          <div className="flex gap-4 items-center">
            <ConfigProvider
              theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
            >
              <Input
                placeholder="Search User..."
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
      </div> */}
      <h1 className="text-2xl font-bold pt-5 ps-5">{title}</h1>

      {/* Table  */}
      <div className="px-10 py-10">
        <UserListTable
          data={filteredData}
          loading={isLoading}
          showViewServiceUserModal={showViewServiceUserModal}
          pageSize={pageSize}
          setPaginationData={setPaginationData}
          meta={meta}
          setFilter={setFilter}
        />
      </div>

      {/* Modals */}

      <ViewUserDetails
        isServiceUserViewModalVisible={isServiceUserViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default ShortUserList;
