<template>
  <div>
    <sui-menu style="margin-top:10px">
      <a
        is="sui-menu-item"
        v-for="item in items"
        :active="isActive(item)"
        :key="item"
        :content="item"
        @click="select(item)"
      />
      <sui-menu-menu position="right">
        <a
          is="sui-menu-item"
          :active="isActive('Campaigns')"
          content="Campaigns"
          @click="select('Campaigns')"
        />
        <a is="sui-menu-item">
          <sui-icon name="plus" />
        </a>
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