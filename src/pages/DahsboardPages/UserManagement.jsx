/* eslint-disable no-unused-vars */
import { Select, Table } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { Link } from "react-router-dom";
import { useBlockUnblockUserMutation, useGetAllUsersQuery } from "../../redux/api/dashboardApi";
import { toast } from "sonner";
import { LuEye } from "react-icons/lu";
import UserDetailsModel from "../../components/ui/UserDetailsModel";
import defaultProfileImage from "../../assets/defult_profile_image.png";
const UserManagement = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [searchParams, setSearchParams] = useState("");
  const [isPremium, setIsPremium] = useState(null);
  const { data: userData, isLoading: userDataLoading } = useGetAllUsersQuery({
    searchParams,
    ...(isPremium !== null && isPremium !== undefined ? { isPremium } : {}),
  });
  const [blockUnblockUser, { isLoading }] = useBlockUnblockUserMutation();
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
              src={record?.img || defaultProfileImage}
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
          {record?.user?.status == "blocked" ? (
            <button
              onClick={() => handleBlockUnBlockUser(record?.user._id, "in-progress")}
              className="bg-[#d9000a] text-white p-2 rounded"
            >
              <MdBlock size={20} />
            </button>
          ) : (
            <button
              onClick={() => handleBlockUnBlockUser(record?.user._id, "blocked")}
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
    user: user?.user,
  }));

  const handleBlockUnBlockUser = (id, status) => {
    const data = {
      id: id,
      status: status,
    };
    blockUnblockUser(data)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  return (
    <div>
      <div className="p-5 bg-[#323232] rounded-md ">
        <div className="flex justify-between item-center ">
          <div className="flex items-center gap-2">
            <Link to={-1}>
              <FaArrowLeft size={18} className="text-white " />
            </Link>
            <span className="font-semibold text-white text-[20px]">User Management</span>
          </div>
          <div className="flex gap-3">
            <Select
              value={isPremium}
              onChange={(value) => setIsPremium(value)}
              placeholder="Filter by Premium Status"
              style={{ width: 200 }}
            >
              <Select.Option value={null}>All Users</Select.Option>
              <Select.Option value={true}>Premium Users</Select.Option>
              <Select.Option value={false}>Normal Users</Select.Option>
            </Select>

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
            loading={userDataLoading}
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
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
