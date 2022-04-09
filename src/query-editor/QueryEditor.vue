<template>
  <div class="editor">
    <div class="head">
      <input type="text" class="url" v-model="queryItem.url" placeholder="https://example.org/">
      <button>Send</button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'QueryEditor',
  computed: {
    ...mapState(['queryItems', 'selectedId']),
    queryItem() {
      return this.queryItems.find(item => item.id === this.selectedId)
    },
  },
}
</script>

<style scoped>
.editor {
  background-color: var(--bg-color);
  color: var(--fg-color);
  margin-left: -4px;
  flex-grow: 1;
}

.head {
  display: flex;
  border-bottom: solid 1px var(--border-color);
  padding: 0.5em;
}

.head *:not(:last-child) {
  margin-right: 0.5em;
}

.url {
  width: 100%;
}
</style>
