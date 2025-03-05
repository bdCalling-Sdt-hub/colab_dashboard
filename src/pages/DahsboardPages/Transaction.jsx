import { Empty, Pagination, Select, Spin, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetAllTransactionQuery } from "../../redux/api/transactionApi";
import { imageUrl } from "../../redux/api/baseApi";
const Transaction = () => {
  const [searchParams, setSearchParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [transactionType, setTransactionType] = useState(null);
  const { data: transactions, isLoading } = useGetAllTransactionQuery({
    searchParams,
    page: currentPage,
    limit: pageSize,
    ...(transactionType !== null && transactionType !== undefined
      ? { transactionType }
      : {}),
  });

  console.log("transaction data", transactions);

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

  /**Table data format */
  // const tableData = getAllTransaction?.data?.result?.map((item, i) => {
  const tableData = transactions?.data?.result?.map((item, i) => {
    return {
      key: (currentPage - 1) * pageSize + (i + 1),
      name: item?.user?.name,
      // img: item?.profile_image,
      img: `${imageUrl}${item?.user?.profile_image}`,
      email: item?.email,
      type: item?.type,
      transactionId: item?.transactionId,
      date: item?.createdAt,
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
          <Select
            value={transactionType}
            onChange={(value) => setTransactionType(value)}
            placeholder="Filter by Premium Status"
            style={{ width: 200 }}
          >
            <Select.Option value={null}>All Transaction</Select.Option>
            <Select.Option value={"Purchase Subscription"}>
              Purchase Subscription
            </Select.Option>
            <Select.Option value={"Renew Subscription"}>
              Renew Subscription
            </Select.Option>
            <Select.Option value={"Collaboration"}>
              Collaboration Payment
            </Select.Option>
          </Select>
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
            total={transactions?.data?.meta?.total}
            pageSize={transactions?.data?.meta?.limit}
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
