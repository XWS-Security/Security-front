<template>
  <img v-bind:src="image" v-on:click="redirectToStories"/>
</template>

<script>
import {_arrayBufferToBase64} from "@/assets/js/GetImg";

export default {
  name: "ProfilePicture",
  props: ['imageName'],
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
    redirectToStories: function (){

    },
  }
}
</script>
<style scoped>
  img {
    border-color: #e2e8f0;
    border-radius: 50%;
    width:100px;
    height:100px;
    margin: 3%;
  }
</style>
