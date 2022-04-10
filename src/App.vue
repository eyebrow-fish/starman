<template>
  <div class="main">
    <NavList/>
    <div class="right-pane">
      <QueryEditor/>
      <OutputPane/>
    </div>
  </div>
</template>

<script>
import NavList from '@/query/QueryList'
import QueryEditor from '@/query/QueryEditor'
import OutputPane from '@/output/OutputPane'

export default {
  name: 'App',
  components: {OutputPane, QueryEditor, NavList},
}
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
}

.right-pane {
  display: flex;
  flex-grow: 1;
}
</style>
