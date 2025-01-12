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
  const chartDataFormat = getDashboardOverview?.data?.chartData?.map(
    (chart, i) => {
      return {
        name: chart?.month,
        uv: chart?.totalIncome,
      };
    }
  );

  const handleChange = (value) => {
    setYear(value);
  };
  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="ml-6">
          <p className="text-2xl font-semibold  ">Subscription Growth</p>
        </div>
        <Select
          defaultValue={year}
          style={{ width: 120 }}
          onChange={handleChange}
          options={items}
        />
      </div>
      {/* <div className='w-full h-[400px]'>
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
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#f4a61a" opacity={1} fillOpacity={1} fill="#f4a61a" />
                    </AreaChart>
                </ResponsiveContainer>
            </div> */}
      <div
        className="w-full h-[400px]"
        style={{
          backgroundColor: "#323232",
          padding: "10px",
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
            <XAxis dataKey="name" stroke="#fff" /> {/* White X-axis labels */}
            <YAxis stroke="#fff" /> {/* White Y-axis labels */}
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
              stroke="#f4a61a"
              opacity={1}
              fillOpacity={1}
              fill="#f4a61a"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default IncomeOverview;
