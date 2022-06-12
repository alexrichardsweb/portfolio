<template>
  <div class="taskbar">
    <div class="taskbar__content">
      <button
        :class="{ 'active' : menuOpen }"
        class="taskbar__start-button"
        @click="setMenu"
      >
        <span>
          <img
            src="~assets/icons/windows/Start_Button.png"
            alt="Start Button"
            title="Click to open Start Menu"
          >
          <span>Start</span>
        </span>
      </button>
      <OpenTasks />
      <IconTray />
    </div>
  </div>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      startOpen: false,
    };
  },
  mounted () {
    this.$nextTick(() => {
    });
  },
  methods: {
    setMenu () {
      this.$store.dispatch(`setMenuStatus`, !this.menuOpen);
    },
  },
};
</script>

<style lang="scss" scoped>

  .taskbar {
    @include position(fixed, auto);
    background: $grey;
    height: calc(#{$taskbarHeight} - 2px);
    border-top: 1px solid $white;

    &__content {
      display: grid;
      grid-template-columns: auto 1fr 110px;
      gap: 1rem;
      align-items: center;
      height: 100%;
      padding: .2rem .15rem .2rem .3rem;
      position: relative;
      &:before {
        content: '';
        @include position(absolute, -2px);
        border-top: 1px solid $grey;
      }
    }
    &__start-button {
      margin-top: -2px;
    }
  }

  button {
    color: $black;
    background-color: $grey;
    font-family: inherit;
    border: outset 1px;
    padding: .15rem .25rem;
    position: relative;
    @include fontSize(16px);
    line-height: 1rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 27.5px;

    &:not(:disabled) {
      cursor: pointer;

      &:active > span,
      &:focus > span,
      &.active > span {
        border-color: $black;
      }
    }

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: -2px;
      right: -3px;
      bottom: -3px;
      left: -2px;
    }

    &:before {
      border-top: 1px solid $white;
      border-left: 1px solid $white;
    }

    &:after {
      border-bottom: 2px solid $black;
      border-right: 2px solid $black;
    }

    > span {
      border: 1px transparent dotted;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: .25rem;

      > span {
        margin-top: -.25rem;
      }
    }

    img {
      max-height: 20px;
    }

    &.active {
      border-style: inset;

      &:before,
      &:after {
        content: '';
        position: absolute;
        top: -3px;
        right: -2px;
        bottom: -2px;
        left: -3px;
      }

      &:before {
        border-top: 2px solid $black;
        border-left: 2px solid $black;
      }

      &:after {
        border-bottom: 1px solid $white;
        border-right: 1px solid $white;
      }
    }
  }

</style>
