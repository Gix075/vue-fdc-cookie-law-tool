<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/cookie-policy">Cookie Policy Example</router-link> | 
    <router-link to="/privacy-policy">Privacy Policy Example</router-link>
  </nav>
  <router-view/>
  <FdcCookieLawTool config="config.json" docs="docs.complete.json" banner/>
</template>

<script>
import FdcCookieLawTool from '@/components/FdcCookieLawTool.vue'
export default {
    components: {
        FdcCookieLawTool
    }
}
</script>
<style>
html,body {
    background-color: #2c3e50;
    color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
