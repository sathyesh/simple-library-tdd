<template>
  <div class="app-card">
    <div class="app-card__container">
      <h4 class="app-card__header">{{title}}</h4>
      <p class="app-card__body">
        <slot name="body"></slot>
      </p>
      <div class="app-card__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
