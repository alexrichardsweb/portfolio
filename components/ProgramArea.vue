<template>
  <div class="program-area">
    <Program
      v-for="program in openPrograms"
      :key="program.slug"
      :program="program"
    />
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  data () {
    return {
    };
  },
  computed: {
    openPrograms () {
      return this.$store.state.openPrograms;
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

  .program-area {
    @include position(fixed, 0, 0, #{$taskbarHeight}, 0);
  }

</style>
