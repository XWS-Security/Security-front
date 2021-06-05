<template>
  <b-card no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row class="align-items-center">
      <b-col md="2">
        <b-card-img src="https://i.pinimg.com/originals/9f/aa/a1/9faaa1fedc94c355a4256ba6207c7714.png" alt="Image"
                    class="rounded-circle m-3"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body>
          <b-card-text>
            <b>{{ followRequest.follower }}</b> wants to follow you
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col md="4">
        <b-card-body>
          <div class="btn-group btn-group-sm" role="group" v-if="this.processed === 'none'">
            <b-button href="#" v-on:click="onAccept(followRequest.follower)" variant="outline-success icon">accept
            </b-button>
            <b-button href="#" v-on:click="onReject(followRequest.follower)" variant="outline-danger icon">reject
            </b-button>
          </div>
          <b-card-text v-if="this.processed === 'accepted'">
            Accepted!
          </b-card-text>
          <b-card-text v-if="this.processed === 'rejected'">
            Rejected!
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "FollowRequest",
  props: {
    followRequest: {follower: '', status: ''}
  },
  data() {
    return {
      processed: 'none',
      request: this.followRequest
    }
  },
  methods: {
    onAccept(username) {
      let data = {username: username}
      this.$http
          .put(process.env.VUE_APP_FOLLOWER_URL + 'interactions/accept', data)
          .then(response => {
            response.data;
            this.processed = 'accepted'
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    },
    onReject(username) {
      let data = {username: username}
      this.$http
          .put(process.env.VUE_APP_FOLLOWER_URL + 'interactions/reject', data)
          .then(response => {
            response.data;
            this.processed = 'rejected'
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    }
  }
}
</script>

<style scoped>

</style>