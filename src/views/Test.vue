<template>
  <div id="test">
    <div class="wrapper">
      <transition-group name="cell" tag="div" id="box">
        <button class="cell" @click="showBehind({letter, index})" v-for="(letter, index) in list" :key="`cell-${letter.letter}`">
          <div class="flip-container">
            <div>{{letter.letter}}</div>
            <img :src="pictureBehind(index)"/>
          </div>
        </button>
      </transition-group>
      <button class="reshuffle" @click="reshuffle">Reshuffle</button>
      <button class="reshuffle" v-show="show" @click="start()">Start</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'test',
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
.cell {
  width: 300px;
  height: 200px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.cell:hover .flip-container {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-container div, .flip-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
/* Style the back side */
.flip-container img {
  transform: rotateY(180deg);
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
</style>
