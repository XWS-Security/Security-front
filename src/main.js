import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import {store} from './store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import CreateCertificate from "@/components/CreateCertificate/CreateCertificate";
import Home from "@/components/Home";
import ViewCertificates from "@/components/ViewCertificates/ViewCertificates";
import Registration from "@/components/User/Registration/Registration";
import Login from "@/components/User/Login/Login";
import ActivationSucceeded from "@/components/User/Registration/ActivationSucceeded";
import ActivationFailed from "@/components/User/Registration/ActivationFailed";
import Activation from "@/components/User/Registration/Activation";
import AdminHome from "@/components/User/AdminHome";
import InstagramUserHome from "@/components/User/InstagramUserHome";
import PasswordReset from "@/components/User/PasswordReset/PasswordReset";
import ChangePassword from "@/components/User/PasswordReset/ChangePassword";
import Profile from "@/components/User/Profile/Profile";
import ProfileSearch from "@/components/User/Profile/ProfileSearch";
import NistagramProfile from "@/components/Nistagram/Profile/NistagramProfile";
import Post from "@/components/Nistagram/Post/Post";
import Story from "@/components/Nistagram/Story/Story";
import ContentUpload from "./components/ContentUpload/ContentUpload";
import Notifications from "@/components/Nistagram/Notifications/Notifications";
import Favourites from "@/components/Nistagram/favourites/Favourites";
import Verification from "@/components/Nistagram/Verification/Verification";
import VerificationList from "@/components/Nistagram/Verification/VerificationList";
import Reported from "@/components/Nistagram/Post/ReportedPosts";
import RegisterAgent from "./components/Agent/RegisterAgent";
import AgentVerification from "./components/Agent/AgentVerification";
import CreateCampaign from "@/components/Campaign/CreateCampaign";
import UpdateCampaign from "@/components/Campaign/UpdateCampaign";
import SendHireRequest from "@/components/Campaign/SendHireRequest";
import HireRequests from "@/components/Campaign/HireRequests";
import Conversations from "@/components/Messages/Conversations";

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter);
Vue.prototype.$http = axios;

const routes = [
    {path: '/', component: Home},
    {path: '/createCertificate', component: CreateCertificate},
    {path: '/viewCertificates', component: ViewCertificates},
    {path: '/userRegistration', component: Registration},
    {path: '/login', component: Login},
    {path: '/admin', component: AdminHome},
    {path: '/instagram', component: InstagramUserHome},
    {path: '/activation/success', component: ActivationSucceeded},
    {path: '/activation/failed', component: ActivationFailed},
    {path: '/activation', component: Activation},
    {path: '/passwordReset/:email', component: PasswordReset},
    {path: '/changePassword/', component: ChangePassword},
    {path: '/profile/', component: Profile},
    {path: '/nistagramprofile/', component: NistagramProfile, name: 'NistagramProfile', props: true},
    {path: '/post', component: Post, name: 'Post', props: true},
    {path: '/story', component: Story, name: 'Story', props: true},
    {path: '/profileSearch/', component: ProfileSearch},
    {path: '/contentUpload', component: ContentUpload},
    {path: '/favourites', component: Favourites},
    {path: '/verification', component: Verification},
    {path: '/verification/list', component: VerificationList},
    {path: '/notifications', component: Notifications},
    {path: '/campaign/create', component: CreateCampaign},
    {path: '/campaign/update', component: UpdateCampaign},
    {path: '/campaign/hire', component: SendHireRequest},
    {path: '/campaign/hire/resolve', component: HireRequests},
    {path: '/reportedPosts', component: Reported},
    {path: '/registerAgent', component: RegisterAgent},
    {path: '/verifyAgent', component: AgentVerification},
    {path: '/conversations', component: Conversations}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    store: store,
    render: h => h(App),
    router
}).$mount('#app')
