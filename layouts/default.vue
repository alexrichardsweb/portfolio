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
      this.getBackgrounds();
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
    async getBackgrounds () {
      let backgroundSections;
      const backgrounds = [];
      try {
        backgroundSections = await this.$content(`backgrounds`).fetch();
      } catch (e) {
        console.log(`Backgrounds not found`);
      }

      for (const section of backgroundSections) {
        backgrounds.push({
          title: section.background_section,
          backgrounds: section.background_list,
        });
      }

      this.$store.dispatch(`setBackgrounds`, backgrounds);
    },
  },
};
</script>

<style lang="scss" scoped>

main {
}

</style>
