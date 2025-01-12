import { Popconfirm, Table } from 'antd';
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDeleteBannerMutation, useGetBannerQuery } from '../../redux/api/dashboardApi';
import { toast } from 'sonner';

const AddBanner = () => {
    const { data: getBanner } = useGetBannerQuery();
    const [deleteBanner] = useDeleteBannerMutation()
    const columns = [
        {
            title: 'SL no',
            dataIndex: 'changeOrder',
            key: 'changeOrder',
        },

        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => <img className='object-contain' src={record.imageUrl} alt={record.name} style={{ width: 200, height: 100 }} />,
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    placement='topLeft'
                    title="Are you sure to delete this banner?"
                    onConfirm={() => handleDeleteBanner(record?.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <div className="flex items-center  gap-2">
                        <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-sm"><RiDeleteBin6Line size={20} /></a>
                    </div>
                </Popconfirm>
            ),
        },
    ];


    // Columns data
    const formattedData = getBanner?.data?.map((banner, i) => (
        {
            id: banner?._id,
            changeOrder: i + 1,
            imageUrl: banner?.url,

        }
    ))

    /** Delete banner  */
    const handleDeleteBanner = (id) => {
        deleteBanner(id).unwrap()
            .then((payload) => toast.success(payload?.message))
            .catch((error) => toast.error(error?.data?.message))

    }

    return (
        <div className="flex justify-center pt-5">
            <div className="w-full max-w-6xl">
                <Table
                    columns={columns}
                    dataSource={formattedData}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default AddBanner