<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import ButtonRestart from './button/Restart.vue'
import LabelTurn from './label/Turn.vue'
import LabelWinner from './label/Winner.vue'

const store = useStore()
// board setups
const columns = computed(() => store.state.game.columns )
const cellNumbers = computed(() => store.getters['game/getCellNumbers'])
const winningCombinations = computed(() => store.getters['game/getWinningCombinations'])

const gameIsStopped = computed(() => store.state.game.gameIsStopped)

const player = computed(() => store.state.game.player)
const playerOneCells = computed(() => store.state.game.playerOneCells)
const playerTwoCells = computed(() => store.state.game.playerTwoCells)

// methods
const label = (key) => {
  let label = ''
  if (playerOneCells.value.includes(key)) {
    label = 'X'
  }

  if (playerTwoCells.value.includes(key)) {
    label = 'O'
  }

  return label
}

const select = (key) => {
  // game is already stopped
  if (gameIsStopped.value) { return }

  // prevent multiple clicks on same cell
  if ([...playerOneCells.value, ...playerTwoCells.value].includes(key)) { return }

  if (player.value === 1) {
    store.commit('game/setPlayerOneCells', key)
  } else {
    store.commit('game/setPlayerTwoCells', key)
  }

  store.commit('game/setPlayer', player.value === 1 ? 2 : 1)
}

</script>

<template>
  <div class="flex flex-col items-center h-full justify-center w-full">
    <h1 class="font-bold mb-8 text-4xl">Tic Tac Toe</h1>

    <LabelTurn />
    <LabelWinner />

    <div :class="['grid', `grid-cols-${columns}`, 'gap-0', 'mb-4', 'mx-auto']">
      <div
        v-for="i in cellNumbers"
        :key="`cell-${i}`"
        class="border border-black cursor-pointer flex items-center justify-center h-16 w-16"
        @click="select(i)"
      >
        {{ label(i) }}
      </div>
    </div>

    <ButtonRestart />
  </div>
</template>

