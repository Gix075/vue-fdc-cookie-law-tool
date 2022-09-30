<template><div><h1 id="vuejs3-fdc-cookie-law-tool" tabindex="-1"><a class="header-anchor" href="#vuejs3-fdc-cookie-law-tool" aria-hidden="true">#</a> VueJS3 FDC Cookie Law Tool</h1>
<p>Questo plugin permette di caricare il tool FDC Cookie Law nell'ecosistema di VueJS3.</p>
<p>FDC Cookie Law Tool è un tool per la gestione del consenso all'uso dei cookie che ti permette di creare dinamicamente delle policy usando gli strumenti di <a href="https://github.com/FattiDiCookies/italianPrivacyPolicy" target="_blank">Italian Privacy Policy</a> realizzato da FattiDiCookies</p>
<h2 id="istallazione" tabindex="-1"><a class="header-anchor" href="#istallazione" aria-hidden="true">#</a> Istallazione</h2>
<p>Per installare il plugin basterà aggiungerlo via <strong>npm</strong> al progetto.</p>
<p><code v-pre>$ npm install vue-fdc-cookie-law-tool</code></p>
<h2 id="uso" tabindex="-1"><a class="header-anchor" href="#uso" aria-hidden="true">#</a> Uso</h2>
<p>Il plugin offre un componente predisposto per funzionare sia come banner che come generatore di policy, sia cookie che privacy.</p>
<p>Come prima cosa il plugin/componente deve essere aggiunto al file javascript principale del progetto (solitamente <strong>main.js</strong>)</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.vue'</span>
<span class="token keyword">import</span> FdcCookieLawTool <span class="token keyword">from</span> <span class="token string">'vue-fdc-cookie-law-tool'</span>

<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>FdcCookieLawTool<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Una volta importato il plugin nel progetto, il componente potrà essere usato nei template con la seguente sintassi:</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FdcCookieLawTool</span> <span class="token attr-name">[props]</span><span class="token punctuation">/></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Le props legate al componente sono</p>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Default</th>
<th>Required</th>
<th>Uso</th>
</tr>
</thead>
<tbody>
<tr>
<td>config</td>
<td>string</td>
<td>none</td>
<td>yes</td>
<td>Path del file json di configurazione</td>
</tr>
<tr>
<td>docs</td>
<td>string</td>
<td>none</td>
<td>yes</td>
<td>Path del file json con i testi delle policy</td>
</tr>
<tr>
<td>page</td>
<td>string</td>
<td>none</td>
<td>no</td>
<td>Attivazione della generazione di una delle due policy</td>
</tr>
<tr>
<td>banner</td>
<td>boolean</td>
<td>false</td>
<td>no</td>
<td>Attivazione del banner</td>
</tr>
</tbody>
</table>
<div class="custom-container warning"><p class="custom-container-title">CONFIG.JSON</p>
<p><strong>Attenzione al file di configurazione!</strong>
Per poter funzionare, il componente necessita di un file di configurazione in formato json. Per saperne di più, <RouterLink to="/#configurazione">leggi la relativa sezione di questa documentazione</RouterLink>.</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">DOCS.COMPLETE.JSON</p>
<p><strong>Attenzione al file dei testi!</strong>
Questo componente usa dei testi precompilati in combinazione con il file di configurazione. Per saperne di più, leggi la relativa sezione di questa documentazione.</p>
</div>
<h2 id="esempi-d-uso" tabindex="-1"><a class="header-anchor" href="#esempi-d-uso" aria-hidden="true">#</a> Esempi d'uso</h2>
<h3 id="banner" tabindex="-1"><a class="header-anchor" href="#banner" aria-hidden="true">#</a> Banner</h3>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FdcCookieLawTool</span> <span class="token attr-name">config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.json<span class="token punctuation">"</span></span> <span class="token attr-name">docs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>docs.complete.json<span class="token punctuation">"</span></span> <span class="token attr-name">banner</span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Il banner può essere caricato manualmente in ogni pagina del sito o direttamente nel file <code v-pre>App.vue</code> ma in tal caso dovrà poi essere escluso dalle pagine di cookie e privacy policy.</p>
<h3 id="cookie-policy" tabindex="-1"><a class="header-anchor" href="#cookie-policy" aria-hidden="true">#</a> Cookie Policy</h3>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FdcCookieLawTool</span> <span class="token attr-name">config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.json<span class="token punctuation">"</span></span> <span class="token attr-name">docs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>docs.complete.json<span class="token punctuation">"</span></span> <span class="token attr-name">page</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cookie<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="privacy-policy" tabindex="-1"><a class="header-anchor" href="#privacy-policy" aria-hidden="true">#</a> Privacy Policy</h3>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FdcCookieLawTool</span> <span class="token attr-name">config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.json<span class="token punctuation">"</span></span> <span class="token attr-name">docs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>docs.complete.json<span class="token punctuation">"</span></span> <span class="token attr-name">page</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>privacy<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="configurazione" tabindex="-1"><a class="header-anchor" href="#configurazione" aria-hidden="true">#</a> Configurazione</h2>
<p><strong>FdcCookieLawTool</strong> necessita di un file di configurazione in formato json formattato secondo un preciso schema. Questo file è neccessario per la generazione dinamica dei testi del banner e delle policy, nonché del pannello di configurazione delle preferenze in merito alla gestione del consenso all'installazione dei cookie di profilazione.</p>
<p>Essendo un file che necessita personalizzazione, non è stato incluso all'interno del pacchetto npm, pertanto si rende necessario provvedere ad includerlo manualmente prelevandolo dal repository GitHub del progetto.</p>
<p>Puoi trovare questo file all'interno del repository: <code v-pre>public/config.json</code></p>
<p>La path del file dei testi dovrà poi essere passata al componente Vue.</p>
<div class="custom-container tip"><p class="custom-container-title">ITALIAN PRIVACY POLICY</p>
<p>Per maggiori informazioni su questo file e la sua funzione è possibile consultare il repository ufficiale del progetto <a href="https://github.com/FattiDiCookies/italianPrivacyPolicy" target="_blank" rel="noopener noreferrer"><strong>Italian Privacy Policy</strong><ExternalLinkIcon/></a></p>
</div>
<h2 id="testi" tabindex="-1"><a class="header-anchor" href="#testi" aria-hidden="true">#</a> Testi</h2>
<p><strong>FdcCookieLawTool</strong>  è basato su dei testi precompilati che devono essere inclusi nel progetto e che non vengono forniti assieme al pacchetto npm. I testi sono tutti racchiusi in un unico file json che è pertanto necessario includere manualmente prelevandolo dal repository GitHub del progetto.</p>
<p>Puoi trovare questo file all'interno del repository: <code v-pre>public/docs.complete.json</code></p>
<p>La path del file dei testi dovrà poi essere passata al componente Vue.</p>
<div class="custom-container tip"><p class="custom-container-title">ITALIAN PRIVACY POLICY</p>
<p>Per maggiori informazioni su questo file e la sua funzione è possibile consultare il repository ufficiale del progetto <a href="https://github.com/FattiDiCookies/italianPrivacyPolicy" target="_blank" rel="noopener noreferrer"><strong>Italian Privacy Policy</strong><ExternalLinkIcon/></a></p>
</div>
<h2 id="routing" tabindex="-1"><a class="header-anchor" href="#routing" aria-hidden="true">#</a> Routing</h2>
<p>Molto propabilmente, dovendo generare delle pagine di policy con il relativo tool di gestione del consenso per i cookie, sarà necessaria l'implementazione di un sistema di routing come ad esempio <a href="https://router.vuejs.org/" target="_blank" rel="noopener noreferrer">router.vuejs.org<ExternalLinkIcon/></a>.</p>
<p>Il vostro file <code v-pre>router/index.js</code> potrebbe quindi essere configurato così:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'home'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> HomeView
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/cookie-policy'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'cookiepolicy'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> CookiePolicyComponentName <span class="token comment">// the name of your own component (if you have it)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/privacy-policy'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'privacypolicy'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> PrivacyPolicyComponentName <span class="token comment">// the name of your own component (if you have it)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="esclusione-del-banner-dalle-pagine-policy" tabindex="-1"><a class="header-anchor" href="#esclusione-del-banner-dalle-pagine-policy" aria-hidden="true">#</a> Esclusione del banner dalle pagine policy</h2>
<p>Assumendo che abbiate generato delle pagine specifiche per le policy ed incluso il componente banner globalmente, per escludere quest'ultimo dalle pagine di policy, sarà necessario avvalersi di alcune funzioni offerte dal sistema di routing come ad esempio il detect della pagina corrente e quindi caricare il banner solo se non si è all'interno delle pagine policy.</p>
<p>Seguendo l'esempio del routing sopra riportato e ipotizzando che il banner sia stato caricato all'interno del main file <code v-pre>App.vue</code>, potrebbe essere un'opzione realizzare una funzione di controllo come la seguente:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">isPolicyPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token string">'cookiepolicy'</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token string">'privacypolicy'</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Questa funzione potrebbe essere inserita all'interno dell'hook <code v-pre>computed()</code> e poi usata all'interno di un <code v-pre>v-if=&quot;&quot;</code> del componente banner.</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nav</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">></span></span> |
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/cookie-policy<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Cookie Policy Example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">></span></span> | 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/privacy-policy<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Privacy Policy Example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FdcCookieLawTool</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>!isPolicyPage<span class="token punctuation">"</span></span> <span class="token attr-name">config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>config.json<span class="token punctuation">"</span></span> <span class="token attr-name">docs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>docs.complete.json<span class="token punctuation">"</span></span> <span class="token attr-name">banner</span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function">isPolicyPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token string">'cookiepolicy'</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token string">'privacypolicy'</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


