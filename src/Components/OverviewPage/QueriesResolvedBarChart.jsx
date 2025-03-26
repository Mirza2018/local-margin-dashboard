import { DatePicker, Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { name: "Jan", uv: 80 },
//   { name: "Feb", uv: 70 },
//   { name: "Mar", uv: 50 },
//   { name: "Apr", uv: 60 },
//   { name: "May", uv: 30 },
//   { name: "Jun", uv: 20 },
//   { name: "Jul", uv: 45 },
//   { name: "Aug", uv: 36 },
//   { name: "Sep", uv: 53 },
//   { name: "Oct", uv: 69 },
//   { name: "Nov", uv: 78 },
//   { name: "Dec", uv: 36 },
// ];
const onChange = (date, dateString) => {
  // console.log(date, dateString);
};
const QueriesResolvedBarChart = ({ data, isLoading }) => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="py-5 bg-white rounded-lg">
      <div className="flex justify-between items-center mx-5 my-5">
        <h1 className="text-2xl font-bold">Queries Resolved</h1>

        <div>
          <DatePicker onChange={onChange} picker="year" prefix="User" />
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
                strokeWidth: 2,
                strokeDasharray: "7 7",
              }}
              tickMargin={16}
            />
            {/* Add several horizontal black lines using ReferenceLine */}
            <ReferenceLine y={20} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={40} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={60} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={80} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={100} stroke="#22222255" strokeWidth={0.5} />
            <Bar
              dataKey="query"
              fill="#F2C470" // Bar color
              barSize={20} // Width of each bar
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QueriesResolvedBarChart;
