<template>
  <ResizablePane :min-width="200" direction="LEFT">
    <div class="output">Hi!</div>
  </ResizablePane>
</template>

<script>
import ResizablePane from '@/panes/ResizablePane'
export default {
  name: 'OutputPane',
  components: {ResizablePane},
}
</script>

<style scoped>
</style>
