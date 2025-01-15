import IncomeOverview from "../../components/ui/IncomeOverview";
import { Link } from "react-router-dom";
import ActiveAuction from "./ActiveAuction";
import { useGetDashboardDataQuery } from "../../redux/api/dashboardApi";
const DashboardHome = () => {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();
  const userTable = [
    {
      id: "1",
      key: 1,
      name: "John Doe",
      img: "https://via.placeholder.com/40",
      email: "johndoe@example.com",
      contactNumber: "+1234567890",
      dob: "1990-01-01",
      location: "New York, USA",
      auctionWin: 5,
      is_block: false,
    },
    {
      id: "2",
      key: 2,
      name: "Jane Smith",
      img: "https://via.placeholder.com/40",
      email: "janesmith@example.com",
      contactNumber: "Not available",
      dob: "1985-05-15",
      location: "London, UK",
      auctionWin: 3,
      is_block: true,
    },
    {
      id: "3",
      key: 3,
      name: "Mike Johnson",
      img: "https://via.placeholder.com/40",
      email: "mikejohnson@example.com",
      contactNumber: "+9876543210",
      dob: "1995-12-20",
      location: "Toronto, Canada",
      auctionWin: 7,
      is_block: false,
    },
    {
      id: "4",
      key: 4,
      name: "Emily Davis",
      img: "https://via.placeholder.com/40",
      email: "emilydavis@example.com",
      contactNumber: "Not available",
      dob: "1992-03-10",
      location: "Sydney, Australia",
      auctionWin: 2,
      is_block: false,
    },
    {
      id: "5",
      key: 5,
      name: "Chris Brown",
      img: "https://via.placeholder.com/40",
      email: "chrisbrown@example.com",
      contactNumber: "+1230984567",
      dob: "1998-07-25",
      location: "Berlin, Germany",
      auctionWin: 4,
      is_block: true,
    },
  ];

  const userTableData = userTable?.map((user, i) => ({
    id: user?._id,
    key: i + 1,
    name: user?.name,
    // img: user?.profile_image,
    img: `https://i.pravatar.cc/150?img=${i + 1}`,
    email: user?.email,
    contactNumber: user?.phone_number || "Not available",
    dob: user?.date_of_birth?.slice("T")?.[0] || "Not available",
    location: user?.location || "Not available",
    auctionWin: user?.totalWin,
    is_block: user?.is_block,
  }));
  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 ">
          {/* stastics card */}
          <div className="flex justify-between items-center shadow-md">
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
        <ActiveAuction dataSource={userTableData} />
      </div>
    </div>
  );
};

export default DashboardHome;
