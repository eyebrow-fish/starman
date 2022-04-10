import ContextMenu from '@/menu/ContextMenu'
import {createApp, h} from 'vue'

export const createContextMenu = props => {
  const menu = createApp({
    setup() {
      return () => h(ContextMenu, props)
    },
  })

  const wrapper = document.createElement('div')
  wrapper.style.position = 'absolute'
  wrapper.style.zIndex = '1'
  wrapper.style.top = '0'
  wrapper.style.width = '100%'
  wrapper.style.height = '100%'
  document.body.appendChild(wrapper)
  menu.mount(wrapper)

  return menu
}