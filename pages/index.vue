<template>
  <div class="container">
    Code Running on: {{ serverClient }}
    <br>
    Campaign address : {{ accounts }}
    <br>
    lastBlockNumber : {{ lastBlockNumber }}
  </div>
</template>

<script>

import getWeb3 from "../helpers/getWeb3.js";
const HDWalletProvider = require("@truffle/hdwallet-provider");


export default {
  async asyncData() {
      var web3 = await getWeb3();
      let lastBlockNumber = await web3.eth.getBlockNumber();
      let accounts = await web3.eth.getAccounts();

      return {
          accounts: accounts,
          contract: null,
          serverClient: 'none',
          lastBlockNumber: lastBlockNumber
      }
  },
  methods: {

  },
  async created() {

    // this.init();
    if( typeof window !== "undefined" ){
      this.serverClient = "client";
    }else{
      this.serverClient = "server";
    }
  }
}
</script>

<style>

</style>
