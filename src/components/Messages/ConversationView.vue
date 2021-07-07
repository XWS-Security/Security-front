<template>
  <div class="d-flex flex-column bg-light main-screen">
    <div class="overflow-auto">
      <div v-for="(m, index) in messages" v-bind:key="index" class="m-3">
        <div v-if="currentUsername === m.sentBy" class="d-flex flex-row justify-content-end">
          <text-message v-if="m.type === 'TEXT'" v-bind:message="m"
                        v-bind:sent="currentUsername === m.sentBy"></text-message>
          <content-message v-if="m.type === 'CONTENT'" v-bind:message="m"
                           v-bind:sent="currentUsername === m.sentBy"></content-message>
          <one-time-message v-if="m.type === 'ONE_TIME'" v-bind:message="m"
                            v-bind:sent="currentUsername === m.sentBy"></one-time-message>
        </div>
        <div v-if="currentUsername !== m.sentBy" class="d-flex flex-row justify-content-start">
          <text-message v-if="m.type === 'TEXT'" v-bind:message="m"
                        v-bind:sent="currentUsername === m.sentBy"></text-message>
          <content-message v-if="m.type === 'CONTENT'" v-bind:message="m"
                           v-bind:sent="currentUsername === m.sentBy"></content-message>
          <one-time-message v-if="m.type === 'ONE_TIME'" v-bind:message="m"
                            v-bind:sent="currentUsername === m.sentBy"></one-time-message>
        </div>
      </div>
    </div>
    <div class="input-group mt-auto">
      <input class="form-control" type="text" placeholder="Enter message" v-model="text">
      <div class="input-group-append">
        <button class="input-group-text btn btn-light" v-on:click="onAttachFile">
          <b-icon-paperclip></b-icon-paperclip>
        </button>
      </div>
      <div class="input-group-append">
        <button class="input-group-text btn btn-light" v-on:click="onSubmit">Send</button>
      </div>
    </div>
    <one-time-content-upload v-if="uploadDisplayed" v-bind:conversation-id="conversation.id"
                             @messageSent="getMessages(false)"></one-time-content-upload>
  </div>
</template>

<script>
import TextMessage from "@/components/Messages/TextMessage";
import ContentMessage from "@/components/Messages/ContentMessage";
import OneTimeContentUpload from "@/components/Messages/OneTimeContentUpload";
import OneTimeMessage from "@/components/Messages/OneTimeMessage";

export default {
  name: "ConversationView",
  components: {OneTimeMessage, OneTimeContentUpload, ContentMessage, TextMessage},
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
      text: '',
      uploadDisplayed: false
    }
  },
  mounted() {
    this.getMessages()
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'profile/username')
        .then(response => (this.currentUsername = response.data))
  },
  methods: {
    getMessages(timeout = true) {
      this.$http
          .get(process.env.VUE_APP_MESSAGING_URL + 'messages/' + this.conversation.id)
          .then(response => (this.messages = response.data))
      if (timeout) setTimeout(this.getMessages, 5000)
    },
    onSubmit() {
      if (this.text == null || this.text === '') return
      let data = {text: this.text, conversationId: this.conversation.id}
      this.$http
          .post(process.env.VUE_APP_MESSAGING_URL + 'messages/text', data)
          // eslint-disable-next-line no-unused-vars
          .then(response => {
            this.text = ''
            this.getMessages(false)
          })
          .catch(error => (alert(error.response.data)))
    },
    onAttachFile() {
      this.uploadDisplayed = !this.uploadDisplayed
    }
  }
}
</script>

<style scoped>
.main-screen {
  height: 90vh
}
</style>