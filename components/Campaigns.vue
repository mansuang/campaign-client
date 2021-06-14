<template lang="html">
  <div>
    <h3>Open Campaigns</h3>
    <sui-button content="New Campaign" icon="plus circle" label-position="left" primary style="margin-bottom:10px;" />
    <sui-card-group>
      <sui-card v-for="address in value" :key="address" class="fluid">
        <sui-card-content>
          <sui-card-header>{{ address }}</sui-card-header>
          <sui-card-description
            ><a>View Campaign</a> </sui-card-description
          >
          
        </sui-card-content>
      </sui-card>
    </sui-card-group>
  </div>
</template>

<script>
export default {
  name: 'HeaderCardExample',
  props: ['value']
};
</script>