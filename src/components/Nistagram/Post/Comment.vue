<template>
  <div class="container rounded" style="border:1px solid #cecece;">
    <div class="row">
      <div class="col-sm-2">
        <a v-bind:href="'nistagramprofile?id=' + comment.username">
          <img v-bind:src="image"><br/>
          <small>{{ comment.username }}</small><br/>
        </a>
        <small>{{ parseDate(comment.date) }}</small>
      </div>
      <div class="col-sm-10">{{ comment.text }}</div>
    </div>
  </div>
</template>

<script>
import {_arrayBufferToBase64, formatDate} from "@/assets/js/HellperFunctions";

export default {
  name: "Comment",
  props: ['id'],
  mounted() {
    this.getComment();
  },
  data() {
    return {
      comment: {username: "", date: "", text: ""},
      image:""
    }
  },
  methods: {
    getComment() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'post/comment/' + this.id)
          .then(response => {
            this.comment = response.data
            this.comment.image = this.getImage(response.data.imageName);
          })
    },
    getImage(imageName) {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'image/' + imageName, {
            responseType: 'arraybuffer'
          })
          .then(response => {
            let type = Object.values(response.headers)[1];
            this.image = _arrayBufferToBase64(response.data, type);
          })
    },
    parseDate(date) {
      formatDate(date);
    }
  }
}
</script>

<style scoped>
img {
  border-color: #e2e8f0;
  border-radius: 50%;
  width:50px;
  height:50px;
  margin: 3%;
}
</style>
