<template>
  <main
    class="windows bg-green"
    :style="styles"
  >
    <Menu v-if="menuOpen" />
    <Taskbar />

    <ProgramArea />
  </main>
</template>

<script>
export default {
  computed: {
    styles () {
      if (this.hasBackground) {
        let image = ``;
        let position = ``;
        let repeat = ``;
        let size = ``;
        const separator = this.activeBackground.pattern !== `` && this.activeBackground.wallpaper !== ``
          ? `, `
          : ``;

        if (this.activeBackground.wallpaper !== ``) {
          image += `url("${this.getImage(this.activeBackground.wallpaper, `wallpaper`)}")`;
          if (this.activeBackground.display === `centre`) {
            position += `center`;
            repeat += `no-repeat`;
            size += `calc(50% - 84px)`;
          } else {
            position += `left top`;
            repeat += `repeat`;
            size += `20px`;
          }
        }
        if (this.activeBackground.pattern !== ``) {
          image += `${separator}url("${this.getImage(this.activeBackground.pattern, `pattern`)}")`;

          if (this.activeBackground.display === `centre`) {
            position += `${separator}left top`;
            repeat += `${separator}repeat`;
            size += `${separator}20px`;
          }
        }
        return {
          backgroundImage: image,
          backgroundPosition: position,
          backgroundRepeat: repeat,
          backgroundSize: size,
        };
      }
      return ``;
    },
    hasBackground () {
      return this.activeBackground.pattern !== `` || this.activeBackground.wallpaper !== ``;
    },
    activeBackground () {
      return this.$store.state.background.activeBackground;
    },
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>

  .windows {
    @include position(fixed);

    &.no-background {
    }
  }

</style>
