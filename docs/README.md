# VueJS3 FDC Cookie Law Tool 

Questo plugin permette di caricare il tool FDC Cookie Law nell'ecosistema di VueJS3.

FDC Cookie Law Tool è un tool per la gestione del consenso all'uso dei cookie che ti permette di creare dinamicamente delle policy usando gli strumenti di <a href="https://github.com/FattiDiCookies/italianPrivacyPolicy" target="_blank">Italian Privacy Policy</a> realizzato da FattiDiCookies

## Istallazione

Per installare il plugin basterà aggiungerlo via **npm** al progetto.

``
$ npm install vue-fdc-cookie-law-tool
``

## Uso

Il plugin offre un componente predisposto per funzionare sia come banner che come generatore di policy, sia cookie che privacy.

Come prima cosa il plugin/componente deve essere aggiunto al file javascript principale del progetto (solitamente **main.js**)

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import FdcCookieLawTool from 'vue-fdc-cookie-law-tool'

createApp(App)
  .use(FdcCookieLawTool)
  .mount('#app')

```

Una volta importato il plugin nel progetto, il componente potrà essere usato nei template con la seguente sintassi:

```vue

<FdcCookieLawTool [props]/>

```

Le props legate al componente sono

|Prop|Type|Default|Required|Uso
|---|---|---|---|---|
|config|string|none| yes | Path del file json di configurazione |
|docs|string|none| yes | Path del file json con i testi delle policy |
|page|string|none| no | Attivazione della generazione di una delle due policy |
|banner|boolean|false| no | Attivazione del banner |

::: warning CONFIG.JSON
**Attenzione al file di configurazione!**
Per poter funzionare, il componente necessita di un file di configurazione in formato json. Per saperne di più, [leggi la relativa sezione di questa documentazione](./#configurazione).
:::

::: warning DOCS.COMPLETE.JSON
**Attenzione al file dei testi!**
Questo componente usa dei testi precompilati in combinazione con il file di configurazione. Per saperne di più, leggi la relativa sezione di questa documentazione.
:::

## Esempi d'uso

### Banner

```vue
<FdcCookieLawTool config="config.json" docs="docs.complete.json" banner/>
```
Il banner può essere caricato manualmente in ogni pagina del sito o direttamente nel file ``App.vue`` ma in tal caso dovrà poi essere escluso dalle pagine di cookie e privacy policy.

### Cookie Policy

```vue
<FdcCookieLawTool config="config.json" docs="docs.complete.json" page="cookie"/>
```

### Privacy Policy

```vue
<FdcCookieLawTool config="config.json" docs="docs.complete.json" page="privacy"/>
```

## Configurazione

**FdcCookieLawTool** necessita di un file di configurazione in formato json formattato secondo un preciso schema. Questo file è neccessario per la generazione dinamica dei testi del banner e delle policy, nonché del pannello di configurazione delle preferenze in merito alla gestione del consenso all'installazione dei cookie di profilazione.

Essendo un file che necessita personalizzazione, non è stato incluso all'interno del pacchetto npm, pertanto si rende necessario provvedere ad includerlo manualmente prelevandolo dal repository GitHub del progetto.

Puoi trovare questo file all'interno del repository: ```public/config.json```

La path del file dei testi dovrà poi essere passata al componente Vue.

::: tip ITALIAN PRIVACY POLICY
Per maggiori informazioni su questo file e la sua funzione è possibile consultare il repository ufficiale del progetto [**Italian Privacy Policy**](https://github.com/FattiDiCookies/italianPrivacyPolicy)
:::

## Testi

**FdcCookieLawTool**  è basato su dei testi precompilati che devono essere inclusi nel progetto e che non vengono forniti assieme al pacchetto npm. I testi sono tutti racchiusi in un unico file json che è pertanto necessario includere manualmente prelevandolo dal repository GitHub del progetto.

Puoi trovare questo file all'interno del repository: ```public/docs.complete.json```

La path del file dei testi dovrà poi essere passata al componente Vue.

::: tip ITALIAN PRIVACY POLICY
Per maggiori informazioni su questo file e la sua funzione è possibile consultare il repository ufficiale del progetto [**Italian Privacy Policy**](https://github.com/FattiDiCookies/italianPrivacyPolicy)
:::


## Routing

Molto propabilmente, dovendo generare delle pagine di policy con il relativo tool di gestione del consenso per i cookie, sarà necessaria l'implementazione di un sistema di routing come ad esempio [router.vuejs.org](https://router.vuejs.org/).

Il vostro file ``router/index.js`` potrebbe quindi essere configurato così:

```javascript
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cookie-policy',
    name: 'cookiepolicy',
    component: CookiePolicyComponentName // the name of your own component (if you have it)
  },
  {
    path: '/privacy-policy',
    name: 'privacypolicy',
    component: PrivacyPolicyComponentName // the name of your own component (if you have it)
  }
]
```
## Esclusione del banner dalle pagine policy

Assumendo che abbiate generato delle pagine specifiche per le policy ed incluso il componente banner globalmente, per escludere quest'ultimo dalle pagine di policy, sarà necessario avvalersi di alcune funzioni offerte dal sistema di routing come ad esempio il detect della pagina corrente e quindi caricare il banner solo se non si è all'interno delle pagine policy.

Seguendo l'esempio del routing sopra riportato e ipotizzando che il banner sia stato caricato all'interno del main file ```App.vue```, potrebbe essere un'opzione realizzare una funzione di controllo come la seguente:

```javascript
isPolicyPage() {
    return (this.$route.name === 'cookiepolicy' || this.$route.name === 'privacypolicy') ? true : false;
}
```

Questa funzione potrebbe essere inserita all'interno dell'hook ``computed()`` e poi usata all'interno di un ``v-if=""`` del componente banner.

```vue
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/cookie-policy">Cookie Policy Example</router-link> | 
    <router-link to="/privacy-policy">Privacy Policy Example</router-link>
  </nav>
  <router-view/>
  <FdcCookieLawTool v-if="!isPolicyPage" config="config.json" docs="docs.complete.json" banner/>
</template>

<script>

export default {
    computed: {
        isPolicyPage() {
            return (this.$route.name === 'cookiepolicy' || this.$route.name === 'privacypolicy') ? true : false;
        }
    }
}
</script>

```