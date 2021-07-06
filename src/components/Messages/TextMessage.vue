<template>
  <div v-bind:class="sent ? classSent : classReceived">
    <h5>{{ message.text }}</h5>
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

</style>