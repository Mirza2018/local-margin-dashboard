import React, { useState } from "react";
import OverViewHeader from "../../../Components/OverviewPage/OverViewHeader";
import { AllIcons } from "../../../../public/images/AllImages";
import StaffOverviewAreaChart from "../../../Components/OverviewPage/OverviewAreaChart";
import QueriesResolvedBarChart from "../../../Components/OverviewPage/QueriesResolvedBarChart";
import TopCategoriesBarChart from "../../../Components/OverviewPage/TopCategoriesBarChart";
import StaffSatisfactionRatePieChart from "../../../Components/OverviewPage/StaffSatisfactionRatePieChart";
import StaffTable from "../../../Components/StaffPage/StaffTable";
import ShortStafflist from "../../../Components/OverviewPage/ShortStaffList";
import {
  useGetAllStaffListQuery,
  useGetAllStaffRatioQuery,
  useGetRestaurentCategoryRatioQuery,
  useGetRestaurentQueryRatioQuery,
  useGetRestaurentStaffSatisfactionRatioQuery,
  useUserRatioQuery,
} from "../../../redux/api/usersApi";
import { useGetRestaurantCountQuery } from "../../../redux/api/restaurantApi";
import { useLocation } from "react-router-dom";
 
const OverviewPage = () => {
  const currentDate = new Date().getFullYear();
  const { data: count, isFetching: isCountFetching } =
    useGetRestaurantCountQuery();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialLimit = parseInt(queryParams.get("limit")) || 12;
  const initialFilter = queryParams.get("filter") || "";
  const [filter, setFilter] = useState(initialFilter);
  const [paginationData, setPaginationData] = useState({
    page: initialPage,
    limit: initialLimit,
  });
  const { data: staffData, isFetching } = useGetAllStaffListQuery({
    ...paginationData,
    filter,
  });

  const [year, setYear] = useState(currentDate);
  const { data: ratioData, isFetching: isRatioLoading } =
    useGetAllStaffRatioQuery({ year });

  const [restaurantQueryYear, setrestaurantQueryYear] = useState(currentDate);
  const { data: restaurantQuery, isFetching: isRastaurentQueryLoading } =
    useGetRestaurentQueryRatioQuery({ year: restaurantQueryYear });

  const [restaurentCategoryRatioYear, setRestaurentCategoryRatioYear] =
    useState(currentDate);
  const { data: restaurentCategoryRatio, isFetching: isCategoryLoading } =
    useGetRestaurentCategoryRatioQuery({ year: restaurentCategoryRatioYear });

  const [staffSatisfactionYear, setStaffSatisfactionYear] =
    useState(currentDate);
  const { data: staffSatisfaction, isFetching: isStaffSatisfactionLoading } =
    useGetRestaurentStaffSatisfactionRatioQuery({
      year: staffSatisfactionYear,
    });

  return (
    <React.Fragment>
      <OverViewHeader data={count?.data} isFetching={isCountFetching} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StaffOverviewAreaChart
          ratioData={ratioData?.data}
          isRatioLoading={isRatioLoading}
          title="Staff overview"
          user="STAFF"
          currentDate={currentDate}
          setYear={setYear}
        />
        <QueriesResolvedBarChart
          data={restaurantQuery?.data}
          isLoading={isRastaurentQueryLoading}
          currentDate={currentDate}
          setYear={setrestaurantQueryYear}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <TopCategoriesBarChart
          data={restaurentCategoryRatio?.data}
          isLoading={isCategoryLoading}
          currentDate={currentDate}
          setYear={setRestaurentCategoryRatioYear}
        />
        <StaffSatisfactionRatePieChart
          data={staffSatisfaction?.data}
          isLoading={isStaffSatisfactionLoading}
          currentDate={currentDate}
          setYear={setStaffSatisfactionYear}
        />
      </div>
      <ShortStafflist
        userData={staffData}
        isLoading={isFetching}
        title="Staff List"
        setFilter={setFilter}
        setPaginationData={setPaginationData}
        pageSize={paginationData.limit}
      />
    </React.Fragment>
  );
};

export default OverviewPage;
