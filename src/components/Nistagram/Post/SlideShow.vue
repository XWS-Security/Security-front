<template>
  <div>
    <b-carousel
        v-model="selected"
        id="carousel-1"
        controls
        indicators
        :interval=999999999
        background="#2e2e2e"
        img-height="180"
        style="text-shadow: 1px 1px 2px #333;">
      <b-carousel-slide v-for="(media, index) in images" v-bind:key="index" v-bind:img-src="media.url" img-blank
                        img-alt="Blank image">
        <img v-if="media.mediatype==='image/jpeg'" class="item" v-bind:src="media.url"/>
        <video controls v-else class="item" v-bind:src="media.url" autoplay loop v-bind:muted="index!=selected"
               v-bind:id="index"/>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import {_arrayBufferToBase64} from "@/assets/js/HellperFunctions";

export default {
  name: "SlideShow",
  props: ['postId'],
  data() {
    return {
      images: [],
      imageNames: [],
      selected: 0,
    }
  },
  watch: {
    postId: function () {
      this.getImageNames();
    }
  },
  methods: {
    getImageNames() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'post/images/' + this.postId)
          .then(response => {
            this.imageNames = response.data
          }).then(this.getImages)
    },
    getImages() {
      this.imageNames.forEach(i =>
          this.$http
              .get(process.env.VUE_APP_CONTENT_URL + 'image/' + i, {
                responseType: 'arraybuffer'
              })
              .then(response => {
                let type = response.headers['content-type'];
                let media = {url: _arrayBufferToBase64(response.data, type), mediatype: type};
                this.images.push(media)
              })
      )
    },
  }
}
</script>

<style scoped>
.item {
  width: 99%;
  height: 99%;
}
</style>
