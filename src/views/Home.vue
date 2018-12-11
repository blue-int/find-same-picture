<template>
  <div id="home">
    <audio id="background-music" loop preload controls>
      <source src="@/assets/music/background.mp3">
    </audio>
    <audio id="wrong" preload>
      <source src="@/assets/music/wrong_short.mp3">
    </audio>
    <div class="player">
      <div v-text="name[1]"></div>
      <input v-show="show" v-model="name[1]">
    </div>
    <div class="belt-wrapper belt-wrapper-1">
      <transition-group name="select-transition" class="select select-1" tag="div">
        <div :class="{ player : 20 + player[1] === n - 1 }" v-for="n in 20" :key="`select-${n}`">
        </div>
      </transition-group>
      <transition-group name="picture" class="belt" tag="div">
        <div key="goal-1">
          <img :src="picture(pictures[1][0])" alt="결승점">
        </div>
        <div :class="{ check: check }" class="" v-for="n in 19" :key="`${pictures[1][pictures[1].length-21+n]}`">
          <img :src="picture(pictures[1][pictures[1].length-20+n])"/>
        </div>
      </transition-group>
    </div>
    <div class="wrapper">
      <img id="title" src="@/assets/img/title.png" alt="같은 그림 찾기">
      <transition-group name="cell" tag="div" id="box">
        <button class="cell" :class="{flipped: letter.img}" @click="showBehind({letter, index})" v-for="(letter, index) in list" :key="`cell-${letter.letter}`">
          <div class="flip-container">
            <div>{{letter.letter}}</div>
            <img :src="pictureBehind(index)"/>
          </div>
        </button>
      </transition-group>
      <div id="explanation">{{explanation}}</div>
      <button class="reshuffle" @click="reshuffle">Reshuffle</button>
      <button class="reshuffle" v-show="show" @click="start()">Start</button>
    </div>
    <div class="belt-wrapper belt-wrapper-2">
      <transition-group name="picture" class="belt" tag="div">
        <div key="goal-2">
          <img :src="picture(pictures[2][0])" alt="결승점">
        </div>
        <div :class="{ check: check }" class="" v-for="n in 19" :key="`${pictures[2][pictures[2].length-21+n]}`">
          <img :src="picture(pictures[2][pictures[2].length-20+n])" :alt="n"/>
        </div>
      </transition-group>
      <transition-group name="select-transition" class="select select-2" tag="div">
        <div :class="{ player : 20 + player[2] === n - 1 }" v-for="n in 20" :key="`select-${n}`">
        </div>
      </transition-group>
    </div>
    <div class="player">
      <div v-text="name[2]"></div>
      <input v-show="show" v-model="name[2]">
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
      return require(`@/assets/img/${num % 16 + 1}.svg`)
    },
    pictureBehind: function (index) {
      return require(`@/assets/img/${this.list_behind[index]}.svg`)
    },
    start: function () {
      document.getElementById('background-music').play()
      this.show = false
      this.$store.dispatch('updateExplanation')
    }
  },
  computed: {
    ...mapState([
      'list', 'list_behind', 'pictures', 'player', 'explanation', 'order', 'name', 'check'
    ])
  }
}
</script>

<style scoped>
#home {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font: 500 30px 'RixVita', serif;
  padding: 0 50px 100px 50px;
}
#background-music {
  position: fixed;
  right: 0;
  top: 0;
}
#title {
  width: 450px;
  margin-bottom: 30px;
}
.player div {
  min-width: 150px;
  padding: 0 5px 0 5px;
  height: 100px;
  font-size: 50px;
  background: #fea502;
  border: 5px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.player input {
  height: 50px;
  max-width: 250px;
  box-sizing: border-box;
  border: 5px solid black;
  margin-top: 30px;
  font: 500 30px 'RixVita', serif;
  text-align: center;
}
.belt-wrapper {
  display: flex;
  flex-direction: row;
  align-self: flex-end;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.select-transition-move {
  transition: transform 1s;
}
.belt {
  perspective: 1000px;
}
.belt div {
  backface-visibility: hidden;
  transition: all 1s;
}
.picture-move {
  transition: transform 1s;
}
.picture-enter {
  transform: translateY(-50%) rotateX(90deg);
  opacity: 0;
}
.picture-leave-to {
  transform: translateY(-50%) rotateX(-90deg);
}
.picture-leave-active {
  position: absolute;
}
#box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 440px;
  height: 440px;
  margin: 0 0 50px 0;
  border: 10px solid white;
  border-radius: 10px;
}
.cell {
  width: 100px;
  height: 100px;
  font: 700 70px 'RixVita', serif;
  background: transparent;
  border: 0;
  margin: 3px;
  padding: 0;
  perspective: 1000px;
}
.flip-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.cell.flipped .flip-container {
  transform: rotateY(180deg);
}
.flip-container div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flip-container img {
  width: 100%;
  height: 100%;
}
.flip-container div, .flip-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
.flip-container img {
  transform: rotateY(180deg);
}
.cell-move {
  transition: transform 1s;
}
#explanation {
  width: max-content;
  max-width: 650px;
  word-break: keep-all;
  word-wrap: break-word;
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
.reshuffle:hover {
  background: #f0f0f0;
}
.reshuffle:active {
  background: #c8bdbd;
}
.belt {
  border: 2px solid black;
}
.belt div {
  display: flex;
  border: 1px solid transparent;
  margin: 0;
  padding: 0;
}
.belt img {
  width: 40px;
  height: 40px;
  display: flex;
}
.select {
  border: 2px solid transparent;
}
.select div {
  width: 42px;
  height: 42px;
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
@media screen and (max-height: 1000px) {
  #home {
    padding: 0 50px;
    width: 100%;
    height: 100%;
  }
  .belt-wrapper {
    align-self: center;
  }
  .belt img {
    width: 35px;
    height: 35px;
  }
  .select div {
    width: 37px;
    height: 37px;
    display: flex;
  }
}
@media screen and (max-height: 900px) {
  #home {
    margin: 0; padding: 0 30px;
  }
  #title {
    width: 300px;
    margin: 0;
  }
  #box {
    margin: 10px 0;
    width: 320px;
    height: 320px;
  }
  .cell {
    width: 70px;
    height: 70px;
    font-size: 50px;
  }
}
@media screen and (max-height: 800px) {
  .belt img {
    width: 25px;
    height: 25px;
  }
  .select div {
    width: 27px;
    height: 27px;
  }
  .wrapper {
    width: 370px;
  }
}
@media screen and (max-width: 1200px) {
  #home {
    flex-direction: column;
  }
  .player {
    display: none;
  }
  .belt-wrapper {
    flex-direction: column;
    align-self: center;
  }
  .select, .belt {
    display: flex;
    flex-direction: row;
  }
  .wrapper {
    margin-top: 10px;
  }
  #box {
    margin: 0;
    width: 320px;
    height: 320px;
  }
  .cell {
    width: 70px;
    height: 70px;
  }
  #explanation {
    margin-top: 10px;
  }
  .reshuffle {
    margin-top: 10px;
  }
  .belt-wrapper-1 {
    order: 1;
  }
  .belt-wrapper-2 {
    order: 2;
  }
  .picture-enter {
    transform: translateX(-50%) rotateY(90deg);
    opacity: 0;
  }
  .picture-leave-to {
    transform: rotateY(90deg);
    opacity: 0;
    z-index: -1;
  }
}
</style>
