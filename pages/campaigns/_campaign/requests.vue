<template>
    <div>
        requests {{ campaign_addr }}
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
