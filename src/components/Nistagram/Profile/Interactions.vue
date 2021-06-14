<template>
  <div>
    <b-dropdown variant="info" split v-bind:text="text" class="m-2" v-on:click="onClick">
      <b-dropdown-item href="#" v-if="notifications === 'ON'" v-on:click="mute()">mute</b-dropdown-item>
      <b-dropdown-item href="#" v-if="notifications === 'OFF'" v-on:click="unmute()">unmute</b-dropdown-item>
      <b-dropdown-divider v-if="notifications !== ''"></b-dropdown-divider>
      <b-dropdown-item href="#" variant="danger" v-if="blocked === false">block</b-dropdown-item>
      <b-dropdown-item href="#" variant="danger" v-if="blocked === true">unblock</b-dropdown-item>
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
      blocked: false
    }
  },
  mounted() {
    this.$http.get(process.env.VUE_APP_FOLLOWER_URL + 'interactions/' + this.username)
        .then(response => {
          this.status = response.data.following;
          this.notifications = response.data.notifications;
          console.log("status: " + this.status)
          console.log("notifications: " + this.notifications)
        })
        .catch(err => (console.log(err.data)))
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
            this.$router.go(0);
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
            this.$router.go(0);
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
            this.$router.go(0);
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
            this.$router.go(0);
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    },
    block() {
      // TODO:
    },
    unblock() {
      // TODO:
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