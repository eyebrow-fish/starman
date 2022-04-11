<template>
  <div class="editor" draggable="false">
    <div v-if="currentQueryItem">
      <div class="head">
        <select v-model="currentQueryItem.method">
          <option v-for="method in methods" :key="method" :label="method" :value="method"/>
        </select>
        <input v-model="currentQueryItem.url" class="url" placeholder="https://example.org/" type="text">
        <button :disabled="loading" @click="sendRequest">Send</button>
      </div>
    </div>
    <div class="empty" v-else>
      <span>No query available. Create one from the list on the left or</span>
      <button @click="addQuery">Create query</button>
      <span>.</span>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import methods from '@/lib/methods'
import axios from 'axios'
import {v4} from 'uuid'

export default {
  name: 'QueryEditor',
  data() {
    return {
      methods,
      loading: false,
    }
  },
  computed: {
    ...mapGetters('queries', ['currentQueryItem']),
  },
  methods: {
    ...mapMutations('queries', ['newQueryItem']),
    async sendRequest() {
      this.loading = true
      const start = new Date()
      const response = await axios.request({
        method: this.currentQueryItem.method,
        url: this.currentQueryItem.url,
      })
      this.currentQueryItem.response = {
        status: response.statusText,
        statusCode: response.status,
        responseTimeMs: new Date() - start,
        body: response.data,
      }
      this.loading = false
    },
    addQuery() {
      this.newQueryItem(v4())
    },
  },
}
</script>

<style scoped>
.editor {
  background-color: var(--bg-color);
  color: var(--fg-color);
  flex-grow: 1;
  min-width: 400px;
}

.head *:not(:last-child) {
  margin-right: 0.5em;
}

.url {
  width: 100%;
}

.empty {
  width: fit-content;
  margin: auto;
  padding: 1em;
  font-size: 18px;
}

.empty button {
  margin-left: 0.5em;
}
</style>
