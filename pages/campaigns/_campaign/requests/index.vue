<template>
    <div>
        <sui-header dividing>
            <NuxtLink :to="'/campaigns/'+campaign_addr"><sui-icon name="chevron circle left" /></NuxtLink>  Requests
        </sui-header>

        <NuxtLink is="sui-button" primary :to="'/campaigns/'+campaign_addr+'/requests/new'" >Add Requests</NuxtLink>
        <sui-message error v-if="hasError">
            <sui-message-header>Opps !</sui-message-header>
            <p>
                {{ errorMessage }}
            </p>
        </sui-message>
    
        <sui-segment>
            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>
            
            <sui-table compact>
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell>ID</sui-table-header-cell>
                        <sui-table-header-cell>Description</sui-table-header-cell>
                        <sui-table-header-cell>Amount(Ether)</sui-table-header-cell>
                        <sui-table-header-cell>Recepient</sui-table-header-cell>
                        <sui-table-header-cell>Approval Count</sui-table-header-cell>
                        <sui-table-header-cell>Approve</sui-table-header-cell>
                        <sui-table-header-cell>Finalize</sui-table-header-cell>
                        <sui-table-header-cell>Message</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
                <sui-table-body v-if="requests && requests.length">
                    <campaign-requests-incomplete-row v-for="(request,index) in requests" 
                        :request="request" 
                        :key="index" 
                        :index="index" 
                        :approversCount="approversCount"
                        :campaign_addr="campaign_addr"
                        @approved="getRequests"
                        @finalized="getRequests"
                    ></campaign-requests-incomplete-row>
                </sui-table-body>
                <sui-table-body v-else>
                    <sui-table-row>
                        <sui-table-cell colspan="8">There is no request at the moment.</sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </sui-segment>
    </div>
</template>

<script>
// import web3 from 'web3'
import web3 from "~/helpers/web3.js";
import CampaignJson from "~/contracts/Campaign.json";

export default {
  name: 'campaignRequests',
  asyncData( { params }) {
      return {
          campaign_addr: params.campaign,
          minimumContribution: 0,
          errorMessage: null,
          loading: false,
          request: {
              description: '',
              value: 0,
              recipient: ''
          },
          success: false,
          requests: null,
          approversCount: 0
      }
  },
  methods: {
      async getRequests() {
        this.loading = true;
        this.errorMessage = null;

        try{
            // let web3 = await getWeb3();
            // let accounts = await web3.eth.getAccounts();
            const campaign  = new web3.eth.Contract(CampaignJson.abi,this.campaign_addr);
           

            const requestCount = parseInt(await campaign.methods.getRequestsCount().call());
            console.log('request count', requestCount);
            this.approversCount = await campaign.methods.approversCount().call();
            this.requests = await Promise.all(
                Array(requestCount).fill().map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
            );
            console.log(this.requests);
            

            this.success = true;

        }catch(err) {
            this.errorMessage = err.message;
        }

        this.loading = false;

      },

  },
  computed: {
      hasError() {
          return this.errorMessage != null;
      }
  },
  async created() {
      await this.getRequests();
  }
};
</script>
