<template>
  <ResizablePane :min-width="160">
    <div class="list">
      <div class="head">
        <input v-model="search" class="search" placeholder="example.org" type="text">
      </div>
      <div class="head small">
        <span class="actions-text">Actions</span>
        <div class="group">
          <a class="add-query" @click="addQuery">
            <ion-icon name="document"></ion-icon>
          </a>
        </div>
      </div>
      <div class="items">
        <QueryItem v-for="item in items" :key="item.id" :value="item"/>
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
    ...mapState('queries', ['queryItems', 'queryItemId']),
    items() {
      return this.queryItems.filter(i =>
        searchMatch(i.method, this.search) || searchMatch(i.name, this.search),
      )
    },
  },
  methods: {
    ...mapMutations('queries', ['setSelectedId', 'newQueryItem']),
    addQuery() {
      const item = this.newQueryItem()
      this.setSelectedId(item.id)
    },
  },
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;

  background-color: var(--bg-color);
  color: var(--fg-color);
  width: 100%;
}

.items {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.search {
  width: 100%;
}

.add-query {
  cursor: pointer;
  margin-left: 0.25em;
}

.add-query:hover {
  color: var(--accent-color);
}

.head.small {
  justify-content: space-between;
}

.actions-text {
  font-size: 14px;
  color: var(--fg-color-2);
}
</style>
