import { DatePicker, Select, Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const onChange = (date, dateString) => {
  // console.log(date, dateString);
};
const TopCategoriesBarChart = ({ data, isLoading, currentDate, setYear }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  const result =
    data && typeof data === "object" && data !== null
      ? Object.entries(data).map(([name, value]) => ({ name, value }))
      : [];

  const yAxisTickFormatter = (value) => `${value}K`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };
    const dateOptions = [
      { value: currentDate, label: currentDate },
      { value: currentDate - 1, label: currentDate - 1 },
      { value: currentDate - 2, label: currentDate - 2 },
      { value: currentDate - 3, label: currentDate - 4 },
    ];

  return (
    <div className="py-5 bg-white rounded-lg">
      <div className="flex justify-between items-center mx-5 my-5">
        <h1 className="text-2xl font-bold">Top Categories</h1>

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
            layout="vertical" // This changes the bar chart to a horizontal orientation
            data={result}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 0,
            }}
            barCategoryGap={20}
          >
            <XAxis
              type="number" // Make the XAxis numerical
              tick={{ ...tickStyle }}
              tickMargin={6}
            />
            <YAxis
              dataKey="name" // Set 'name' as the key for the YAxis
              type="category" // Make the YAxis categorical
              tick={{ ...tickStyle }}
              axisLine={{
                stroke: "#F2C470",
                strokeWidth: 2,
                strokeDasharray: "7 7",
              }}
              tickMargin={16}
            />
            <Bar dataKey="value" fill="#F2C470" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopCategoriesBarChart;
