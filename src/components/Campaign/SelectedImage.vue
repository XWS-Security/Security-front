<template>
  <div class="content">
    <img v-if="type=='image/jpeg'" v-bind:src="image" v-bind:class="{'selectedImage':isSelected}"/>
    <video v-else v-bind:src="image" v-bind:class="{'selectedImage':isSelected}" autoplay loop muted/>
    <p v-if="isSelected">SELECTED</p>
  </div>
</template>

<script>
import {_arrayBufferToBase64} from "@/assets/js/HellperFunctions";

export default {
  name: "SelectedImage",
  props: ['name', 'selected'],
  data() {
    return {
      image: "",
      isSelected:false,
      type: ""
    }
  },
  watch:{
    selected(val){
      this.isSelected=val;
    }
  },
  mounted() {
    this.getBase64();
  },
  methods:{
    getBase64: function () {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'image/' + this.name, {
            responseType: 'arraybuffer'
          })
          .then(response => {
            let type = Object.values(response.headers)[2];
            this.type=type;
            this.image = _arrayBufferToBase64(response.data, type);
          })
    },
  }
}
</script>

<style scoped>
  img {
    border-color: #42b983;
    width: 180px;
    height: 180px;
  }
  video {
    border-color: #42b983;
    width: 180px;
    height: 180px;
  }

  .content{
    margin: 1%;
  }

  .selectedImage {
    border-style: solid;
    border-width: thick !important;
  }
</style>
