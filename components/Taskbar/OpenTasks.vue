<template>
  <div class="tasks">
    <button
      v-for="(task, key) in tasks"
      :key="key"
      class="tasks__task"
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
};
</script>

<style lang="scss" scoped>

  .tasks {
    display: flex;
    gap: .5rem;
    &__task {
      display: grid;
      grid-template-columns: 20px 1fr;
      gap: .25rem;
      align-items: center;
      @include fontSize(14px);
    }
  }

</style>
