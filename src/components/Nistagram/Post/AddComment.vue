<template>
  <div class="input-group">
    <input class="form-control" type="text" placeholder="Leave a comment" v-model="text">
    <div class="input-group-append">
      <button class="input-group-text btn btn-light" v-on:click="onSubmit">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddComment",
  props: ['postId'],
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onSubmit() {
      let data = {postId: this.postId, text: this.text}
      this.$http.post(process.env.VUE_APP_CONTENT_URL + 'post/comment', data)
          .then()
          .catch(err => (this.console.log(err.data)))
    }
  }
}
</script>

<style scoped>

</style>