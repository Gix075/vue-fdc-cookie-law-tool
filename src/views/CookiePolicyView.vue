<template>
    <FdcCookieLawTool config="config.json" docs="docs.complete.json" page="cookies"/>
</template>

<script>
    import FdcCookieLawTool from '@/FdcCookieLawTool.vue'
    export default {
        name: "CookiePolicyView",
        components: {
           FdcCookieLawTool 
        }
    }
</script>