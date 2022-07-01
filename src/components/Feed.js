import React from "react";
import "./Feed.css";
import { defaultImgs } from "../defaultimgs";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

const Feed = ({ profile }) => {
  const [snipArr, setSnipArr] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    async function getTweets() {
      try {
        const Snips = Moralis.Object.extend("Snips");
        const query = new Moralis.Query(Snips);
        if (profile) {
          query.equalTo("snipAcc", account);
        }
        const results = await query.find();

        setSnipArr(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    }
    getTweets();
  }, [profile]);

  return (
    <>
      {snipArr?.map((e) => {
        return (
          <>
            <div className="feed">
              <img src={e.attributes.snipPfp ? e.attributes.snipPfp : defaultImgs[0]} className="profilePic"></img>
              <div className="completeSnip">
                <div className="who">
                {e.attributes.snipUserName}
                  <div className="accWhen">{
                        `${e.attributes.snipAcc.slice(0,4)}...${e.attributes.snipAcc.slice(-5)} · 
                        ${e.attributes.createdAt.toLocaleString('en-us', { month: 'short' })}  
                        ${e.attributes.createdAt.toLocaleString('en-us', { day: 'numeric' })}
                        `  
                      }
                      </div>
                </div>
                <div className="snipContent">
                {e.attributes.snipTxt}
                {e.attributes.snipImg && (
                        <img
                          src={e.attributes.snipImg}
                          className="snipImg"
                        ></img>
                      )}
                </div>
                <div className="interactions">
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                  </div>
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="star" />
                    12
                  </div>
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="matic" />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }).reverse()}

     
    </>
  );
};

export default Feed;