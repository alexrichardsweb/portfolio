<template>
  <div
    :data-menu-item="slugify(menuItem.title)"
    :data-is-parent="hasChildren"
    :class="{ 'narrow-icon': narrowIcons.includes(menuItem.icon) }"
    class="menu-item"
    @click="handleClick"
  >
    <img
      :src="icon(menuItem.icon)"
      :alt="`${menuItem.title} icon`"
      :title="`Click to ${openText} ${menuItem.title}`"
      class="menu-item__icon"
    >
    <p class="menu-item__title">
      {{ menuItem.title }}
    </p>
    <span class="menu-item__parent-indicator">
      <div v-if="hasChildren" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    menuItem: Object,
  },
  data () {
    return {
      narrowIcons: [
        `shutdown`,
      ],
    };
  },
  computed: {
    hasChildren () {
      return this.menuItem.children?.length > 0;
    },
    openText () {
      return this.menuItem.title !== `shutdown` ? `open` : ``;
    },
  },
  mounted () {
    this.$nextTick(() => {
    });
  },
  methods: {
    handleClick () {
      if (!this.hasChildren) {
        this.$store.dispatch(`openProgram`, this.menuItem);
        this.$store.dispatch(`setMenuStatus`, false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

  .menu-item {
    cursor: pointer;
    display: grid;
    grid-template-columns: 40px 1fr 15px;
    gap: 1rem;
    align-items: center;
    padding: .35rem 0 .35rem .5rem;

    &__icon {
      height: 40px;
    }

    &__parent-indicator {
      > div {
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid $black;
      }
    }

    &.narrow-icon {
      grid-template-columns: 45px 1fr 15px;
      gap: calc(1rem - 5px);
      img {
        height: 45px;
      }
    }

    &[data-is-parent] {
      cursor: default;
    }

    &:hover,
    &:focus,
    &.active {
      background: $blue;
      color: $white;

      .menu-item__parent-indicator {
        > div {
          border-left-color: $white;
        }
      }
    }
  }

</style>
