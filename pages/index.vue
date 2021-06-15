<template>
  <div>
    <campaigns></campaigns>
  </div>
</template>

<script>

import getWeb3 from "../helpers/getWeb3.js";
import CampaignFactoryJson from "../contracts/CampaignFactory.json";
// import factory from "../helpers/campaignFactory.js"

export default {
  data() {
      return {
          serverClient: null,
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
