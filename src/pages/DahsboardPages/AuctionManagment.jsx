import { useState } from 'react';
import { Pagination, Popconfirm, Table, } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from '../../components/ui/Button';
import { IoAddOutline } from 'react-icons/io5';
import CreateUpdateAuctionModal from '../../components/ui/CreateUpdateAuctionModal';
import { useDeleteAuctionMutation, useGetAllAuctionQuery } from '../../redux/api/dashboardApi';
import UpdateAuctionModal from '../../components/ui/UpdateAuctionModal';
import { toast } from 'sonner';
import { imageUrl } from '../../redux/api/baseApi';

const AuctionManagment = () => {
  const [page, setPage] = useState(1)
  const [singleAuction , setSingleAuction] = useState()
  /** Get all auction api */
  const { data: getAllAuction, isLoading } = useGetAllAuctionQuery({ page })
  /** Delete auction api */
  const [deleteAuction] = useDeleteAuctionMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen , setIsEditModalOpen] = useState(false)


  /** Auction management data format table */
  const auctionDataFormat = getAllAuction?.data?.result?.map((auction, i) => {
    return {
      id: auction?._id,
      key: i + 1,
      name: auction?.name,
      img: auction?.images,
      category: auction?.category?.name,
      description: auction?.description, 
      reservedBid: auction?.reservedBid,
      financeAvailable : auction?.financeAvailable,
      totalMonthForFinance: auction?.totalMonthForFinance,
      incrementValue: auction?.incrementValue,
      endDataAndEndTime : `${auction?.endingDate?.split('T')[0]}-at-${auction?.endingTime} `,
      statingAndEndTime: `${auction?.startingDate.split('T')[0]}-at-${auction?.startingTime
        }  `,
      status: auction?.status
    }
  })


  /** delete auction functionality */

  const handleDeleteAuction = (id) => {
    deleteAuction(id).unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  }

  const columns = [
    {
      title: "Sl No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Auction Item",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={`${record?.img?.[0]}`}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <p className="font-medium">{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "Reserved Bid",
      dataIndex: "reservedBid",
      key: "reservedBid",
    },
   
    {
      title: "Increment Value",
      dataIndex: "incrementValue",
      key: "incrementValue",
    },
    {
      title: "Start Date & Time",
      dataIndex: "statingAndEndTime",
      key: "statingAndEndTime",
    },
    {
      title: "End Date & Time",
      dataIndex: "endDataAndEndTime",
      key: "endDataAndEndTime",
    },


    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-1">
            <button
              className={`px-8 min-w-32 py-2 rounded-3xl font-semibold  border 
    ${record?.status === 'ACTIVE' ? 'border-[#338BFF] text-[#338BFF] hover:bg-[#338BFF]' :
                  record?.status === 'UPCOMING' ? 'border-[#F3A211 text-[#F3A211] hover:bg-[#F3A211] hover:text-white' :
                    record?.status === 'COMPLETED' ? 'border-[#2AB9A4] text-[#2AB9A4] hover:bg-[#2AB9A4]' : ''} 
    hover:text-white`}
            >
              <p className='hover:text-white text-[12px] '>
                {record?.status}
              </p>
            </button>

          </div>
        );
      },
      align: "center",
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <a href="#edit" onClick={() => {
            setIsEditModalOpen(true)
            setSingleAuction(record)
          }} className="bg-yellow text-white p-1 rounded-sm"><CiEdit size={20} /></a>

          <Popconfirm
            placement="topRight"
            title="Are you sure to delete this auction?"
            onConfirm={() => handleDeleteAuction(record?.id)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-sm">
              <RiDeleteBin6Line size={20} />
            </a>
          </Popconfirm>
        </div>
      ),
    },
  ];




  return (
    <div className='p-5 bg-white rounded-md'>

      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}><FaArrowLeft size={18} className='text-yellow' /></Link>
          <span className='font-semibold text-[20px]'>Auction Management</span>
        </div>
        <div>
          <Button className='flex  items-center px-5 py-2' onClick={() => setIsModalOpen(true)} ><IoAddOutline /> Create Auction</Button>
        </div>
      </div>


      <div className='mt-10'>
        <Table dataSource={auctionDataFormat} columns={columns} className="custom-pagination" pagination={false} />
        <div className='flex items-center justify-center mt-5'>
          <Pagination
            total={getAllAuction?.data?.meta?.total}
            pageSize={getAllAuction?.data?.meta?.limit}
            current={page || getAllAuction?.data?.meta?.page}
            showSizeChanger={false}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>


     
      <CreateUpdateAuctionModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}  />
      <UpdateAuctionModal singleAuction={singleAuction}  setIsModalOpen={setIsEditModalOpen} isModalOpen={isEditModalOpen}  />

    </div>
  );
}

export default AuctionManagment;
