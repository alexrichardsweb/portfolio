<template>
  <interact
    class="desktop-icon"
    :style="windowStyle"
    :drag-option="dragOption"
    draggable
    @dragmove="dragmove"
  >
    <div
      class="desktop-icon__wrapper"
      @dblclick="openProgram"
    >
      <div class="desktop-icon__icon">
        <img
          :src="icon(desktopIcon.icon)"
          :alt="`${desktopIcon.title} icon`"
          :title="`Click to open ${desktopIcon.title}`"
          class="menu-item__icon"
        >
      </div>
      <div
        :class="{ 'bg-green' : !transparentIcon }"
        class="desktop-icon__title c-white"
      >
        {{ desktopIcon.title }}
      </div>
    </div>
  </interact>
</template>

<script>
export default {
  props: {
    desktopIcon: Object,
  },
  data () {
    return {
      positionY: 0,
      positionX: 0,
      dragOption: {
        cursorChecker (action, interactable, element, interacting) {
          return `default`;
        },
      },
    };
  },
  computed: {
    windowStyle () {
      return {
        transform: `translateX(${this.positionX}px) translateY(${this.positionY}px)`,
      };
    },
    transparentIcon () {
      return this.$store.state.background.transparentMenuItems;
    },
  },
  mounted () {
    this.$nextTick(() => {
    });
  },
  methods: {
    openProgram () {
      this.$store.dispatch(`openProgram`, this.desktopIcon);
    },
    dragmove (event) {
      this.positionX += event.dx;
      this.positionY += event.dy;
    },
  },
};
</script>

<style lang="scss" scoped>

  .desktop-icon {
    cursor: default;
    min-width: 70px;

    &__wrapper {
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      gap: .25rem;
    }

    &__icon {
      img {
        height: 40px;
      }
    }

    &__title {
      @include fontSize(14px);
      padding: .05rem;
      max-width: 100px;
      text-align: center;
    }

    &:active {
      .desktop-icon__title {
        background: $blue;
      }
    }
  }

</style>
