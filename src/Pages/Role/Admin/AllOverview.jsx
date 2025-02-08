import React from "react";
import AllOverviewHeader from "../../../Components/OverviewPage/AllOverviewHeader";
import OverviewAreaChart from "../../../Components/OverviewPage/OverviewAreaChart";
import QueriesResolvedBarChart from "../../../Components/OverviewPage/QueriesResolvedBarChart";
import TopCategoriesBarChart from "../../../Components/OverviewPage/TopCategoriesBarChart";
import StaffSatisfactionRatePieChart from "../../../Components/OverviewPage/StaffSatisfactionRatePieChart";
import ShortStafflist from "../../../Components/OverviewPage/ShortStaffList";

const AllOverview = () => {
  return (
    <React.Fragment>
      <AllOverviewHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <OverviewAreaChart title="User overview" />
        <QueriesResolvedBarChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <TopCategoriesBarChart />
        <StaffSatisfactionRatePieChart />
      </div>
      <ShortStafflist title="User List" />
    </React.Fragment>
  );
};

export default AllOverview;
