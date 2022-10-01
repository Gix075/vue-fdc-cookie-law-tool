<template>
    <TheHeader />
    <main class="wrapper">
        <FdcCookieLawTool config="config.json" docs="docs.complete.json" page="privacy"/>
    </main>
</template>

<script>
    import TheHeader from '@/components/TheHeader.vue'
    import FdcCookieLawTool from '@/FdcCookieLawTool.vue'
    export default {
        name: "PrivacyPolicyView",
        components: {
           FdcCookieLawTool,
           TheHeader
        }
    }
</script>