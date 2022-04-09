<template>
  <div
    class="resizable-pane"
    :class="{vertical: isVertical, horizontal: !isVertical}"
    :style="{
      [isVertical ? 'height' : 'width']: `${size}px`,
      [isVertical ? 'min-height' : 'min-width']: `${minSize}px`,
    }"
    draggable="false"
  >
    <div
      class="resize-anchor"
      :class="{resizing: resizing}"
      @mousedown="startResize"
      v-if="isVertical"
    ></div>
    <slot></slot>
    <div
      class="resize-anchor"
      :class="{resizing: resizing}"
      @mousedown="startResize"
      v-if="!isVertical"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ResizablePane",
  props: {
    minSize: {
      type: Number,
      required: true,
    },
    isVertical: Boolean,
  },
  data() {
    return {
      size: +this.minSize,
      resizing: false,
    }
  },
  mounted() {
    document.addEventListener('mouseup', this.endResizeListener)
  },
  unmounted() {
    document.removeEventListener('mouseup', this.endResizeListener)
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
      if (this.size >= this.minSize)
        this.size += this.isVertical ? -e.movementY : e.movementX
      else
        this.size = this.minSize
    },
  },
}
</script>

<style scoped>
.resizable-pane {
  display: flex;
  z-index: 1;
}

.resizable-pane.vertical {
  flex-direction: column;
}

.resizable-pane.horizontal .resize-anchor {
  cursor: col-resize;
  border-left: solid 1px var(--border-color);
  border-right: solid 4px transparent;
}

.resizable-pane.vertical .resize-anchor {
  cursor: row-resize;
  border-top: solid 1px var(--border-color);
  border-bottom: solid 4px transparent;
}

.resize-anchor:hover, .resize-anchor.resizing {
  border-left-color: var(--accent-color);
}
</style>
