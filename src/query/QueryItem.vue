<template>
  <div class="item">
    <span class="method">{{ value.method }}</span>
    <span>{{ value.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'QueryItem',
  props: {
    value: Object,
  },
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: baseline;
  padding: 0.5em;
  border-bottom: solid 1px var(--border-color);
  cursor: pointer;
}

.item:hover {
  background-color: var(--bg-color-2);
  color: var(--accent-color);
}

.item *:not(:first-child) {
  margin-left: 0.5em;
}

.method {
  background-color: var(--bg-color-3);
  color: var(--fg-color-2);
  padding: 0.25em;
  font-size: 14px;
}
</style>
