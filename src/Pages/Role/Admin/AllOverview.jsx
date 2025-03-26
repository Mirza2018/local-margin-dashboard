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
  
const AllOverview = () => {
    const currentDate = new Date().getFullYear();
  const { data: count, isFetching:isCountFetching,isError } = useGetRestaurantCountQuery();
  const { data: userData, isFetching } = useGetAllusersListQuery();
    const [year, setYear] = useState(currentDate);
  const { data: ratioData, isFetching: isRatioLoading, } = useUserRatioQuery({year});
  const {
    data: staffSatisfaction,
    isFetching: isStaffSatisfactionLoading,
    isError: isStaffSatisfactionRatePieChartError,
  } = useGetRestaurentStaffSatisfactionRatioQuery();


    const [restaurantYear, setRestaurantYear] = useState(currentDate);
    const { data: restaurantQuery, isFetching: isRastaurentQueryLoading } =
    useGetRestaurentQueryRatioQuery();
    const { data: restaurentCategoryRatio, isFetching: isCategoryLoading } =
      useGetRestaurentCategoryRatioQuery();
 

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
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <TopCategoriesBarChart
          data={restaurentCategoryRatio?.data}
          isLoading={isCategoryLoading}
        />
        <StaffSatisfactionRatePieChart
          data={staffSatisfaction?.data}
          isLoading={isStaffSatisfactionLoading}
          isError={isStaffSatisfactionRatePieChartError}
        />
      </div>
      <ShortUserList
        userData={userData}
        isLoading={isFetching}
        title="User List"
      />
    </React.Fragment>
  );
};

export default AllOverview;
