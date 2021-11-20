<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed } from 'vue'
import { useStore } from 'vuex'
import Board from './components/Board.vue'
import Landing from './components/Landing.vue'

const store = useStore()
const gameIsStarted = computed(() => store.state.game.gameIsStarted)
</script>

<template>
  <Board v-if="gameIsStarted" />
  <Landing v-else />
</template>
