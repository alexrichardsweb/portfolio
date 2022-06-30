<template>
  <main id="app">
    <Nuxt />
  </main>
</template>

<script>
import Vue from 'vue';
import global from '~/mixins.js/global.js';
import windows from '~/mixins.js/windows.js';

Vue.mixin(global);
Vue.mixin(windows);

export default {
  mounted () {
    this.$nextTick(() => {
      this.getMenu();
    });
  },
  methods: {
    async getMenu () {
      let menu;
      try {
        menu = await this.$content(`menu`).fetch();
      } catch (e) {
        console.log(`Menu not found`);
      }

      this.$store.dispatch(`setMenuItems`, menu);
    },
  },
};
</script>

<style lang="scss" scoped>

main {
}

</style>
