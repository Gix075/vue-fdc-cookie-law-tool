<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomeContent msg="Welcome to Vue FDC Cookie Law Tool"/>
  </div>
</template>

<style scoped>
    .home {
        text-align: center;
    }
</style>

<script>
// @ is an alias to /src
import HomeContent from '@/components/HomeContent.vue'

export default {
    name: 'HomeView',
    components: {
        HomeContent
    }
}
</script>
