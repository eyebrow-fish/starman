<template>
  <div class="editor" draggable="false">
    <div class="head">
      <select v-model="currentQueryItem.method">
        <option v-for="method in methods" :key="method" :value="method" :label="method"/>
      </select>
      <input type="text" class="url" v-model="currentQueryItem.url" placeholder="https://example.org/">
      <button>Send</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import methods from '@/lib/methods'

export default {
  name: 'QueryEditor',
  data() {
    return {
      methods,
    }
  },
  computed: {
    ...mapGetters('queries', ['currentQueryItem']),
  },
}
</script>

<style scoped>
.editor {
  background-color: var(--bg-color);
  color: var(--fg-color);
  flex-grow: 1;
  min-height: 200px;
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
