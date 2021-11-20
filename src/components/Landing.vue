<script setup>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const size = ref(3)
const sizes = ref([3,4,5,6])

watchEffect(() => store.commit('game/setColumn', size.value))

const start = () => {
  store.commit('game/setGameIsStarted', true)
}
</script>
<template>
  <div class="flex items-center h-full justify-center">
    <div class="flex flex-col items-center">
      <h1 class="font-bold mb-8 text-4xl">
        Tic Tac Toe
      </h1>
      <p class="mb-4">
        Select your columns and start the game!
      </p>
      <select
        v-model.number="size"
        class="border border-gray-300 mb-4 px-8 py-2 text-4xl"
      >
        <option
          v-for="item in sizes"
          :key="`size-${item}`"
        >
          {{ item }}
        </option>
      </select>
      <button
        class="bg-green-900 text-white uppercase px-16 py-4 rounded"
        @click.prevent="start"
      >
        Start Game
      </button>
    </div>
  </div>
</template>
