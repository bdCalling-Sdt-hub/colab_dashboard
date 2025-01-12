import React from 'react'
import { FaPaypal } from 'react-icons/fa'

const PaymentPayPal = () => {
    return (
        <div className='px-10 py-10'>
            <button className='flex items-center border text-[#338BFF] border-[#C0DBFF] w-full rounded-md justify-center py-2 '>
                <FaPaypal className='text-[#338BFF]' />
                Checkuot With PayPal
            </button>
        </div>
    )
}

export default PaymentPayPal