import React from "react";
import { AllIcons } from "../../../public/images/AllImages";
import { Spin } from "antd";

const AllOverviewHeader = ({ data, isFetching, isError }) => {
  if (isFetching) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center">Something worng...</div>
    );
  }

  return (
    <div className="lg:flex  grid md:grid-cols-2 grid-cols-1 gap-5 mb-5 bg-primary-color flex-1">
      <div className="flex flex-wrap flex-1 gap-2 justify-center items-center bg-white rounded-xl py-5">
        <img src={AllIcons.resturants} alt="" />
        <div>
          <h1 className="text-lg font-bold">{data[0]?.name}</h1>
          <p className="text-3xl font-bold text-center">{data[0]?.total}</p>
        </div>
      </div>
      <div className="flex flex-wrap flex-1 gap-2 justify-center items-center bg-white rounded-xl py-5">
        <img src={AllIcons.totalStaff} alt="" />
        <div>
          <h1 className="text-lg font-bold">{data[1]?.name}</h1>
          <p className="text-3xl font-bold text-center">{data[1]?.total}</p>
        </div>
      </div>
      <div className="flex gap-2 flex-1 justify-center items-center bg-white rounded-xl py-5">
        <img src={AllIcons.querie} alt="" />
        <div>
          <h1 className="text-lg font-bold">{data[2]?.name}</h1>
          <p className="text-3xl font-bold text-center">{data[2]?.total}</p>
        </div>
      </div>
      <div className="flex gap-2 flex-1 justify-center items-center bg-white rounded-xl py-5">
        <img src={AllIcons.userFeedBack} alt="" />
        <div>
          <h1 className="text-lg font-bold">{data[3]?.name}</h1>
          <p className="text-3xl font-bold text-center">{data[3]?.total}</p>
        </div>
      </div>
    </div>
  );
};

export default AllOverviewHeader;
