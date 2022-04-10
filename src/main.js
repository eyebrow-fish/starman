import {createApp} from 'vue'
import App from './App.vue'
import {createStore} from 'vuex'
import queries from '@/vuex/queries'
import Vue from '@vue/cli-plugin-eslint/eslintOptions'

Vue.config.ignoredElements = [/^ion-/]

const store = createStore({
  modules: {
    queries,
  },
})

document.addEventListener('contextmenu', e => e.preventDefault())

createApp(App).use(store).mount('#app')
