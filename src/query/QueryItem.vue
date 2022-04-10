<template>
  <div class="item" @click="selectItem">
    <span class="badge">{{ value.method }}</span>
    <span v-show="!editing">{{ value.name }}</span>
    <input
      ref="editName"
      class="edit-name"
      type="text"
      :value="value.name"
      @blur="edit"
      autofocus
      @keydown.enter="edit"
      v-show="editing"
    />
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {createContextMenu} from '@/menu/context-menu'

export default {
  name: 'QueryItem',
  props: {
    value: Object,
  },
  data() {
    return {
      editing: false,
    }
  },
  mounted() {
    this.$el.addEventListener('contextmenu', e => {
      createContextMenu({
        position: {
          x: e.x,
          y: e.y,
        },
        width: `4em`,
        actions: [
          {
            name: 'Edit',
            event: () => {
              this.editing = true
              setTimeout(() => {
                this.$refs.editName.focus()
              })
            },
          },
        ],
      })
      e.preventDefault()
    })
  },
  methods: {
    ...mapMutations('queries', ['setSelectedId']),
    selectItem() {
      this.setSelectedId(this.value.id)
    },
    edit() {
      const item = this.value // Prevents vue from thinking I'm mutating "value"
      item.name = this.$refs.editName.value
      this.editing = false
    },
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
  user-select: none;
}

.item:hover {
  background-color: var(--bg-color-2);
  color: var(--accent-color);
}

.item *:not(:first-child) {
  margin-left: 0.5em;
}

.edit-name {
  width: 100%;
}
</style>
