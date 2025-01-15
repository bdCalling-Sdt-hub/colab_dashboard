import { Select, Table } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  useBlockUnblockUserMutation,
  useGetAllUsersQuery,
} from "../../redux/api/dashboardApi";
import { toast } from "sonner";
import { LuEye } from "react-icons/lu";
import UserDetailsModel from "../../components/ui/UserDetailsModel";

const UserManagement = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [searchParams, setSearchParams] = useState("");
  const { data: getAllUsers } = useGetAllUsersQuery(searchParams);
  console.log(getAllUsers);
  const [blockUnblockUser, { isLoading }] = useBlockUnblockUserMutation();
  console.log("isLoading", isLoading);
  const handleModel = (details) => {
    setUserDetails(details);
    setOpenAddModal(true);
  };
  const columns = [
    {
      title: "SL no",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={record?.img}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <p className="font-medium">{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {record?.is_block ? (
            <button
              onClick={() => handleBlockUnBlockUser(record?.email, false)}
              className="bg-[#d9000a] text-white p-2 rounded"
            >
              <MdBlock size={20} />
            </button>
          ) : (
            <button
              onClick={() => handleBlockUnBlockUser(record?.email, true)}
              className="bg-gray text-white p-2 rounded"
            >
              <MdBlock size={20} />
            </button>
          )}

          <button
            onClick={() => handleModel(record)}
            className="bg-button-primary text-white p-2 rounded"
          >
            <LuEye style={{ fontSize: "20px" }} />
          </button>
        </div>
      ),
    },
  ];
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

  const handleBlockUnBlockUser = (email, is_block) => {
    const data = {
      email: email,
      is_block: is_block,
    };
    blockUnblockUser(data)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  const handleChange = async () => {
    console.log("hanlde changes");
  };

  return (
    <div>
      <div className="p-5 bg-[#323232] rounded-md ">
        <div className="flex justify-between item-center ">
          <div className="flex items-center gap-2">
            <Link to={-1}>
              <FaArrowLeft size={18} className="text-white " />
            </Link>
            <span className="font-semibold text-white text-[20px]">
              User Management
            </span>
          </div>
          <div className="flex gap-3">
            <Select
              style={{ width: 150 }}
              onChange={handleChange}
              defaultValue="All"
              options={[
                { value: "premium", label: "Premium User" },
                { value: "normal", label: "Normal User" },
              ]}
            />

            <div className="relative">
              <input
                onChange={(e) => setSearchParams(e.target.value)}
                type="text"
                placeholder="Search here..."
                className="w-full pl-10 pr-4 py-1 rounded-md border bg-[#323232] text-white border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <CiSearch style={{ color: "white" }} />
              </span>
            </div>
          </div>
        </div>

        {/* User Management table */}
        <div className="mt-5">
          <Table
            dataSource={userTableData}
            columns={columns}
            className="custom-pagination"
            pagination={{
              pageSize: 10,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} out of ${total}`,
              locale: {
                items_per_page: "",
                prev_page: "Previous",
                next_page: "Next",
              },
            }}
          />
        </div>
      </div>
      <UserDetailsModel
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
        userDetails={userDetails}
      />
    </div>
  );
};

export default UserManagement;
