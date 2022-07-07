<template>
  <interact
    :id="program.slug"
    :style="windowStyle"
    draggable
    :resizable="resizable"
    :drag-option="dragOption"
    :resize-option="resizeOption"
    class="bg-grey window"
    @dragmove="dragmove"
    @resizemove="resizemove"
  >
    <div
      :class="{ 'active': active }"
      class="title-bar"
      @dblclick="handleTitleBarClick"
    >
      <span class="title-bar-text">{{ program.title }}</span>
      <div class="title-bar-controls">
        <button
          aria-label="Minimize"
          @click="minimise"
        />
        <template v-if="resizable">
          <button
            v-if="isMaximised"
            aria-label="Restore"
            @click="restore"
          />
          <button
            v-else
            aria-label="Maximize"
            @click="maximise"
          />
        </template>
        <button
          aria-label="Close"
          @click="closeProgram(program)"
        />
      </div>
    </div>
    <div class="window-body">
      <slot />
    </div>
  </interact>
</template>

<script>

import interact from 'interactjs';

export default {
  props: {
    program: Object,
  },
  data () {
    return {
      resizeOption: {
        margin: 5,
        edges: { left: true, right: true, bottom: true, top: true },
        modifiers: [
          interact.modifiers.restrictSize({
            restriction: `parent`,
            min: { width: 200, height: 200 },
          }),
        ],
      },
      dragOption: {
        allowFrom: `.title-bar`,
        cursorChecker (action, interactable, element, interacting) {
          return `default`;
        },
      },
      positionY: 0,
      positionX: 0,
      width: 400,
      height: 400,
      isMaximised: false,
      restored: {
        width: 0,
        height: 0,
        positionX: 0,
        positionY: 0,
      },
      active: true,
      resizable: false,
    };
  },
  computed: {
    windowStyle () {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
        left: `${this.positionX}px`,
        top: `${this.positionY}px`,
      };
    },
  },
  mounted () {
    this.$nextTick(() => {
      if (this.program.window?.width) {
        this.width = this.program.window.width;
      }
      if (this.program.window?.height) {
        this.height = this.program.window.height;
      }
      if (this.program.window?.resizable) {
        this.resizable = this.program.window.resizable;
      }
    });
  },
  methods: {
    dragmove (event) {
      this.positionX += event.dx;
      this.positionY += event.dy;
    },
    resizemove (event) {
      this.width = event.rect.width;
      this.height = event.rect.height;

      this.positionX += event.deltaRect.left;
      this.positionY += event.deltaRect.top;
    },
    maximise () {
      if (this.resizable) {
        this.isMaximised = true;
        this.restored = {
          width: this.width,
          height: this.height,
          positionX: this.positionX,
          positionY: this.positionY,
        };
        this.width = this.$el.parentElement.clientWidth;
        this.height = this.$el.parentElement.clientHeight;
        this.positionX = 0;
        this.positionY = 0;
      }
    },
    restore () {
      this.isMaximised = false;
      this.width = this.restored.width;
      this.height = this.restored.height;
      this.positionX = this.restored.positionX;
      this.positionY = this.restored.positionY;
    },
    minimise () {
      this.$store.dispatch(`minimiseProgram`, this.program);
    },
    handleTitleBarClick () {
      if (this.isMaximised) {
        this.restore();
      } else {
        this.maximise();
      }
    },
  },
};
</script>

<style lang="scss" scoped>

  .window {
    position: absolute;
    z-index: 0;
    box-sizing: border-box;
    transition: width .1s, height .1s;

    .title-bar {
      background: $darkgrey;
      padding: 3px 3px 3px 4px;

      &.active {
        background: $blue;
      }

      &-text {
        margin-top: -5px;
      }
    }
  }

</style>
