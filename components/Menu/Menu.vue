<template>
  <div
    v-on-clickaway="closeMenu"
    class="menu"
  >
    <div class="menu__label bg-darkgrey">
      <h4>
        <span class="c-grey">Windows</span>
        <span class="c-white">95</span>
      </h4>
    </div>
    <div class="menu__menu">
      <div class="menu__menu-items">
        <!-- V-for -->
        <MenuItem
          v-for="item in sortedMenu"
          :key="item.slug"
          :menu-item="item"
        />
      </div>
      <div class="menu__menu-shutdown">
        <MenuItem
          :menu-item="shutdown"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      sortedMenu: [],
      shutdown: {
        title: `Shut Down...`,
        icon: `shutdown`,
        slug: `shutdown`,
        parent: false,
        component: `Shutdown`,
      },
    };
  },

  mounted () {
    this.$nextTick(() => {
      this.sortMenu();
    });
  },
  methods: {
    sortMenu () {
      const sortedMenu = [];
      const menuItems = this.$store.state.menuItems;

      // Get Parent Menu Items
      for (const parentItem of menuItems) {
        if (!parentItem.parent) {
          parentItem.children = [];
          sortedMenu.push(parentItem);
        }
      }

      // Get Child Menu Items
      for (const parentItem of sortedMenu) {
        for (const childItem of menuItems) {
          if (childItem.parent === parentItem.slug) {
            parentItem.children.push(childItem);
          }
        }
      }

      this.sortedMenu = sortedMenu;
    },
  },
};
</script>

<style lang="scss" scoped>

$taskbarLabelWidth: 37.5px;

  .menu {
    @include position(fixed, auto, auto, $taskbarHeight - 5px, 2.5px);
    z-index: 5;
    display: grid;
    grid-template-columns: $taskbarLabelWidth 1fr;
    background: $grey;
    border: 3px outset;
    min-width: 275px;

    &__label {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: .5rem;
      h4 {
        display: flex;
        gap: .225rem;
        transform: rotate(-90deg);
        width: 100%;
        height: $taskbarLabelWidth;
        margin: 0;
        padding: 0;
        white-space: nowrap;
        font-family: sans-serif;
        @include fontSize(34px);
         letter-spacing: -1px;

        > span:first-of-type {
          text-shadow: 2px 0 $grey;
          font-weight: 900;
        }

        > span:last-of-type {
          font-weight: 300;
          transform: scale(1.05, .9);
        }
      }
    }

    &__menu {
      &-items {
        border-bottom: 1px solid $darkgrey;
      }

      &-shutdown {
        border-top: 1px solid $white;
        align-self: flex-end;
      }
    }
  }

</style>
