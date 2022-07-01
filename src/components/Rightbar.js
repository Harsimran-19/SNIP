import React from "react";
import './Rightbar.css';
import { Input,Icon } from "web3uikit";

const Rightbar = () => {
  const trends = [
    {
      
      title: "Web 3.0",
    },
    {

      title: "Dapp",
    },
    {

      title: "React",
    },
    {

      title: "Solidity",
    },
    {

      title: "MoralisDb",
    },
  ];

  return (
    <>
    <div className="rightbarContent">
      <Input
      label="Search Something"
      name="Search Something"
      prefixIcon="search"
      labelBgColor="white">
       
      </Input>
     
      <div className="trends">
        <div className="headCont">
      <h3 className="head">Trending</h3>
        </div>

      {trends.map((e)=>{
        return(
          <>
          <div className="trend" >
<div className="trendItem">
<h3 className="hash"># </h3>          <p className="trendTxt">{e.title}</p>
</div>
  
</div>
          </>
        )
      })}
      </div>
    </div>
    </>
  );
};

export default Rightbar;

