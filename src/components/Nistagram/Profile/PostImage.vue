<template>
  <div class="item">
    <img class="item" v-if="media.mediatype==='image/jpeg'" v-bind:src="media.url" v-on:click="openPost"/>
    <video class="item" id="vid" v-else v-bind:src="media.url" autoplay loop muted v-on:click="openPost"/>
  </div>
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
      media: {mediatype:'', url:''}
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
            let type  = Object.values(response.headers)[1];
            this.media.url = _arrayBufferToBase64(response.data, type)
            this.media.mediatype = type;
          })
    },
    openPost: function (){
      this.$router.push("/post?id=" + this.id);
    }
  }
}
</script>

<style scoped>
.item {
  width:180px;
  height:180px;
  margin: 1%;
}

</style>
