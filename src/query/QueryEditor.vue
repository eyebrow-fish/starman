<template>
  <div class="editor" draggable="false">
    <div class="head">
      <select v-model="currentQueryItem.method">
        <option v-for="method in methods" :key="method" :value="method" :label="method"/>
      </select>
      <input type="text" class="url" v-model="currentQueryItem.url" placeholder="https://example.org/">
      <button @click="sendRequest" :disabled="loading">Send</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import methods from '@/lib/methods'
import axios from 'axios'

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
</style>
