import {createApp} from 'vue'
import App from './App.vue'
import {createStore} from 'vuex'

const store = createStore({
  state: {
    queryItems: [
      {
        id: 0,
        name: 'foo',
        method: 'GET',
        url: 'https://ddg.gg/',
      },
      {
        id: 1,
        name: 'bar',
        method: 'GET',
        url: 'https://stackoverflow.com/',
      },
    ],
    selectedId: 0,
  },
  mutations: {
    setSelectedId(store, value) {
      store.selectedId = value
    },
  },
})

createApp(App).use(store).mount('#app')
