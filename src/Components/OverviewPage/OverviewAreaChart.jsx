/ eslint-disable no-unused-vars /;
import { DatePicker, Select, Spin } from "antd";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


 
const StaffOverviewAreaChart = ({
  title,
  isRatioLoading,
  ratioData,
  user,
  currentDate,
  setYear,
}) => { 
  // console.log("hdfeuiwufue", ratioData);

  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#000000" };
  if (isRatioLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }
  const dateOptions = [
    { value: currentDate, label: currentDate },
    { value: currentDate - 1, label: currentDate - 1 },
    { value: currentDate - 2, label: currentDate - 2 },
    { value: currentDate - 3, label: currentDate - 4 },
  ];
  return (
    <div className="py-5 bg-white rounded-lg">
      <div className="flex justify-between items-center mx-5 my-5">
        <h1 className="text-2xl font-bold">{title}</h1>

        <div>
          <Select
            onChange={(value) => {
              setYear(value);
            }}
            defaultValue={"Select Year "}
            style={{ width: 120 }}
            options={dateOptions}
          />
        </div>
      </div>
      <div className="w-full  h-80">
        <ResponsiveContainer>
          <AreaChart
            data={ratioData}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 10,
            }}
          >
            <XAxis dataKey="month" tick={{ ...tickStyle }} tickMargin={6} />
            <YAxis
              tickFormatter={yAxisTickFormatter}
              tick={{ ...tickStyle }}
              tickMargin={16}
              axisLine={{
                stroke: "#F2C470", // Y-axis line color
                strokeWidth: 2,
                strokeDasharray: "7 7",
              }}
            />
            <defs>
              <linearGradient id="colorName" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="#F9e6bd" stopOpacity={1} />
                <stop offset="80%" stopColor="#fdf4e2" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                backgroundColor: "#EFAF41", // Tooltip background color
                border: "1px solid #ccc", // Tooltip border
                borderRadius: "5px", // Tooltip border radius
              }}
              itemStyle={{ color: "#fff" }} // Tooltip text color
              labelStyle={{ color: "#fff" }} // Tooltip label color
            />
            <Area
              type="monotone"
              // dataKey={"staff" || "STAFF"}
              dataKey={user}
              stroke=""
              fill="url(#colorName)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StaffOverviewAreaChart;
