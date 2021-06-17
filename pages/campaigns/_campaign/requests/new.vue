<template lang="html">
  <sui-form :error="hasError">
    <sui-header dividing>
         <NuxtLink :to="'/campaigns/'+campaign_addr+'/requests'"><sui-icon name="chevron circle left" /></NuxtLink> Create a Request
    </sui-header>

    <sui-form-field>
      <label>Description</label>
      <sui-input type="text" placeholder="Buy battery" v-model="request.description" />
    </sui-form-field>

    <sui-form-field>
      <label>Value in Ether</label>
      <sui-input type="number" min="0" placeholder="0.1" v-model="request.value" />
    </sui-form-field>

    <sui-form-field>
      <label>Recipient</label>
      <sui-input type="text" min="0" placeholder="0x0000000" v-model="request.recipient" />
    </sui-form-field>

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
import CampaignFactoryJson from "~/contracts/CampaignFactory.json";

export default {
  name: 'newCampaign',
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
          }
      }
  },
  methods: {
      async createCampaign() {
        if( this.loadingButton )
        {
            return false;
        }

        this.errorMessage = null;
        this.loadingButton = true;

        try{
            let web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();
            let factory  = new web3.eth.Contract(CampaignFactoryJson.abi,process.env.FACTORY_ADDR);
            let campaign = await factory.methods.createCampaign(this.minimumContribution).send({
                from: accounts[0]
            });

            this.$router.push({
                path: '/'
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
