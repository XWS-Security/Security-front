<template>
  <div class="col">
    <div class="row" v-for="(a, index) in advertisements" v-bind:key="index">
      <div class="col-1"></div>
      <div class="col-8">
      <advertisement class="my-3" v-bind:content-id="a.contentId" v-bind:agent-account-username="a.agentAccountUsername"
      v-bind:advertisement-link="a.link" v-bind:campaign-id="a.campaignId" one-time="true"></advertisement>
      </div>
        <div class="col-2"></div>
    </div>
    <div class="row"><hr></div>
    <div class="row" v-for="(c, index) in content" v-bind:key="index">
      <div class="col-1"></div>
      <div class="col-8">
        <subscribed-content class="my-3" v-bind:content-id="c.postId" v-bind:username="c.username"
                            v-bind:profile-image="c.profileImage"></subscribed-content>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>

import SubscribedContent from "@/components/Nistagram/Home/SubscribedContent";
import Advertisement from "@/components/Nistagram/Home/Advertisement";

export default {
  name: "InstagramUserHome",
  components: {Advertisement, SubscribedContent},
  data() {
    return {
      content: [],
      advertisements:[],
    }
  },
  mounted() {
    if (this.$store.state.userType !== 'NistagramUser') {
      this.$router.push("/")
    }

    this.getPosts();
    this.getAdvertisements();
  },
  methods: {
    getAdvertisements(){
      this.getContinuousAdvertisements();
      this.getOneTimeAdvertisements();
    },
    getContinuousAdvertisements(){
      this.$http
          .get(process.env.VUE_APP_CAMPAIGN_URL + 'advertisement/continuous')
          .then(response => {
            this.advertisements.push.apply(this.advertisements, response.data);
          })
          .catch(err => (console.log(err)));
    },
    getOneTimeAdvertisements(){
      this.$http
          .post(process.env.VUE_APP_CAMPAIGN_URL + 'advertisement/onetime', {currentMoment:new Date()})
          .then(response => {
            this.advertisements.push.apply(this.advertisements, response.data);
            setTimeout(this.getOneTimeAdvertisements, 60000)
          })
          .catch(err => (console.log(err)));
    },
    getPosts(){
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'home/')
          .then(response => {
            this.content = response.data
          })
          .catch(err => (console.log(err)));
    }
  }
}
</script>

<style scoped>

</style>
