<template>
  <div
    class="desktop-icons"
  >
    <div class="desktop-icons__wrapper p-1">
      <DesktopIcon
        v-for="icon in iconList"
        :key="icon.slug"
        :desktop-icon="icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
    };
  },
  computed: {
    iconList () {
      const menuItems = this.$store.state.menuItems;
      return [...menuItems].filter(item => item.has_desktop_icon);
    },
  },
  mounted () {
  },
};
</script>

<style lang="scss" scoped>

  .desktop-icons {
    @include position(fixed, 0, 0, #{$taskbarHeight}, 0);

    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
    }
  }

</style>
