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
    ></div>
    <slot></slot>
    <div
      class="resize-anchor right"
      :class="{resizing: resizing}"
      @mousedown="startResize"
      v-if="direction === 'RIGHT'"
    ></div>
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
      document.body.style.cursor = 'default'
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
}

.resize-anchor {
  cursor: col-resize;
}

.resize-anchor.left {
  border-right: solid 1px var(--border-color);
  border-left: solid 4px transparent;
}

.resize-anchor.right {
  border-left: solid 1px var(--border-color);
  border-right: solid 4px transparent;
}

.resize-anchor.left:hover, .resize-anchor.left.resizing {
  border-right-color: var(--accent-color);
}

.resize-anchor.right:hover, .resize-anchor.right.resizing {
  border-left-color: var(--accent-color);
}
</style>
