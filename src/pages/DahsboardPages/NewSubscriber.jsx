import { Table } from "antd";
import { LuEye } from "react-icons/lu";
import UserDetailsModel from "../../components/ui/UserDetailsModel";
import { useState } from "react";

const NewSubscriber = ({ dataSource }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});
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
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="custom-pagination "
        pagination={false}
      />
      <UserDetailsModel
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
        userDetails={userDetails}
      />
    </div>
  );
};

export default NewSubscriber;
