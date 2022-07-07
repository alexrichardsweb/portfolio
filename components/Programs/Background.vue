<template>
  <div class="change-background program">
    <div class="change-background__display box-shadow">
      <div class="change-background__display-outer">
        <div class="change-background__display-wrapper box-shadow-inner bg-green">
          <div
            v-if="currentBackground.pattern"
            :style="`background-image: url(${getImage(currentBackground.pattern, 'pattern')})`"
            class="change-background__display-pattern"
          />
          <div
            v-if="currentBackground.wallpaper"
            :style="`background-image: url(${getImage(currentBackground.wallpaper, 'wallpaper')})`"
            :class="display"
            class="change-background__display-wallpaper"
          />
        </div>
      </div>
    </div>
    <div class="change-background__controls">
      <fieldset
        v-for="section in sections"
        :key="section.title"
        :class="`change-background__controls-${section.title}`"
      >
        <legend>{{ section.title }}</legend>
        <select
          v-model="currentBackground[section.title.toLowerCase()]"
          size="5"
        >
          <option value="">
            None
          </option>
          <option
            v-for="background in section.backgrounds"
            :key="background"
            :value="background"
          >
            {{ background }}
          </option>
        </select>
        <div
          v-if="section.title === 'Wallpaper'"
          class="change-background__controls-options pt-0-25"
        >
          <div class="change-background__controls-display">
            <label>Display</label>
            <div class="change-background__controls-display-option">
              <input
                id="tile"
                v-model="display"
                type="radio"
                name="tile"
                value="tile"
              >
              <label for="tile">Tile</label>
            </div>
            <div class="change-background__controls-display-option">
              <input
                id="centre"
                v-model="display"
                type="radio"
                name="centre"
                value="centre"
              >
              <label for="centre">Centre</label>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="change-background__controls-options">
            <div class="change-background__controls-display--full pt-0-75">
              <input
                id="transparent"
                v-model="transparentIcons"
                type="checkbox"
                name="transparent"
              >
              <label for="transparent">Transparent Icons</label>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="change-background__buttons">
      <button @click="okClicked">
        OK
      </button>
      <button @click="closeProgram('background')">
        Cancel
      </button>
      <button @click="applyClicked">
        Apply
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /*
      TODO: vuex doesn't like this
      currentBackground: {
        wallpaper: ``,
        pattern: ``,
        display: `tile`,
      },
      */
      currentBackground: {
        wallpaper: ``,
        pattern: ``,
      },
      display: `tile`,
      transparentIcons: false,
    };
  },
  computed: {
    sections () {
      return [...this.$store.state.background.backgrounds].sort((a, b) => a.title.localeCompare(b.title));
    },
  },
  watch: {
  },
  mounted () {
    this.$nextTick(() => {
      const currentBackground = { ...this.$store.state.background.activeBackground };
      this.currentBackground.wallpaper = currentBackground.wallpaper;
      this.currentBackground.pattern = currentBackground.pattern;
      this.display = currentBackground.display;
      this.transparentIcons = this.$store.state.background.transparentMenuItems;
    });
  },
  methods: {
    applyBackground () {
      this.$store.dispatch(`setBackground`, {
        wallpaper: this.currentBackground.wallpaper,
        pattern: this.currentBackground.pattern,
        display: this.display,
      });
    },
    applyTransparency () {
      this.$store.dispatch(`setMenuItemTransparency`, this.transparentIcons);
    },
    applyClicked () {
      this.applyBackground();
      this.applyTransparency();
    },
    okClicked () {
      this.applyClicked();
      this.closeProgram(`background`);
    },
  },
};
</script>

<style lang="scss" scoped>

  .change-background {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr 25px;
    gap: .75rem;

    &__display {
      width: 200px;
      height: 175px;
      place-self: center;
      position: relative;

      &.box-shadow {
        box-shadow: inset -3px -3px rgba(10,10,10,.7),
        inset 3px 3px rgba(255,255,255,.5),
        inset -6px -6px rgba(10,10,10,.3),
        inset 6px 6px rgba(255,255,255,.7);
      }

      &-outer {
        padding: 20px;
        width: 100%;
        height: 100%;
      }
      &-wrapper {
        width: 100%;
        height: 100%;
        position: relative;

        &.box-shadow-inner {
          box-shadow: inset -2px -2px #fff,
          inset 2px 2px grey,
          inset -4px -4px #dfdfdf,
          inset 4px 4px #0a0a0a;
        }

        > div {
          @include position(absolute, 4px, 4px, 4px, 4px);
          z-index: 1;
          &.tile {
            background-size: 15px;
            background-repeat: repeat;
          }
          &.centre {
            background-size: 50%;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }

    &__controls {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;

      &-display {
        display: grid;
        grid-template-columns: 50px repeat(2, 1fr);
        gap: .5rem;
        align-items: center;
        padding: .5rem 0;
      }

      select {
        height: auto;
        padding: 2px 0 0 2px;

        option {
          width: 100%;
          padding: 2px;

          &:active,
          &:checked {
            background-color: $blue !important;
            color: $white;

            &:focus {
              border: 1px dotted $white;
              padding: 0 1px;
            }
          }
        }
      }
    }

    &__buttons {
      place-self: flex-end;
    }
  }

</style>
