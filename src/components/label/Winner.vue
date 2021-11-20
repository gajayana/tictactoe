<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import intersectionWith from 'lodash.intersectionwith'

const store = useStore()
const winnerLabel = computed(() => {
  let res
  const cellNumbers = computed(() => store.getters['game/getCellNumbers'])
  const columns = computed(() => store.state.game.columns )
  const items = computed(() => store.getters['game/getWinningCombinations'])
  const playerOneCells = computed(() => store.state.game.playerOneCells)
  const playerTwoCells = computed(() => store.state.game.playerTwoCells)


  const playerOne = items.value.find(item => {
    const intersection = intersectionWith(item, playerOneCells.value)
    if (intersection.length === columns.value) { return item }
  })

  const playerTwo = items.value.find(item => {
    const intersection = intersectionWith(item, playerTwoCells.value)
    if (intersection.length === columns.value) { return item }
  })

  if (playerOne) {
    store.commit('game/setWinner', 1)
    res = 'Player 1 wins!'
  }

  if (playerTwo) {
    store.commit('game/setWinner', 2)
    res = 'Player 2 wins!'
  }

  if([...playerOneCells.value, ...playerTwoCells.value].length === cellNumbers.value) {
    store.commit('game/setWinner', 0)
    res = 'Game ties!'
  }

  if (res) {
    store.commit('game/setGameIsStopped', true)
  }

  return res
})
</script>
<template>
  <h2 class="font-bold mb-4 text-xl">{{ winnerLabel }}</h2>
</template>
