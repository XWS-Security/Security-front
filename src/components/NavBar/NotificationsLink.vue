<template>
  <li class="nav-item active">
    <router-link to="/notifications">
      <a class="nav-link" href="#">Notifications
        <span v-bind:class="newNotifications ? 'badge badge-info' : 'badge badge-light'">
          {{ numNewNotifications }}</span></a>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "NotificationsLink",
  data() {
    return {
      notifications: [{seen: true}]
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_CONTENT_URL + 'notification/')
        .then(response => this.notifications = response.data)
        .catch(error => console.log(error.response.data))
  },
  computed: {
    newNotifications() {
      return this.numNewNotifications !== 0
    },
    numNewNotifications() {
      return this.notifications.filter(n => n.seen === false).length
    }
  }
}
</script>

<style scoped>
.badge {
  margin-left: 1px;
}
</style>