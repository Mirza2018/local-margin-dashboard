import React from "react";
import AllOverviewHeader from "../../../Components/OverviewPage/AllOverviewHeader";
import OverviewAreaChart from "../../../Components/OverviewPage/OverviewAreaChart";
import QueriesResolvedBarChart from "../../../Components/OverviewPage/QueriesResolvedBarChart";
import TopCategoriesBarChart from "../../../Components/OverviewPage/TopCategoriesBarChart";
import StaffSatisfactionRatePieChart from "../../../Components/OverviewPage/StaffSatisfactionRatePieChart";
import ShortUserList from "../../../Components/OverviewPage/ShortUserList";
import {
  useGetAllusersListQuery,
  useUserRatioQuery,
} from "../../../redux/api/usersApi";
  
const AllOverview = () => {
  const { data: userData,isFetching } = useGetAllusersListQuery();
  const { data: ratioData, isFetching: isRatioLoading } = useUserRatioQuery();
 
  return (
    <React.Fragment>
      <AllOverviewHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <OverviewAreaChart
          ratioData={ratioData}
          isRatioLoading={isRatioLoading}
          title="User overview"
        />
        <QueriesResolvedBarChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <TopCategoriesBarChart />
        <StaffSatisfactionRatePieChart />
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
