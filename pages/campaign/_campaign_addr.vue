<template>
  <div>
    Address: {{ campaign_addr }}<br>
    Params: {{ pars }}
  </div>
</template>

<script>

export default {
    async asyncData({ params }) {
        return { 
                campaign_addr: params.campaign_addr,
                pars: params
            }
    },
  methods: {

  },
  created() {
  }
}
</script>

<style>

</style>
