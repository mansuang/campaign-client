<template lang="html">
  <sui-form :error="hasError"  :success="success"> 
    <sui-header dividing>
         <NuxtLink :to="'/campaigns/'+campaign_addr+'/requests'"><sui-icon name="chevron circle left" /></NuxtLink> Create a Request
    </sui-header>

    <sui-form-field>
      <label>Description</label>
      <sui-input type="text" placeholder="Buy battery" v-model="request.description" />
    </sui-form-field>

    <sui-form-field>
      <label>Value in Ether</label>
      <sui-input type="text" min="0" placeholder="0.1" v-model="request.value" />
    </sui-form-field>

    <sui-form-field>
      <label>Recipient</label>
      <sui-input type="text" min="0" placeholder="0x0000000" v-model="request.recipient" />
    </sui-form-field>

    <sui-message success>
        <sui-message-header>Request sent success! </sui-message-header>
        <p  style="overflow-wrap: break-word;">
            You request for <strong>{{ request.description }} </strong> 
            was successfully sent.
        </p>
    </sui-message>

    <sui-message error>
        <sui-message-header>Error</sui-message-header>
        <p>
            {{ errorMessage }}
        </p>
    </sui-message>

    <sui-button :loading="loadingButton" type="button" primary @click="createCampaign">Create</sui-button>
  </sui-form>
</template>

<script>
import getWeb3 from "~/helpers/getWeb3.js";
import CampaignJson from "~/contracts/Campaign.json";

export default {
  name: 'createRequest',
  asyncData( { params }) {
      return {
          campaign_addr: params.campaign,
          minimumContribution: 0,
          errorMessage: null,
          loadingButton: false,
          request: {
              description: '',
              value: 0,
              recipient: ''
          },
          success: false
      }
  },
  methods: {
      async createCampaign() {
        if( this.loadingButton )
        {
            return false;
        }
        this.success = false;
        this.errorMessage = null;
        this.loadingButton = true;

        try{
            let web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();
            let factory  = new web3.eth.Contract(CampaignJson.abi,this.campaign_addr);
            await factory.methods.createRequest(
              this.request.description,
              web3.utils.toWei( this.request.value,'ether'),
              this.request.recipient
            ).send({
                from: accounts[0]
            });

            // this.success = true;

            this.$router.push({
                path: '/campaigns/'+this.campaign_addr+'/requests'
            });
        }catch(err) {
            this.errorMessage = err.message;
        }

        this.loadingButton = false;

      }
  },
  computed: {
      hasError() {
          return this.errorMessage != null;
      }
  },
  created() {
      console.log(process.env.FACTORY_ADDR);
  }
};
</script>
