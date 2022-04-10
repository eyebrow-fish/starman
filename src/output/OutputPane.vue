<template>
  <ResizablePane :min-width="200" default-width="50%" direction="LEFT">
    <div class="output">
      <div class="head">
        <div class="group">
          <span class="badge">{{ currentResponse?.statusCode ?? 'No response' }}</span>
          <span v-if="currentResponse" class="badge">{{ currentResponse.status }}</span>
        </div>
        <span v-if="currentResponse" class="badge">{{ currentResponse.responseTimeMs }}ms</span>
      </div>
      <div class="body">
        {{ currentResponse?.body ?? 'No data' }}
      </div>
    </div>
  </ResizablePane>
</template>

<script>
import ResizablePane from '@/panes/ResizablePane'
import {mapGetters} from 'vuex'

export default {
  name: 'OutputPane',
  components: {ResizablePane},
  computed: {
    ...mapGetters('queries', ['currentQueryItem']),
    currentResponse() {
      return this.currentQueryItem?.response
    },
  },
}
</script>

<style scoped>
.output {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.head {
  justify-content: space-between;
}

.group *:not(:first-child) {
  margin-left: 0.5em;
}

.body {
  padding: 0.5em;
  height: 100%;
  overflow: auto;
}
</style>
