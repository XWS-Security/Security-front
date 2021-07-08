<template>
  <div class="d-inline-flex flex-row justify-content-between main-container">
    <div>
      <div class="d-inline-flex flex-row m-auto">
        <div v-for="(p, index) in participants" v-bind:key="index">
          <h4 class="px-2" v-if="index !== (participants.length - 1)">{{ p }},</h4>
          <h4 class="px-2" v-if="index === (participants.length - 1)">{{ p }}</h4>
        </div>
      </div>
      <div>
        <h6>{{ status }}</h6>
      </div>
    </div>
    <div class="ml-auto my-auto">
      <button :class="selected ? 'btn mx-2 btn-outline-light' : 'btn mx-2 btn-outline-info'" v-on:click="accept"
              v-if="conversation.status === 'PENDING'">
        <b-icon-check></b-icon-check>
      </button>
      <button :class="selected ? 'btn mx-2 btn-outline-light' : 'btn mx-2 btn-outline-info'" v-on:click="reject"
              v-if="conversation.status === 'PENDING'">
        <b-icon-x></b-icon-x>
      </button>
      <button :class="selected ? 'btn mx-2 btn-outline-light' : 'btn mx-2 btn-outline-info'" v-on:click="deleteConv">
        <b-icon-trash></b-icon-trash>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "ConversationSmall",
  props: ["conversation", "selected"],
  data() {
    return {
      participants: [],
      status: ''
    }
  },
  mounted() {
    this.participants = this.conversation.participants
    if (this.conversation.status === 'INITIATED') this.status = 'You have initiated this conversation'
    else if (this.conversation.status === 'PENDING') this.status = 'You can approve this conversation'
    else if (this.conversation.status === 'ACCEPTED') this.status = 'You have approved this conversation'
    else this.status = 'You have rejected this conversation'
  },
  methods: {
    accept() {
      let data = {conversationId: this.conversation.id}
      this.$http
          .put(process.env.VUE_APP_MESSAGING_URL + 'conversations/accept', data)
          // eslint-disable-next-line no-unused-vars
          .then(response => (this.$emit('conversationEdited')))
          .catch(error => (alert(error.response.data)))
    },
    reject() {
      let data = {conversationId: this.conversation.id}
      this.$http
          .put(process.env.VUE_APP_MESSAGING_URL + 'conversations/reject', data)
          // eslint-disable-next-line no-unused-vars
          .then(response => (this.$emit('conversationEdited')))
          .catch(error => (alert(error.response.data)))
    },
    deleteConv() {
      let data = {conversationId: this.conversation.id}
      this.$http
          .put(process.env.VUE_APP_MESSAGING_URL + 'conversations/delete', data)
          // eslint-disable-next-line no-unused-vars
          .then(response => (this.$emit('conversationEdited')))
          .catch(error => (alert(error.response.data)))
    }
  }
}
</script>

<style scoped>
.main-container {
  width: 100%;
}
</style>