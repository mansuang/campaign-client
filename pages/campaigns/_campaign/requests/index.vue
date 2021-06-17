<template>
    <div>
        <sui-header dividing>
            <NuxtLink :to="'/campaigns/'+campaign_addr"><sui-icon name="chevron circle left" /></NuxtLink>  Requests
        </sui-header>
        requests address : {{ campaign_addr }}<br>
        <NuxtLink is="sui-button" primary :to="'/campaigns/'+campaign_addr+'/requests/new'" >Add Requests</NuxtLink>
        
    </div>
</template>

<script>
export default {
    name: "campaignRequests",
    async asyncData({ params }) {
        return { 
                campaign_addr: params.campaign
            }
    },
}
</script>
