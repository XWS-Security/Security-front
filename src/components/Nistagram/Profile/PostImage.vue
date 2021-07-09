<template>
  <div class="item">
    <img v-if="media.mediatype==='image/jpeg'" class="item" v-bind:src="media.url" v-on:click="openPost"/>
    <video v-else class="item" id="vid" v-bind:src="media.url" autoplay loop muted v-on:click="openPost"/>
    <b-button v-if="campaignId!==undefined" class="link" block variant="info" size="sm" v-on:click="openLink">Visit add</b-button>
  </div>
</template>

<script>
import {_arrayBufferToBase64} from "@/assets/js/HellperFunctions";

export default {
  name: "PostImage",
  mounted() {
    this.img= this.imageName;
    this.getImage(this.img);
    if(this.oneTime){
      this.seeAdvertisements();
    }
  },
  props: ['imageName', 'id', 'user', 'profileImg', 'clickable', 'campaignId', 'oneTime', 'influencerUsername'],
  data() {
    return {
      media: {mediatype: '', url: ''},
      img:undefined
    }
  },
  watch: {
    imageName: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.img = newVal;
      this.getBase64(newVal);
    }
  },
  methods: {
    seeAdvertisements(){
      if(this.campaignId)
      this.$http
          .put(process.env.VUE_APP_CAMPAIGN_URL + 'advertisement/onetime/see/' + this.campaignId)
          .then(response => {
            console.log(response)
          })
          .catch(err => (console.log(err)));
    },
    getBase64: function () {

      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'image/' + this.img, {
            responseType: 'arraybuffer'
          })
          .then(response => {
            let type  = response.headers['content-type'];
            this.media.url = _arrayBufferToBase64(response.data, type)
            this.media.mediatype = type;
          })
    },
    getImageNameThenGetBase64(){
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'post/images/' + this.id)
          .then(response => {
            this.img=response.data[0];
            this.getImage();
          })
    },
    getImage:function (){
      if(this.img===undefined){
        this.getImageNameThenGetBase64();
      }
      else
      this.getBase64();
    },
    openLink(){

    },
    openPost: function () {
      if (!this.clickable) return
      if (this.user === undefined || this.profileImg === undefined) {
        this.$http
            .get(process.env.VUE_APP_CONTENT_URL + 'post/user/' + this.id)
            .then(response => {
              let user = response.data.username;
              let profileImg = response.data.profileImg;
              this.$router.push("/post?id=" + this.id + '&username=' + user + '&profileImg=' + profileImg + this.campaignUrlPart);
            })
      } else {
        this.$router.push("/post?id=" + this.id + '&username=' + this.user + '&profileImg=' + this.profileImg + this.campaignUrlPart);
      }
    },
    getUserInfo() {
      //TODO: go to address and make click event
    }
  },
  computed:{
    campaignUrlPart(){
      if(this.campaignId!==undefined){
        return '&campaignId=' + this.campaignId;
      }
      return ''
    }
  }
}
</script>

<style scoped>
.item {
  width: 180px;
  height: 180px;
  margin: 3%;
}

</style>
