import React from "react";
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

const OverviewPage = () => {
  const { data: count, isFetching:isCountFetching } = useGetRestaurantCountQuery();


  const { data: staffData, isFetching } = useGetAllStaffListQuery();
  const { data: ratioData, isFetching: isRatioLoading } =
    useGetAllStaffRatioQuery();

  const { data: restaurantQuery, isFetching: isRastaurentQueryLoading } =
    useGetRestaurentQueryRatioQuery();
  const { data: restaurentCategoryRatio, isFetching: isCategoryLoading } =
    useGetRestaurentCategoryRatioQuery();
  const { data: staffSatisfaction, isFetching: isStaffSatisfactionLoading } =
    useGetRestaurentStaffSatisfactionRatioQuery();

  return (
    <React.Fragment>
      <OverViewHeader data={count?.data } isFetching={isCountFetching} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StaffOverviewAreaChart
          ratioData={ratioData?.data}
          isRatioLoading={isRatioLoading}
          title="Staff overview"
          user="STAFF"
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
        />
      </div>
      <ShortStafflist
        userData={staffData}
        isLoading={isFetching}
        title="Staff List"
      />
    </React.Fragment>
  );
};

export default OverviewPage;
