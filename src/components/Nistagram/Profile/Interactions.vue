<template>
  <div>
    <b-dropdown variant="info" split v-bind:text="text" class="m-2" v-on:click="onClick">
      <b-dropdown-item href="#" v-if="notifications === 'ON'" v-on:click="mute()">mute</b-dropdown-item>
      <b-dropdown-item href="#" v-if="notifications === 'OFF'" v-on:click="unmute()">unmute</b-dropdown-item>
      <b-dropdown-divider v-if="notifications !== ''"></b-dropdown-divider>
      <b-dropdown-item href="#" v-if="!close" v-on:click="addClose()">add close friend</b-dropdown-item>
      <b-dropdown-item href="#" v-if="close" v-on:click="removeClose()">remove close friend</b-dropdown-item>
      <b-dropdown-divider v-if="notifications !== ''"></b-dropdown-divider>
      <b-dropdown-item href="#" variant="danger" v-if="!blocked">block</b-dropdown-item>
      <b-dropdown-item href="#" variant="danger" v-if="blocked">unblock</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "Interactions",
  props: ['username'],
  data() {
    return {
      status: 'FOLLOWING',
      notifications: '',
      blocked: false,
      close: false
    }
  },
  mounted() {
    this.getFollowStatus()
    this.getClose()
  },
  methods: {
    onClick() {
      if (this.status === 'FOLLOWING' || this.status === 'REQUEST_SENT') this.unfollow();
      else this.follow()
    },
    follow() {
      let data = {username: this.username}
      this.$http
          .post(process.env.VUE_APP_FOLLOWER_URL + 'interactions/', data)
          .then(response => {
            response.data;
            this.getFollowStatus();
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    },
    unfollow() {
      let data = {username: this.username}
      this.$http
          .put(process.env.VUE_APP_FOLLOWER_URL + 'interactions/', data)
          .then(response => {
            response.data;
            this.getFollowStatus();
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    },
    mute() {
      let data = {username: this.username}
      this.$http
          .put(process.env.VUE_APP_FOLLOWER_URL + 'notifications/mute', data)
          .then(response => {
            response.data;
            this.getFollowStatus();
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    },
    unmute() {
      let data = {username: this.username}
      this.$http
          .put(process.env.VUE_APP_FOLLOWER_URL + 'notifications/unmute', data)
          .then(response => {
            response.data;
            this.getFollowStatus();
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    },
    addClose() {
      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'interaction/closeFriends/add/' + this.username)
          .then(response => {
            this.closeFriendStatus = response.data;
            this.getClose();
          })
    },
    removeClose() {
      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'interaction/closeFriends/remove/' + this.username)
          .then(response => {
            this.closeFriendStatus = response.data;
            this.getClose();
          })
    },
    block() {
      // TODO:
    },
    unblock() {
      // TODO:
    },
    getFollowStatus() {
      this.$http.get(process.env.VUE_APP_FOLLOWER_URL + 'interactions/' + this.username)
          .then(response => {
            this.status = response.data.following;
            this.notifications = response.data.notifications;
          })
          .catch(err => (console.log(err.data)))
    },
    getClose() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'interaction/closeFriends/' + this.username)
          .then(response => {
            this.close = response.data === 'CLOSE_FRIENDS';
          })
    }
  },
  computed: {
    text() {
      switch (this.status) {
        case "FOLLOWING":
          return 'unfollow';
        case "NOT_FOLLOWING":
          return 'follow';
        case "FOLLOWS_YOU":
          return 'follow back';
        case "REQUEST_SENT":
          return 'unsend';
      }
      return ''
    }
  }
}
</script>

<style scoped>

</style>