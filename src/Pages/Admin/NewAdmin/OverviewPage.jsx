import React from "react";
import OverViewHeader from "../../../Components/OverviewPage/OverViewHeader";
import { AllIcons } from "../../../../public/images/AllImages";
import StaffOverviewAreaChart from "../../../Components/OverviewPage/StaffOverviewAreaChart";
import QueriesResolvedBarChart from "../../../Components/OverviewPage/QueriesResolvedBarChart";
import TopCategoriesBarChart from "../../../Components/OverviewPage/TopCategoriesBarChart";
import StaffSatisfactionRatePieChart from "../../../Components/OverviewPage/StaffSatisfactionRatePieChart";

const OverviewPage = () => {
  return (
    <React.Fragment>
      <OverViewHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StaffOverviewAreaChart />
        <QueriesResolvedBarChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <TopCategoriesBarChart />
        <StaffSatisfactionRatePieChart />
      </div>
    </React.Fragment>
  );
};

export default OverviewPage;
