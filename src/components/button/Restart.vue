<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const winner = computed(() => store.state.game.winner)
const reset = () => {
  store.commit('game/reset')
}
</script>
<template>
  <button
    v-if="winner !== null"
    class="bg-green-900 text-white uppercase px-16 py-4 rounded"
    @click.prevent="reset"
  >
    Restart
  </button>
</template>
