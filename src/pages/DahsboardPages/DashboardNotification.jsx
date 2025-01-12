import { Table } from 'antd';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useGetNotificationQuery, useReadNotificationMutation } from '../../redux/api/dashboardApi';
import { useSocketContext } from '../../lib/SocketProviders';





const DashboardNotification = () => {
    const { newNotifications } = useSocketContext()
    const [readNotification] = useReadNotificationMutation()
    const { notifications } = useSocketContext()
    const timeAgo = (date) => {
        const now = new Date();
        const past = new Date(date);
        const secondsAgo = Math.floor((now - past) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1,
        };

        for (const [unit, seconds] of Object.entries(intervals)) {
            const count = Math.floor(secondsAgo / seconds);
            if (count >= 1) {
                return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
            }
        }
        return 'just now';
    };
    const columns = [
        {
            dataIndex: 'notification',
            key: 'notification',
            render: text => <span >{text}</span>,
        },
        {
            dataIndex: 'time',
            key: 'time',
            width: '150px',
            render: text => <span>{text}</span>,
        },
       

    ];
    /** formatted notification table data */
    const formattedTableData = notifications?.map((notification) => (
        {
            key: notification?._id,
            notification: notification?.message,
            time: timeAgo(notification?.createdAt),
            seen: notification?.seen,
        }
    ))

   // Define rowClassName for dynamic styling
   const rowClassName = (record) => {
    return !record.seen ? 'unread-notification' : ''; 
};
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <h3 className="text-[#242424] text-[20px] font-semibold flex items-center gap-2">
                    <Link to={-1}> <IoArrowBackSharp className='text-yellow' /></Link>
                    Notifications</h3>

            </div>
            <div>
                <div className='flex  items-center justify-between'>
                    <h2 className='text-[18px] font-semibold py-2'>Total {newNotifications} Notifications</h2>
                    <p className='mr-2 cursor-pointer hover:border-b hover:border-gray hover:text-gray' onClick={() => readNotification()} >Read All</p>
                </div>
                <Table columns={columns} dataSource={formattedTableData?.reverse()} pagination={false}
                    className="custom-pagination"
                    rowClassName={rowClassName} 
                    />
            </div>
        </div>
    );
}

export default DashboardNotification;
