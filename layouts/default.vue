<template>
  <main id="app">
    <Nuxt />
  </main>
</template>

<script>
import Vue from 'vue';
import global from '~/mixins.js/global.js';

Vue.mixin(global);

export default {
};
</script>

<style lang="scss" scoped>

main {

}

</style>
