<template>
  <sui-grid>

    <sui-grid-row>
      <sui-grid-column>
        <sui-header dividing>
            <NuxtLink :to="'/'"><sui-icon name="chevron circle left" /></NuxtLink>  Campaign Show
        </sui-header>
        <sui-header>Campaign Show</sui-header>
        <sui-divider />
      </sui-grid-column>
    </sui-grid-row>

    <sui-grid-row>
      <sui-grid-column :width="12" divided>
        <sui-card-group :items-per-row="2">
          <sui-card v-for="(item,index) in items" :key="index">
            <sui-card-content>
              <sui-card-header style="overflow-wrap: break-word;">{{ item.header }}</sui-card-header>
              <sui-card-meta>{{ item.meta }}</sui-card-meta>
              <sui-card-description
                >{{ item.description }}</sui-card-description
              >
            </sui-card-content>
          </sui-card>
        </sui-card-group>
      </sui-grid-column>
      <sui-grid-column :width="4">
        <campaign-contribution-form :address="campaign_addr" @contributed="getCampaign"></campaign-contribution-form>
      </sui-grid-column>
    </sui-grid-row>

    <sui-grid-row>
      <sui-grid-column>
        <NuxtLink is="sui-button" primary :to="'/campaigns/'+campaign_addr+'/requests'" >View Requests</NuxtLink>
      </sui-grid-column>
    </sui-grid-row>

  </sui-grid>
</template>

<script>
import getWeb3 from "../../../helpers/getWeb3.js";
import CampaignJson from "../../../contracts/Campaign.json";

export default {
    name: "campaignShow",
    async asyncData({ params }) {
        return { 
                campaign_addr: params.campaign,
                inimumContribution: 0,
                balance: 0,
                numRequests: 0,
                approversCount: 0,
                manager: null,
                items: []
            }
    },
  methods: {
    async getCampaign(address) {
      console.log('getting campaign:'+address);

      let web3 = await getWeb3();
      let campaign  = new web3.eth.Contract(CampaignJson.abi, address);
      let summary = await campaign.methods.getSummary().call();
      
      this.minimumContribution = summary[0];
      this.balance = summary[1],
      this.numRequests = summary[2],
      this.approversCount = summary[3],
      this.manager = summary[4]

      this.items = [
      {
        header: this.manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
      },
      {
        header: web3.utils.fromWei(this.minimumContribution,'ether'),
        meta: "Minimum Contribution (ether)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: this.numRequests,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: this.approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(this.balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];
      //console.log(this.minimumContribution,this.balance,this.numRequests,this.approversCount,this.manager);
      // this.campaigns = await factory.methods.getDeployedCampaigns().call();
    }
  },
  async created() {
    console.log('begin getting campaigns');
    await this.getCampaign(this.campaign_addr);
    console.log('getting campaigns completed');
  }
}
</script>

<style>

</style>
