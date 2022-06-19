<template>
  <div
    :data-menu-item="slugify(menuItem.title)"
    :data-is-parent="menuItem.parent"
    class="menu-item"
    @click="$emit('opened')"
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
      <i
        v-if="hasChildren"
        class="icon-chevron-right"
      />
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

  },
};
</script>

<style lang="scss" scoped>

  .menu-item {
    cursor: pointer;
    display: grid;
    grid-template-columns: 45px 1fr 15px;
    gap: .75rem;
    align-items: center;
    padding: .25rem 0 .25rem .5rem;

    &__icon {
      height: 45px;
    }

    &[data-is-parent] {
      cursor: default;
    }

    &:hover,
    &:focus,
    &.active {
      background: $blue;
      color: $white;
    }
  }

</style>
