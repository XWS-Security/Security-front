<template>
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
    <div v-if="conversation.status === 'PENDING'">
      <button :class="selected ? 'btn mx-2 btn-outline-light' : 'btn  mx-2 btn-outline-info'">
        <b-icon-check></b-icon-check>
      </button>
      <button :class="selected ? 'btn mx-2 btn-outline-light' : 'btn  mx-2 btn-outline-info'">
        <b-icon-x></b-icon-x>
      </button>
      <button :class="selected ? 'btn mx-2 btn-outline-light' : 'btn  mx-2 btn-outline-info'">
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
    if (this.conversation.status === 'PENDING') this.status = 'You can approve this conversation'
    if (this.conversation.status === 'APPROVED') this.status = 'You have approved this conversation'
    if (this.conversation.status === 'REJECTED') this.status = 'You have rejected this conversation'
  }
}
</script>

<style scoped>

</style>