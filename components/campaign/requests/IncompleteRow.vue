<template>
        <sui-table-row>
            <sui-table-cell>{{ index+1 }}</sui-table-cell>
            <sui-table-cell>{{ request.description }}</sui-table-cell>
            <sui-table-cell>{{ web3.utils.fromWei(request.value,'ether') }}</sui-table-cell>
            <sui-table-cell>{{ request.recipient }}</sui-table-cell>
            <sui-table-cell>{{ request.approvalsCount }}/ {{ approversCount }}</sui-table-cell>
            <sui-table-cell>
                <sui-button basic positive @click="approve(index)" :loading="loading">Approve</sui-button>
            </sui-table-cell>
            <sui-table-cell>
                <sui-button basic negative @click="finalize(index)" :loading="loading">Finalize</sui-button>
            </sui-table-cell>
            <sui-table-cell>
                <sui-message error v-if="hasError">
                    <sui-message-header>Opps !</sui-message-header>
                    <p>
                        {{ errorMessage }}
                    </p>
                </sui-message>
            </sui-table-cell>
        </sui-table-row>

</template>

<script>
import web3 from "~/helpers/web3.js";
import CampaignJson from "~/contracts/Campaign.json";

export default {
    name: "CampaignRequestsTableRow",
    props: ['index', 'request','approversCount','campaign_addr'],
    data(){
        return {
            errorMessage: null,
            loading: false,
            web3: web3
        }
    },
    methods: {
        async approve(index) {
            if( this.loading ) return false;

            this.loading =true;
            this.errorMessage = null;

            try{
                // let web3 = web3();
                let accounts = await web3.eth.getAccounts();
                const campaign  = new web3.eth.Contract(CampaignJson.abi,this.campaign_addr);
            
                await campaign.methods.approveRequest(index).send({
                    from: accounts[0]
                });

                this.$emit('approved');

            }catch(err) {
                this.errorMessage = err.message;
            }

            this.loading = false;
        },
        async finalize(index) {
            if( this.loading ) return false;

            this.loading =true;
            this.errorMessage = null;

            try{
                // let web3 = await getWeb3();
                let accounts = await web3.eth.getAccounts();
                const campaign  = new web3.eth.Contract(CampaignJson.abi,this.campaign_addr);
            
                await campaign.methods.finalizeRequest(index).send({
                    from: accounts[0]
                });

                this.$emit('finalized');
            }catch(err) {
                this.errorMessage = err.message;
            }

            this.loading = false;
        }
    },
    computed: {
      hasError() {
          return this.errorMessage != null;
      }
  }
}
</script>