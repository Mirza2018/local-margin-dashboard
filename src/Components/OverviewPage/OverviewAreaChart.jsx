/ eslint-disable no-unused-vars /;
import { DatePicker } from "antd";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", user: 475 },
  { month: "Feb", user: 580 },
  { month: "Mar", user: 300 },
  { month: "Apr", user: 525 },
  { month: "May", user: 375 },
  { month: "Jun", user: 450 },
  { month: "Jul", user: 575 },
  { month: "Aug", user: 360 },
  { month: "Sep", user: 200 },
  { month: "Oct", user: 400 },
  { month: "Nov", user: 300 },
  { month: "Dec", user: 600 },
];

const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const StaffOverviewAreaChart = ({title}) => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#000000" };

  return (
    <div className="py-5 bg-white rounded-lg">
      <div className="flex justify-between items-center mx-5 my-5">
        <h1 className="text-2xl font-bold">{title}</h1>

        <div>
          <DatePicker onChange={onChange} picker="year" prefix="User" />
        </div>
      </div>
      <div className="w-full  h-80">
        <ResponsiveContainer>
          <AreaChart
            data={data}
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
              dataKey="user"
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
