<template>
  <img v-bind:class="{ 'border-warning': stories, border:stories}" v-bind:src="image" v-on:click="redirectToStories"/>
</template>

<script>
import {_arrayBufferToBase64} from "@/assets/js/HellperFunctions";

export default {
  name: "ProfilePicture",
  props: ['imageName', 'username', 'stories'],
  data() {
    return {
      image: null
    }
  },
  watch: {
    imageName: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.getBase64(newVal);
    }
  },
  methods: {
    getBase64: function () {

      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'image/' + this.imageName, {
            responseType: 'arraybuffer'
          })
          .then(response => {
            let type = Object.values(response.headers)[2];
            this.image = _arrayBufferToBase64(response.data, type)
          })
    },
    redirectToStories: function () {
      if(this.stories==true){
        this.$router.push('/story?username='+ this.username + '&profileImage=' + this.imageName)
      }
    },
  }
}
</script>
<style scoped>
img {
  border-color: #e2e8f0;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 3%;
  border-width: 44px;
}
.border-warning{
  border-width:4px !important;
}
</style>
