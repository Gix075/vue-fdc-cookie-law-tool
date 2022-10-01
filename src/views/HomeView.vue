

<template>
    <TheHeader />
    <main class="wrapper">
        <h1>Vue FDC Cookie Law Tool</h1>
        
        <p class="hero-txt">
            Questo plugin permette di caricare il tool FDC Cookie Law nell'ecosistema di VueJs3.<br/>
            FDC Cookie Law Tool è un tool per la gestione del consenso all'uso dei cookie che ti permette di creare dinamicamente delle policy usando gli strumenti di <a href="https://github.com/FattiDiCookies/italianPrivacyPolicy" target="_blank">Italian Privacy Policy</a> realizzato da FattiDiCookies
        </p>

        <div class="blurbs-row">

            <div class="blurb">
                <div class="icon">
                    <IconTooling />
                </div>
                <div class="txt">
                    <h3>Installazione</h3>
                    <p>
                        <code>$ npm install vue-fdc-cookie-law-tool</code>
                    </p>
                </div>
            </div>

            <div class="blurb">
                <div class="icon">
                    <IconDocumentation />
                </div>
                <div class="txt">
                    <h3>Documentazione</h3>
                    <p>Al momento non è ancora disponibile alcuna documentazione.</p>
                    <p>Puoi usare questo sito per vedere come implementare il plugin e generare i vari elementi come banner, policy e gestione del consenso.</p>
                </div>
            </div>

        </div>
        
    </main>

    <TheFooter image />

</template>

<script setup>
    import TheHeader from '../components/TheHeader.vue';
    import TheFooter from '../components/TheFooter.vue';
    import IconDocumentation from '../components/icons/IconDocumentation.vue';
    import IconTooling from '../components/icons/IconTooling.vue';
</script>
