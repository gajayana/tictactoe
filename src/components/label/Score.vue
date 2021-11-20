<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const playerOneScore = computed(() => store.state.game.playerOneScore)
const playerTwoScore = computed(() => store.state.game.playerTwoScore)
</script>
<template>
  <div class="flex flex-row items-center mb-4">
    <div>Player 1</div>
    <div class="font-bold mx-4 text-2xl">
      {{ playerOneScore }}:{{ playerTwoScore }}
    </div>
    <div>Player 2</div>
  </div>
</template>
