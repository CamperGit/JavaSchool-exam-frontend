<template>
  <Header/>
  <router-view/>
</template>

<script>
import Header from "./components/Header";

export default {
  name: 'App',
  components: {
    Header
  },
}

</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Play', sans-serif;
  background-color: rgb(238, 238, 238);
  height: 100%;
}

html {
  height: 100%;
  background-color: rgb(238, 238, 238);
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: rgb(238, 238, 238);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
