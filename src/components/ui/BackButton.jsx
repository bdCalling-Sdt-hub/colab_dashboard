import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const BackButton = ({pageName}) => {
    return (
        <div className='py-3 flex items-center gap-2'>
            <Link to={-1}><IoArrowBackSharp className='text-yellow' /></Link>
            <p>Home / {pageName}</p>
        </div>

    )
}

export default BackButton