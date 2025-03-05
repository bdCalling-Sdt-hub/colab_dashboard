/* eslint-disable no-unused-vars */
import { Empty, Pagination, Spin, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useGetTransactionQuery } from "../../redux/api/dashboardApi";
import formatDate from "../../utils/dateFormat";
import { useGetAllReportQuery } from "../../redux/api/reportApi";
import { baseApi, imageUrl } from "../../redux/api/baseApi";
const Report = () => {
  const [searchParams, setSearchParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: getAllTransaction, isLoading } = useGetTransactionQuery({
    searchParams,
    page: currentPage,
    limit: pageSize,
  });
  const { data: reportData } = useGetAllReportQuery({
    searchParams,
    page: currentPage,
    limit: pageSize,
  });

  console.log("report data", reportData);

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
      title: "Report From",
      dataIndex: "reportFrom",
      key: "reportFrom",
      render: (_, record, i) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={`${imageUrl}${record?.reportFrom?.profile_image}`}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <div>
              <p className="font-medium">{record?.reportFrom?.name}</p>
              <p>{record?.reportFrom?.mainSkill?.name}</p>{" "}
            </div>
          </div>
        );
      },
    },
    {
      title: "Report To",
      dataIndex: "reportTo",
      key: "reportTo",
      render: (_, record, i) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={`${imageUrl}${record?.reportTo?.profile_image}`}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <div>
              <p className="font-medium">{record?.reportTo?.name}</p>
              <p>{record?.reportTo?.mainSkill?.name}</p>{" "}
            </div>
          </div>
        );
      },
    },
    {
      title: "Incident Type",
      dataIndex: "incidentType",
      key: "incidentType",
    },
    {
      title: "Date and Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  const tableData = reportData?.data?.result?.map((item, i) => {
    return {
      key: (currentPage - 1) * pageSize + (i + 1),
      reportFrom: item?.reportFrom,
      reportTo: item?.reportTo,
      incidentType: item?.incidentType,
      createdAt: formatDate(item?.createdAt),
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

export default Report;
