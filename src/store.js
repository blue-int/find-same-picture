import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [{ letter: 'A', img: false }, { letter: 'B', img: false }, { letter: 'C', img: false }, { letter: 'D', img: false }, { letter: 'E', img: false }, { letter: 'F', img: false }, { letter: 'G', img: false }, { letter: 'H', img: false }, { letter: 'I', img: false }, { letter: 'J', img: false }, { letter: 'K', img: false }, { letter: 'L', img: false }, { letter: 'M', img: false }, { letter: 'N', img: false }, { letter: 'O', img: false }, { letter: 'P', img: false }],
    list_old: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    list_behind: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    pictures: {
      1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    },
    player: {
      1: -9,
      2: -9
    },
    name: {
      1: '플레이어 1',
      2: '플레이어 2'
    },
    order: 1,
    check: false,
    explanation: '시작 버튼을 눌러주세요.'
  },
  mutations: {
  },
  actions: {
    updateExplanation ({ state }, name) {
      state.explanation = `${name}님의 차례입니다.`
    },
    reshuffle ({ state, dispatch }) {
      state.list = _.shuffle(state.list)
      state.list_behind = _.shuffle(state.list_behind)
      state.pictures[1] = _.shuffle(state.pictures[1])
      state.pictures[2] = _.shuffle(state.pictures[1])
      state.player[1] = -9
      state.player[2] = -9
      state.order = 1
      state.explanation = `${state.name[1]}님의 차례입니다.`
    },
    showBehind ({ state, dispatch }, { letter, index }) {
      if (state.check) {
        return
      }
      state.check = true
      const list = state.list
      const num = state.list_behind[index]
      list[index].img = true
      dispatch('move', { order: state.order, num })
      setTimeout(() => {
        list[index].img = false
        state.check = false
        state.explanation = `${state.name[state.order]}님의 차례입니다.`
      }, 2000)
    },
    async move ({ state }, { order, num }) {
      let pictures = state.pictures[order]
      if (pictures[pictures.length + state.player[order] - 1] !== num) {
        state.explanation = '틀렸습니다!'
        await document.getElementById('wrong').play()
        pictures.pop()
        state.player[order] += 1
        state.order = state.order === 1 ? 2 : 1
        if (state.player[order] > -1) {
          state.explanation = '패배!'
        }
      } else {
        state.player[order] -= 1
        state.explanation = '정답!'
        if (state.player[order] === -20) {
          state.explanation = '승리!'
        }
      }
    }
  }
})
