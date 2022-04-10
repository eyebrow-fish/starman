<template>
  <div
    class="menu-container"
    @click="cleanup"
    @click.right="cleanup"
  >
    <div
      :style="{left: `${position.x}px`, top: `${position.y}px`, width}"
      class="menu"
    >
      <a
        v-for="action in actions"
        :key="action.name"
        class="action"
        @click="action.event"
      >{{ action.name }}</a>
    </div>
  </div>
</template>

<script>

export default {
  name: "ContextMenu",
  props: {
    position: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    actions: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.$el.addEventListener('contextmenu', e => e.preventDefault())
  },
  methods: {
    cleanup() {
      document.body.removeChild(this.$el.parentNode)
    },
  },
}
</script>

<style scoped>
.menu-container {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.menu {
  position: absolute;
  z-index: 1;
  background-color: var(--pure);
  border: solid 1px var(--border-color-2);
}

.action {
  padding: 0.25em;
  display: inline-block;
  width: 100%;
}

.action:hover {
  background-color: var(--bg-color-3);
}
</style>
