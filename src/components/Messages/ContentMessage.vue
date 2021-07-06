<template>
  <div>
    <small>
      <p v-bind:class="sent ? 'text-right' : 'text-left'">{{ message.sentBy }}</p>
    </small>
    <div v-if="contentInfo.hasAccess" v-bind:class="sent ? classSent : classReceived" v-on:click="onClick">
      <post-image v-bind:id="message.contentId" v-bind:imageName="contentInfo.contentPath"
                  v-bind:profile-img="contentInfo.profileImage" v-bind:user="contentInfo.username"
                  v-bind:clickable="false"></post-image>
    </div>
    <div v-if="!contentInfo.hasAccess" v-bind:class="sent ? classSent : classReceived" v-on:click="onClick">
      <h5>Looks like you don't have access to this content. Try following the owner of this content by clicking
        here!</h5>
    </div>
  </div>
</template>

<script>
import PostImage from "@/components/Nistagram/Profile/PostImage";

export default {
  name: "ContentMessage",
  components: {PostImage},
  props: ["message", "sent"],
  data() {
    return {
      contentInfo: {},
      classSent: 'border rounded p-3 text-light border-info bg-info',
      classReceived: 'border rounded p-3 text-light border-dark bg-dark'
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_CONTENT_URL + "content/" + this.message.contentId)
        .then(response => (this.contentInfo = response.data))
        .catch(error => (alert(error.response.data)))
  },
  methods: {
    onClick() {
      if (this.contentInfo.hasAccess && this.contentInfo.type === 'POST') {
        let path = '/post?id=' + this.message.contentId + '&username=' + this.contentInfo.username +
            '&profileImg=' + this.contentInfo.profileImage;
        this.$router.push(path)
        return
      }
      if (this.contentInfo.hasAccess && this.contentInfo.type === 'STORY') {
        let path = '/story?username=' + this.contentInfo.username + '&profileImage=' + this.contentInfo.profileImage
        this.$router.push(path)
        return
      }
      if (!this.contentInfo.hasAccess) {
        let path = 'nistagramprofile?id=' + this.contentInfo.username
        this.$router.push(path)
        return
      }
    }
  }
}
</script>

<style scoped>

</style>