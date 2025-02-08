import React from "react";
import OverViewHeader from "../../../Components/OverviewPage/OverViewHeader";
import { AllIcons } from "../../../../public/images/AllImages";
import StaffOverviewAreaChart from "../../../Components/OverviewPage/OverviewAreaChart";
import QueriesResolvedBarChart from "../../../Components/OverviewPage/QueriesResolvedBarChart";
import TopCategoriesBarChart from "../../../Components/OverviewPage/TopCategoriesBarChart";
import StaffSatisfactionRatePieChart from "../../../Components/OverviewPage/StaffSatisfactionRatePieChart";
import StaffTable from "../../../Components/StaffPage/StaffTable";
import ShortStafflist from "../../../Components/OverviewPage/ShortStaffList";

const OverviewPage = () => {
  return (
    <React.Fragment>
      <OverViewHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StaffOverviewAreaChart title="Staff overview" />
        <QueriesResolvedBarChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <TopCategoriesBarChart />
        <StaffSatisfactionRatePieChart />
      </div>
      <ShortStafflist title="Staff List" />
    </React.Fragment>
  );
};

export default OverviewPage;
