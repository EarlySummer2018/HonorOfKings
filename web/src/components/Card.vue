<template>
  <div class="card p-3 bg-white my-3">
    <!-- card-header -->
    <div class="card-header d-flex jc-center ai-center pb-3">
      <i :class="['sprite', `sprite-${icon}`]"></i>
      <p class="flex-1 ml-2 fs-lg text-dark">{{ title }}</p>
    </div>
    <!-- end off card-header -->
    <div class="card-body mt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>