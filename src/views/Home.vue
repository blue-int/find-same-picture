<template>
  <div id="home">
    <div id="box">
      <button @click="showBehind(letter, index)" v-for="(letter, index) in list" :key="index">
        {{letter}}
      </button>
    </div>
    <div id="explnation">{{explanation}}</div>
    <button @click="reshuffle()">Reshuffle</button>
    <div class="wrapper">
      <div class="belt">
        <div :class="{ player : 20 + player_1 === index }" v-for="(picture, index) in pictures_1.slice(-20)" :key="index">
          {{picture}}
        </div>
      </div>
      <div class="belt">
        <div :class="{ player : 20 + player_2 === index }" v-for="(picture, index) in pictures_2.slice(-20)" :key="index">
          {{picture}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
      list_behind: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      pictures_1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      pictures_2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      click: false,
      player_1: -9,
      player_2: -9,
      explanation: '버튼을 눌러주세요'
    }
  },
  methods: {
    reshuffle: function () {
      this.shuffle(this.list)
      this.shuffle(this.list_behind)
      this.shuffle(this.pictures_1)
      this.shuffle(this.pictures_2)
      this.player_1 = -9
      this.player_2 = -9
    },
    shuffle: function (array) {
      if (this.click) {
        return
      }
      array.sort(() => 0.5 - Math.random())
    },
    showBehind: function (letter, index) {
      if (this.click) {
        return
      }
      this.click = true
      const list = this.list
      const picture = this.list_behind[index]
      list.splice(index, 1, picture)
      this.move(picture, index)
      setTimeout(() => {
        list.splice(index, 1, letter)
        this.click = false
      }, 1000)
    },
    move: function (picture, index) {
      if (this.pictures_1[this.pictures_1.length + this.player_1 - 1] !== picture) {
        this.explanation = '틀렸습니다!'
        this.pictures_1.pop()
        this.player_1 += 1
        if (this.player_1 > -1) {
          this.explanation = '패배!'
        }
      } else {
        this.player_1 -= 1
        this.explanation = '정답!'
        if (this.player_1 === -20) {
          this.explanation = '승리!'
        }
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 200px;
}
#box button {
  width: 50px;
  height: 50px;
  font: 500 26px 'Lato', sans-serif;
}
.wrapper {
  display: flex;
  flex-direction: row;
}
.belt div {
  border: 1px solid #cccccc;
}
.belt .player {
  border: 1px solid red;
}
</style>
