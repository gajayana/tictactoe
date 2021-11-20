import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './assets/app.css'
import { game } from './store/game'

const store = createStore({
  modules: {
    game
  }
})

createApp(App).use(store).mount('#app')
