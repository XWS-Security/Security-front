<template>
  <div class="main-container">
    <small>
      <p v-bind:class="sent ? 'text-right' : 'text-left'">{{ message.sentBy }}</p>
    </small>
    <div v-if="!message.seen" v-bind:class="sent ? classSent : classReceived">
      <img v-if="media.mediatype==='image/jpeg'" class="item img-loaded" v-bind:src="media.url"/>
      <video v-else class="item img-loaded" id="vid" v-bind:src="media.url" autoplay loop muted/>
      <small class="mt-auto">
        <p v-bind:class="sent ? 'm-auto text-right' : 'm-auto text-left'">{{ message.sentAt }}</p>
      </small>
    </div>
    <div v-if="message.seen" v-bind:class="sent ? classSent : classReceived">
      <h5>This content is no longer available.</h5>
      <small class="mt-auto">
        <p v-bind:class="sent ? 'm-auto text-right' : 'm-auto text-left'">{{ message.sentAt }}</p>
      </small>
    </div>
  </div>
</template>

<script>
import {_arrayBufferToBase64} from "@/assets/js/HellperFunctions";

export default {
  name: "OneTimeMessage",
  props: ["message", "sent"],
  data() {
    return {
      media: {mediatype: '', url: ''},
      classSent: 'border rounded p-3 text-light border-info bg-info',
      classReceived: 'border rounded p-3 text-light border-dark bg-dark'
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_MESSAGING_URL + 'messages/image/' + this.message.file, {responseType: 'arraybuffer'})
        .then(response => {
          let type = response.headers['content-type'];
          this.media.url = _arrayBufferToBase64(response.data, type)
          this.media.mediatype = type;
        })
    setTimeout(this.onMessageSeen, 10000)
  },
  methods: {
    onMessageSeen() {
      if (this.message.seen) return
      this.$http
          .put(process.env.VUE_APP_MESSAGING_URL + 'messages/seen/', {messageId: this.message.id})
          .then(response => (response.data))
          .catch(error => console.log(error.response.data))
    }
  }
}
</script>

<style scoped>
.main-container {
  max-width: 50%;
}

.img-loaded {
  width: 15vw;
  height: 15vw;
  object-fit: cover;
}
</style>