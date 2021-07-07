<template>
  <div class="main-container">
    <small>
      <p v-bind:class="sent ? 'text-right' : 'text-left'">{{ message.sentBy }}</p>
    </small>
    <div v-bind:class="sent ? classSent : classReceived">
      <h5 class="text-left">{{ message.text }}</h5>
      <small class="mt-auto">
        <p v-bind:class="sent ? 'm-auto text-right' : 'm-auto text-left'">{{ message.sentAt }}</p>
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextMessage",
  props: ["message", "sent"],
  data() {
    return {
      classSent: 'border rounded p-3 text-light border-info bg-info',
      classReceived: 'border rounded p-3 text-light border-dark bg-dark'
    }
  }
}
</script>

<style scoped>
.main-container {
  max-width: 50%;
}
</style>