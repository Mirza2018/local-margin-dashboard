import { DatePicker, Spin } from "antd";
import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const StaffSatisfactionRatePieChart = ({
  data: result,
  isLoading,
  isError,
}) => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  console.log(result);

  let ratioData;

  if (isLoading) {
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

  if (result == []) {
    ratioData = [
      { staffReview: "A", value: 10 },
      { staffReview: "B", value: 20 },
      { staffReview: "C", value: 30 },
    ];
  } else {
    ratioData = result;
  }

  const COLORS = ["#E99026", "#F8E1B0", "#F2C470"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-lg ">
      <div className="flex justify-between items-center pt-5 mx-5 my-5">
        <h1 className="text-2xl font-bold">Staff Satisfaction Rate</h1>

        <div>
          <DatePicker onChange={onChange} picker="year" prefix="User" />
        </div>
      </div>
      {/* <div className="w-full h-1 border-t border-secondary-color mb-5 "></div> */}

      <div className="w-full h-80 flex">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={ratioData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="count"
            >
              {ratioData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-start items-start">
          <div className="flex justify-center items-center gap-2">
            <div className="size-4 bg-[#E99026] "></div>
            <h1 className="text-xl">
              {/* Positive */}
              {ratioData?.[0]?.staffReview ?? "N/A"}
            </h1>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="size-4 bg-[#F8E1B0] "></div>
            <h1 className="text-xl"> {ratioData[1]?.staffReview}</h1>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div className="size-4 bg-[#F2C470] "></div>
            <h1 className="text-xl"> {ratioData[2]?.staffReview}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffSatisfactionRatePieChart;
