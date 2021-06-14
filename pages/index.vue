<template>
  <div>
    <campaigns :value="campaigns"></campaigns>
  </div>
</template>

<script>

import getWeb3 from "../helpers/getWeb3.js";
import CampaignFactory from "../contracts/CampaignFactory.json";

export default {
  async asyncData() {
      var web3 = await getWeb3();
      let lastBlockNumber = await web3.eth.getBlockNumber();
      let accounts = await web3.eth.getAccounts();
      let factory  = new web3.eth.Contract(CampaignFactory.abi,'0xF51d44E6be69aD57796d1F2c62b417D90BdeBB69');

    const campaigns = await factory.methods.getDeployedCampaigns().call();
    // console.log(factory);
    console.log(factory.options.address);
    console.log(campaigns);
    

      return {
          accounts: accounts,
          contract: null,
          serverClient: 'none',
          lastBlockNumber: lastBlockNumber,
          campaigns: campaigns
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
