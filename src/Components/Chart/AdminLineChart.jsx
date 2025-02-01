import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";

const data = [
  {
    name: "Jan",
    companies: 500,
    serviceUser: 300,
    carer: 100,
  },
  {
    name: "Feb",
    companies: 1100,
    serviceUser: 900,
    carer: 700,
  },
  {
    name: "Mar",
    companies: 700,
    serviceUser: 500,
    carer: 300,
  },
  {
    name: "Apr",
    companies: 1000,
    serviceUser: 800,
    carer: 600,
  },
  {
    name: "May",
    companies: 1400,
    serviceUser: 1200,
    carer: 1000,
  },
  {
    name: "Jun",
    companies: 1200,
    serviceUser: 1000,
    carer: 800,
  },
  {
    name: "Jul",
    companies: 800,
    serviceUser: 600,
    carer: 400,
  },
  {
    name: "Aug",
    companies: 600,
    serviceUser: 400,
    carer: 200,
  },
  {
    name: "Sep",
    companies: 1300,
    serviceUser: 1100,
    carer: 900,
  },
  {
    name: "Oct",
    companies: 1000,
    serviceUser: 800,
    carer: 600,
  },
  {
    name: "Nov",
    companies: 800,
    serviceUser: 600,
    carer: 400,
  },
  {
    name: "Dec",
    companies: 1400,
    serviceUser: 1200,
    carer: 1000,
  },
];
const Admin_Line_Chart = () => {
  return (
    <div className="w-full h-96 p-5 ">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#00000040" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 1500]} />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="companies"
            stroke="#19363D" // Blue for companies
            strokeWidth={4}
            dot={{
              r: 0,
              stroke: "#19363D",
              strokeWidth: 0,
              fill: "#00000040",
            }} // Blue dots with white fill
            activeDot={{ r: 10 }} // Active dot style
          />
          <Line
            type="monotone"
            dataKey="serviceUser"
            stroke="#326471" // Teal for service users
            strokeWidth={4}
            dot={{ r: 0, stroke: "#326471", strokeWidth: 0, fill: "#00000040" }} // Teal dots with white fill
            activeDot={{ r: 10 }}
          />
          <Line
            type="monotone"
            dataKey="carer"
            stroke="#559BAC" // Yellow for carers
            strokeWidth={4}
            dot={{ r: 0, stroke: "#559BAC", strokeWidth: 0, fill: "#00000040" }} // Yellow dots with white fill
            activeDot={{ r: 10 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Admin_Line_Chart;
