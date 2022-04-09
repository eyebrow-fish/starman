<template>
  <div class="main">
    <NavList :value="queryItems"></NavList>
    <QueryEditor></QueryEditor>
  </div>
</template>

<script>
import NavList from '@/query-list/QueryList'
import QueryEditor from '@/query-editor/QueryEditor'

export default {
  name: 'App',
  components: {QueryEditor, NavList},
  computed: {
    queryItems() { // Temporary
      return [
        {
          method: 'GET',
          name: 'foo',
        },
      ]
    },
  },
}
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
