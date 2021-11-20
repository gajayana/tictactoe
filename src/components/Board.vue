<script setup>
import { computed, ref } from 'vue'
import chunk from 'lodash.chunk'
import intersectionWith from 'lodash.intersectionwith'

// board setups
const columns = ref(3)
const player = ref(1)
const playerOneCells = ref([])
const playerTwoCells = ref([])

const cellNumbers = computed(() => {
  return Math.pow(columns.value, 2)
})

const horizontalCombinations = computed(() => {
  return chunk(Array.from({ length: cellNumbers.value }, (a, b) => b + 1), columns.value)
})

const verticalCombinations = computed(() => {
  const [first] = horizontalCombinations.value
  return first.map(ob => {
    let a = []
    for (let i = 0; i < columns.value; i++ ) {
      a.push(ob + (columns.value * i))
    }
    return a
  })
})

const diagonalCombinations = computed(() => {
  const items = horizontalCombinations.value
  const dLeft = items.map((item, index) => {
    return item[index]
  })
  const dRight = items.map((item,index) => {
    return item[(columns.value - 1) - index]
  })
  return [dLeft, dRight]
})

const winningCombinations = computed(() => {
  return [
    ...horizontalCombinations.value,
    ...verticalCombinations.value,
    ...diagonalCombinations.value
  ]
})

const winnerLabel = computed(() => {
  let res
  const items = winningCombinations.value
  const playerOne = items.find(item => {
    const intersection = intersectionWith(item, playerOneCells.value)
    if (intersection.length === columns.value) { return item }
  })

  const playerTwo = items.find(item => {
    const intersection = intersectionWith(item, playerTwoCells.value)
    if (intersection.length === columns.value) { return item }
  })

  if (playerOne) {
    res = 'Player 1 wins'
  }

  if (playerTwo) {
    res = 'Player 2 wins'
  }

  return res
})

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
  if (player.value === 1) {
    playerOneCells.value.push(key)
    playerOneCells.value.sort()
  } else {
    playerTwoCells.value.push(key)
    playerTwoCells.value.sort()
  }

  player.value = player.value === 1 ? 2 : 1
}

</script>

<template>
  <div class="flex flex-col items-center h-full justify-center w-full">
    <h2>Player {{ player }} turn</h2>
    <div class="grid grid-cols-3 gap-0 mx-auto">
      <div
        v-for="i in cellNumbers"
        :key="`cell-${i}`"
        class="border border-black cursor-pointer flex items-center justify-center h-16 w-16"
        @click.once="select(i)"
      >
        {{ label(i) }}
      </div>
    </div>
    <div>
      playerOneCells: {{ playerOneCells }}
    </div>
    <div>
      playerTwoCells: {{ playerTwoCells }}
    </div>
    <div>{{ winningCombinations }}</div>
    <div>
      {{ winnerLabel }}
    </div>
  </div>
</template>

