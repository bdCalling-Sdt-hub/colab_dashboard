import React, { useState } from "react";
import { Table, Button, Avatar, Modal, Pagination } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useApproveFinancialOrderMutation, useDeclineFinancialOrderMutation } from "../../redux/api/dashboardApi";
import { toast } from "sonner";



// Column configuration for the table
const FinancialApplied = ({ financialData, page, setPage }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [approvedFinancialOrder] = useApproveFinancialOrderMutation()
    const [declineFinancialOrder] = useDeclineFinancialOrderMutation()
    // Function to handle showing the modal with user details
    const showModal = (record) => {
        setSelectedUser(record);
        setIsModalVisible(true);
    };

    // Function to handle closing the modal
    const handleClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };


    const tableFormattedData = financialData?.data?.result?.map((item, i) => (
        {
            key: item?._id,
            slNo: i + 1,
            userName: item?.customerName,
            email: item?.customerEmail,
            contact: item?.customerPhoneNum,
            product: item?.item?.name,
            totalFee: `$ ${item?.totalAmount?.toFixed(2)}`,
            months: item?.totalMonth,
            perMonthFee: `$ ${item?.monthlyAmount?.toFixed(2)}`,
            image: item?.user?.profile_image,
            status :  item?.isRejected ? "Rejected" : 'Pending'

        }
    ))

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
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Contact Number",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "Winning Product",
            dataIndex: "product",
            key: "product",
        },
        {
            title: "Total Fee",
            dataIndex: "totalFee",
            key: "totalFee",
        },
        {
            title: "Available Months",
            dataIndex: "months",
            key: "months",
        },
        {
            title: "Per Month Fee",
            dataIndex: "perMonthFee",
            key: "perMonthFee",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Button
                    icon={<EyeOutlined />}
                    style={{ backgroundColor: "#ECB206", color: "white" }}
                    onClick={() => showModal(record)}
                >
                </Button>
            ),
        },
    ];

    /** Approved financial management function */
    const handleApprovedFinancial = (id) => {
        approvedFinancialOrder(id).unwrap()
            .then((payload) => {
                toast.success(payload?.message)
                setIsModalVisible(false)
            })
            .catch((error) => toast.error(error?.data?.message));

    }
/** Decline financial management function */
    const handleDeclineFinancialOrder = (id) => {
        declineFinancialOrder(id).unwrap()
        .then((payload) => {
            toast.success(payload?.message)
            setIsModalVisible(false)
        })
        .catch((error) => toast.error(error?.data?.message));
    }

    return (
        <>
            <div>
                <Table
                    columns={columns}
                    dataSource={tableFormattedData}
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

            {/* Modal to show detailed user information */}
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
                            <p className="flex justify-between items-center gap-2"><strong>Email:</strong> {selectedUser.email}</p>
                            <p className="flex justify-between items-center gap-2"><strong>Phone number:</strong> {selectedUser.contact}</p>
                            <p className="flex justify-between items-center gap-2"><strong>Winning Product:</strong> {selectedUser.product}</p>
                            <p className="flex justify-between items-center gap-2"><strong>Total Fee:</strong> {selectedUser.totalFee}</p>
                            <p className="flex justify-between items-center gap-2"><strong>Finance Available For:</strong> {selectedUser.months} Months</p>
                            <p className="flex justify-between items-center gap-2"><strong>Per Month Fee:</strong> {selectedUser.perMonthFee}</p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => handleDeclineFinancialOrder(selectedUser?.key)}
                                className="bg-[#D9000A] text-white w-40 h-10 rounded-lg font-semibold hover:bg-red-700"
                            >
                                Decline
                            </button>
                            <button
                                onClick={() => handleApprovedFinancial(selectedUser?.key)}
                                className="bg-yellow text-white w-40 h-10 rounded-lg font-semibold hover:bg-yellow-600"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default FinancialApplied;