import FdcCookieLawTool from "./components/FdcCookieLawTool.vue";

const FDCookieLaw = {
    install(Vue) {
        Vue.component("fdc-cookie-law-tool", FdcCookieLawTool);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(FDCookieLaw);
}

export default FDCookieLaw;