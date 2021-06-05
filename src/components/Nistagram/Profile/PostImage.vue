<template>
  <div class="item">
    <img v-if="media.mediatype==='image/jpeg'" class="item" v-bind:src="media.url" v-on:click="openPost"/>
    <video v-else class="item" id="vid" v-bind:src="media.url" autoplay loop muted v-on:click="openPost"/>
  </div>
</template>

<script>
import {_arrayBufferToBase64} from "@/assets/js/HellperFunctions";

export default {
  name: "PostImage",
  mounted() {
    this.getBase64(this.imageName);
  },
  props: ['imageName', 'id', 'user', 'profileImg'],
  data() {
    return {
      media: {mediatype: '', url: ''}
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
            let type  = response.headers['content-type'];
            this.media.url = _arrayBufferToBase64(response.data, type)
            this.media.mediatype = type;
          })
    },
    openPost: function () {
      if (this.user == undefined || this.profileImg == undefined) {
        this.$http
            .get(process.env.VUE_APP_CONTENT_URL + 'post/user/' + this.id)
            .then(response => {
              let user = response.data.username;
              let profileImg = response.data.profileImg;
              this.$router.push("/post?id=" + this.id + '&username=' + user + '&profileImg=' + profileImg);
            })
      } else {
        this.$router.push("/post?id=" + this.id + '&username=' + this.user + '&profileImg=' + this.profileImg);
      }

    },
    getUserInfo() {

    }
  }
}
</script>

<style scoped>
.item {
  width: 180px;
  height: 180px;
  margin: 1%;
}

</style>
