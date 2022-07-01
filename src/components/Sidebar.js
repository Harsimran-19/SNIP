import React from "react";
import './Sidebar.css';
import {Icon} from 'web3uikit';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import { defaultImgs } from "../defaultimgs";
const Sidebar = () => {
  const { Moralis} = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
    <div className="siderContent">
      <div className="menu">
        <div className="details">
        <h1 className="Smalltitle">Snip</h1>
        </div>
       <div className="ItemContainer">
        <Link to="/" className="link">
        <div className="menuItems">
          <Icon fill="rgb(21, 21, 21)" size={28} svg={"list"}/>
          HOME
         </div>
        </Link>
        <Link to="/profile" className="link">
        <div className="menuItems">
          <Icon fill="rgb(21, 21, 21)" size={28} svg={"user"}/>
          Profile
         </div>
        </Link>
         <Link to="/settings" className="link">
         <div className="menuItems">
          <Icon fill="rgb(21, 21, 21)" size={28} svg={"cog"}/>
          Settings
         </div>
         </Link>
        </div>
        <div className="sideProfile">
        <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="Dp"></img>
        <div className="infoContainer">
        {user.attributes.username.slice(0,12)}
        <br />
        {`${user.attributes.ethAddress.slice(0,8)}...${user.attributes.ethAddress.slice(-5,)}`}
        </div>
        </div>
       
         
      </div>
    </div>
    </>
  );
};

export default Sidebar;

