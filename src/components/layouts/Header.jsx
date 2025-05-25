/* eslint-disable no-unused-vars */
import { Badge } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../../redux/api/userApi";
import { useSocketContext } from "../../lib/SocketProviders";
import { useReadNotificationMutation } from "../../redux/api/dashboardApi";
import { imageUrl } from "../../redux/api/baseApi";
import defaultProfileImage from "../../assets/defult_profile_image.png";
const Header = () => {
  const { newNotifications } = useSocketContext();
  const [readNotification] = useReadNotificationMutation();
  const { data: getUserInfo, isError, isLoading } = useGetUserProfileQuery();
  const navigate = useNavigate();

  return (
    <div className="w-full py-4 bg-[#2e2e2e] flex justify-end items-center  gap-4">
      {/* <div>
        <Link
          to="/notification"
          style={{ boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.24)" }}
          className=" bg-white h-10 flex items-center w-10 rounded-full p-2"
        >
          <Badge count={newNotifications || 0}>
            <IoIosNotificationsOutline className="text-black" size={25} />
          </Badge>
        </Link>
      </div> */}
      <div
        onClick={() => navigate("/profile")}
        className="flex justify-end items-center gap-1 border-gray-400 p-[2px] px-4 rounded-md cursor-pointer"
      >
        <img
          className="h-12 w-12 rounded-full border border-yellow p-[1px] object-cover"
          // src={`${getUserInfo?.data?.profile_image}`}
          src={
            getUserInfo?.data?.profile_image
              ? `${getUserInfo?.data?.profile_image}`
              : `${defaultProfileImage}`
          }
          alt=""
        />
        <p className="font-medium text-[20px] text-white pl-4">
          {getUserInfo?.data?.name || "Mr Admin"}
        </p>
      </div>
    </div>
  );
};

export default Header;
