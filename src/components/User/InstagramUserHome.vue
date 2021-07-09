<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-8">
      <div v-for="(a, index) in advertisements" v-bind:key="index">
        <advertisement class="my-3" v-bind:content-id="a.contentId"
                       v-bind:agent-account-username="a.agentAccountUsername"
                       v-bind:advertisement-link="a.link" v-bind:campaign-id="a.campaignId"
                       one-time="true"></advertisement>
      </div>
      <div>
        <hr>
      </div>
      <div v-for="(c, index) in content" v-bind:key="index">
        <subscribed-content class="my-3" v-bind:content-id="c.postId" v-bind:username="c.username"
                            v-bind:profile-image="c.profileImage"></subscribed-content>
      </div>
    </div>
    <div class="col-2">
      <div class="mt-4">
        <h5 v-if="recommended.length > 0">We recommend you follow these users based on the profiles you follow.</h5>
        <h5 v-else>There are currently no recommendations, try searching for some users you may know.</h5>
      </div>
      <div v-for="(u, index) in recommended" v-bind:key="index">
        <recommended-user class="my-3" v-bind:user="u" v-on:userFollowed="getRecommendations"></recommended-user>
      </div>
    </div>
  </div>
</template>

<script>

import SubscribedContent from "@/components/Nistagram/Home/SubscribedContent";
import RecommendedUser from "@/components/Nistagram/Home/RecommendedUser";
import Advertisement from "@/components/Nistagram/Home/Advertisement";

export default {
  name: "InstagramUserHome",
  components: {Advertisement, RecommendedUser, SubscribedContent},
  data() {
    return {
      content: [],
      advertisements: [],
      recommended: []
    }
  },
  mounted() {
    if (this.$store.state.userType !== 'NistagramUser') {
      this.$router.push("/")
    }

    this.getPosts();
    this.getAdvertisements();
    this.getRecommendations();
  },
  methods: {
    getAdvertisements() {
      this.getContinuousAdvertisements();
      this.getOneTimeAdvertisements();
    },
    getContinuousAdvertisements() {
      this.$http
          .get(process.env.VUE_APP_CAMPAIGN_URL + 'advertisement/continuous')
          .then(response => {
            this.advertisements.push.apply(this.advertisements, response.data);
          })
          .catch(err => (console.log(err)));
    },
    getOneTimeAdvertisements() {
      this.$http
          .post(process.env.VUE_APP_CAMPAIGN_URL + 'advertisement/onetime', {currentMoment: new Date()})
          .then(response => {
            this.advertisements.push.apply(this.advertisements, response.data);
            setTimeout(this.getOneTimeAdvertisements, 60000)
          })
          .catch(err => (console.log(err)));
    },
    getPosts() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'home/')
          .then(response => this.content = response.data)
          .catch(err => (console.log(err)));
    },
    getRecommendations() {
      this.$http
          .get(process.env.VUE_APP_FOLLOWER_URL + 'interactions/recommended')
          .then(response => this.recommended = response.data)
          .catch(err => (console.log(err.response.data)));
    }
  }
}
</script>

<style scoped>

</style>