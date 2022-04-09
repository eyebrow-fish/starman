import {createApp} from 'vue'
import App from './App.vue'
import {createStore} from 'vuex'
import queries from '@/vuex/queries'

const store = createStore({
  modules: {
    queries,
  },
})

createApp(App).use(store).mount('#app')
