import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import CreateCertificate from "@/components/CreateCertificate/CreateCertificate";
import Home from "@/components/Home";

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter);

const routes = [
    {path: '/home', component: Home},
    {path: '/createCertificate', component: CreateCertificate},
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
