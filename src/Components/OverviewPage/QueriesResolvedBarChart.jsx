import { DatePicker, Select, Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";


const QueriesResolvedBarChart = ({ data, isLoading, currentDate, setYear }) => {
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
  const dateOptions = [
    { value: currentDate, label: currentDate },
    { value: currentDate - 1, label: currentDate - 1 },
    { value: currentDate - 2, label: currentDate - 2 },
    { value: currentDate - 3, label: currentDate - 4 },
  ];

  return (
    <div className="py-5 bg-white rounded-lg">
      <div className="flex justify-between items-center mx-5 my-5">
        <h1 className="text-2xl font-bold">Queries Resolved</h1>

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
