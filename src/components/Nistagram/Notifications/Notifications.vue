<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Configure Notifications">
          <b-card-text>Configure section</b-card-text>
          <NotificationSettings></NotificationSettings>
        </b-tab>
        <b-tab title="Activity" active>
          <div
              v-bind:class="n.seen === false ? 'notification rounded bg-info text-light' : 'notification rounded bg-light'"
              v-for="(n, index) in notifications" v-bind:key="index" v-on:click="onClick(n.id)">
            <notification v-bind:notification="n"></notification>
          </div>
        </b-tab>
        <b-tab title="Followers">
          <FollowRequests></FollowRequests>
        </b-tab>
        <b-tab title="Likes">
          <b-card-text>Likes and dislikes section</b-card-text>
          <p>Liked</p>
          <liked-posts></liked-posts>
          <hr>
          <p>Disliked</p>
          <disliked-posts></disliked-posts>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import FollowRequests from "@/components/Nistagram/Notifications/FollowRequests";
import LikedPosts from "@/components/Nistagram/Notifications/LikedPosts";
import DislikedPosts from "@/components/Nistagram/Notifications/DislikedPosts";
import NotificationSettings from "@/components/Nistagram/Notifications/NotificationSettings";
import Notification from "@/components/Nistagram/Notifications/Notification";

export default {
  name: "Notifications",
  components: {Notification, NotificationSettings, DislikedPosts, LikedPosts, FollowRequests},
  data() {
    return {
      notifications: []
    }
  },
  mounted() {
    this.getNotifications()
  },
  methods: {
    onClick(id) {
      let data = {notificationId: id}
      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'notification/seen', data)
          // eslint-disable-next-line no-unused-vars
          .then(response => this.getNotifications())
          .catch(error => console.log(error.response.data))
    },
    getNotifications() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'notification/')
          .then(response => this.notifications = response.data)
          .catch(error => console.log(error.response.data))
    }
  }
}
</script>

<style scoped>
.notification {
  padding: 3px;
  margin: 3px;
}
</style>
