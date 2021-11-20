import chunk from 'lodash.chunk'
import intersectionWith from 'lodash.intersectionwith'
export const game = {
  namespaced: true,
  state: () => ({
    columns: 3,
    gameIsStarted: false,
    gameIsStopped: false,
    player: 1,
    playerOneCells: [],
    playerTwoCells: [],
    winner: null
  }),
  mutations: {
    reset (state) {
      state.gameIsStopped = false
      state.player = 1
      state.playerOneCells = []
      state.playerTwoCells = []
      state.winner = null
    },
    setColumn (state, payload) {
      state.columns = payload
    },
    setGameIsStarted (state, payload) {
      state.gameIsStarted = payload
    },
    setGameIsStopped(state, payload) {
      state.gameIsStopped = payload
    },
    setPlayer(state, payload) {
      state.player = payload
    },
    setPlayerOneCells(state, payload) {
      state.playerOneCells.push(payload)
      state.playerOneCells.sort()
    },
    setPlayerTwoCells(state, payload) {
      state.playerTwoCells.push(payload)
      state.playerTwoCells.sort()
    },
    setWinner (state, payload) {
      state.winner = payload
    }
  },
  getters: {
    getCellNumbers (state) {
      return Math.pow(state.columns, 2)
    },
    getHorizontalWinningCombinations (state, getters) {
      return chunk(Array.from({ length: getters.getCellNumbers }, (a, b) => b + 1), state.columns)
    },
    getVerticalWinningCombinations (state, getters) {
      const [first] = getters.getHorizontalWinningCombinations
      return first.map(ob => {
        let a = []
        for (let i = 0; i < state.columns; i++) {
          a.push(ob + (state.columns * i))
        }
        return a
      })
    },
    getDiagonalWinningCombinations (state, getters) {
      const items = getters.getHorizontalWinningCombinations
      const dLeft = items.map((item, index) => {
        return item[index]
      })
      const dRight = items.map((item, index) => {
        return item[(state.columns - 1) - index]
      })
      return [dLeft, dRight]
    },
    getWinningCombinations (state, getters) {
      return [
        ...getters.getHorizontalWinningCombinations,
        ...getters.getVerticalWinningCombinations,
        ...getters.getDiagonalWinningCombinations
      ]
    }
  }
}
