<template>
    <div v-if="banner === true && tool.banner.show === true" class="fdc-banner" :class="tool.banner.class">
        <div class="fdc-banner--inner">
            <div v-if="tool.banner.buttons.close.active" class="fdc-banner--close" @click="rejectAllCookies()">x</div>
            <div class="fdc-banner--text">
                <div class="fdc-banner--text--title">Cookies</div>
                <div class="fdc-banner--text--content" v-html="tool.banner.text"></div>
            </div>
            <div class="fdc-buttons">
                
                <span class="fdc-button-wrapper button--accept">
                    <button class="fdc-button button--accept" @click="acceptAllCookies()">
                        <span class="label-custom" v-if="tool.banner.buttons.accept.label != false && tool.banner.buttons.accept.label != ''">{{tool.banner.buttons.accept.label}}</span>
                        <span v-else>{{tool.banner.buttons.accept.label_default}}</span>
                    </button>
                </span>
                
                <span class="fdc-button-wrapper button--customize">
                    <a :href="tool.config.cookiePolicy.url" class="fdc-button button--customize" target="_blank">Configura</a>
                </span>

                <span v-if="tool.banner.buttons.reject.active == true"  class="fdc-button-wrapper button--reject">
                    <button class="fdc-button button--reject" @click="rejectAllCookies()">
                        <span class="label-custom" v-if="tool.banner.buttons.reject.label != false && tool.banner.buttons.reject.label != ''">{{tool.banner.buttons.reject.label}}</span>
                        <span v-else>{{tool.banner.buttons.reject.label_default}}</span>
                    </button>
                </span>

            </div>
        </div>
    </div>

    <div v-if="page === 'cookies' || page === 'cookie'" class="fdc-policypage cookie-policy">
        <h1>Cookie Policy</h1>
        <div class="fdc--choises-panel">
            
            <div class="fdc--choises-panel--intro">
                <h2>Configurazione delle scelte</h2>
                <p>
                    Da questo pannello puoi abilitare e/o disabilitare i cookie di terze parti in uso in questo sito.<br>
                    Per saperne di più puoi leggere l'informativa estesa che trovi sotto questo pannello.
                </p>
            </div>
            

            <div v-for="servicecat in tool.config_cookie_policy.services" :key="servicecat.catName" class="fdc--choises-panel--services-category">
                <h3>{{servicecat.catLabel}}</h3>
                <div v-for="(service,index) in servicecat.services" :key="index" :data-service="index" class="fdc--choises-panel--service">
                    <div class="fdc--choises-panel--service-text">
                        <div class="fdc--choises-panel--service-policy" v-html="tool.docs.cookie_policy_docs[index]"></div>
                        <div class="fdc--choises-panel--service-status">
                            <strong>La tua scelta: </strong>
                            <span v-if="tool.services_status[index] === true">
                                hai accetto questo servizio
                            </span>
                            <span v-if="tool.services_status[index] === false">
                                non hai accettato questo servizio
                            </span>
                            <span v-if="tool.services_status[index] === 'empty'">
                                non hai ancora effettato nessuna scelta
                            </span>
                        </div>
                    </div>
                    <div class="fdc--choises-panel--service-buttons" :class="singleServiceClass(index)">
                        <span class="fdc-button-wrapper button--accept">
                            <button class="fdc-button button--accept" @click="handleSingleServiceStatus(index,true)">Accetto</button>
                        </span>
                        <span class="fdc-button-wrapper button--reject">
                            <button class="fdc-button button--reject" @click="handleSingleServiceStatus(index,false)">Rifiuto</button>
                        </span>
                    </div>
                </div>
            </div>
            
        </div>
        <div v-html="tool.cookie_policy.text"></div>
    </div>

    <div v-if="page === 'privacy'" class="fdc-policypage privacy-policy">
        <div v-html="tool.privacy_policy.text"></div>
    </div>


</template>

<script>
    
    import {fdcCookieLawToolJS} from './fdc-cookie-law-tool'
    
    export default {
        name: "FdcCookieLawTool",
        props: {
            "config": String,
            "docs": String,
            "page": {
                type: String,
                default: "none"
            },
            "banner": {
                type: Boolean,
                default: false
            },
            "style": {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                "tool": {
                    "config": {},
                    "config_cookie_policy": {},
                    "services_status": {},
                    "docs": {},
                    "banner": {
                        "show": false,
                        "class": "",
                        "text": "",
                        "buttons": {}
                    },
                    "cookie_policy": {
                        "text": ""
                    },
                    "privacy_policy": {
                        "text": ""
                    }
                }
            }
        },
        
        methods: {

            singleServiceClass(service) {
                let is_accepted = this.tool.services_status[service];
                if ( is_accepted != undefined && is_accepted != "empty" ) {
                    return ( is_accepted === true ) ? "service--accepted" : "service-not-accepted";
                }else if ( is_accepted === "empty" )  {
                    return "service-no-choise";
                }
            },

            isSingeServiceAccepted(service,return_class=false) {
                let is_accepted = new fdcCookieLawToolJS(this.tool.config,this.tool.docs).getSingleServiceStatus(service);
                if ( return_class === true && is_accepted != undefined && is_accepted != "empty" ) {
                    return ( is_accepted === true ) ? "service--accepted" : "service-not-accepted";
                }
                else if ( return_class === true && is_accepted === "empty" )  {
                    return "service-no-choise";
                }
                else {
                    return is_accepted;
                }
            },

            handleSingleServiceStatus(service,action) {
                let fdc = new fdcCookieLawToolJS(this.tool.config,this.tool.docs);
                fdc.handleServicesCookieArray(service,action);
                fdc.handleSingleServiceStatus(service,action);
                this.tool.services_status[service] = action;
            },

            updateServicesStatusData(service,action) {
                this.tool.services_status[service] = action;
            },

            acceptAllCookies() {
                let accept = new fdcCookieLawToolJS(this.tool.config,this.tool.docs).choisesAcceptAll();
                if (accept != false) {
                    this.tool.banner.show = false;
                }
            },

            rejectAllCookies() {
                let reject = new fdcCookieLawToolJS(this.tool.config,this.tool.docs).choisesRejectAll();
                if (reject != false) {
                    this.tool.banner.show = false;
                }
            },
            
            async getConfig() {
                try {
                    const r = await fetch(this.config, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    const config = await r.json()
                    return config
                } catch (error) {
                    console.error('FdcCookieBanner getConfig() --> fetch error: ' + error)
                    return false
                }
            },
            // eslint-disable-next-line no-unused-vars
            async getDocuments(config) {
                try {
                    const r = await fetch(this.docs, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    const documents = await r.json()
                    return documents
                } catch (error) {
                    console.log('FdcCookieBanner getConfig() --> fetch error: ' + error)
                    return false
                }
            }
        },
        mounted() {
            //let config = this.getConfig();
            this.getConfig().then(config => {

                this.getDocuments(config).then(docs => {
                    
                    const FDCCT = new fdcCookieLawToolJS(config,docs);

                    let docs_string = JSON.stringify(docs);
                    
                    docs_string = docs_string.replaceAll(/id=\\"(.)*?\\"/g,'');

                    this.tool.config = config;
                    this.tool.docs = JSON.parse(docs_string);

                    
                    if( this.banner === true ) {
                        this.tool.banner =  FDCCT.getCookieBanner();
                    }

                    if( this.page === "cookies" || this.page === "cookie" ) {
                        this.tool.banner.show = false;
                        this.tool.cookie_policy.text = FDCCT.getCookiePolicy();
                        this.tool.config_cookie_policy = this.tool.config.cookiePolicy;
                        this.tool.services_status = FDCCT.getAllServicesStatus();
                    }

                    if( this.page === "privacy" ) {
                        this.tool.banner.show = false;
                        this.tool.privacy_policy.text = FDCCT.getPrivacyPolicy();
                    }
                });
            }); 
            
        }
    }
</script>


<style lang="scss">

    @mixin clors_schema($schema:"base") {

        @if $schema == "base" {

            // Coolors
            --fdc-color--black: #03191E;
            --fdc-color--gray-extra-light: #efefef;
            --fdc-color--white: #fff;
            --fdc-color--green: #42b983;
            --fdc-color--red: #f02d3a;
            --fdc-color--orange: #F18F01;

            // Buttons
            --fdc-color--button-accept--background: var(--fdc-color--green);
            --fdc-color--button-accept--color: var(--fdc-color--white);
            --fdc-color--button-reject--background: var(--fdc-color--red);
            --fdc-color--button-reject--color: var(--fdc-color--white);
            --fdc-color--button-customize--background: var(--fdc-color--orange);
            --fdc-color--button-customize--color: var(--fdc-color--white);
        }

        @if $schema == "light" {

            // Banner
            --fdc-color--banner-background: var(--fdc-color--black);
            --fdc-color--banner-color: var(--fdc-color--white);
            
            // Close Icon Button
            --fdc-color--button-close--background: var(--fdc-color--white);
            --fdc-color--button-close--color: var(--fdc-color--black);

            // Services Panels
            --fdc-color--panel-bg: var(--fdc-color--black);
            --fdc-color--panel-color: var(--fdc-color--white);
            --fdc-color--panel-border: var(--fdc-color--black);

            // Borders
            --fdc-color--border-color: var(--fdc-color--gray-extra-light);

        }

        @if $schema == "dark" {
            
            // Banner
            --fdc-color--banner-background: var(--fdc-color--white);
            --fdc-color--banner-color: var(--fdc-color--black);
            
            // Close Icon Button
            --fdc-color--button-close--background: var(--fdc-color--black);
            --fdc-color--button-close--color: var(--fdc-color--white);

            // Services Panels
            --fdc-color--panel-bg: var(--fdc-color--white);
            --fdc-color--panel-color: var(--fdc-color--black);
            --fdc-color--panel-border: var(--fdc-color--black);

            // Borders
            --fdc-color--border-color: var(--fdc-color--black);

        }
        
    }

    :root {

        @include clors_schema();
        @include clors_schema("light");

    }

    @media (prefers-color-scheme: dark) {
        :root {
            @include clors_schema("dark");
        }
    }

    body.dark {
        @include clors_schema("dark");
    }

    .fdc--choises-panel {
        
        text-align: left;

        .fdc--choises-panel--intro {
            padding-top: 20px;
            margin-bottom: 40px;
        }
        
        .fdc--choises-panel--services-category {
            margin-bottom: 60px;
            padding: 40px;
            border-radius: 20px;
            background-color: var(--fdc-color--panel-bg);
            color: var(--fdc-color--panel-color);
            > h3 {
                font-size: 1.5rem;
                line-height: 1em;
                margin: 0 0 20px 0;
            }
            @media all and (min-width: 768px) {
                > h3 {
                    font-size: 2rem;
                }
            }
        }


        .fdc--choises-panel--service {
            border-bottom: 1px solid var(--fdc-color--border-color);
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;

            &:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border: none;
            }

            .fdc--choises-panel--service-text {
                
                width: 100%;
                margin-bottom: 5px;

                .fdc--choises-panel--service-policy {
                    
                    h3 {
                        margin: 0;
                        font-size: 1.2em;
                        &:before {
                            content: "\21DD";
                            display: inline-block;
                            margin-right: 5px;
                            font-size: 1.2em;
                        }
                    }

                    p, 
                    h5, 
                    ul {
                        display: none;
                    }
                }

            }

            .fdc--choises-panel--service-buttons {
                text-align: right;
                width: 100%;
                &.service--accepted {
                    .button--accept {
                        opacity: 0.5;
                        pointer-events: none;
                    }
                }
                
                &.service-not-accepted {
                    .button--reject {
                        opacity: 0.5;
                        pointer-events: none;
                    }
                }

                @media all and (max-width: 767px) {
                    display: flex;
                    margin: 0 -3px;
                    .fdc-button-wrapper {
                        width: calc(50% - 6px);
                        margin: 0 3px;
                        .fdc-button {
                            width: 100%;
                        }
                    }
                }
            }

            @media all and (min-width: 768px) {
                .fdc--choises-panel--service-text,
                .fdc--choises-panel--service-buttons {
                    width: 50%;
                    margin-bottom: 0;
                }
            }
        }

    }


    /* BANNER */
    .fdc-banner {
        
        background-color: var(--fdc-color--banner-background);
        color: var(--fdc-color--banner-color);
        text-align: left;
        padding: 40px 20px 20px;
        position: fixed;
        z-index: 100;
        left: 50%;
        right: auto;
        width: 90%;;
        max-width: 800px;
        transform: translateX(-50%);
        border-radius: 20px;
        font-size: 0.7rem;

        

        .fdc-banner--text {
            margin-bottom: 40px;
            .fdc-banner--text--title {
                font-weight: bold;
                text-transform: uppercase;
                margin-bottom: 10px;
            }
            .fdc-banner--text--content {
                p {
                    margin-top: 0;
                }
            }
        }

        .fdc-banner--close {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            top: -32px;
            right: -10px;
            width: 30px;
            height: 30px;
            background: var(--fdc-color--button-close--background);
            color: var(--fdc-color--button-close--color);
            text-align: center;
            font-size: 1rem;
            border-radius: 50%;
            cursor: pointer;
            transition: all .2s ease;

            &:hover {
                opacity: 0.8;
            }
        }

        .fdc-buttons {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -3px;
        }

        &.banner--bottom {
            bottom: 20px;
            top: auto;
        }

        @media all and (max-width: 767px) {
            .fdc-button-wrapper {
                width: calc(50% - 6px);
                .fdc-button {
                    width: 100%;
                    text-align: center;
                }
                &.button--accept {
                    width: calc(100% - 6px);
                }

            }
        }


        @media all and (min-width: 768px) {
            
            font-size: 1rem;
            padding: 40px;

            .fdc-banner--close {
                top: -20px;
                right: -20px;
            }

        }
        
    }

    /* COMMON ELEMENTS */

    .fdc-button-wrapper {
        margin: 0 3px 3px 0;
        display: inline-block;
    }   

    .fdc-button,
    button.fdc-button,
    a.fdc-button {
        display: block;
        border-width: 1px;
        border-style: solid;
        font-size: 1em;
        line-height: 1em;
        padding: 10px 20px;
        text-decoration: none;
        box-sizing: border-box;
        cursor: pointer;
        transition: all .2s ease;

        &.button--accept {
            background-color: var(--fdc-color--button-accept--background);
            border-color: var(--fdc-color--button-accept--background);
            color: var(--fdc-color--button-accept--color);
        }

        &.button--reject {
            background-color: var(--fdc-color--button-reject--background);
            border-color: var(--fdc-color--button-reject--background);
            color: var(--fdc-color--button-reject--color);
        }

        &.button--customize {
            background-color: var(--fdc-color--button-customize--background);
            border-color: var(--fdc-color--button-customize--background);
            color: var(--fdc-color--button-customize--color);
        }

        &:hover {
            opacity: 0.8;
        }
    }

    button.fdc-button {
        outline: none;
    }

    
</style>