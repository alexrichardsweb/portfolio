<template>
  <main
    class="windows"
    @keydown.esc="closeMenu"
  >
    <Menu v-if="menuOpen" />
    <Taskbar />
  </main>
</template>

<script>
export default {
  methods: {
  },
};
</script>
