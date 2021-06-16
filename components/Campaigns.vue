<template lang="html">
  <div>
    <h3>Open Campaigns ( {{ campaigns.length }} )</h3>
    <NuxtLink is="sui-button" to="/campaigns/new" content="New Campaign" icon="plus circle" label-position="left" primary style="margin-bottom:10px;" />
    <sui-card-group>
      <sui-card v-for="address in campaigns" :key="address" class="fluid">
        <sui-card-content>
          <sui-card-header>{{ address }}</sui-card-header>
          <sui-card-description>
            <NuxtLink :to="'/campaign/'+address">View Campaign</NuxtLink>
          </sui-card-description
          >
        </sui-card-content>
      </sui-card>
    </sui-card-group>
  </div>
</template>

<script>
import getWeb3 from "../helpers/getWeb3.js";
import CampaignFactoryJson from "../contracts/CampaignFactory.json";
export default {
  name: 'Campaigns',
  data() {
    return {
      campaigns: []
    }
  },
  async fetch() {

  },
  methods: {
    async getFactory() {
      let web3 = await getWeb3();
      let factory  = new web3.eth.Contract(CampaignFactoryJson.abi,process.env.FACTORY_ADDR);
      this.campaigns = await factory.methods.getDeployedCampaigns().call();
    }
  },
  async created() {
    console.log('begin getting campaigns');
    await this.getFactory();
    console.log('getting campaigns completed');
  }
};
</script>