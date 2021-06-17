<template>
  <div class="col">
    <div class="row" v-for="(c, index) in content" v-bind:key="index">
      <div class="col-1"></div>
      <div class="col-8">
        <subscribed-content class="my-3" v-bind:content-id="c.postId" v-bind:username="c.username"
                            v-bind:profile-image="c.profileImage"></subscribed-content>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>

import SubscribedContent from "@/components/Nistagram/Home/SubscribedContent";

export default {
  name: "InstagramUserHome",
  components: {SubscribedContent},
  data() {
    return {
      content: []
    }
  },
  mounted() {
    if (this.$store.state.userType !== 'NistagramUser') {
      this.$router.push("/")
    }

    this.$http
        .get(process.env.VUE_APP_CONTENT_URL + 'home/')
        .then(response => {
          this.content = response.data
        })
        .catch(err => (console.log(err)));
  },
}
</script>

<style scoped>

</style>