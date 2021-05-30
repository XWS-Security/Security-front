<template>
  <img v-bind:src="image" alt="Avatar"/>
</template>

<script>
import {_arrayBufferToBase64} from "@/components/GetImg";

export default {
  name: "PostImage",
  mounted() {
    this.getBase64();
  },
  props: {
    imageName: String
  },
  data() {
    return {
      image: null
    }
  },
  methods: {
    getBase64: function () {

      this.$http
          .get(process.env.VUE_APP_CONTENT_URL  + 'getImg/' + this.imageName, {
            responseType: 'arraybuffer'
          })
          .then(response => {
            this.image = _arrayBufferToBase64(response.data)
          })
    },
  }
}
</script>

<style scoped>

</style>
