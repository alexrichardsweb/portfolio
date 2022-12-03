<template>
  <div class="tasks">
    <button
      v-for="(task, key) in tasks"
      :id="`task-${task.slug}`"
      :key="key"
      :class="{ 'active': task.open }"
      class="tasks__task"
      @mouseup="taskClicked(task)"
    >
      <img
        :src="icon(task.icon)"
        :alt="`${task.title} icon`"
        :title="task.title"
        class="menu-item__icon"
      >
      <span class="menu-item__title">
        {{ task.title }}
      </span>
    </button>
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
    tasks () {
      return this.$store.state.openPrograms;
    },
  },
  mounted () {
    this.$nextTick(() => {
    });
  },
  methods: {
    taskClicked (task) {
      if (task.open) {
        this.minimiseProgram(task);
      } else {
        this.restoreProgram(task);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

  .tasks {
    display: flex;
    align-items: center;
    gap: .5rem;
    margin-top: -2px;
    z-index: 3;

    &__task {
      display: grid;
      grid-template-columns: 20px 1fr;
      gap: .35rem;
      align-items: center;
      justify-content: flex-start;
      @include fontSize(15px);
      height: 29.5px;
      padding: .25rem .35rem;
      min-width: 175px;

      &:active {
        padding: .25rem .35rem;
      }

      &.active {
        font-weight: bold;
        background-color: $white;
        background-image: linear-gradient(45deg, $grey 25%, transparent 0, transparent 75%, $grey 0), linear-gradient(45deg, $grey 25%, transparent 0, transparent 75%, $grey 0);
        background-size: 2px 2px;
        background-position: 0 0, 1px 1px;
        box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey;
      }

      span {
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      img {
        max-height: 18px;
      }
    }
  }

</style>
