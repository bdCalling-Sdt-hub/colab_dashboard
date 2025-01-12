import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import FinancialApplied from '../../components/ui/FinancialApplied'
import FinancialApproved from '../../components/ui/FinancialApproved'
import { useFinancialManagementQuery } from '../../redux/api/dashboardApi'

const FinancialManagement = () => {
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useState('')
    const [applied, setApplied] = useState(false)
    const {data : financialData} =  useFinancialManagementQuery({applied ,  page })

    const handleApprovedModal = ()=>{
        setApplied(true)
    }

    const handleAppliedModal = ()=>{
        setApplied(false)
    }
    return (
        <div className='bg-white rounded-md p-5'>
            <div className="flex justify-between item-center mb-5">
                <div className="flex items-center gap-2">
                    <Link to={-1}><FaArrowLeft size={18} className='text-yellow ' /></Link>
                    <span className='font-semibold text-[20px]'>Financial Management</span></div>
                {/* <div>
                    <div className="relative">
                        <input
                            onChange={(e) => setSearchParams(e.target.value)}
                            type="text"
                            placeholder="Search here..."
                            className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">

                            <CiSearch />
                        </span>
                    </div>
                </div> */}
            </div>


            <div className='flex items-center gap-5 px-5'>
                <button onClick={() => handleAppliedModal()} className={` ${!applied ? 'bg-yellow text-white' : 'border border-yellow text-yellow'} px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}>

                    Applied
                </button>
                <button onClick={() => handleApprovedModal()} className={` ${!applied ? 'border border-yellow text-yellow' : 'bg-yellow text-white'}  px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}>

                    Approved
                </button>
            </div>

            {
                applied ? <FinancialApproved financialData={financialData} page={page} setPage={setPage} /> : <FinancialApplied financialData={financialData} page={page} setPage={setPage} /> 
            }
        </div>
    )
}

export default FinancialManagement