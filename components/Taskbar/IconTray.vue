<template>
  <div class="tray-icons">
    <div class="tray-icons__icons">
      <span
        class="tray-icons__icon"
        :data-tooltip="muted ? `No volume` : `Volume 93%`"
        data-tooltip-position="top"
        @click="muted = !muted"
      >
        <img
          v-if="muted"
          src="~/assets/icons/windows/Volume_Mute.svg"
        >
        <img
          v-else
          src="~/assets/icons/windows/Volume.svg"
        >
      </span>
    </div>
    <div
      :data-tooltip="getDate()"
      data-tooltip-position="top left"
      class="tray-icons__time ta-right"
    >
      {{ time }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      muted: true,
    };
  },
  computed: {
    time () {
      return this.getLocalTime();
    },
  },
  mounted () {
    this.$nextTick(() => {
    });
  },
};
</script>

<style lang="scss" scoped>

  .tray-icons {
    display: grid;
    grid-template-columns: 1fr 60px;
    align-items: center;
    border: inset 2px;
    padding: .25rem .5rem;
    height: 100%;
    cursor: default;

    &__time {
      @include fontSize(15px);
    }

    &__icons {
      height: 100%;
      display: grid;
      align-items: center;
    }

    &__icon {
      height: 20px;
      img {
        height: 100%;
      }
    }
  }

</style>
