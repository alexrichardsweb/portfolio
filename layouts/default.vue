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
};
</script>

<style lang="scss" scoped>

main {

}

</style>
