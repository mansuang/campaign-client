<template>
  <div>
    <campaigns></campaigns>
  </div>
</template>

<script>

export default {
  data() {
      return {
          serverClient: null,
      }
  },
  methods: {

  },
  async created() {

    if( typeof window !== "undefined" ){
      this.serverClient = "client";
    }else{
      this.serverClient = "server";
    }

  }
}
</script>

<style>

</style>
