import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import CreateCertificate from "@/components/CreateCertificate/CreateCertificate";
import Home from "@/components/Home";
import ViewCertificates from "@/components/ViewCertificates/ViewCertificates";

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter);
Vue.prototype.$http = axios;

const routes = [
    {path: '/home', component: Home},
    {path: '/createCertificate', component: CreateCertificate},
    {path: '/viewCertificates', component: ViewCertificates}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
