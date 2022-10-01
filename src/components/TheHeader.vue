<script setup>
//import TheWelcome from '../components/TheWelcome.vue'
    import { RouterLink } from 'vue-router'
</script>
<template>
    <header>
        <div class="wrapper">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/cookie-policy">Cookie Policy</RouterLink>
                <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
            </nav>
        </div>
    </header>
</template>