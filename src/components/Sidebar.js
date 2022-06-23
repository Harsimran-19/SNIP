import React from "react";
import './Sidebar.css';
import {Icon} from 'web3uikit';
import {Link} from 'react-router-dom'

const Sidebar = () => {
  

  return (
    <>
    <div className="siderContent">
      <div className="menu">
        <div className="details">
        <h1>Snip</h1>
        </div>
        <Link to="/" className="link">
        <div className="menuItems">
          <Icon fill="#ffffff" size={33} svg={"list"}/>
          HOME
         </div>
        </Link>
        <Link to="/profile" className="link">
        <div className="menuItems">
          <Icon fill="#ffffff" size={33} svg={"user"}/>
          Profile
         </div>
        </Link>
         <Link to="/settings" className="link">
         <div className="menuItems">
          <Icon fill="#ffffff" size={33} svg={"cog"}/>
          Settings
         </div>
         </Link>
         
      </div>
    </div>
    </>
  );
};

export default Sidebar;

