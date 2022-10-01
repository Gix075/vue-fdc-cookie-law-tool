<template>
    <footer class="footer">
        <div v-if="image == true" class="footer--image">
            <img src="@/assets/vue-fdc-cookie-law-tool.jpeg"/>
        </div>
        <div class="footer--signature">
            <div class="wrapper">
                &copy; by Gix075 & FattiDiCookies -- GNU/GPL License
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        props: {
            image: {
                type: Boolean,
                default: false
            }
        }
    }
</script>