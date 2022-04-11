<template>
  <div class="item" :class="{selected: selectedId === item.id}" @click="selectItem">
    <span class="badge">{{ item.method }}</span>
    <span v-show="!item.editing">{{ item.name }}</span>
    <input
      v-show="item.editing"
      ref="editName"
      :value="item.name"
      autofocus
      class="edit-name"
      type="text"
      @blur="edit"
      @keydown.enter="edit"
    />
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import {createContextMenu} from '@/menu/context-menu'

export default {
  name: 'QueryItem',
  props: {
    value: Object,
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
            event: () => this.item.editing = true,
          },
          {
            name: 'Delete',
            event: () => this.removeQueryItem(this.item.id),
          },
        ],
      })
      e.preventDefault()
    })
    if (this.item.editing) this.focusEditName()
  },
  watch: {
    'item.editing'() {
      this.focusEditName()
    },
  },
  computed: {
    ...mapState('queries', ['selectedId']),
    item() {
      return this.value
    },
  },
  methods: {
    ...mapMutations('queries', ['setSelectedId', 'removeQueryItem']),
    selectItem() {
      this.setSelectedId(this.value.id)
    },
    edit() {
      this.item.name = this.$refs.editName.value
      this.item.editing = false
    },
    focusEditName() {
      setTimeout(() => {
        this.$refs.editName.focus()
        this.$refs.editName.select()
      })
    },
  },
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  padding: 0.5em;
  border-bottom: solid 1px var(--border-color);
  cursor: pointer;
  user-select: none;
}

.item.selected {
  background-color: var(--bg-color-2);
  border-right: solid 4px var(--accent-color);
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
  font-size: 14px;
}
</style>
