<template>
  <div id="home">
    <div class="player player-1">
      <input v-show="show" v-model="name[1]">
      <div v-text="name[1]"></div>
    </div>
    <div class="select select-1">
      <div :class="{ player : 20 + player[1] === index }" v-for="(num, index) in pictures[1].slice(-20)" :key="`select-${index}`">
      </div>
    </div>
    <div class="belt">
      <div :class="{ player : 20 + player[1] === index }" v-for="(num, index) in pictures[1].slice(-20)" :key="`piece-${index}`">
        <img :src="picture(num)" :alt="num"/>
      </div>
    </div>
    <div class="wrapper">
      <transition-group name="cell" tag="div" id="box">
        <button class="cell" @click="showBehind({letter, index})" v-for="(letter, index) in list" :key="`cell-${letter.letter}`">
          <div v-show="!letter.img">{{letter.letter}}</div>
          <img v-show="letter.img" :src="pictureBehind(index)"/>
        </button>
      </transition-group>
      <div id="explanation">{{explanation}}</div>
      <button class="reshuffle" @click="reshuffle">Reshuffle</button>
      <button class="reshuffle" v-show="show" @click="start()">Start</button>
    </div>
    <div class="belt">
      <div :class="{ player : 20 + player[2] === index }" v-for="(num, index) in pictures[2].slice(-20)" :key="index">
        <img :src="picture(num)" :alt="num"/>
      </div>
    </div>
    <div class="select select-2">
      <div :class="{ player : 20 + player[2] === index }" v-for="(num, index) in pictures[2].slice(-20)" :key="index">
      </div>
    </div>
    <div class="player player-2">
      <input v-show="show" v-model="name[2]">
      <div v-text="name[2]"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      show: true
    }
  },
  methods: {
    ...mapActions([
      'reshuffle',
      'showBehind'
    ]),
    picture: function (num) {
      return require(`@/assets/img/${num}.svg`)
    },
    pictureBehind: function (index) {
      return require(`@/assets/img/${this.list_behind[index]}.svg`)
    },
    start: function () {
      this.show = false
      this.$store.dispatch('updateExplanation', this.name[1])
    }
  },
  computed: {
    ...mapState([
      'list', 'list_behind', 'pictures', 'player', 'explanation', 'order', 'name'
    ])
  }
}
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font: 500 30px 'RixVita', serif;
  margin-top: 100px;
}
.player-1 {
  margin-right: 150px;
}
.player-2 {
  margin-left: 150px;
}
.player div {
  width: 150px;
  height: 100px;
  font-size: 50px;
  background: #fea502;
  border: 5px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 440px;
  height: 440px;
  margin: 100px 250px 50px 250px;
  border: 10px solid white;
  border-radius: 10px;
}
.cell {
  width: 100px;
  height: 100px;
  font: 700 70px 'RixVita', serif;
  background: white;
  border: 0;
  margin: 3px;
}
#box img {
  width: 100%;
  height: 100%;
}
.cell-enter-active, .cell-leave-active {
  transition: all 1s;
}
.cell-enter, .cell-leave-to {
  opacity: 0;
}
.cell-move {
  transition: transform 1s;
}
#explanation {
  width: max-content;
  padding: 0 10px 0 10px;
  border: 3px solid black;
  border-radius: 5px;
  line-height: 150%;
  background: #fea502;
}
.reshuffle {
  width: 130px;
  height: 35px;
  margin-top: 20px;
  background: #fea502;
  border: 3px solid black;
  border-radius: 5px;
  text-align: center;
  font: 700 20px 'RixVita', serif;
}
.belt {
  border: 2px solid black;
}
.belt div {
  border: 1px solid transparent;
  margin: 0;
  padding: 0;
}
.belt .player {
  border: 1px solid green;
}
.belt img {
  width: 35px;
  height: 35px;
  display: flex;
}
.select div {
  width: 37px;
  height: 37px;
  display: flex;
}
.select-1 div.player {
  background: url('~@/assets/img/select-1.png') center no-repeat;
  background-size: contain;
}
.select-2 div.player {
  background: url('~@/assets/img/select-2.png') center no-repeat;
  background-size: contain;
}
</style>
