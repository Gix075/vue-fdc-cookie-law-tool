export const name = 'fdcCookieLawTool';

export class fdcCookieLawTool {

    
    constructor(config_json,docs_json) {
        
        this.debug = true;
        this.config = config_json;
        this.docs = docs_json;

        // @debug
        if( this.debug === true ) {
            console.log("CONFIG IN CONSTRUCTOR: " + JSON.stringify(config_json));
            console.log("DOCS IN CONSTRUCTOR: " + JSON.stringify(docs_json));
        }

    }

    /* ************************************ */
    /* CHOISES */
    /* ************************************ */


    choisesRejectAll() {

        let cname = this.config.cookieBanner.cookieName,
            cvalue = this.config.cookieBanner.cookieValueRejected,
            cexpire = this.config.cookieBanner.cookieExpire,
            result = false;

        if( this.setCookie(cname, cvalue, cexpire) ) {
            result = true;
        }

        return result;

    }

    choisesAcceptAll() {
        
        let cname = this.config.cookieBanner.cookieName,
            cvalue = this.config.cookieBanner.cookieValue,
            cexpire = this.config.cookieBanner.cookieExpire,
            result = false;
        
        if( this.setCookie(cname, cvalue, cexpire) ) {
            result = true;
        }

        return result;

    }


    checkSingleService(service) {
        
        let cookie_name = this.config.cookieBanner.cookieName + "_service__" + service,
            cookie_value = this.getCookie(cookie_name);
        if( cookie_value === "" || cookie_value === undefined ) {
            return undefined;
        }else{
            return ( cookie_value === this.config.cookieBanner.cookieValue ) ? true : false;
        }
        

    }


    handleSingleServiceChoise(service,action) {
        console.log(service)
        let cname = this.config.cookieBanner.cookieName + "_service__" + service,
            cvalue = (action == true) ? this.config.cookieBanner.cookieValue : this.config.cookieBanner.cookieValueRejected,
            cexpire = this.config.cookieBanner.cookieExpire,
            accept_service = this.setCookie(cname,cvalue,cexpire);
        
        return ( accept_service === true) ? true : false;
    }

    handleServicesCookieArray(service,action) {
        let cname = this.config.cookieBanner.cookieName + "_services",
            cvalue = this.getCookie(cname),
            cexpire = this.config.cookieBanner.cookieExpire,
            services_array;

        if ( action == true ) {
            if ( cvalue != "" && cvalue != undefined ) {
                services_array = JSON.parse(cvalue);
                services_array.push(service);
                cvalue = JSON.stringify(services_array);
            }else{
                services_array = [];
                services_array.push(service);
                cvalue = JSON.stringify(services_array);
            }
        }

        if ( action == false ) {
            if ( cvalue != "" && cvalue != undefined ) {
                services_array = JSON.parse(cvalue);
                
                let index = services_array.indexOf(service);
                if( index > -1) {
                    services_array.splice(index, 1);
                }

                cvalue = JSON.stringify(services_array);
            }
        }

        return this.setCookie(cname,cvalue,cexpire)
    }

    /* ************************************ */
    /* COOKIE BANNER */
    /* ************************************ */

    getCookieBanner() {
        
        let is_banner_active = ( this.config.cookieBanner.active === true ) ? true : false,
            choise_cookie,
            banner_data = {
                show: false,
                class: "banner--" + this.config.cookieBanner.position,
                text: "",
                buttons: {}
            }
        
        // @debug
        if( this.debug === true ) { 
            console.log( "getCookieBanner() config: " + JSON.stringify(this.config) );
            console.log( "getCookieBanner() docs: " + JSON.stringify(this.docs) );
        }

        if( is_banner_active === true ) {
            
            choise_cookie = this.getCookie(this.config.cookieBanner.cookieName);

            // Checks if banner is needed by choise cookie
            if( choise_cookie === "" || choise_cookie === undefined ) {
                banner_data.show = true;
            }

            // Gets Banner Text
            banner_data.text = this.getCookieBanner__text();

            // Gets Banner Buttons
            banner_data.buttons = this.getCookieBanner__buttons();

        }else{
            console.log( 'fdcCookieLawTool->getCookieBanner(): banner is not active' );
        }

        banner_data.text = banner_data.text.replace('[[NOME SITO]]',this.config.globals.site.name);
        banner_data.text = banner_data.text.replace('[[INFORMATIVA-ESTESA]]','<a href="' + this.config.cookiePolicy.url + '" target="_blank">Informativa Estesa</a>');

        return banner_data;
    }

    getCookieBanner__buttons() {
        return  {
            "reject": {
                "active": this.config.cookieBanner.rejectButton,
                "label": this.config.cookieBanner.buttons_label.bannerRejectButtonLabel,
                "label_default": "Non accetto"
            },
            "accept": {
                "active": true,
                "label": this.config.cookieBanner.buttons_label.bannerAcceptAllButtonLabel,
                "label_default": "OK, Accetto!"
            },
            "close": {
                "active": this.config.cookieBanner.closeButton,
                "label": "",
                "label_default": "x"
            },
            "privacy": {
                "active": true,
                "label": this.config.cookieBanner.buttons_label.bannerPrivacyButtonLabel,
                "label_default": "Privacy Policy"
            }
        }
    }

    getCookieBanner__text() {
        
        let banner_text;

        if (    
            this.config.cookieBanner.text.techCookies === true && 
            this.config.cookieBanner.text.profCookies === false &&
            this.config.cookieBanner.text.customText === false
        ) {
            banner_text = this.docs.cookie_policy_docs.banner_tech;
        } else if (
            this.config.cookieBanner.text.techCookies === false && 
            this.config.cookieBanner.text.profCookies === true &&
            this.config.cookieBanner.text.customText === false
        ) {
            banner_text = this.docs.cookie_policy_docs.banner_prof;
        } else if (
            this.config.cookieBanner.text.techCookies === true && 
            this.config.cookieBanner.text.profCookies === true &&
            this.config.cookieBanner.text.customText === false
        ) {
            banner_text = this.docs.cookie_policy_docs['banner_tech-prof'];
        } else if (
            this.config.cookieBanner.text.customText != false
        ) {
            banner_text = this.config.cookieBanner.text.customText;
        } else {
            console.log( 'fdcCookieLawTool->getCookieBanner__text(): unknow banner text, check your congif file' )
        }

        return banner_text;

    }

    /* ************************************ */
    /* COOKIE POLICY */
    /* ************************************ */

    getCookiePolicy() {
        // @debug
        if( this.debug === true ) console.log(' fdcCookieLawTool->getCookiePolicy() -> start' );

        let policy = this.docs.cookie_policy_docs['informativa-estesa'];

        policy = policy.replaceAll('[[NOME E COGNOME DEL RESPONSABILE]]',this.config.globals.administrator.name);
        policy = policy.replaceAll('[[NOME SITO]]',this.config.globals.site.name);
        policy = policy.replaceAll('[[URL SITO]]',this.config.globals.site.url);
        policy = policy.replaceAll('[[PRIVACY-POLICY]]',this.config.privacyPolicy.url);
        policy = policy.replaceAll('<p><strong>[[ELENCO SERVIZI]]</strong></p>',this.getCookiePolicy_services());

        return policy;
    }

    getCookiePolicy_services() {
        
        let services_in_config = this.config.cookiePolicy.services,
            services = "",
            single_cat_services,
            markup = '<div class="fdc-policypage--services-list">[[SERVICES]]</div>';

        services_in_config.forEach( (thisServiceCat) => {
            if( thisServiceCat.active === true ) {
                services += '<div class="fdc-policypage--services-cat">';
                services += '   <div class="fdc-policypage--services-cat--title"><h2>' + thisServiceCat.catLabel + '</h2></div>';
                services += '   <div class="fdc-policypage--services-cat--content">';
                single_cat_services = thisServiceCat.services;
                console.log(single_cat_services);

                Object.keys(single_cat_services).forEach( (key) => {
                    
                    console.log(single_cat_services[key]);
                    services += '<div class="fdc-policypage--service">';
                    services += this.docs.cookie_policy_docs[key]
                    services += '</div>';

                });

                services += '   </div>';
                services += '</div>';
            }
        })

        markup = markup.replace('[[SERVICES]]',services);
        return markup;
    }


    /* ************************************ */
    /* COOKIES HANDLERS */
    /* ************************************ */
    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        return document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    deleteCookie(cname) {
        document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }


}