<template>
  <ul class="app-list__container">
      <p v-if="listItems.length === 0"> {{ errorMsg }}</p>
      <template v-else>
        <li v-for="(item,index) in listItems" :key="index">
          {{item.title}}
        </li>
      </template>
  </ul>
</template>

<script>
export default {
  name: 'AppList',
  props: {
    listItems: {
      type: Array,
      default: () => [
        {
          isbn: 'ISBN0001',
          title: 'Book1',
          available_copies: 1,
        },
        {
          isbn: 'ISBN0002',
          title: 'Book2',
          available_copies: 2,
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
.books-list__container{
    padding: 0 10px;
    border: 1px red solid;
}
</style>
