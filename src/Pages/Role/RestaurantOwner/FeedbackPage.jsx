import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FeedbackTable from "../../../Components/FeedbackPage/FeedbackTable";
import ViewFeedbackDetails from "../../../Components/FeedbackPage/ViewFeedbackDetails";
import FeedbackResolvedBarChart from "../../../Components/FeedbackPage/FeedbackResolvedBarChart";

//* Modal Table

// import AllServiceUserTable from "../../Components/Tables/Admin/AllServiceUserTable";
// import ViewAdminServiceUserModal from "../../Components/Modal/Admin/ViewAdminServiceUserModal";

const FeedbackPage = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/feedbackData.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.Feedback.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

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
      <div>
        <FeedbackResolvedBarChart />
        <div
          className="bg-highlight-color min-h-[90vh]  rounded-xl"
          style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
        >
          {/* Header  */}
          <div className="w-full p-4   rounded-tl-xl rounded-tr-xl">
            <div className=" w-[95%] mx-auto  flex items-end justify-end">
              <div className="">
                <ConfigProvider
                  theme={{ token: { colorTextPlaceholder: "#000000" } }}
                >
                  <Input
                    placeholder="Search Feedback..."
                    value={searchText}
                    onChange={(e) => onSearch(e.target.value)}
                    className=" font-semibold !border- !bg-transparent py-2 !rounded-full"
                    prefix={
                      <SearchOutlined className="text-black font-bold text-lg mr-2" />
                    }
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>

          {/* Table  */}
          <div className="px-10 py-10">
            <FeedbackTable
              data={filteredData}
              loading={loading}
              showViewServiceUserModal={showViewServiceUserModal}
              pageSize={7}
            />
          </div>

          {/* Modals */}

          <ViewFeedbackDetails
            isServiceUserViewModalVisible={isServiceUserViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </div>
      </div>
    );
};

export default FeedbackPage;
