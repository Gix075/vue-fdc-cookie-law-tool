<template>
    <FdcCookieLawTool config="config.json" docs="docs.complete.json" page="privacy"/>
</template>

<script>
    import FdcCookieLawTool from '@/components/FdcCookieLawTool.vue'
    export default {
        name: "PrivacyPolicyView",
        components: {
           FdcCookieLawTool 
        }
    }
</script>