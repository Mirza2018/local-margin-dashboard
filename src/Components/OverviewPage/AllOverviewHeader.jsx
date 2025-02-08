import React from 'react';
import { AllIcons } from '../../../public/images/AllImages';

const AllOverviewHeader = () => {
    return (
      <div className="lg:flex  grid md:grid-cols-2 grid-cols-1 gap-5 mb-5 bg-primary-color flex-1">
        <div className="flex flex-wrap flex-1 gap-2 justify-center items-center bg-white rounded-xl py-5">
          <img src={AllIcons.resturants} alt="" />
          <div>
            <h1 className="text-lg font-bold">Total Restaurant</h1>
            <p className="text-3xl font-bold text-center">12</p>
          </div>
        </div>
        <div className="flex flex-wrap flex-1 gap-2 justify-center items-center bg-white rounded-xl py-5">
          <img src={AllIcons.totalStaff} alt="" />
          <div>
            <h1 className="text-lg font-bold">Total Staff</h1>
            <p className="text-3xl font-bold text-center">30</p>
          </div>
        </div>
        <div className="flex gap-2 flex-1 justify-center items-center bg-white rounded-xl py-5">
          <img src={AllIcons.querie} alt="" />
          <div>
            <h1 className="text-lg font-bold">Querie</h1>
            <p className="text-3xl font-bold text-center">30</p>
          </div>
        </div>
        <div className="flex gap-2 flex-1 justify-center items-center bg-white rounded-xl py-5">
          <img src={AllIcons.userFeedBack} alt="" />
          <div>
            <h1 className="text-lg font-bold">User FeedBack</h1>
            <p className="text-3xl font-bold text-center">30</p>
          </div>
        </div>
      </div>
    );
};

export default AllOverviewHeader;