/* eslint-disable no-unused-vars */
import { Empty, Pagination, Spin, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import formatDate from "../../utils/dateFormat";
import { useGetAllCollaborationQuery } from "../../redux/api/collaborationApi";
import { imageUrl } from "../../redux/api/baseApi";
const Collaboration = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: collaborations, isLoading } = useGetAllCollaborationQuery({
    page: currentPage,
    limit: pageSize,
  });

  const onChange = (page) => {
    setCurrentPage(page);
    setPageSize(1);
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
        return (
          <div className="flex items-center gap-2">
            <img
              src={`${imageUrl}${record?.sender?.profile_image}`}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <div>
              <p className="font-medium">{record?.sender?.name}</p>
              <p>{record?.sender?.mainSkill?.name}</p>
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
        return (
          <div className="flex items-center gap-2">
            <img
              // src={record?.img}
              src={`${imageUrl}${record?.receiver?.profile_image}`}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <div>
              <p className="font-medium">{record?.receiver?.name}</p>
              <p>{record?.receiver?.mainSkill?.name}</p>
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
  const tableData = collaborations?.data?.result?.map((item, i) => {
    return {
      key: (currentPage - 1) * pageSize + (i + 1),
      sender: item?.sender,
      receiver: item?.receiver,
      location: item?.location,
      amount: item?.price,
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
            total={collaborations?.data?.meta?.total}
            pageSize={collaborations?.data?.meta?.limit}
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
