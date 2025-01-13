import { Select } from "antd";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useGetDashboardChartQuery } from "../../redux/api/dashboardApi";

const IncomeOverview = () => {
  const [year, setYear] = useState("2024");
  const { data: getDashboardOverview, isLoading } =
    useGetDashboardChartQuery(year);
  const items = [
    {
      label: 2023,
      key: "2023",
      value: "2023",
    },
    {
      label: 2024,
      key: "2024",
      value: "2024",
    },
    {
      label: 2025,
      key: "2025",
      value: "2025",
    },
    {
      label: 2026,
      key: "2026",
      value: "2026",
    },
  ];

  const data = [
    { name: "Jan", uv: 800 },
    { name: "Feb", uv: 200 },
    { name: "Mar", uv: 900 },
    { name: "Apr", uv: 700 },
    { name: "May", uv: 1500 },
    { name: "Jun", uv: 800 },
    { name: "Jul", uv: 400 },
    { name: "Aug", uv: 500 },
    { name: "Sep", uv: 900 },
    { name: "Oct", uv: 1000 },

    { name: "Nov", uv: 100 },
    { name: "Dec", uv: 800 },
  ];

  const chartData = [
    { month: "Jan", totalIncome: 100 },
    { month: "Feb", totalIncome: 1300 },
    { month: "Mar", totalIncome: 1250 },
    { month: "Apr", totalIncome: 200 },
    { month: "May", totalIncome: 1500 },
    { month: "June", totalIncome: 400 },
    { month: "July", totalIncome: 1450 },
    { month: "Aug", totalIncome: 1550 },
    { month: "Sept", totalIncome: 100 },
    { month: "Oct", totalIncome: 1700 },
    { month: "Nov", totalIncome: 1200 },
    { month: "Dec", totalIncome: 300 },
  ];

  // const chartDataFormat = getDashboardOverview?.data?.chartData?.map(
  const chartDataFormat = chartData?.map((chart, i) => {
    return {
      name: chart?.month,
      uv: chart?.totalIncome,
    };
  });

  const handleChange = (value) => {
    setYear(value);
  };
  return (
    <>
      <div className="flex gap-6">
        <div
          className="w-full h-[400px] shadow-xl"
          style={{
            backgroundColor: "#323232",
            // padding: "10px",
            borderRadius: "8px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={400}
              height={400}
              data={chartDataFormat}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />{" "}
              {/* Light grid lines */}
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis dataKey={"uv"} stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "black",
                  borderColor: "#444",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#b4007e"
                opacity={1}
                fillOpacity={1}
                fill="#b4007e"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "10px",
            // padding: "10px",
          }}
          className="shadow-xl"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              // style={{ backgroundColor: "#323232  " }}
              // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "black",
                  borderColor: "#444",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />
              {/* Adjust barSize to increase bar width */}
              <Bar
                dataKey="uv"
                fill="#b4007e"
                barSize={30}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default IncomeOverview;
