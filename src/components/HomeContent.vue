<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            A vue component that use FDCookieLaw Tool for italian cookie law elements (banner and policy) and GDPR compliant privacy policy
            <a href="https://github.com/Gix075/vue-fdc-cookie-law-tool" target="_blank" rel="noopener">Documentation</a>.
        </p>
    </div>
</template>

<script>
export default {
    name: 'HomeContent',
    props: {
        msg: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello {
    text-align: center;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
