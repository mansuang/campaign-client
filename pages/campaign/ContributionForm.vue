<template>
    <sui-form :error="hasError">  
        <sui-form-field>
            <label>Amount to Contribute (ether)</label>
            <sui-input type="text" min="0" placeholder="100" v-model="contributionAmount" />
        </sui-form-field>
        <sui-message error>
            <sui-message-header>Error</sui-message-header>
            <p>
                {{ errorMessage }}
            </p>
        </sui-message>
        <sui-button :loading="loadingButton" type="button" primary @click="contribute">Contribute!!</sui-button>
    </sui-form>
</template>

<script>

import getWeb3 from "../../helpers/getWeb3.js";
import CampaignJson from "../../contracts/Campaign.json";
export default {
  name: 'contributionForm',
  props: ['address'],
  data() {
      return {
          contributionAmount: 0,
          errorMessage: null,
          loadingButton: false
      }
  },
  methods: {
      async contribute() {
        if( this.loadingButton )
        {
            return false;
        }

        this.errorMessage = null;
        this.loadingButton = true;

        try{
            let web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();
            let factory  = new web3.eth.Contract(CampaignJson.abi,this.address);
            let campaign = await factory.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.contributionAmount,'ether')
            });

            // this.$router.push({
            //     path: '/'
            // });
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
}
</script>
