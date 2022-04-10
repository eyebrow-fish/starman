<template>
  <ResizablePane :min-width="160">
    <div class="list">
      <div class="head">
        <input class="search" type="text" v-model="search" placeholder="example.org">
      </div>
      <div class="head small">
        <span class="actions-text">Actions</span>
        <div class="group">
          <a class="add-query">
            <ion-icon name="document"></ion-icon>
          </a>
          <a class="add-query">
            <ion-icon name="folder"></ion-icon>
          </a>
        </div>
      </div>
      <div class="items">
        <div v-for="item in items" :key="item.id">
          <QueryItem :value="item"/>
        </div>
      </div>
    </div>
  </ResizablePane>
</template>

<script>
import ResizablePane from '@/panes/ResizablePane'
import QueryItem from '@/query/QueryItem'
import {searchMatch} from '@/lib/strings'
import {mapState} from 'vuex'

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
