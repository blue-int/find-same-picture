<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: RixVita;
  src: url('~@/assets/font/RixVitaL.woff') format('woff');
  font-weight: 300;
}
@font-face {
  font-family: RixVita;
  src: url('~@/assets/font/RixVitaM.woff') format('woff');
  font-weight: 500;
}
@font-face {
  font-family: RixVita;
  src: url('~@/assets/font/RixVitaB.woff') format('woff');
  font-weight: 700;
}
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background: url('~@/assets/img/bg.svg');
  background-position: center top;
  background-size: cover;
}
#nav {
  padding: 30px;
  font: 500 60px 'RixVita', sans-serif;
  div:last-child {
    margin-top: 10px;
    font-size: 40px;
  }
}
button:focus {
  outline: none;
}
@media screen and (max-height: 900px) {
  #nav {
    padding: 0;
  }
}
</style>
