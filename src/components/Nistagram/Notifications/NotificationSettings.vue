<template>
  <div>
    <hr>
    <h4>Configure notifications for likes</h4>
    <input type="radio" id="On" value="ON" v-model="likeNotifications">
    <label for="On">On</label>
    <br>
    <input type="radio" id="Off" value="OFF" v-model="likeNotifications">
    <label for="Off">Off</label>
    <br>
    <input type="radio" id="OnOnlyForFollowers" value="FOLLOWERS_ON" v-model="likeNotifications">
    <label for="OnOnlyForFollowers">On only for followers</label>
    <br>
    <b-button class="btn btn-success" @click="updateLikeNotifications">UPDATE</b-button>
    <hr>
    <h4>Configure notifications for comments</h4>
    <input type="radio" id="CommentsOn" value="ON" v-model="commentNotifications">
    <label for="On">On</label>
    <br>
    <input type="radio" id="CommentsOff" value="OFF" v-model="commentNotifications">
    <label for="Off">Off</label>
    <br>
    <input type="radio" id="CommentsOnOnlyForFollowers" value="FOLLOWERS_ON" v-model="commentNotifications">
    <label for="OnOnlyForFollowers">On only for followers</label>
    <br>
    <b-button class="btn btn-success" @click="updateCommentNotifications">UPDATE</b-button>
  </div>
</template>

<script>
export default {
  name: "NotificationSettings",

  data() {
    return {
      commentNotifications: '',
      likeNotifications: ''
    }
  },

  methods: {

    updateLikeNotifications() {
      let notificationDto = { 'notificationStatus': this.likeNotifications};

      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'notification/like', notificationDto)
    },

    updateCommentNotifications() {
      let notificationDto = { 'notificationStatus': this.commentNotifications};

      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'notification/comment', notificationDto)
    }
  }
}
</script>

<style scoped>

</style>
