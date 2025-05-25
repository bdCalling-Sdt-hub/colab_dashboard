/* eslint-disable no-unused-vars */
import IncomeOverview from "../../components/ui/IncomeOverview";
import { Link } from "react-router-dom";
import NewSubscriber from "./NewSubscriber";
import { useGetAllUsersQuery, useGetDashboardDataQuery } from "../../redux/api/dashboardApi";
import { useState } from "react";
const DashboardHome = () => {
  const [searchParams, setSearchParams] = useState("");
  const { data: dashboardData } = useGetDashboardDataQuery();
  const { data: userData } = useGetAllUsersQuery({ searchParams, limit: 5 });
  const userTableData = userData?.data?.result?.map((user, i) => ({
    id: user?._id,
    key: i + 1,
    name: user?.name,
    // img: user?.profile_image,
    img: user?.profile_image.startsWith("https") ? user.profile_image : `${user?.profile_image}`,
    email: user?.email,
    mainSkill: user?.mainSkill,
    additionalSkills: user?.additionalSkills,
    contactNumber: user?.phone || "Not available",
    dob: user?.date_of_birth?.slice("T")?.[0] || "Not available",
    location: user?.location || "Not available",
    isPremium: user?.isPremium,
  }));
  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 ">
          {/* stastics card */}
          <div className="flex justify-between items-center shadow-md">
            <div className="  w-full py-5 text-center bg-[#323232]  text-white border-r ">
              <p className="font-medium mt-2 text-5xl mb-4">{dashboardData?.data?.totalUser}</p>
              <p className="font-medium mb-2">Total User</p>
            </div>
            <div className="  w-full p-5 bg-[#323232]  text-white text-center border-r">
              <p className="font-medium mt-2 text-5xl mb-4">
                {dashboardData?.data?.totalSubscriber}
              </p>
              <p className="font-medium mb-2">Total Subscriber</p>
            </div>
            <div className="  w-full p-5 bg-[#323232] text-white text-center border-r">
              <p className="font-medium mt-2 text-5xl mb-4">{dashboardData?.data?.totalCategory}</p>
              <p className="font-medium mb-2">Total Category</p>
            </div>
            <div className="   w-full p-5 bg-[#323232] text-center  text-white ">
              <p className="font-medium mt-2 text-5xl mb-4">${dashboardData?.data?.totalEarning}</p>
              <p className="font-medium mb-2">Total Earning</p>
            </div>
          </div>

          {/* Income Overview */}

          <div className="bg-[#323232] text-white  mt-5 rounded-md p-5 ">
            <IncomeOverview />
          </div>
        </div>
      </div>
      {/* active auction table */}

      <div className="bg-[#323232] rounded-md p-5 mt-5 text-white">
        <div className="flex items-center justify-between my-5 ">
          <p className="text-xl font-semibold">New Subscriber</p>{" "}
          <Link to={`/user-managment`}>View all</Link>
        </div>
        <NewSubscriber dataSource={userTableData} />
      </div>
    </div>
  );
};

export default DashboardHome;
