import React from 'react'
import { FaRegStar } from 'react-icons/fa'
import img from '../../assets/watch.png'
const ProductCard = () => {
  return (
    <div className='rounded-lg bg-white shadow-sm my-4 relative'>
            <img src={img} className='w-full h-[180px]' alt="" />
            <div className=' text-center space-y-1 py-2 px-5'>
                <p className='font-medium'>Sony 32” W8 Smart TV</p>
                <p className='text-[#338BFF] font-medium '>$5.58</p>
                <p className='text-[#2E2E2E]'>RobertSmith28</p>
                <p className='text-[#585858] font-semibold text-[24px]'>00:00:09</p>
                <button className='bg-yellow px-14 text-white rounded-md py-2 w-full'>{'Bid'}</button>
            </div>
            <FaRegStar size={22} className='absolute top-3 right-3 text-yellow' />
        </div>
  )
}

export default ProductCard     