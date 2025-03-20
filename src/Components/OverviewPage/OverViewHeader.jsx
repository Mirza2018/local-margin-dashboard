import React from 'react';
import { AllIcons } from '../../../public/images/AllImages';
import { Spin } from 'antd';

const OverViewHeader = ({ data, isFetching }) => {
    if (isFetching) {
      return (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      );
    }
    return (
      <div className="flex flex-col sm:flex-row gap-5 mb-5 bg-primary-color">
        <div className="flex flex-wrap flex-1 gap-2 justify-center items-center bg-white rounded-xl py-5">
          <img src={AllIcons.totalStaff} alt="" />
          <div>
            <h1 className="text-lg font-bold">{data[0]?.name}</h1>
            <p className="text-3xl font-bold text-center">{data[0]?.total}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-1 justify-center items-center bg-white rounded-xl py-5">
          <img src={AllIcons.querie} alt="" />
          <div>
            <h1 className="text-lg font-bold">{data[1]?.name}</h1>
            <p className="text-3xl font-bold text-center">{data[1]?.total}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-1 justify-center items-center bg-white rounded-xl py-5">
          <img src={AllIcons.userFeedBack} alt="" />
          <div>
            <h1 className="text-lg font-bold">{data[2]?.name}</h1>
            <p className="text-3xl font-bold text-center">{data[2]?.total}</p>
          </div>
        </div>
      </div>
    );
};

export default OverViewHeader;