import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import Web3 from 'web3';
import {OpenSeaPort,Network} from 'opensea-js'

const contract_Address= '0xdf348Ceb7c303Fb20907e2843e9420d83e3fe063';
const token_ID= '191';
const myWalletAddress= '0xf2aB85a5e4865631230A26EAac4741BA736fB785';
function App() {
useEffect(()=>{
  const connect = async()=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const res = await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner()
  console.log(res);

  const opensea = new OpenSeaPort(provider.provider, {
    networkName: Network.Rinkeby,
    apiKey: ''
  })
  // // Get Asset
  const myAsset = await opensea.api.getAsset
  ({
        tokenAddress: contract_Address,
        tokenId:token_ID
      })
  console.log(myAsset)
 // // Make Offer 
  const offer = await opensea.createBuyOrder({
        asset: myAsset,
        accountAddress: myWalletAddress,
        startAmount: 0.001,
        quantity: 1,
     })
  console.log(offer);
  //Fetch Order
  const order = await opensea.api.getOrder({
    assetContractAddress: contract_Address,
    tokenId: token_ID,
    side: "ask"
  });
  console.log(order);
  //Buying Module
  const transactionHash =await opensea.fulfillOrder({
    order:order,
    accountAddress: myWalletAddress,
    recipientAddress: myWalletAddress
  })
  console.log(transactionHash);
  //Selling Module
const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24)
const TokenId= '1636';
const TokenAddress= '0x498815B71eD94Aa99974FA28BF169b9F655Ee192';
const listing = await opensea.createSellOrder({
  asset: {
    tokenId: TokenId,
    tokenAddress: TokenAddress,
  },
  accountAddress: myWalletAddress,
  startAmount: 10,
  // If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order:
  //endAmount: 0.1,
  expirationTime: expirationTime
})
console.log(listing);
// // Biding Based Auction Module
const paymentTokenAddress= '0xc778417E063141139Fce010982780140Aa0cD5Ab';
const expirationtime = Math.round(Date.now()/ 1000+ 60* 60 * 24);
const Tokenaddress = "0x498815B71eD94Aa99974FA28BF169b9F655Ee192";
const Tokenid= '1832';
const startAmount= 100;

const auction = await opensea.createSellOrder({
  asset:{
    tokenId: Tokenid,
    tokenAddress: Tokenaddress
  },
  accountAddress: myWalletAddress,
  startAmount: startAmount,
  expirationTime: expirationtime,
  paymentTokenAddress:paymentTokenAddress,
  waitForHighestBid: true
})
console.log (auction);
}
  connect();
}, [])

  return (
    <div className="App">
  
    </div>
  );
}
export default App;
