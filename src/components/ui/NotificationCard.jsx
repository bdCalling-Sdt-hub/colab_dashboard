import React from 'react'
import { MdAccessTime } from 'react-icons/md'

const NotificationCard = () => {
    return (
        <div className='border-b py-3 border-[#DCDCDC]'>
            <div className='flex justify-between items-center'>
                <p className='font-medium text-[16px]'>Payment successfully completed  </p>
                <div className='flex gap-2 items-center'>
                    <MdAccessTime className='text-yellow' />
                    <p>24 July 2024 at 8:32 PM</p>
                </div>
            </div>
            <p className='mt-2'>You are the height bidder for the iPhone 13 pro max. Congratulation again, please pay the winning amount to proceed next Your payment for order #233925834689 is </p>
        </div>
    )
}

export default NotificationCard