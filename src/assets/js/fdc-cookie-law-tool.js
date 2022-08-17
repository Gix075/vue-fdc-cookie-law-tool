export const name = 'fdcCookieLawTool';

export class fdcCookieLawTool {

    
    constructor(config_json,docs_json) {
        
        this.debug = true;
        this.config = config_json;
        this.docs = docs_json;

        // @debug
        /* if( this.debug === true ) {
            console.log("CONFIG IN CONSTRUCTOR: " + JSON.stringify(config_json));
            console.log("DOCS IN CONSTRUCTOR: " + JSON.stringify(docs_json));
        }
        */
    }

    /* ************************************ */
    /* CHOISES */
    /* ************************************ */

    /*
        HANDLE GLOBAL POLICY STATUS
        ---
        This function changes the status of the global policy ("accepted"/"rejected"). 
        The parameter "reset_services", at the "true" value, 
        is used to reset also the status of all the enabled services

        @param action Boolean
        @param reset_services Boolean
    */
    handleGlobalPolicyStatus(action,reset_services) {
        let cname = this.config.cookieBanner.cookieName,
            cvalue = (action == true) ? this.config.cookieBanner.cookieValue : this.config.cookieBanner.cookieValueRejected,
            cexpire = this.config.cookieBanner.cookieExpire;

        if( reset_services === true ) {
            this.handleAllServicesStatus(action);
        }

        return this.setCookie(cname, cvalue, cexpire);
    }

    /* This is a shorthand methods of handleGlobalPolicyStatus(); */
    choisesRejectAll() {

        /* let cname = this.config.cookieBanner.cookieName,
            cvalue = this.config.cookieBanner.cookieValueRejected,
            cexpire = this.config.cookieBanner.cookieExpire,
            result = false;
            

        if( this.setCookie(cname, cvalue, cexpire) ) {
            console.log('cookie setted')
            result = true;
            this.handleAllServicesStatus(false);
        } */

        return this.handleGlobalPolicyStatus(false,true);

    }

    /* This is a shorthand methods of handleGlobalPolicyStatus(); */
    choisesAcceptAll() {
        
        /* let cname = this.config.cookieBanner.cookieName,
            cvalue = this.config.cookieBanner.cookieValue,
            cexpire = this.config.cookieBanner.cookieExpire,
            result = false;
        
        if( this.setCookie(cname, cvalue, cexpire) ) {
            result = true;
            this.handleAllServicesStatus(true);
        } */

        return this.handleGlobalPolicyStatus(true,true);

    }


    getGlobalPolicyStatus() {
        let cname = this.config.cookieBanner.cookieName;
        return this.getCookie(cname);
    }

    getAllServicesStatus() {
        let services_cats = this.config.cookiePolicy.services,
            services_status_object = {};
        
        services_cats.forEach( services_cat => {
            if ( services_cat.active === true ) {
                Object.keys(services_cat.services).forEach( (service) => { 
                    if( services_cat.services[service] === true ) {
                        //@debug
                        if( this.debug === true ) {
                            console.log('getAllServicesStatus() add to object --> ' + service);
                            console.log('set value --> ' + this.getSingleServiceStatus(service));
                        }
                        services_status_object[service] = this.getSingleServiceStatus(service);
                    }
                });
            }
        });

        return services_status_object;
    }

    getSingleServiceStatus(service) {
        
        let cookie_name = this.config.cookieBanner.cookieName + "_service__" + service,
            cookie_value = this.getCookie(cookie_name);
        if( cookie_value === "" || cookie_value === undefined ) {
            return "empty";
        }else{
            return ( cookie_value === this.config.cookieBanner.cookieValue ) ? true : false;
        }

    }

    handleAllServicesStatus(action) {
        let services_cats = this.config.cookiePolicy.services;
        
        services_cats.forEach( services_cat => {
            if ( services_cat.active === true ) {
                Object.keys(services_cat.services).forEach( (service) => { 
                    if( services_cat.services[service] === true ) {
                        //@debug
                        if( this.debug === true ) console.log('handleAllServicesStatus() --> ' + services_cat[service]);
                        this.handleSingleServiceStatus(service,action);
                        this.handleServicesCookieArray(service,action);
                    }
                });
            }
        });
    }


    handleSingleServiceStatus(service,action) {
        console.log(service)
        let cname = this.config.cookieBanner.cookieName + "_service__" + service,
            cvalue = (action == true) ? this.config.cookieBanner.cookieValue : this.config.cookieBanner.cookieValueRejected,
            cexpire = this.config.cookieBanner.cookieExpire,
            accept_service = this.setCookie(cname,cvalue,cexpire),
            change_global_policy_status = this.handleGlobalPolicyStatus(false,false);

        /*  Because we believe that the change of a single cookie preference is 
            a negation of the global policy, the gloable policy cookie will be set to the rejected value (without reset all services), 
            even if the single service is accepted  */
        
        return ( accept_service === true && change_global_policy_status === true) ? true : false;
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
    /* PRIVACY POLICY */
    /* ************************************ */
    getPrivacyPolicy() {
        // @debug
        if( this.debug === true ) console.log(' fdcCookieLawTool->getPrivacyPolicy() -> start' );
        let policy_global = this.docs.privacy_policy_docs['privacy-policy'],
            policy_contactform = this.docs.privacy_policy_docs['contactform'],
            policy_hosting = this.docs.privacy_policy_docs['hosting'],
            policy_newsletter = this.docs.privacy_policy_docs['newsletter'],
            policy_siteaccount = this.docs.privacy_policy_docs['siteaccount'],
            policy_ecommerce = this.docs.privacy_policy_docs['ecommerce'],
            first_party_services = '',
            third_party_services = '',
            personal_data = '',
            personal_data_list = '',
            device_data = '',
            device_data_list = '',
            purposes = '';

        // DEVICE data
        this.config.privacyPolicy.deviceData.forEach( data => {
            device_data_list += '<li>' + data + '</li>';
        });
        device_data_list = '<ul>' + device_data_list + '</ul>';

        device_data = '<h3>' + this.config.privacyPolicy.deviceDataTitle + '</h3>';
        device_data += '<p>' + this.config.privacyPolicy.deviceDataDesc + '</p>';
        device_data += device_data_list;

        // PERSONAL data list
        this.config.privacyPolicy.personalData.forEach( data => {
            personal_data_list += '<li>' + data + '</li>';
        });
        personal_data_list = '<ul>' + personal_data_list + '</ul>';

        personal_data = '<h3>' + this.config.privacyPolicy.deviceDataTitle + '</h3>';
        personal_data += '<p>' + this.config.privacyPolicy.deviceDataDesc + '</p>';
        personal_data += personal_data_list;

        // PURPOSES
        this.config.privacyPolicy.purposes.forEach( data => {
            purposes += '<li>' + data + '</li>';
        });
        purposes = '<ul>' + purposes + '</ul>';

        // FIRST PARTY: Contact form
        if( this.config.privacyPolicy.contactForm != undefined && 
            this.config.privacyPolicy.contactForm != "" && 
            this.config.privacyPolicy.contactForm.active === true ) {
            
            let contact_form_personal_data = this.config.privacyPolicy.contactForm.personalData,
                contact_form_personal_data_list = "",
                contact_form_storage = this.config.privacyPolicy.contactForm.storage;
        
            contact_form_personal_data.forEach( data => {
                contact_form_personal_data_list += '<li>' + data + '</li>';
            });

            contact_form_personal_data_list = '<ul>' + contact_form_personal_data_list + '</ul>';

            policy_contactform = policy_contactform.replaceAll('[[CONTACTFORM DATA]]',contact_form_personal_data_list);
            policy_contactform = policy_contactform.replaceAll('[[CONTACTFORM DATA STORAGE]]',contact_form_storage.join());

        }


        // FIRST PARTY: Account
        if( this.config.privacyPolicy.account != undefined && 
            this.config.privacyPolicy.account != "" && 
            this.config.privacyPolicy.account.active === true ) {
            
            let account_personal_data = this.config.privacyPolicy.account.personalData,
                account_personal_data_list = "",
                account_storage = this.config.privacyPolicy.account.storage;
        
            account_personal_data.forEach( data => {
                account_personal_data_list += '<li>' + data + '</li>';
            });

            account_personal_data_list = '<ul>' + account_personal_data_list + '</ul>';

            policy_siteaccount = policy_siteaccount.replaceAll('[[CONTACTFORM DATA]]',account_personal_data_list);
            policy_siteaccount = policy_siteaccount.replaceAll('[[CONTACTFORM DATA STORAGE]]',account_storage);

        }

        // FIRST PARTY: Ecommerce
        if( this.config.privacyPolicy.ecommerce != undefined && 
            this.config.privacyPolicy.ecommerce != "" && 
            this.config.privacyPolicy.ecommerce.active === true ) {
            
            let ecommerce_personal_data = this.config.privacyPolicy.ecommerce.personalData,
                ecommerce_personal_data_list = "",
                ecommerce_storage = this.config.privacyPolicy.ecommerce.storage;
        
            ecommerce_personal_data.forEach( data => {
                ecommerce_personal_data_list += '<li>' + data + '</li>';
            });

            ecommerce_personal_data_list = '<ul>' + ecommerce_personal_data_list + '</ul>';

            policy_ecommerce = policy_ecommerce.replaceAll('[[CONTACTFORM DATA]]',ecommerce_personal_data_list);
            policy_ecommerce = policy_ecommerce.replaceAll('[[CONTACTFORM DATA STORAGE]]',ecommerce_storage);

        }

        // THIRD PARTY: Hosting
        if( this.config.privacyPolicy.thirdpartyDataStorage.hosting != undefined && this.config.privacyPolicy.thirdpartyDataStorage.hosting != "") {
            
            let hosting_provider = this.config.privacyPolicy.thirdpartyDataStorage.hosting.provider,
                hosting_home = this.config.privacyPolicy.thirdpartyDataStorage.hosting.home,
                hosting_datacenter = this.config.privacyPolicy.thirdpartyDataStorage.hosting.datacenter,
                hosting_data_administrator = this.config.privacyPolicy.thirdpartyDataStorage.hosting.data_administrator,
                hosting_policy = this.config.privacyPolicy.thirdpartyDataStorage.hosting.policy;
        
            if ( hosting_policy != "" && hosting_policy != undefined ) {
                hosting_policy = '<a href="' + hosting_policy + '" target="_blank">' + hosting_policy + '</a><br>';
            }
            
            if( hosting_home != "" && hosting_home != undefined ) {
                hosting_policy += '<a href="' + hosting_home + '" target="_blank">' + hosting_home + '</a>';
            }

            policy_hosting = policy_hosting.replaceAll('[[HOSTING PROVIDER]]',hosting_provider);
            policy_hosting = policy_hosting.replaceAll('[[HOSTING DATACENTER]]',hosting_datacenter);
            policy_hosting = policy_hosting.replaceAll('[[HOSTING POLICY]]',hosting_policy);
            policy_hosting = policy_hosting.replaceAll('[[HOSTING DATA ADMINISTRATOR]]',hosting_data_administrator);

        }

        // THIRD PARTY: Newsletter
        if( this.config.privacyPolicy.thirdpartyDataStorage.newsletter != undefined && 
            this.config.privacyPolicy.thirdpartyDataStorage.newsletter != "" &&
            this.config.privacyPolicy.thirdpartyDataStorage.newsletter.active === true) {
            
            let newsletter_provider = this.config.privacyPolicy.thirdpartyDataStorage.hosting.provider,
                newsletter_home = this.config.privacyPolicy.thirdpartyDataStorage.hosting.home,
                newsletter_datacenter = this.config.privacyPolicy.thirdpartyDataStorage.hosting.datacenter,
                newsletter_data_administrator = this.config.privacyPolicy.thirdpartyDataStorage.hosting.data_administrator,
                newsletter_policy = this.config.privacyPolicy.thirdpartyDataStorage.hosting.policy;
        
            if ( newsletter_policy != "" && newsletter_policy != undefined ) {
                newsletter_policy = '<a href="' + newsletter_policy + '" target="_blank">' + newsletter_policy + '</a><br>';
            }
            
            if( newsletter_home != "" && newsletter_home != undefined ) {
                newsletter_policy += '<a href="' + newsletter_home + '" target="_blank">' + newsletter_home + '</a>';
            }

            policy_newsletter = policy_newsletter.replaceAll('[[NEWSLETTER PROVIDER]]',newsletter_provider);
            policy_newsletter = policy_newsletter.replaceAll('[[NEWSLETTER DATACENTER]]',newsletter_datacenter);
            policy_newsletter = policy_newsletter.replaceAll('[[NEWSLETTER PROVIDER POLICY]]',newsletter_policy);
            policy_newsletter = policy_newsletter.replaceAll('[[NEWSLETTER DATA ADMINISTRATOR]]',newsletter_data_administrator);

        }

        
        first_party_services += policy_contactform;
        first_party_services += policy_siteaccount;
        first_party_services += policy_ecommerce;

        third_party_services += policy_hosting;
        third_party_services += policy_newsletter;

        // VAT NUMBER 
        let vat_number = this.config.globals.company.vatLabel + this.config.globals.company.vatNumber;
        vat_number = ( this.config.globals.company['otherCode-1'] != "" ) ? vat_number + "<br>" + this.config.globals.company['otherCode-1'] : vat_number;
        vat_number = ( this.config.globals.company['otherCode-2'] != "" ) ? vat_number + "<br>" + this.config.globals.company['otherCode-2'] : vat_number;
        vat_number = ( this.config.globals.company['otherInfo'] != "" ) ? vat_number + "<br>" + this.config.globals.company['otherInfo'] : vat_number;
        

        policy_global = policy_global.replaceAll('[[SERVIZI DI TERZE PARTI]]',third_party_services);
        policy_global = policy_global.replaceAll('[[SERVIZI DI PRIMA PARTE]]',first_party_services);

        policy_global = policy_global.replaceAll('[[NOME SITO]]',this.config.globals.site.name);
        policy_global = policy_global.replaceAll('[[URL SITO]]',this.config.globals.site.url);
        policy_global = policy_global.replaceAll('[[DATI DISPOSITIVO]]',device_data);
        policy_global = policy_global.replaceAll('[[DATI PERSONALI]]',personal_data);
        policy_global = policy_global.replaceAll('[[SCOPI RACCOLTA DATI]]',purposes);
        policy_global = policy_global.replaceAll('[[SOCIETA-RESPONSABILE]]',this.config.globals.company.name);
        policy_global = policy_global.replaceAll('[[INDIRIZZO]]',this.config.globals.company.address);
        policy_global = policy_global.replaceAll('[[PIVA]]',vat_number);
        policy_global = policy_global.replaceAll('[[NOME E COGNOME DEL RESPONSABILE]]',this.config.globals.administrator.name);
        policy_global = policy_global.replaceAll('[[LUOGO TRATTAMENTO]]',this.config.globals.dataStorageLocation);
        policy_global = policy_global.replaceAll('[[EMAIL DI CONTATTO]]',this.config.globals.site.email);

        return policy_global;
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