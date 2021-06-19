<template>
  <b-jumbotron style="margin: 3%">
    <div class="container">
      <div class="row">
        <div class="col" style="background-color: #2e2e2e">
          <img v-bind:src="image">
        </div>
        <div class="col">
          <p id="name">Name: {{ verificationRequest.name }}</p> <br>
          <p id="surname">Surname: {{ verificationRequest.surname }}</p> <br>
          <p id="category">Category: {{category(verificationRequest.category)}}</p> <br>
          <b-button variant="info" @click="approve">Approve</b-button> <b-button variant="warning" @click="reject">Reject</b-button>
        </div>
      </div>
    </div>
  </b-jumbotron>
</template>

<script>
import {_arrayBufferToBase64} from "@/assets/js/HellperFunctions";

export default {
  name: "VerificationListItem",
  props: ['id'],
  data() {
    return {
      verificationRequest: {},
      categories: new Map(),
      image:null
    }
  },
  mounted() {
    this.fillCategories();
    this.getRequest();
  },
  methods: {
    getRequest() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'verification/' + this.id)
          .then(response => {
            this.verificationRequest = response.data;
            this.getBase64();
          })
    },
    fillCategories() {
      this.categories.set('INFLUENCER', 'Influencer');
      this.categories.set('SPORTS', 'Sports');
      this.categories.set('NEW_MEDIA', 'New/Media');
      this.categories.set('BUSINESS', 'Business');
      this.categories.set('BRAND', 'Brand');
      this.categories.set('ORGANIZATION', 'Organization');
    },
    category(Category) {
      return this.categories.get(Category);
    },
    getBase64: function () {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'image/' + this.verificationRequest.officialDocumentImageName, {
            responseType: 'arraybuffer'
          })
          .then(response => {
            let type = Object.values(response.headers)[2];
            this.image = _arrayBufferToBase64(response.data, type)
          })
    },
    approve(){
      this.$http
          .put(process.env.VUE_APP_BACKEND_URL + 'verification/approve/' + this.id)
          .then(response => {
            console.log(response);
            this.refresh();
          })
    },
    reject(){
      this.$http
          .put(process.env.VUE_APP_BACKEND_URL + 'verification/reject/' + this.id)
          .then(response => {
            console.log(response);
            this.refresh();
          })
    },
    refresh(){
      this.$emit('reviewed')
    }
  },
  computed: {

  }

}
</script>

<style scoped>
  img{
    height: 300px;
  }
</style>
