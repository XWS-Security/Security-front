<template>
  <div class="d-inline-flex flex-row">
    <button class="btn btn-info m-auto" v-on:click="onShare()">
      <b-icon-share></b-icon-share>
    </button>
    <div class="input-group m-auto" v-if="clicked">
      <b-select v-model="selectedConversation" v-on:input="onConversationSelected" class="m-2">
        <template #first>
          <b-form-select-option disabled :value="null">
            Select to share
          </b-form-select-option>
        </template>
        <option v-for="(c, index) in conversations" :value="c" v-bind:key="index">{{
            formatConversation(c.participants)
          }}
        </option>
      </b-select>
      <div class="input-group-append">
        <button class="btn btn-info m-auto" v-on:click="onSend">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShareContent",
  props: ["contentId"],
  data() {
    return {
      conversations: [],
      selectedConversation: null,
      clicked: false
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_MESSAGING_URL + 'conversations/')
        .then(response => {
          this.conversations = response.data
        })
  },
  methods: {
    onShare() {
      this.clicked = !this.clicked
    },
    onSend() {
      let data = {contentId: this.contentId, conversationId: this.selectedConversation.id}
      this.$http
          .post(process.env.VUE_APP_MESSAGING_URL + 'messages/content', data)
          .then(response => (this.messages = response.data))
    },
    onConversationSelected() {
    },
    formatConversation(participants) {
      let result = ""
      for (let p of participants) {
        if (participants.indexOf(p)) result += ', '
        result += p
      }
      return result
    }
  }
}
</script>

<style scoped>

</style>