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
            <div class="col">{{ id }}</div>
            <div class="col" v-if="userType === 'NistagramUser'">
              <button class="btn btn-info" v-on:click="onFollow()" v-if="followingStatus === 'NOT_FOLLOWING'">
                follow
              </button>
              <button class="btn btn-info" v-on:click="onUnfollow()" v-if="followingStatus === 'FOLLOWING'">
                unfollow
              </button>
              <button class="btn btn-info" v-on:click="onUnfollow()" v-if="followingStatus === 'WAITING_FOR_APPROVAL'">
                unsend
              </button>
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

export default {
  name: "NistagramProfile",
  components: {PostImage, ProfilePicture},
  data() {
    return {
      user: {},
      id: "",
      followingStatus: 'NOT_FOLLOWING',
      followersNum: 0,
      followingNum: 0,
      closeFriendStatus: 'USER_UNSIGNED'
    }
  },
  mounted() {
    this.getId();
    this.getUserInfo();
    this.getFollowingStatus();
    this.getFollowingStats();
    this.getCloseFriendStatus();
  },
  methods: {
    getId() {
      const urlParams = new URLSearchParams(window.location.search);
      this.id = urlParams.get('id');
    },
    getUserInfo() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'profile/' + this.id)
          .then(response => {
            this.user = response.data
          })
    },
    getFollowingStatus() {
      this.$http.get(process.env.VUE_APP_FOLLOWER_URL + 'interactions/' + this.id)
          .then(response => (this.followingStatus = response.data))
          .catch(err => (console.log(err.data)))
    },
    getFollowingStats() {
      this.$http.get(process.env.VUE_APP_FOLLOWER_URL + 'interactions/numbers/' + this.id)
          .then(response => {
            this.followersNum = response.data.followers;
            this.followingNum = response.data.following;
          })
          .catch(err => (console.log(err.data)))
    },
    onFollow() {
      let data = {username: this.id}
      this.$http
          .post(process.env.VUE_APP_FOLLOWER_URL + 'interactions/', data)
          .then(response => {
            response.data;
            this.followingStatus = true
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    },
    onUnfollow() {
      let data = {username: this.id}
      this.$http
          .put(process.env.VUE_APP_FOLLOWER_URL + 'interactions/', data)
          .then(response => {
            response.data;
            this.followingStatus = false
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
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
      return 'story?username=' + this.id + '&profileImage=' + this.user.profilePictureName + '&highlights=true';
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
