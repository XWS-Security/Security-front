<template>
  <div style="margin: 1% 20%">
    <div class="d-flex align-content-around justify-content-left flex-wrap light_blue">
      <profile-picture v-bind:imageName="user.profilePictureName" v-bind:stories="user.hasStories"
                       v-bind:username="id"></profile-picture>
      <br>
      <div>
        <br>
        <h4>
          <div class="row">
            <div class="col-2 m-auto">{{ id }}</div>
            <div class="col-3 m-auto" v-if="verificationStatus==='VERIFIED'">
              <span style="float: right" title="Verified">
                <b-icon icon="check-circle-fill" font-scale="1" variant="info"></b-icon>
              </span>
            </div>
            <div class="col-lg m-auto" v-if="userType === 'NistagramUser'">
              <interactions v-if="renderInteractions" v-bind:username="this.id"></interactions>
            </div>
          </div>
        </h4>
        {{ user.about }}<br>
        <b>{{ followersNum }}</b> followers <b> {{ followingNum }}</b> following <b>{{ numberOfPosts }}</b> posts<br>
        <b-button v-bind:href="linkForHighlights" v-if="user.hasHighlights" variant="warning" pill size="sm"
                  style="float: left">
          <b-icon icon="star" aria-hidden="true" animation="spin"></b-icon>
          <small> HIGHLIGHTS </small>
          <b-icon icon="star" aria-hidden="true" animation="spin"></b-icon>
        </b-button>
      </div>
    </div>

    <hr>
    <div class="d-flex align-content-around  justify-content-center flex-wrap light_blue" v-if="hasViewAccess">
      <post-image v-for="i in user.images" :key="i.imageName"
                  v-bind:imageName="i.imageName"
                  v-bind:id="i.postId"
                  v-bind:user="id"
                  v-bind:profile-img="user.profilePictureName"></post-image>
    </div>
  </div>
</template>

<script>
import ProfilePicture from "@/components/Nistagram/Profile/ProfilePicture";
import PostImage from "@/components/Nistagram/Profile/PostImage";
import Interactions from "@/components/Nistagram/Profile/Interactions";

export default {
  name: "NistagramProfile",
  components: {Interactions, PostImage, ProfilePicture},
  data() {
    return {
      user: {},
      id: "",
      followingStatus: 'NOT_FOLLOWING',
      followersNum: 0,
      followingNum: 0,
      closeFriendStatus: 'USER_UNSIGNED',
      renderInteractions: false,
      verificationStatus: '',
      hasViewAccess: false
    }
  },
  mounted() {
    this.getId();
    this.getUserInfo();
    this.getFollowingStats();
    this.getVerificationStatus();
    this.validateViewAccess();
  },
  methods: {
    getId() {
      const urlParams = new URLSearchParams(window.location.search);
      this.id = urlParams.get('id');
      this.renderInteractions = true;
    },
    getUserInfo() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'profile/' + this.id)
          .then(response => {
            this.user = response.data
          })
    },
    getFollowingStats() {
      this.$http.get(process.env.VUE_APP_FOLLOWER_URL + 'interactions/numbers/' + this.id)
          .then(response => {
            this.followersNum = response.data.followers;
            this.followingNum = response.data.following;
          })
          .catch(err => (console.log(err.data)))
    },
    getVerificationStatus() {
      this.$http.get(process.env.VUE_APP_BACKEND_URL + 'verification/status/' + this.id)
          .then(response => {
            this.verificationStatus = response.data;
          })
          .catch(err => (console.log(err.data)))
    },
    validateViewAccess() {
      this.$http.get(process.env.VUE_APP_FOLLOWER_URL + 'users/hasViewAccess/' + this.id)
          .then(response => {
            this.hasViewAccess = response.data.accessAllowed
          })
          .catch(err => {
            alert(err.response.data.message);
            this.$router.push('/login');
          })
    }
  }
  ,
  computed: {
    numberOfPosts: function () {
      if (this.user.images === undefined) {
        return 0;
      } else {
        return this.user.images.length
      }
    }
    ,
    userType() {
      let user = this.$store.state.userType;
      return user;
    }
    ,
    linkForHighlights: function () {
      return 'story?username=' + this.id + '&profileImage=' + this.user.profilePictureName + '&storyType=highlights';
    }
  }
  ,
}
</script>

<style scoped>
.light_blue {
  background-color: #fdfffb
}
</style>
