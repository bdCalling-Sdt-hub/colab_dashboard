import React from "react";
import income from "../../assets/income.png";
import auction from "../../assets/auction.png";
import user from "../../assets/user5.png";
import IncomeOverview from "../../components/ui/IncomeOverview";
import { Link } from "react-router-dom";
import ActiveAuction from "./ActiveAuction";
import TopBidderAndPerformingTable from "../../components/ui/TopBidderAndPerformingTable";
import {
  useGetAllAuctionQuery,
  useGetDashboardDataQuery,
} from "../../redux/api/dashboardApi";
import { checkImageSource } from "../../lib/checkImageSource";
const DashboardHome = () => {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();
  const { data: getAuction, isLoading: auctionLoading } = useGetAllAuctionQuery(
    { status: "ACTIVE" }
  );

  /** Top bidder data format for the table */
  const topBidderDataFormat = dashboardData?.data?.topBidders
    ?.slice(0, 3)
    .map((bidder, i) => ({
      key: i + 1,
      bidder: bidder?.name,
      img: bidder?.profile_image,
      totalWin: bidder?.totalWin,
    }));

  /** Top performing auction table data format */
  const topAuctionDataFormat = dashboardData?.data?.topAuctions
    ?.slice(0, 3)
    ?.map((auction, i) => {
      return {
        key: i + 1,
        bidder: auction?.name,
        img: auction?.images?.[0],
        totalWin: auction?.currentPrice,
      };
    });

  /** active user table data format */
  const activeUserTableData = getAuction?.data?.result
    ?.slice(0, 3)
    ?.map((user, i) => {
      return {
        id: user?._id,
        key: i + 1,
        name: user?.name,
        img: user?.images?.[0],
        startingDate: user?.startingDate?.split("T")[0],
        heightBidder: user?.winingBidder?.user?.name,
        heightBidderImg: user?.winingBidder?.user?.profile_image || "No Bidder",
        heightBid: user?.currentPrice || "No Bid",
        totalBids: user?.totalBidPlace,
      };
    });

  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 ">
          {/* stastics card */}
          <div className="flex justify-between items-center shadow-xl">
            <div className="  w-full py-5 text-center bg-[#323232]  text-white border-r ">
              <p className="font-medium mt-2 text-5xl mb-4">
                {dashboardData?.data?.totalIncome} 100
              </p>
              <p className="font-medium mb-2">Total User</p>
            </div>
            <div className="  w-full p-5 bg-[#323232]  text-white text-center border-r">
              <p className="font-medium mt-2 text-5xl mb-4">
                {dashboardData?.data?.totalIncome} 100
              </p>
              <p className="font-medium mb-2">Total Subscriber</p>
            </div>
            <div className="  w-full p-5 bg-[#323232] text-white text-center border-r">
              <p className="font-medium mt-2 text-5xl mb-4">
                {dashboardData?.data?.totalIncome} 100
              </p>
              <p className="font-medium mb-2">Total Category</p>
            </div>
            <div className="   w-full p-5 bg-[#323232] text-center  text-white ">
              <p className="font-medium mt-2 text-5xl mb-4">
                {dashboardData?.data?.totalIncome} 100
              </p>
              <p className="font-medium mb-2">Total Earning</p>
            </div>
          </div>

          {/* Income Overview */}

          <div className="bg-[#323232] text-white shadow-2xl mt-5 rounded-md p-5 ">
            <IncomeOverview />
          </div>
        </div>
      </div>
      {/* active auction table */}

      <div className="bg-[#323232] rounded-md p-5 mt-5 text-white">
        <div className="flex items-center justify-between my-5 ">
          <p className="text-xl font-semibold">New Subscriber</p>{" "}
          <Link to={`/active-auction`}>View all</Link>
        </div>
        <ActiveAuction dataSource={activeUserTableData} />
      </div>
    </div>
  );
};

export default DashboardHome;
