<template>
  <ResizablePane :min-width="160">
    <div class="list">
      <div class="head">
        <input class="search" type="text" v-model="search" placeholder="example.org">
      </div>
      <div v-for="item in items" :key="item.id">
        <QueryItem :value="item" @click="selectItem(item)"/>
      </div>
    </div>
  </ResizablePane>
</template>

<script>
import ResizablePane from '@/panes/ResizablePane'
import QueryItem from '@/query/QueryItem'
import {searchMatch} from '@/lib/strings'
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'NavList',
  components: {ResizablePane, QueryItem},
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapState('queries', ['queryItems']),
    items() {
      return this.queryItems.filter(i =>
        searchMatch(i.method, this.search) || searchMatch(i.name, this.search),
      )
    },
  },
  methods: {
    ...mapMutations('queries', ['setSelectedId']),
    selectItem(item) {
      this.setSelectedId(item.id)
    },
  },
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  background-color: var(--bg-color);
  color: var(--fg-color);
  width: 100%;
}

.search {
  width: 100%;
}
</style>
