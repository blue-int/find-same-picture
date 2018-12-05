<template>
  <div id="test">
    <div class="belt-wrapper">
      <div class="select select-1">
        <div :class="{ player : 20 + player[1] === index }" v-for="(num, index) in pictures[1].slice(-20)" :key="`select-${index}`">
        </div>
      </div>
      <div class="belt">
        <div :class="{ player : 20 + player[1] === index }" v-for="(num, index) in pictures[1].slice(-20)" :key="`piece-${index}`">
          <img :src="picture(num)" :alt="num"/>
        </div>
      </div>
    </div>
    <div class="belt-wrapper">
      <div class="select select-1">
        <div :class="{ player : 20 + player[1] === index }" v-for="(num, index) in pictures[1].slice(-20)" :key="`select-${index}`">
        </div>
      </div>
      <div class="belt">
        <div v-for="n in 20" :key="`piece-${n}`">
          <img :src="picture(pictures[1][pictures[1].length-21+n])" :alt="n"/>
        </div>
      </div>
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
#test {
  display: flex;
  flex-direction: row;
}
.belt-wrapper {
  display: flex;
  flex-direction: row;
  margin-right: 100px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
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
