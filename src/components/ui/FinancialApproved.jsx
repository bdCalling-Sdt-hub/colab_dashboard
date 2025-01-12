import React, { useState } from "react";
import { Table, Button, Avatar, Tag, Modal, Input, Form, Pagination, Popconfirm, Select } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useChangeOrderStatusMutation, useMakePaidMutation, useSentPaymentLinkMutation } from "../../redux/api/dashboardApi";
import { toast } from "sonner";



const FinancialApproved = ({ financialData, page, setPage }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sendPaymentLink] = useSentPaymentLinkMutation()
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm()
  const [makePaid] = useMakePaidMutation()
  const [changeOrderStatus] = useChangeOrderStatusMutation();


  const formattedDataTable = financialData?.data?.result?.map((item, i) => (
    {
      key: item?._id,
      slNo: i + 1,
      userName: item?.customerName,
      email: item?.customerEmail,
      contact: item?.customerPhoneNum,
      item: item?.item?.name,
      totalFee: item?.totalAmount.toFixed(2),
      months: item?.totalMonth,
      perMonthFee: item?.monthlyAmount,
      lastPayment: item?.lastPayment?.split('T')[0] || 'Not Pay',
      paidMonth: item?.paidInstallment,
      status: item?.monthlyStatus,
      paymentStatus: item?.status,
      image: item?.user?.profile_image,
      address: item?.shippingAddress?.streetAddress,
      orderId: item?._id,
      winningPrice: item?.totalAmount.toFixed(2),
      paymentLink: item?.paymentLink || "",
      installmentLeft: item?.installmentLeft,
      paidInstallment: item?.paidInstallment
    }
  ))


  // Show the modal and pass the selected user data
  const showModal = (record) => {
    setSelectedUser(record);
    setInputValue(record?.paymentLink)
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    form.resetFields();
    setInputValue('')
  };
  // Column configuration for the table
  const columns = [
    {
      title: "SL no.",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "User's Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={record.image} style={{ marginRight: "10px" }} />
          {text}
        </div>
      ),
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Total Fee",
      dataIndex: "totalFee",
      key: "totalFee",
    },
    {
      title: "Months",
      dataIndex: "months",
      key: "months",
    },
    {
      title: "Per Month Fee",
      dataIndex: "perMonthFee",
      key: "perMonthFee",
    },
    {
      title: "Paid Month",
      dataIndex: "paidMonth",
      key: "paidMonth",
    },
    {
      title: "Last Payment",
      dataIndex: "lastPayment",
      key: "lastPayment",
    },
    {
      title: "Monthly Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag className={`px-8 py-1 rounded-full ${status === 'paid' ? "border-[#2AB9A4] text-[#2AB9A4] " : "border-[#F3A211] text-[#F3A211]"}`} >{status}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Select
          value={record?.paymentStatus}
          onChange={(newStatus) => handleStatusChange(record?.key, newStatus)}
          style={{ width: 150 }}
        >
          <Option value="PAYMENT_PENDING">Payment Pending</Option>
          <Option value="PAYMENT_SUCCESS">Payment Success</Option>
          <Option value="PROCESSING">Processing</Option>
          <Option value="SHIPPED">Shipped</Option>
          <Option value="DELIVERED">Delivered</Option>
        </Select>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Button
            icon={<EyeOutlined size={25} />}
            style={{ backgroundColor: "#F3A211", color: "white" }}
            onClick={() => showModal(record)}
          >
          </Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure for paid this user?"
            onConfirm={() => handleMakePaid(record?.key)}
            okText="Yes"
            cancelText="No"
          >

            <Button disabled={record?.status == 'paid'}  style={{
              backgroundColor: record?.status === 'paid' ? 'gray' : '#F3A211',
              color: "white" // Keep text color white
            }}>Make Paid</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];


  const handleStatusChange = (orderId, newStatus) => {
    const status = {
      "status": newStatus
    }

    changeOrderStatus({ orderId, status }).unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  /** handle send payment link function */
  const handleSendPaymentLink = (id) => {
    const paymentLink = {
      paymentLink: inputValue
    }
    sendPaymentLink({ id, paymentLink }).unwrap()
      .then((payload) => {
        toast.success(payload?.message)
        setIsModalVisible(false)
      })
      .catch((error) => toast.error(error?.data?.message));


  }

  const handleMakePaid = (id) => {
    makePaid(id).unwrap()
      .then((payload) => {
        toast.success(payload?.message)
        form.resetFields()
        setInputValue('')
      })
      .catch((error) => toast.error(error?.data?.message));
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <div>
        <Table
          columns={columns}
          dataSource={formattedDataTable}
          pagination={false}
          rowKey="key"
          style={{ margin: "20px" }}
        />
        <div className='flex items-center justify-center mt-5'>
          <Pagination
            total={financialData?.data?.meta?.total}
            pageSize={financialData?.data?.meta?.limit}
            current={page || financialData?.data?.meta?.page}
            showSizeChanger={false}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        title={selectedUser ? selectedUser.userName : ""}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
        centered
      >
        {selectedUser && (
          <div className="text-center p-5">
            <Avatar
              size={80}
              src={selectedUser.image}
              className="mx-auto mb-4"
            />

            {/* User Name */}
            <h3 className="text-lg font-semibold mb-2">{selectedUser.userName}</h3>

            {/* User Information */}
            <div className="text-left space-y-2">
              <p className="flex justify-between items-center gap-2"><strong>Order ID:</strong> {selectedUser.orderId}</p>
              <p className="flex justify-between items-center gap-2"><strong>Email:</strong> {selectedUser.email}</p>
              <p className="flex justify-between items-center gap-2"><strong>Phone number:</strong> {selectedUser.contact}</p>
              <p className="flex justify-between items-center gap-2"><strong>Address:</strong> {selectedUser.address}</p>
              <p className="flex justify-between items-center gap-2"><strong>Winning Product:</strong> {selectedUser.item}</p>
              <p className="flex justify-between items-center gap-2"><strong>Winning Price:</strong> {selectedUser.winningPrice}</p>
              <p className="flex justify-between items-center gap-2"><strong>Finance Available For:</strong> {selectedUser.months} Months</p>
              <p className="flex justify-between items-center gap-2"><strong>Per Month Fee:</strong> {selectedUser.perMonthFee}</p>
              <p className="flex justify-between items-center gap-2"><strong>Paid Installment:</strong> {selectedUser.paidInstallment}</p>
              <p className="flex justify-between items-center gap-2"><strong>Installment Left:</strong> {selectedUser.installmentLeft}</p>
              <p className="flex justify-between items-center gap-2"><strong>Last Payment:</strong> {selectedUser.lastPayment}</p>
              <p className="flex justify-between items-center gap-2"><strong>Monthly Payment Status:</strong> {selectedUser.status}</p>
            </div>
            <Form className="flex justify-center mt-6 gap-2" form={form}  >
              <Input placeholder="payment link " value={inputValue} onChange={handleInputChange} />
              <button
                onClick={() => handleSendPaymentLink(selectedUser?.key)}
                className="bg-yellow text-white w-40 h-10 rounded-lg font-semibold hover:bg-yellow-600"
              >
                send link
              </button>
            </Form>
          </div>

        )}
      </Modal>
    </>
  );
};

export default FinancialApproved;