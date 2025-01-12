import { Empty, Pagination, Spin, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useGetTransactionQuery } from "../../redux/api/dashboardApi";
const Transaction = () => {
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
      title: "User Info ",
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
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Date and Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const tableDataFirst10 = [
    {
      key: 1,
      name: "John Doe",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      email: "john.doe@example.com",
      type: "Credit",
      transactionId: "txn123",
      amount: 100,
      date: "2025-01-10T12:00:00Z",
    },
    {
      key: 2,
      name: "Jane Smith",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      email: "jane.smith@example.com",
      type: "Debit",
      transactionId: "txn124",
      amount: 50,
      date: "2025-01-10T12:05:00Z",
    },
    {
      key: 3,
      name: "Alice Brown",
      img: "https://randomuser.me/api/portraits/women/3.jpg",
      email: "alice.brown@example.com",
      type: "Credit",
      transactionId: "txn125",
      amount: 200,
      date: "2025-01-10T12:10:00Z",
    },
    {
      key: 4,
      name: "Bob White",
      img: "https://randomuser.me/api/portraits/men/4.jpg",
      email: "bob.white@example.com",
      type: "Debit",
      transactionId: "txn126",
      amount: 150,
      date: "2025-01-10T12:15:00Z",
    },
    {
      key: 5,
      name: "Eve Green",
      img: "https://randomuser.me/api/portraits/women/5.jpg",
      email: "eve.green@example.com",
      type: "Credit",
      transactionId: "txn127",
      amount: 120,
      date: "2025-01-10T12:20:00Z",
    },
    {
      key: 6,
      name: "Charlie Gray",
      img: "https://randomuser.me/api/portraits/men/6.jpg",
      email: "charlie.gray@example.com",
      type: "Debit",
      transactionId: "txn128",
      amount: 80,
      date: "2025-01-10T12:25:00Z",
    },
    {
      key: 7,
      name: "David Black",
      img: "https://randomuser.me/api/portraits/men/7.jpg",
      email: "david.black@example.com",
      type: "Credit",
      transactionId: "txn129",
      amount: 60,
      date: "2025-01-10T12:30:00Z",
    },
    {
      key: 8,
      name: "Grace Red",
      img: "https://randomuser.me/api/portraits/women/8.jpg",
      email: "grace.red@example.com",
      type: "Debit",
      transactionId: "txn130",
      amount: 300,
      date: "2025-01-10T12:35:00Z",
    },
    {
      key: 9,
      name: "Frank Blue",
      img: "https://randomuser.me/api/portraits/men/9.jpg",
      email: "frank.blue@example.com",
      type: "Credit",
      transactionId: "txn131",
      amount: 90,
      date: "2025-01-10T12:40:00Z",
    },
    {
      key: 10,
      name: "Hannah Violet",
      img: "https://randomuser.me/api/portraits/women/10.jpg",
      email: "hannah.violet@example.com",
      type: "Debit",
      transactionId: "txn132",
      amount: 250,
      date: "2025-01-10T12:45:00Z",
    },
  ];

  console.log(tableDataFirst10);

  /**Table data format */
  // const tableData = getAllTransaction?.data?.result?.map((item, i) => {
  const tableData = tableDataFirst10?.map((item, i) => {
    return {
      key: (currentPage - 1) * pageSize + (i + 1),
      name: item?.name,
      img: item?.profile_image,
      email: item?.email,
      type: item?.type,
      transactionId: item?.transactionId,
      date: item?.date,
      amount: item?.amount,
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
            Transaction
          </span>
        </div>
        <div>
          <div className="relative">
            <input
              onChange={(e) => setSearchParams(e.target.value)}
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch />
            </span>
          </div>
        </div>
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

export default Transaction;
