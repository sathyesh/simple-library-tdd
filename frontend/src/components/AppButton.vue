<template>
  <button class="app-button">
      <template v-if="isLoading">
       <img class="app-button__img" :src="url"/>
      </template>
      <template v-else>
        {{value}}
      </template>
  </button>
</template>

<script>
import loadingIcon from '@/assets/images/app-loader.svg';

export default {
  name: 'AppButton',
  props: {
    value: {
      type: String,
      default: 'Title',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      url: loadingIcon,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
