<template>
  <div class="list">
    <div
      v-for="(item, i) in value"
      :key="i"
    >{{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavList',
  props: {
    value: Array,
  },
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;

  background-color: var(--bg-color);
  color: var(--fg-color);
}
</style>
