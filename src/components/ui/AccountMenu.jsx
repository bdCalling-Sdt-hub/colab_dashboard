import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Pagination } from 'swiper/modules';
import { Link, useLocation } from 'react-router-dom';
const AccountMenu = () => {
    const { pathname } = useLocation();

  return (
    <div >
    <Swiper
        slidesPerView={3.5}
        spaceBetween={5}
        centeredSlides={true}
        pagination={{
            clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
    >
        <SwiperSlide className={` text-center rounded-full border border-yellow  py-1 ${pathname ==='/my-profile' ? "bg-yellow text-white " : ""} `}><Link to='/my-profile'>My Profile</Link></SwiperSlide>
        <SwiperSlide className={` text-center rounded-full border border-yellow test  py-1 ${pathname ==='/my-profile/address-book' ? "bg-yellow text-white " : ""} `}><Link to='/my-profile/address-book'>Address Book</Link></SwiperSlide>

        <SwiperSlide className={` text-center rounded-full test border border-yellow  py-1 ${pathname ==='/my-profile/change-password' ? "bg-yellow text-white " : ""} `}><Link to='/my-profile/change-password'>Change Password</Link></SwiperSlide>
       

    </Swiper>
</div>
  )
}

export default AccountMenu