<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const label = computed(() => `Player ${store.state.game.player} turn`)
const winner = computed(() => store.state.game.winner)
</script>
<template>
  <h2
    v-if="winner === null"
    class="font-bold mb-4 text-xl"
  >
    {{ label }}
  </h2>
</template>
