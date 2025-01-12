import { Empty, Pagination, Spin, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useGetTransactionQuery } from "../../redux/api/dashboardApi";
import formatDate from "../../utils/dateFormat";
const Report = () => {
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
      title: "Report From",
      dataIndex: "reportFrom",
      key: "reportFrom",
      render: (_, record) => {
        console.log("record", record);
        return (
          <div className="flex items-center gap-2">
            <img
              src={record?.img}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <div>
              <p className="font-medium">{record?.reportFrom?.name}</p>
              <p>{record?.reportFrom?.mainSkill}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Report To",
      dataIndex: "reportTo",
      key: "reportTo",
      render: (_, record) => {
        console.log("record", record);
        return (
          <div className="flex items-center gap-2">
            <img
              src={record?.img}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <div>
              <p className="font-medium">{record?.reportTo?.name}</p>
              <p>{record?.reportTo?.mainSkill}</p>
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
      dataIndex: "startDateTime",
      key: "startDateTime",
    },
  ];

  /**Table data format */
  const tableDataFirst10 = [
    {
      key: "1",
      reportFrom: {
        name: "Manik Sarker",
        img: "http://image.com",
        mainSkill: "Singer",
      },
      reportTo: {
        name: "Anik Sarker",
        img: "http://image.com",
        mainSkill: "Dancer",
      },
      incidentType: "Address",
      startDateTime: "2025-01-10T12:40:00Z",
    },
    {
      key: "2",
      reportFrom: {
        name: "John Doe",
        img: "http://image.com",
        mainSkill: "Actor",
      },
      reportTo: {
        name: "Jane Smith",
        img: "http://image.com",
        mainSkill: "Singer",
      },
      incidentType: "Location",
      startDateTime: "2025-02-12T14:30:00Z",
    },
    {
      key: "3",
      reportFrom: {
        name: "Sarah Lee",
        img: "http://image.com",
        mainSkill: "Designer",
      },
      reportTo: {
        name: "David Johnson",
        img: "http://image.com",
        mainSkill: "Photographer",
      },
      incidentType: "Time",
      startDateTime: "2025-03-18T09:00:00Z",
    },
    {
      key: "4",
      reportFrom: {
        name: "Tom Harris",
        img: "http://image.com",
        mainSkill: "Writer",
      },
      reportTo: {
        name: "Lily Rose",
        img: "http://image.com",
        mainSkill: "Chef",
      },
      incidentType: "Address",
      startDateTime: "2025-04-05T16:00:00Z",
    },
    {
      key: "5",
      reportFrom: {
        name: "Emma White",
        img: "http://image.com",
        mainSkill: "Engineer",
      },
      reportTo: {
        name: "Lucas Green",
        img: "http://image.com",
        mainSkill: "Developer",
      },
      incidentType: "Location",
      startDateTime: "2025-05-22T11:15:00Z",
    },
    {
      key: "6",
      reportFrom: {
        name: "Mia Black",
        img: "http://image.com",
        mainSkill: "Artist",
      },
      reportTo: {
        name: "Oliver Blue",
        img: "http://image.com",
        mainSkill: "Scientist",
      },
      incidentType: "Time",
      startDateTime: "2025-06-30T13:45:00Z",
    },
    {
      key: "7",
      reportFrom: {
        name: "Sophia Grey",
        img: "http://image.com",
        mainSkill: "Teacher",
      },
      reportTo: {
        name: "Ethan Brown",
        img: "http://image.com",
        mainSkill: "Engineer",
      },
      incidentType: "Location",
      startDateTime: "2025-07-14T08:00:00Z",
    },
    {
      key: "8",
      reportFrom: {
        name: "Daniel King",
        img: "http://image.com",
        mainSkill: "Developer",
      },
      reportTo: {
        name: "Charlotte White",
        img: "http://image.com",
        mainSkill: "Designer",
      },
      incidentType: "Time",
      startDateTime: "2025-08-25T10:30:00Z",
    },
    {
      key: "9",
      reportFrom: {
        name: "James Scott",
        img: "http://image.com",
        mainSkill: "Marketer",
      },
      reportTo: {
        name: "Amelia Lee",
        img: "http://image.com",
        mainSkill: "Photographer",
      },
      incidentType: "Address",
      startDateTime: "2025-09-17T15:20:00Z",
    },
    {
      key: "10",
      reportFrom: {
        name: "William Smith",
        img: "http://image.com",
        mainSkill: "Producer",
      },
      reportTo: {
        name: "Olivia Brown",
        img: "http://image.com",
        mainSkill: "Musician",
      },
      incidentType: "Location",
      startDateTime: "2025-10-09T18:05:00Z",
    },
  ];

  // const tableData = getAllTransaction?.data?.result?.map((item, i) => {
  const tableData = tableDataFirst10?.map((item, i) => {
    return {
      key: (currentPage - 1) * pageSize + (i + 1),
      reportFrom: item?.reportFrom,
      reportTo: item?.reportTo,
      incidentType: item?.incidentType,
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
        <div>
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
