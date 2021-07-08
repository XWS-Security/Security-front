<template>
  <div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-2 align-items-start">
        <profile-picture v-bind:username="agentAccountUsername" v-bind:image-name="profile.profilePictureName" :stories="false"></profile-picture>
      </div>
      <div class="col-1 m-auto align-items-start">
        <a v-bind:href="'nistagramprofile?id=' + agentAccountUsername"><h4>{{ agentAccountUsername }}</h4></a>
      </div>
      <div class="col-8"></div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10" v-on:click="onPostClicked()">
        <slide-show v-bind:postId="id"></slide-show>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row">
      <b-button block variant="info" style="margin-right: 10%; margin-left: 10%" @click="goToLink()">Visit advertisement</b-button>
    </div>
  </div>
</template>

<script>
import ProfilePicture from "@/components/Nistagram/Profile/ProfilePicture";
import SlideShow from "@/components/Nistagram/Post/SlideShow";

export default {
  name: "Advertisement",
  components: {ProfilePicture, SlideShow},
  props: ['contentId', 'agentAccountUsername', 'advertisementLink', 'campaignId', 'oneTime'],
  data() {
    return {
      id: '',
      profile: {}
    }
  },
  mounted() {
    this.id = this.contentId
    this.getAgentInfo();
    if(this.oneTime){
      this.seeAdvertisements();
    }
  },
  methods: {
    getAgentInfo(){
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL  + 'profile/' + this.agentAccountUsername)
          .then(response => {
            this.profile=response.data;
          })
    },
    seeAdvertisements(){
      this.$http
          .put(process.env.VUE_APP_CAMPAIGN_URL + 'advertisement/onetime/see/' + this.campaignId)
          .then(response => {
            console.log(response)
          })
          .catch(err => (console.log(err)));
    },
    onPostClicked() {
      this.$router.push("/post?id=" + this.contentId + '&username=' + this.username + '&profileImg=' + this.profile.profilePictureName);
    },
    goToLink(){
      //TODO: make absolute path, and click event
      window.location.href=this.advertisementLink;
    }
  }
}
</script>

<style scoped>

</style>
