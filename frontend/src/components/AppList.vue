<template>
  <ul class="app-list__container">
      <p class="app-list__message" v-if="listItems.length === 0"> {{ errorMsg }}</p>
      <template v-else v-for="(item,index) in listItems">
        <li class="app-list__item" :key="index"
          v-if="listType === 'borrow' && item.available_copies > 0">
           <slot v-bind:item="item"></slot>
        </li>
         <li class="app-list__item" :key="index"
          v-if="listType === 'return'">
           <slot v-bind:item="item"></slot>
        </li>
      </template>
  </ul>
</template>

<script>
export default {
  name: 'AppList',
  props: {
    listType: {
      type: String,
      default: 'borrow',
    },
    listItems: {
      type: Array,
      default: () => [
        {
          isbn: 'ISBN0001',
          title: 'Book1',
          available_copies: 1,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!',
          loading: false,
        },
        {
          isbn: 'ISBN0002',
          title: 'Book2',
          available_copies: 2,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!',
          loading: false,
        }],
    },
    errorMsg: {
      type: String,
      default: 'No data available',
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
