import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';


const SocketContextData = createContext();

export const useSocketContext = () => {
    return useContext(SocketContextData);
};
const SocketProviders = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [socketId, setSocketId] = useState(null);
    const [notifications, setNotifications] = useState([])
    // const [notificationLimit, setNotificationLimit] = useState(50)
    const [newNotifications, setNewNotification] = useState(0)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const socketConnect = io(`https://api.sellaze.com`, {
            // const socketConnect = io(`http://167.71.20.155:5000`, {
            // const socketConnect = io(`http://192.168.10.11:5000`, {
                auth: {
                    token: JSON.parse(localStorage.getItem("token")),
                }
            });
            setSocket(socketConnect);
          ;
            socketConnect.on("connect", () => {
                setSocketId(socketConnect.id);
            });
            // socketConnect.on("notifications", (notification) => {
            //     setNotifications(prev => [notification?.notifications, ...prev])
            // });
            socketConnect.on("admin-notifications" ,(notification) =>{
                setNewNotification(notification?.unseenCount)
                setNotifications(notification?.notifications)
            } )
            return () => socketConnect.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [localStorage.getItem("token")]);
    const socketData = {
        socket,
        notifications,
        newNotifications
    }
    return (
        <SocketContextData.Provider value={socketData}>{children}</SocketContextData.Provider>
    )
}

export default SocketProviders