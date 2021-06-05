<template>
  <div>
    <div v-for="(request, index) in this.requests" v-bind:key="index">
      <FollowRequest v-bind:followRequest="request"></FollowRequest>
    </div>
  </div>
</template>

<script>
import FollowRequest from "@/components/Nistagram/Notifications/FollowRequest";

export default {
  name: "FollowRequests",
  components: {FollowRequest},
  data() {
    return {
      requests: [],
      width: 50
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_FOLLOWER_URL + 'interactions/waiting')
        .then(response => {
          this.requests = response.data;
        })
        .catch(err => {
          err.response.data
          alert("Something went wrong!")
        })
  },
  methods: {
    onAccept(follower) {

      console.log(follower)
    },
    onReject(follower) {
      console.log(follower)
    }
  }
}
</script>

<style scoped>

</style>