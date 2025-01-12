import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";


const LeftMenu = ({ mode }) => {
  return (
    <Menu  mode={mode}>
     <Menu.Item key="myaccount" ><Link to='/my-account'>My account</Link></Menu.Item>
      <Menu.Item key="notificatio"><Link to='/my-account'>Notification</Link></Menu.Item>
      <Menu.Item key="winner"><Link to='/winner'>Winner</Link></Menu.Item>
      <Menu.Item key="help"><Link to='/help'>Help</Link></Menu.Item>
      <Menu.Item key="contact"><Link to='/contact'>Contact</Link></Menu.Item>
      <Menu.Item key="logout"><Link to='/logout'>Log Out</Link></Menu.Item>
      
    </Menu>
  )
}

export default LeftMenu