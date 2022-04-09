<template>
  <div class="main">
    <NavList/>
    <QueryEditor/>
  </div>
</template>

<script>
import NavList from '@/query-list/QueryList'
import QueryEditor from '@/query-editor/QueryEditor'

export default {
  name: 'App',
  components: {QueryEditor, NavList},
}
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
