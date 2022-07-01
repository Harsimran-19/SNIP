import React from "react";
import "./Home.css";
import { defaultImgs } from "../defaultimgs";
import { TextArea, Icon } from "web3uikit";
import { useState, useRef } from "react";
import Feed from "../components/Feed";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const Home = () => {

  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [snip, setSnip] = useState();

  async function matic() {

    if (!snip) return;

    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }

    let options = {
      contractAddress: "0xd9145CCE52D386f254917e481eB44e9943F39138",
      functionName: "addSnip",
      abi: [{
        "inputs": [
          {
            "internalType": "string",
            "name": "snipTxt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "snipImg",
            "type": "string"
          }
        ],
        "name": "addSnip",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }],
      params: {
        snipTxt: snip,
        snipImg: img,
      },
      msgValue: Moralis.Units.ETH(1),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveSnip();
      },
      onError: (error) => {
        console.log(error.data.message)
      }
    });

  }


  async function saveSnip() {

    if(!snip) return;

    const Snips = Moralis.Object.extend("Snips");

    const newSnip = new Snips();

    newSnip.set("snipTxt", snip);
    newSnip.set("snipPfp", user.attributes.pfp);
    newSnip.set("snipAcc", user.attributes.ethAddress);
    newSnip.set("snipUserName", user.attributes.username);

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newSnip.set("snipImg", file.ipfs());
    }

    await newSnip.save();
    window.location.reload();

  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profilepost">
          <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
          <div className="postBox">
            <TextArea
              label=""
              name="TxtArea"
              placeholder="Say Something"
              type="text"
              onChange={(e) => setSnip(e.target.value)}
              width="95%"
            ></TextArea>
            {selectedFile && (
              <img src={selectedFile} className="postImg"></img>
            )}
            <div className="imgOrPost">
              <div className="imgDiv" onClick={onImageClick}>
              <input
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none"}}
                />
                <Icon fill="#0ccdcd" size={20} svg="image"></Icon>
              </div>
              <div className="postOptions">
                <div className="post" onClick={saveSnip}>Post</div>
                <div className=" matic" onClick={matic} >
                  <Icon fill="#ffffff" size={20} svg="matic" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Feed profile={false}/>
      </div>
    </>
  );
};

export default Home;