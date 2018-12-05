import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [{ letter: 'A', img: false }, { letter: 'B', img: false }, { letter: 'C', img: false }, { letter: 'D', img: false }, { letter: 'E', img: false }, { letter: 'F', img: false }, { letter: 'G', img: false }, { letter: 'H', img: false }, { letter: 'I', img: false }, { letter: 'J', img: false }, { letter: 'K', img: false }, { letter: 'L', img: false }, { letter: 'M', img: false }, { letter: 'N', img: false }, { letter: 'O', img: false }, { letter: 'P', img: false }],
    list_old: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    list_behind: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    pictures: {
      1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
      2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]
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
    explanation: '시작 버튼을 눌러주세요.',
    end: false
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
        if (!state.end) {
          state.explanation = `${state.name[state.order]}님의 차례입니다.`
        }
      }, 2000)
    },
    async move ({ state }, { order, num }) {
      let pictures = state.pictures[order]
      console.log(state.player[order], pictures[0] + 1, num % 16)
      if (state.player[order] === -19 && pictures[0] + 1 === num % 16) {
        state.end = true
        state.explanation = `${state.name[state.order]}님이 결승점에 도달하여 승리하셨습니다. 게임을 종료합니다.`
      } else if ((pictures[pictures.length + state.player[order] - 1] + 1) % 16 !== num % 16) {
        state.explanation = '틀렸습니다!'
        state.pictures[order].pop()
        await document.getElementById('wrong').play()
        state.player[order] += 1
        if (state.player[order] > -1) {
          state.end = true
          state.explanation = `${state.name[state.order]}님이 컨베이어 벨트에서 떨어져 패배하셨습니다. 게임을 종료합니다.`
        }
        state.order = state.order === 1 ? 2 : 1
      } else {
        state.player[order] -= 1
        state.explanation = '정답!'
      }
    }
  }
})
