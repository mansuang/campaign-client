<template>
  <div>
    <sui-menu style="margin-top:10px">
      <NuxtLink is="sui-menu-item" to="/" >CrownCoin</NuxtLink>
      <sui-menu-menu position="right">
        <NuxtLink is="sui-menu-item" to="/" >Campaigns</NuxtLink>
        <NuxtLink is="sui-menu-item" to="/campaigns/new" ><sui-icon name="plus" /></NuxtLink>
      </sui-menu-menu>
    </sui-menu>

  </div>
</template>

<script>
export default {
  name: 'PointingMenuSecondaryExample',
  data() {
    return {
      active: 'CrownCoin',
      items: ['CrownCoin'],
    };
  },
  methods: {
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
  },
};
</script>