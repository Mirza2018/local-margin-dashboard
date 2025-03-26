import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // To extract query params
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

//* Modal Table
import QueriesTable from "../../../Components/QueriesPage/QueriesTable";
import ViewQueriesDetails from "../../../Components/QueriesPage/ViewQueriesDetails";
import { useGetAllqueryListQuery } from "../../../redux/api/queryApi";
 
const QueriesPage = () => {
  // Extract query parameters from the URL
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

  // Pass searchText and filter to the API query
  const { data: queryData, isFetching } = useGetAllqueryListQuery({
    ...paginationData,
    searchTerm: searchText,
    filter,
  });





  
  // Handle search input change
  const onSearch = (value) => {
    setSearchText(value);
    setPaginationData({ ...paginationData, page: 1 }); // Reset to page 1 on search
  };

  // Optional: Handle filter change (e.g., via dropdown)
  const onFilterChange = (value) => {
    setFilter(value);
    setPaginationData({ ...paginationData, page: 1 }); // Reset to page 1 on filter change
  };

  const showViewServiceUserModal = (record) => {
    setCurrentRecord(record);
    setIsServiceUserViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsServiceUserViewModalVisible(false);
  };

  const [isServiceUserViewModalVisible, setIsServiceUserViewModalVisible] =
    useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  return (
    <div
      className="bg-highlight-color min-h-[90vh] rounded-xl"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header */}
      <div className="bg-secondary-color w-full p-4 rounded-tl-xl rounded-tr-xl">
        <div className="w-[95%] mx-auto flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Service Users
          </p>
          <div className="flex gap-4 items-center">
            <ConfigProvider
              theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
            >
              <Input
                placeholder="Search Query..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className="text-primary-color font-semibold !border-primary-color !bg-transparent py-2 !rounded-full"
                prefix={
                  <SearchOutlined className="text-primary-color font-bold text-lg mr-2" />
                }
              />
            </ConfigProvider>
            {/* Optional: Add filter dropdown */}
            {/* Example: <Select value={filter} onChange={onFilterChange} options={[{ value: "neutral", label: "Neutral" }]} /> */}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-10 py-10">
        <QueriesTable
          data={queryData?.data}
          loading={isFetching}
          showViewServiceUserModal={showViewServiceUserModal}
          setPaginationData={setPaginationData}
          pageSize={paginationData.limit}
          meta={queryData?.meta}
        />
      </div>

      {/* Modals */}
      <ViewQueriesDetails
        isServiceUserViewModalVisible={isServiceUserViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default QueriesPage;