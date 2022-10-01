<template>
    <TheHeader />
    <main class="wrapper">
        <FdcCookieLawTool config="config.json" docs="docs.complete.json" page="cookies"/>
    </main>
    <TheFooter />
</template>

<script>
    import TheHeader from '@/components/TheHeader.vue'
    import FdcCookieLawTool from '@/FdcCookieLawTool.vue'
    import TheFooter from '../components/TheFooter.vue';
    export default {
        name: "CookiePolicyView",
        components: {
            FdcCookieLawTool,
            TheHeader,
            TheFooter
        }
    }
</script>