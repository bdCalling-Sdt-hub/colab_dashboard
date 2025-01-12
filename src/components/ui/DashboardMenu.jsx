import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Pagination } from 'swiper/modules';
import { Link, useLocation } from 'react-router-dom';
const DashboardMenu = () => {
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
        <SwiperSlide className={` text-center rounded-full border border-yellow  py-1 ${pathname ==='/my-profile/my-order' ? "bg-yellow text-white " : ""} `}><Link to='/my-profile/my-order'>My Orders</Link></SwiperSlide>
        <SwiperSlide className={` text-center rounded-full border border-yellow  py-1 ${pathname ==='/my-profile/bookmarks' ? "bg-yellow text-white " : ""} `}><Link to='/my-profile/bookmarks'>Bookmarks</Link></SwiperSlide>

        <SwiperSlide className={` text-center rounded-full border border-yellow test py-1 ${pathname ==='/my-profile/bidding-history' ? "bg-yellow text-white " : ""} `}><Link to='/my-profile/bidding-history'>Biding History</Link></SwiperSlide>
        <SwiperSlide className={` text-center rounded-full border border-yellow  py-1 ${pathname ==='/my-profile/my-bids' ? "bg-yellow text-white " : ""} `}><Link to='/my-profile/my-bids'>My Bids</Link></SwiperSlide>
       

    </Swiper>
</div>
  )
}

export default DashboardMenu