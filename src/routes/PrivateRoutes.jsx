import { Navigate, useLocation } from "react-router-dom"
import { Skeleton } from "antd";
import { useGetUserProfileQuery } from "../redux/api/userApi";

 const PrivateRoutes = ({children}) =>{
    const location = useLocation()
    const { data: getUserInfo,isError, isLoading } = useGetUserProfileQuery();
    if(isLoading){
        return <div className="flex items-center justify-center"><Skeleton active /></div>;
    }
    if (isError || !getUserInfo?.data?.email) {
        return <Navigate to="/admin-login" state={{ from: location }} />;
      }
    
      return children;

}
export default PrivateRoutes;