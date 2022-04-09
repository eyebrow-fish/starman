<template>
  <div class="main">
    <div class="list" :style="{width: `${listWidth}px`}">
      <div class="search-area">
        <input class="search" type="text" v-model="search" placeholder="example.org">
      </div>
      <div v-for="(item, i) in items" :key="i">
        <QueryItem :value="item"/>
      </div>
    </div>
    <div
      class="resize-anchor"
      :class="{resizing: resizing}"
      @mousedown="startResize"
    ></div>
  </div>
</template>

<script>
import QueryItem from '@/query-list/QueryItem'
import {searchMatch} from '@/util/strings'

export default {
  name: 'NavList',
  components: {QueryItem},
  props: {
    value: Array,
  },
  data() {
    return {
      search: '',
      listWidth: 160,
      resizing: false,
    }
  },
  mounted() {
    document.addEventListener('mouseup', this.endResizeListener)
  },
  unmounted() {
    document.removeEventListener('mouseup', this.endResizeListener)
  },
  computed: {
    items() {
      return this.value.filter(i =>
        searchMatch(i.method, this.search) || searchMatch(i.name, this.search),
      )
    },
  },
  methods: {
    startResize() {
      this.resizing = true
      document.body.style.cursor = 'col-resize'
      document.addEventListener('mousemove', this.resizeListener)
    },
    endResizeListener() {
      if (!this.resizing) return
      this.resizing = false
      document.body.style.cursor = 'default'
      document.removeEventListener('mousemove', this.resizeListener)
    },
    resizeListener(e) {
      this.listWidth += e.movementX
    },
  },
}
</script>

<style scoped>
.main {
  display: flex;
  overflow-x: hidden;
}

.resize-anchor {
  border-left: solid 1px var(--border-color);
  cursor: col-resize;
  border-right: solid 4px transparent;
}

.resize-anchor:hover, .resize-anchor.resizing {
  border-left-color: var(--accent-color);
}

.list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-width: 160px;
  border-right: solid 1px var(--border-color);

  background-color: var(--bg-color);
  color: var(--fg-color);
}

.search-area {
  padding: 0.5em;
  border-bottom: solid 1px var(--border-color);
}

.search-area .search {
  width: 100%;
}
</style>
