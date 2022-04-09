<template>
  <ResizablePane :min-size="200" isVertical>
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
