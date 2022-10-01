<template>
    <TheHeader />
    <main class="wrapper">
        <FdcCookieLawTool config="config.json" docs="docs.complete.json" page="cookies"/>
    </main>
</template>

<script>
    import TheHeader from '@/components/TheHeader.vue'
    import FdcCookieLawTool from '@/FdcCookieLawTool.vue'
    export default {
        name: "CookiePolicyView",
        components: {
           FdcCookieLawTool,
           TheHeader
        }
    }
</script>