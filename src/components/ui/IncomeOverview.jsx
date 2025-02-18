/* eslint-disable no-unused-vars */
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
import {
  useGetSubscriptionChartDataQuery,
  useGetUserChartDataQuery,
} from "../../redux/api/dashboardApi";

const IncomeOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(`${currentYear}`);
  const [userYear, setUserYear] = useState(`${currentYear}`);
  const { data: userChartData, isLoading: userChartLoading } =
    useGetUserChartDataQuery(userYear);
  const { data: subscriptionChartData, isLoading: subscriptionChartLoading } =
    useGetSubscriptionChartDataQuery(year);
  const startYear = 2024;

  const items = Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return {
      label: year,
      key: `${year}`,
      value: `${year}`,
    };
  });

  const chartDataFormat = subscriptionChartData?.data?.map((chart, i) => {
    return {
      name: chart?.month,
      uv: chart?.totalSubscriber,
    };
  });
  const userChartDataFormat = userChartData?.data?.map((chart, i) => {
    return {
      name: chart?.month,
      uv: chart?.totalUser,
    };
  });

  const handleSubscriptionYearChange = (value) => {
    setYear(value);
  };
  const handleUserYearChange = (value) => {
    setUserYear(value);
  };
  return (
    <>
      <div className="flex gap-6">
        <div
          className="w-full h-[400px] shadow-xl"
          style={{
            backgroundColor: "#323232",
            borderRadius: "8px",
          }}
        >
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold mb-4">Subscription Growth</h1>
            <div className="flex gap-3">
              <Select
                style={{ width: 150 }}
                onChange={handleSubscriptionYearChange}
                defaultValue={currentYear}
                options={items}
              />
            </div>
          </div>
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
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold mb-4">User Growth</h1>
            <div className="flex gap-3">
              <Select
                style={{ width: 150 }}
                onChange={handleUserYearChange}
                defaultValue={currentYear}
                options={items}
              />
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userChartDataFormat}>
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
