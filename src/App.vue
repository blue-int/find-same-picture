<template>
  <div id="app">
    <div id="nav">
      made by BLUE<br>design by 영우
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
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
  position: absolute;
  top: 0;
  left: 0;
  padding: 0px;
  font: 500 30px 'RixVita', sans-serif;
  text-align: left;
  color: orange;
}
button:focus {
  outline: none;
}
</style>
