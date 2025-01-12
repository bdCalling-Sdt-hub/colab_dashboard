import { Modal, Select, Table } from 'antd'
import React, { useState } from 'react'
import { CiLocationOn, CiSearch } from 'react-icons/ci'
import { IoArrowBackSharp, IoEyeOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useChangeOrderStatusMutation, useGetAllOrderQuery } from '../../redux/api/dashboardApi'
import { toast } from 'sonner'
const { Option } = Select;

const OrderManagement = () => {
    const [searchParams, setSearchParams] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    
    // Update the query to fetch data based on pagination params
    const { data: getOrders, isLoading } = useGetAllOrderQuery({  page: currentPage, limit: pageSize });
    const [changeOrderStatus] = useChangeOrderStatusMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState();


    const handleTableChange = (pagination) => {
        setCurrentPage(pagination);
    };

    const columns = [
        {
            title: "Order ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Winner",
            dataIndex: "name",
            key: "name",
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        <img
                            src={record?.img}
                            className="w-[40px] h-[40px] rounded-[8px]"
                            alt="Winner"
                        />
                        <p className="font-medium">{record?.name}</p>
                    </div>
                );
            },
        },
        {
            title: "Winning Product",
            dataIndex: "winningProduct",
            key: "winningProduct",
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        <img
                            src={record?.winningProductImg}
                            className="w-[40px] h-[40px] rounded-[8px]"
                            alt="Product"
                        />
                        <p className="font-medium">{record?.winningProduct}</p>
                    </div>
                );
            },
        },
        {
            title: "Winning Price",
            dataIndex: "winningPrice",
            key: "winningPrice",
        },
        {
            title: "Expected Delivery Time",
            dataIndex: "expectedDeliveryDate",
            key: "expectedDeliveryDate",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <Select
                    value={record?.status}
                    onChange={(newStatus) => handleStatusChange(record?.orderId, newStatus)}
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
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <button onClick={() => {
                    setIsModalOpen(true)
                    setModalData(record)
                }} className="bg-yellow text-white p-2 rounded">
                    <IoEyeOutline size={20} />
                </button>
            ),
        },
    ];

    const handleStatusChange = (orderId, newStatus) => {
        const status = {
            "status": newStatus
        }
        changeOrderStatus({orderId, status}).unwrap()
            .then((payload) => toast.success(payload?.message))
            .catch((error) => toast.error(error?.data?.message));
    };
    console.log(getOrders?.data?.result);
    const orderManagementTableData = getOrders?.data?.result?.map((order, i) => {
        return {
            key: i + 1,
            name: order?.user?.name,
            img: order?.user?.profile_image,
            winningProduct: order?.item?.name,
            winningProductImg: order?.item?.images[0],
            winningPrice: order?.winingBid?.toFixed(2),
            status: order?.status,
            expectedDeliveryDate: order?.expectedDeliveryData?.split['T']?.[0] || "No Date",
            phone: order?.user?.phone_number || 'Not Available',
            shippingAddress: order?.shippingAddress?.city,
            orderId: order?._id
        }
    });

    return (
        <div className='bg-white p-5 rounded-md'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1'>
                    <Link to={-1}>
                        <IoArrowBackSharp className='text-yellow' />
                    </Link>
                    <span className='font-medium'>Order Management</span>
                </div>
                {/* <div>
                    <div className="relative">
                        <input
                            onChange={(e) => setSearchParams(e.target.value)}
                            type="text"
                            placeholder="Search here..."
                            className="w-full pl-10 pr-4 py-1 rounded-md border border-[#EAEAEA] focus:border-blue-500 focus:outline-none focus:ring-1"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">
                            <CiSearch />
                        </span>
                    </div>
                </div> */}
            </div>

            <div className='mt-5'>
                <Table
                    dataSource={orderManagementTableData}
                    columns={columns}
                    className="custom-pagination"
                    loading={isLoading}
                    pagination={{
                        pageSize: pageSize,
                        current: currentPage,
                        total: getOrders?.data?.meta?.total,
                        showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
                        locale: {
                            items_per_page: '',
                            prev_page: 'Previous',
                            next_page: 'Next',
                        },
                        onChange: handleTableChange,
                    }}
                />


                <Modal
                    open={isModalOpen}
                    centered
                    footer={false}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <p className='font-medium'>Winner:</p>
                    <div className='flex flex-col items-center justify-center space-y-2 '>
                        <img src={modalData?.img} className='rounded-full h-24 w-24' alt="Winner" />
                        <p className='mt-2 font-medium'>{modalData?.name}</p>
                        <p>Phone Number: {modalData?.phone}</p>
                        <p className='flex items-center justify-center'>
                            <CiLocationOn className='text-yellow' />
                            Shipping Address: {modalData?.shippingAddress}
                        </p>
                    </div>
                    <p>Winning Product</p>
                    <div className='mt-2 flex gap-2 items-center'>
                        <img src={modalData?.winningProductImg} className='h-24' alt="Product" />
                        <div>
                            <p className='font-medium'>{modalData?.winningProduct}</p>
                            <p>Winning Price: <span className='font-medium'>{modalData?.winningPrice}</span></p>
                        </div>
                    </div>

                    <div className='mt-5 space-y-2'>
                        <p className='flex justify-between'>
                            <span className='font-medium'>Order ID:</span> 
                            <span>{modalData?.orderId}</span>
                        </p>
                        <p className='flex justify-between'>
                            <span className='font-medium'>Order Date:</span> 
                            <span>{modalData?.orderDate}</span>
                        </p>
                        <p className='flex justify-between'>
                            <span className='font-medium'>Expected Delivery Date:</span> 
                            <span>{modalData?.expectedDeliveryDate}</span>
                        </p>
                        <p className='flex justify-between'>
                            <span className='font-medium'>Status:</span> 
                            <span>{modalData?.status}</span>
                        </p>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default OrderManagement;
