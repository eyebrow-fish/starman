<template>
  <div
    class="resizable-pane"
    :style="{width: `${width}px`, 'min-width': `${minWidth}px`}"
    draggable="false"
  >
    <div
      class="resize-anchor left"
      :class="{resizing: resizing}"
      @mousedown="startResize"
      v-if="direction === 'LEFT'"
    ><div class="resize-anchor-inner"></div></div>
    <slot></slot>
    <div
      class="resize-anchor right"
      :class="{resizing: resizing}"
      @mousedown="startResize"
      v-if="direction === 'RIGHT'"
    ><div class="resize-anchor-inner"></div></div>
  </div>
</template>

<script>
export default {
  name: "ResizablePane",
  props: {
    minWidth: {
      type: Number,
      required: true,
    },
    defaultWidth: String,
    direction: {
      type: String,
      default: 'RIGHT',
    },
  },
  data() {
    return {
      maxWidth: 0,
      width: +this.minWidth,
      resizing: false,
    }
  },
  mounted() {
    this.$el.style.width = this.defaultWidth
    this.width = this.$el.getBoundingClientRect().width
    this.computeAndSetMaxWidth()
    document.addEventListener('mouseup', this.endResizeListener)
    window.addEventListener('resize', this.computeAndSetMaxWidth)
  },
  unmounted() {
    document.removeEventListener('mouseup', this.endResizeListener)
    window.removeEventListener('resize', this.computeAndSetMaxWidth)
  },
  methods: {
    startResize() {
      this.resizing = true
      document.body.style.cursor = this.isVertical ? 'row-resize' : 'col-resize'
      document.addEventListener('mousemove', this.resizeListener)
    },
    endResizeListener() {
      if (!this.resizing) return
      this.resizing = false
      document.body.style.cursor = 'initial'
      document.removeEventListener('mousemove', this.resizeListener)
    },
    resizeListener(e) {
      const resize = this.direction === 'RIGHT' ? e.movementX : -e.movementX
      if (this.width >= this.minWidth)
        if (this.width + resize > this.maxWidth)
          this.width = this.maxWidth
        else
          this.width += resize
      else
        this.width = this.minWidth
    },
    computeAndSetMaxWidth() {
      this.maxWidth = this.$el.parentNode.getBoundingClientRect().width - 400
    },
  },
}
</script>

<style scoped>
.resizable-pane {
  display: flex;
  z-index: 1;
  position: relative;
}

.resize-anchor {
  top: 0;
  bottom: 0;
  cursor: col-resize;
  position: absolute;
  padding: 0 10px;
}

.resize-anchor.left {
  left: -10px;
}

.resize-anchor.right {
  right: -10px;
}

.resize-anchor-inner {
  background-color: var(--border-color);
  width: 1px;
  height: 100%;
}

.resize-anchor:hover .resize-anchor-inner, .resize-anchor.resizing .resize-anchor-inner {
  background-color: var(--accent-color);
}
</style>
