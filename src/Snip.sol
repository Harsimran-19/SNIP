//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract Snip{
    address public owner;
    uint256 private counter;

    constructor(){
        counter=0;
        owner=msg.sender;
    }

    struct snip{
        address snipper;
        uint256 id;
        string snipTxt;
        string snipImg;
    }

    event snipCreated(
        address snipper,
        uint256 id,
        string snipTxt,
        string snipImg
     );

    mapping(uint256=>snip) Snips;

    function addSnip(
        string memory snipTxt,
        string memory snipImg
    )public payable{
        require(msg.value==(1 ether),"Please submit 1 Matic");
        snip storage newSnip=Snips[counter];
        newSnip.snipTxt=snipTxt;
        newSnip.snipImg=snipImg;
        newSnip.snipper=msg.sender;
        newSnip.id=counter;
        emit snipCreated(
            msg.sender,
            counter,
            snipTxt,
            snipImg
        );
        counter++; 

        payable(owner).transfer(msg.value);
    }
    function getSnip(uint256 id) public view returns (
        string memory,
        string memory,
        address
    ){
        require(id<counter,"No such Snip");
        snip storage s = Snips[id];
        return (s.snipTxt,s.snipImg,s.snipper);
    }

}