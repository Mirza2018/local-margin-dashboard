import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FeedbackTable from "../../../Components/FeedbackPage/FeedbackTable";
import ViewFeedbackDetails from "../../../Components/FeedbackPage/ViewFeedbackDetails";
import FeedbackResolvedBarChart from "../../../Components/FeedbackPage/FeedbackResolvedBarChart";
import {
  useFeedbackRatioQuery,
  useGetAllFeedbackListQuery,
} from "../../../redux/api/queryApi";

const FeedbackPage = () => {
  const { data: feedbackData, isFetching } = useGetAllFeedbackListQuery();
  const { data: feedbackRatio, isFetching: isRatioFetching } =
    useFeedbackRatioQuery();



  console.log(feedbackData,isFetching);

  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  //* It's Use to Show Modal
  const [isServiceUserViewModalVisible, setIsServiceUserViewModalVisible] =
    useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentRecord, setCurrentRecord] = useState(null);

  const filteredData = useMemo(() => {
    if (!searchText) return feedbackData?.data;
    return feedbackData?.data?.filter((item) =>
      item?.comment.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [feedbackData, searchText]);

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
      <FeedbackResolvedBarChart
        data={feedbackRatio?.data}
        isFetching={isRatioFetching}
      />
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
            loading={isFetching}
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
