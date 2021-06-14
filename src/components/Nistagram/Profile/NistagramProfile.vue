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
            <div class="col m-auto">{{ id }}</div>
            <div class="col m-auto" v-if="userType === 'NistagramUser'">
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
        <b-button v-if="closeFriendStatus==='CLOSE_FRIENDS' || closeFriendStatus==='NOT_CLOSE'" variant="success"
                  v-on:click="changeCloseFriends" pill size="sm"> {{ closeFriendsButtonText }}
        </b-button>
      </div>
    </div>

    <hr>
    <div class="d-flex align-content-around  justify-content-center flex-wrap light_blue">
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
      renderInteractions: false
    }
  },
  mounted() {
    this.getId();
    this.getUserInfo();
    this.getFollowingStats();
    this.getCloseFriendStatus();
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
    getCloseFriendStatus() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'interaction/closeFriends/' + this.id)
          .then(response => {
            this.closeFriendStatus = response.data;
          })
    },
    changeCloseFriends() {
      if (this.closeFriendStatus === 'CLOSE_FRIENDS') {
        this.removeFriendFromCloseFriends();
      } else if (this.closeFriendStatus === 'NOT_CLOSE') {
        this.addFriendToCloseFriends();
      }
    },
    removeFriendFromCloseFriends() {
      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'interaction/closeFriends/remove/' + this.id)
          .then(response => {
            this.closeFriendStatus = response.data;
            this.getCloseFriendStatus();
          })
    },
    addFriendToCloseFriends() {
      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'interaction/closeFriends/add/' + this.id)
          .then(response => {
            this.closeFriendStatus = response.data;
            this.getCloseFriendStatus();
          })
    },
  },
  computed: {
    numberOfPosts: function () {
      if (this.user.images === undefined) {
        return 0;
      } else {
        return this.user.images.length
      }
    },
    userType() {
      let user = this.$store.state.userType;
      return user;
    },
    linkForHighlights: function () {
      return 'story?username=' + this.id + '&profileImage=' + this.user.profilePictureName + '&storyType=highlights';
    },
    closeFriendsButtonText: function () {
      if (this.closeFriendStatus === 'CLOSE_FRIENDS') {
        return 'Remove from friends';
      } else if (this.closeFriendStatus === 'NOT_CLOSE') {
        return 'Add to close friends';
      } else {
        return '';
      }
    }
  },
}
</script>

<style scoped>
.light_blue {
  background-color: #fdfffb
}
</style>
