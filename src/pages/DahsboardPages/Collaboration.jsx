import { Empty, Pagination, Spin, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useGetTransactionQuery } from "../../redux/api/dashboardApi";
import formatDate from "../../utils/dateFormat";
const Collaboration = () => {
  const [searchParams, setSearchParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: getAllTransaction, isLoading } = useGetTransactionQuery({
    searchParams,
    page: currentPage,
    limit: pageSize,
  });

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "SL no",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Request From",
      dataIndex: "sender",
      key: "sender",
      render: (_, record, i) => {
        console.log("record", record);
        return (
          <div className="flex items-center gap-2">
            {/* <img
              src={record?.img}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            /> */}
            <img
              src={`https://i.pravatar.cc/150?img=${i + 1}`}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <div>
              <p className="font-medium">{record?.sender?.name}</p>
              <p>{record?.sender?.mainSkill}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Request From",
      dataIndex: "sender",
      key: "sender",
      render: (_, record, i) => {
        console.log("record", record);
        return (
          <div className="flex items-center gap-2">
            <img
              // src={record?.img}
              src={`https://i.pravatar.cc/150?img=${i + 1}`}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <div>
              <p className="font-medium">{record?.receiver?.name}</p>
              <p>{record?.receiver?.mainSkill}</p>
            </div>
          </div>
        );
      },
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date and Time",
      dataIndex: "startDateTime",
      key: "startDateTime",
    },
  ];

  /**Table data format */
  const tableDataFirst10 = [
    {
      sender: { name: "Manik Sarker", mainSkill: "Singer" },
      receiver: { name: "Anik Sarker", mainSkill: "Dancer" },
      location: "New York, USA",
      amount: 100,
      startDateTime: "2025-01-10T12:00:00Z",
    },
    {
      sender: { name: "Alice Brown", mainSkill: "Developer" },
      receiver: { name: "Bob White", mainSkill: "Designer" },
      location: "London, UK",
      amount: 50,
      startDateTime: "2025-01-10T12:05:00Z",
    },
    {
      sender: { name: "Charlie Gray", mainSkill: "Manager" },
      receiver: { name: "David Black", mainSkill: "Artist" },
      location: "Paris, France",
      amount: 200,
      startDateTime: "2025-01-10T12:10:00Z",
    },
    {
      sender: { name: "Eve Green", mainSkill: "Developer" },
      receiver: { name: "Frank Blue", mainSkill: "Architect" },
      location: "Berlin, Germany",
      amount: 150,
      startDateTime: "2025-01-10T12:15:00Z",
    },
    {
      sender: { name: "Grace Red", mainSkill: "Product Manager" },
      receiver: { name: "Hannah Violet", mainSkill: "Photographer" },
      location: "Sydney, Australia",
      amount: 120,
      startDateTime: "2025-01-10T12:20:00Z",
    },
    {
      sender: { name: "Ivy Yellow", mainSkill: "Writer" },
      receiver: { name: "Jack Black", mainSkill: "Artist" },
      location: "Toronto, Canada",
      amount: 80,
      startDateTime: "2025-01-10T12:25:00Z",
    },
    {
      sender: { name: "Liam White", mainSkill: "Marketing" },
      receiver: { name: "Mia Pink", mainSkill: "Data Scientist" },
      location: "Tokyo, Japan",
      amount: 60,
      startDateTime: "2025-01-10T12:30:00Z",
    },
    {
      sender: { name: "Olivia Brown", mainSkill: "Consultant" },
      receiver: { name: "Paul Green", mainSkill: "Sales" },
      location: "Mumbai, India",
      amount: 300,
      startDateTime: "2025-01-10T12:35:00Z",
    },
    {
      sender: { name: "Quinn Gray", mainSkill: "Entrepreneur" },
      receiver: { name: "Rita Red", mainSkill: "Engineer" },
      location: "Cape Town, South Africa",
      amount: 90,
      startDateTime: "2025-01-10T12:40:00Z",
    },
    {
      sender: { name: "Sophie Blue", mainSkill: "Musician" },
      receiver: { name: "Tom Yellow", mainSkill: "Writer" },
      location: "Rio de Janeiro, Brazil",
      amount: 250,
      startDateTime: "2025-01-10T12:45:00Z",
    },
  ];
  // const tableData = getAllTransaction?.data?.result?.map((item, i) => {
  const tableData = tableDataFirst10?.map((item, i) => {
    return {
      key: (currentPage - 1) * pageSize + (i + 1),
      sender: item?.sender,
      receiver: item?.receiver,
      location: item?.location,
      amount: item?.amount,
      startDateTime: formatDate(item?.startDateTime),
    };
  });

  return (
    <div className="bg-[#323232] rounded-md p-5">
      <div className="flex justify-between item-center mb-5">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-white " />
          </Link>
          <span className="font-semibold text-white text-[20px]">
            Collaboration Management
          </span>
        </div>
        {/* <div>
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
        </div> */}
      </div>
      <div className="mt-2 ">
        <Table
          dataSource={tableData}
          columns={columns}
          className="custom-pagination"
          pagination={false}
          loading={{
            spinning: isLoading,
            indicator: <Spin size="large" className="text-yellow" />,
          }}
          locale={
            isLoading
              ? { emptyText: <Empty description="No Transactions Found" /> }
              : {}
          }
        />
        <div className="flex items-center  justify-center mt-5">
          <Pagination
            current={currentPage}
            onChange={onChange}
            total={getAllTransaction?.data?.meta?.total}
            pageSize={getAllTransaction?.data?.meta?.limit}
            showSizeChanger={false}
            showTotal={(total, range) =>
              `Showing ${range[0]}-${range[1]} out of ${total}`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
