<template>
  <div class="d-flex flex-column bg-light main-screen">
    <div v-for="(m, index) in messages" v-bind:key="index" class="m-3">
      <div v-if="currentUsername === m.sentBy" class="d-flex flex-row justify-content-end">
        <text-message v-if="m.type === 'TEXT'" v-bind:message="m"
                      v-bind:sent="currentUsername === m.sentBy"></text-message>
      </div>
      <div v-if="currentUsername !== m.sentBy" class="d-flex flex-row justify-content-start">
        <text-message v-if="m.type === 'TEXT'" v-bind:message="m"
                      v-bind:sent="currentUsername === m.sentBy"></text-message>
      </div>
    </div>
    <div class="input-group mt-auto">
      <input class="form-control" type="text" placeholder="Enter message" v-model="text">
      <div class="input-group-append">
        <button class="input-group-text btn btn-light" v-on:click="onSubmit">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import TextMessage from "@/components/Messages/TextMessage";

export default {
  name: "ConversationView",
  components: {TextMessage},
  props: ["conversation"],
  watch: {
    // eslint-disable-next-line no-unused-vars
    conversation(newVal, oldVal) {
      this.$http
          .get(process.env.VUE_APP_MESSAGING_URL + 'messages/' + newVal.id)
          .then(response => (this.messages = response.data))
    }
  },
  data() {
    return {
      messages: [],
      currentUsername: '',
      text: ''
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_MESSAGING_URL + 'messages/' + this.conversation.id)
        .then(response => (this.messages = response.data))
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'profile/username')
        .then(response => (this.currentUsername = response.data))
  },
  methods: {
    onSubmit() {
      let data = {text: this.text, conversationId: this.conversation.id}
      this.$http
          .post(process.env.VUE_APP_MESSAGING_URL + 'messages/text', data)
          .then(response => (this.messages = response.data))
    }
  }
}
</script>

<style scoped>
.main-screen {
  height: 90vh
}
</style>