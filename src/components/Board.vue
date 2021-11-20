<script setup>
import { computed, ref } from 'vue'
import chunk from 'lodash.chunk'

const columns = ref(3)

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

</script>

<template>
  <div class="flex items-center justify-center w-full max-w-md">
    {{ winningCombinations }}
  </div>
</template>

