<template>
  <img v-bind:src="image"/>
</template>

<script>
import {_arrayBufferToBase64} from "@/assets/js/GetImg";

export default {
  name: "PostImage",
  mounted() {
    this.getBase64(this.imageName);
  },
  props: ['imageName', 'id'],
  data() {
    return {
      image: null
    }
  },
  watch:{
    imageName: function(newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.getBase64(newVal);
    }
  },
  methods: {
    getBase64: function () {

      this.$http
          .get(process.env.VUE_APP_CONTENT_URL  + 'image/' + this.imageName, {
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
img {
  width:180px;
  height:180px;
  margin: 1%;
}
</style>
