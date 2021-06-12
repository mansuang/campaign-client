import Web3 from "web3";
// require("dotenv").config({path: "../../.env"});
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
      // Modern dapp browsers...
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        console.log("Have web3 injected");
        try {
          // Request account access if needed
          // await window.ethereum.enable();
          window.ethereum.request({ method: 'eth_requestAccounts' });
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Fallback to localhost; use dev console port by default...
      else {
        // const provider = new Web3.providers.HttpProvider(
        //   "http://127.0.0.1:8545"
        // );
        console.log("No web3 instance injected, using Local web3.");
        const provider = new HDWalletProvider(
          "myself expand horn click column stay still glide lock private song world", 
          "http://127.0.0.1:7545", 
          AccountIndex);
        const web3 = new Web3(provider);
        
        resolve(web3);
      }
  });

export default getWeb3;
