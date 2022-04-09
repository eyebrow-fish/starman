<template>
  <div class="list">
    <input type="text" v-model="search">
    <div
      v-for="(item, i) in items"
      :key="i"
    >
      <QueryItem :value="item"/>
    </div>
  </div>
</template>

<script>
import QueryItem from '@/query-list/QueryItem'
import {searchMatch} from '@/util/strings'

export default {
  name: 'NavList',
  components: {QueryItem},
  props: {
    value: Array,
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    items() {
      return this.value.filter(i =>
        searchMatch(i.method, this.search) || searchMatch(i.name, this.search)
      )
    },
  },
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;

  border-right: solid 1px var(--border-color);
  width: 10em;

  background-color: var(--bg-color);
  color: var(--fg-color);
}
</style>
