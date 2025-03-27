import React, { useState } from "react";
import AllOverviewHeader from "../../../Components/OverviewPage/AllOverviewHeader";
import OverviewAreaChart from "../../../Components/OverviewPage/OverviewAreaChart";
import QueriesResolvedBarChart from "../../../Components/OverviewPage/QueriesResolvedBarChart";
import TopCategoriesBarChart from "../../../Components/OverviewPage/TopCategoriesBarChart";
import StaffSatisfactionRatePieChart from "../../../Components/OverviewPage/StaffSatisfactionRatePieChart";
import ShortUserList from "../../../Components/OverviewPage/ShortUserList";
import {
  useGetAllusersListQuery,
  useGetRestaurentCategoryRatioQuery,
  useGetRestaurentQueryRatioQuery,
  useGetRestaurentStaffSatisfactionRatioQuery,
  useUserRatioQuery,
} from "../../../redux/api/usersApi";
import { useGetRestaurantCountQuery } from "../../../redux/api/restaurantApi";
import { useLocation } from "react-router-dom";

const AllOverview = () => {
  const currentDate = new Date().getFullYear();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialLimit = parseInt(queryParams.get("limit")) || 12;
  const initialFilter = queryParams.get("filter") || "";

  // State for pagination and filters
  const [paginationData, setPaginationData] = useState({
    page: initialPage,
    limit: initialLimit,
  });

  const [filter, setFilter] = useState(initialFilter);

    const { data: userData, isFetching } = useGetAllusersListQuery({
      ...paginationData,
      filter,
    });
 
  const {
    data: count,
    isFetching: isCountFetching,
    isError,
  } = useGetRestaurantCountQuery();

  const [year, setYear] = useState(currentDate);
  const { data: ratioData, isFetching: isRatioLoading } = useUserRatioQuery({
    year,
  });

  const [restaurantYear, setRestaurantYear] = useState(currentDate);
  const { data: restaurantQuery, isFetching: isRastaurentQueryLoading } =
    useGetRestaurentQueryRatioQuery({ year: restaurantYear });




  const [staffSatisfactionYear, setStaffSatisfactionYear] =
    useState(currentDate);
  const {
    data: staffSatisfaction,
    isFetching: isStaffSatisfactionLoading,
    isError: isStaffSatisfactionRatePieChartError,
  } = useGetRestaurentStaffSatisfactionRatioQuery({
    year: staffSatisfactionYear,
  });

  const [restaurentCategoryRatioYear, setRestaurentCategoryRatioYear] =
    useState(currentDate);
  const { data: restaurentCategoryRatio, isFetching: isCategoryLoading } =
    useGetRestaurentCategoryRatioQuery({ year: restaurentCategoryRatioYear });

  return (
    <React.Fragment>
      <AllOverviewHeader
        data={count?.data}
        isFetching={isCountFetching}
        isError={isError}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <OverviewAreaChart
          ratioData={ratioData?.data}
          isRatioLoading={isRatioLoading}
          title="User overview"
          user="count"
          currentDate={currentDate}
          setYear={setYear}
        />
        <QueriesResolvedBarChart
          data={restaurantQuery?.data}
          isLoading={isRastaurentQueryLoading}
          currentDate={currentDate}
          setYear={setRestaurantYear}
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
          isError={isStaffSatisfactionRatePieChartError}
          currentDate={currentDate}
          setYear={setStaffSatisfactionYear}
        />
      </div>
      <ShortUserList
        userData={userData}
        isLoading={isFetching}
        title="User List"
        setPaginationData={setPaginationData}
        pageSize={paginationData.limit}
        meta={userData?.meta}
        setFilter={setFilter}
      />
    </React.Fragment>
  );
};

export default AllOverview;
