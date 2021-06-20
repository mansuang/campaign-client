import Web3 from "web3";
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new HDWalletProvider(
    process.env.MNEMONIC, 
    process.env.URI, 
    AccountIndex);
  web3 = new Web3(provider);
}

export default web3;
