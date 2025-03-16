import { DatePicker, Spin } from "antd";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const FeedbackResolvedBarChart = ({ data, isFetching }) => {
  console.log(data);

  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="py-5 bg-white rounded-lg">
      <div className="flex justify-between items-center mx-5 my-5">
        <h1 className="text-2xl font-bold">Feedback Resolved</h1>

        <div>
          <DatePicker onChange={onChange} picker="year" prefix="User" />
          <div className="flex gap-2 mt-5 text-sm font-bold justify-center items-center">
            <React.Fragment>
              <div className="size-3 rounded-full bg-secondary-color"></div>
              <h1>Received</h1>
            </React.Fragment>
            <React.Fragment>
              <div className="size-3 rounded-full bg-[#15D26A]"></div>
              <h1>Resolved</h1>
            </React.Fragment>
          </div>
        </div>
      </div>
      {/* <div className="w-full h-1 border-t border-secondary-color mb-5 "></div> */}
      <div className="w-full h-80">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap={30} // Adjust the gap between bars if necessary
          >
            <XAxis dataKey="month" tick={{ ...tickStyle }} tickMargin={6} />
            <YAxis
              tickFormatter={yAxisTickFormatter}
              tick={{ ...tickStyle }}
              axisLine={{
                stroke: "#F2C470", // Y-axis line color
                // strokeWidth: 2,
                // strokeDasharray: "7 7",
              }}
              tickMargin={16}
            />

            <Bar
              dataKey="pending"
              fill="#F2C470" // Bar color
              barSize={40} // Width of each bar
            />
            <Bar
              dataKey="resolved"
              fill="#15D26A" // Bar color
              barSize={40} // Width of each bar
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeedbackResolvedBarChart;
