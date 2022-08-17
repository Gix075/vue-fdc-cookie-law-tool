<template>
    <div v-if="banner == true && tool.banner.show == true" class="fdc-banner" :class="tool.banner.class">
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
            <h2>Configurazione delle scelte</h2>
            <p>
                Da questo pannello puoi abilitare e/o disabilitare i cookie di terze parti in uso in questo sito.<br>
                Per saperne di più puoi leggere l'informativa estesa che trovi sotto questo pannello.
                </p>
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
    
    import {fdcCookieLawTool} from '@/assets/js/fdc-cookie-law-tool.js'
    
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
                let is_accepted = new fdcCookieLawTool(this.tool.config,this.tool.docs).getSingleServiceStatus(service);
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
                let fdc = new fdcCookieLawTool(this.tool.config,this.tool.docs);
                fdc.handleServicesCookieArray(service,action);
                fdc.handleSingleServiceStatus(service,action);
                this.tool.services_status[service] = action;
            },

            updateServicesStatusData(service,action) {
                this.tool.services_status[service] = action;
            },

            acceptAllCookies() {
                let accept = new fdcCookieLawTool(this.tool.config,this.tool.docs).choisesAcceptAll();
                console.log("ACCEPT " + accept)
                if (accept != false) {
                    console.log('ACCEPTED')
                    this.tool.banner.show = false;
                }
            },

            rejectAllCookies() {
                let reject = new fdcCookieLawTool(this.tool.config,this.tool.docs).choisesRejectAll();
                console.log("REJECT " + reject)
                if (reject != false) {
                    console.log('REJECTED')
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
                    console.log(config)
                    return config
                } catch (error) {
                    console.log('FdcCookieBanner getConfig() --> fetch error: ' + error)
                    return false
                }
            },
            async getDocuments(config) {
                try {
                    const r = await fetch(this.docs, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    const documents = await r.json()
                    console.log(config)
                    console.log(documents)
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
                //console.log("this is the config: " + JSON.stringify(config))
                this.getDocuments(config).then(docs => {
                    
                    const FDCCT = new fdcCookieLawTool(config,docs);

                    let docs_string = JSON.stringify(docs);
                    
                    docs_string = docs_string.replaceAll(/id=\\"(.)*?\\"/g,'');

                    this.tool.config = config;
                    this.tool.docs = JSON.parse(docs_string);



                    console.log('data config ' + JSON.stringify(this.tool.config)) ;
                    
                    if( this.banner === true ) {
                        this.tool.banner =  FDCCT.getCookieBanner();
                        console.log( 'new banner data: ' + JSON.stringify(this.tool.banner) );
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

    .fdc--choises-panel {
        
        text-align: left;
        
        .fdc--choises-panel--services-category {
            margin-bottom: 60px;
            padding: 40px;
            //border: 1px solid #efefef;
            border-radius: 20px;
            background-color: #03191E;
            > h3 {
                font-size: 2em;
                margin: 0 0 20px 0;
            }
        }


        .fdc--choises-panel--service {
            border-bottom: 1px solid #efefef;
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
                width: 50%;

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
                width: 50%;
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
            }
        }

    }


    /* BANNER */
    .fdc-banner {
        
        background-color: #03191E;
        text-align: left;
        padding: 40px;
        position: fixed;
        z-index: 100;
        left: 50%;
        right: auto;
        max-width: 800px;
        transform: translateX(-50%);
        border-radius: 20px;

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
            top: 20px;
            right: 20px;
            width: 25px;
            height: 25px;
            background: white;
            color: black;
            text-align: center;
            line-height: 25px;
            border-radius: 50%;
            cursor: pointer;
            transition: all .2s ease;

            &:hover {
                opacity: 0.8;
            }
        }

        &.banner--bottom {
            bottom: 20px;
            top: auto;
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
        border: 1px solid white;
        color: white;
        font-size: 1em;
        line-height: 1em;
        padding: 10px 20px;
        text-decoration: none;
        box-sizing: border-box;
        cursor: pointer;
        transition: all .2s ease;

        &.button--accept {
            background-color: #42b983;
            border-color: #42b983;
        }

        &.button--reject {
            background-color: #f02d3a;
            border-color: #f02d3a;
        }

        &.button--customize {
            background-color: #F18F01;
            border-color: #F18F01;
        }

        &:hover {
            opacity: 0.8;
        }
    }

    button.fdc-button {
        outline: none;
    }

    
</style>