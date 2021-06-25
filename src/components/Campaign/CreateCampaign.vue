<template>
  <div>
    <b-jumbotron style="margin: 2%">
      <h3>Create campaign</h3>
      <hr>
      <label for="max">Max age:</label> <input id="max" min="1" max="130" type="number" v-model="maxAge"> <br>
      <label for="min"> Min age : </label> <input id="min" min="1" max="130" type="number" v-model="minAge"> <br>
      <label>Gender : </label>
      <b-form-select v-model="selectedGender" :options="options" style="width: 50%; height: 5%"></b-form-select>
      <br>
      <br>
      <hr>
      <label for="advert">Link for advertisement :</label>
      <input id="advert" min="1" max="130" type="text" v-model="link"> <br><br>
      <hr>
      <label>Select content:</label><br>
      <label>Posts:</label><br>
      <div class="d-flex align-content-around  justify-content-center flex-wrap light_blue">
        <selected-image v-for="post in posts" v-bind:name="post.imageName" v-bind:key="post.id" @click.native="select(post.id)" v-bind:selected="isSelected(post.id)"></selected-image>
      </div>

      <label>Stories:</label><br>
      <div class="d-flex align-content-around  justify-content-center flex-wrap light_blue">
        <selected-image v-for="story in stories" v-bind:name="story.path" v-bind:key="story.id"
                        @click.native="select(story.id)" v-bind:selected="isSelected(story.id)"></selected-image>
      </div>
      <hr>
      <div>
        One time <input type="radio" v-model="oneTime" value=true>
        <br>
        Extended <input type="radio" v-model="oneTime" value=false>
      </div>
      <hr>
      <div v-if="oneTime==='true'">
        Exposure date: <input type="date" v-model="exposureDate">
      </div>
      <div v-else>
        Exposure start: <input type="date" v-model="exposureStart"> <br>
        Exposure end: <input type="date" v-model="exposureEnd"> <br>
      </div>
      <hr>
      <b-button variant="info" block size="lg" @click="createCampaign"> CREATE </b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import SelectedImage from "@/components/Campaign/SelectedImage";

export default {
  name: "CreateCampaign",
  components: {SelectedImage},
  data() {
    return {
      oneTime: false,
      selectedGender: 'Male',
      minAge: 1,
      posts: [],
      stories: [],
      maxAge: 130,
      link: '',
      options: [
        {value: 'Male', text: 'Male'},
        {value: 'Female', text: 'Female'},
        {value: 'Both', text: 'Both'},
      ],
      exposureDate: null,
      exposureStart: null,
      exposureEnd: null,
      selectedContent: null
    }
  },
  mounted() {
    this.getPosts();
    this.getStories();
  },
  methods: {
    getStories() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'story/my')
          .then(response => {
            this.stories = response.data
          })
    },
    getPosts() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'post/user')
          .then(response => {
            this.posts = response.data
          })
    },
    isSelected(id) {
      return id === this.selectedContent;
    },
    select(id) {
      //console.log(id);
      this.selectedContent = id;
    },
    createCampaign() {
      var dto = {'maxAge': this.maxAge, 'minAge': this.minAge, 'gender': this.selectedGender, 'link': this.link, 'contentId':this.selectedContent};
      if (this.oneTime === 'true') {
        dto['oneTime'] = true;
        dto['exposureDate'] = this.exposureDate;
      }
      else{
        dto['oneTime'] = false;
        dto['exposureStart'] = this.exposureStart;
        dto['exposureEnd'] = this.exposureEnd;
      }
      this.$http
          .post(process.env.VUE_APP_CAMPAIGN_URL + 'campaign/', dto)
          .then(response => {
            console.log(response.data);
          })
    }
  }
}
</script>

<style scoped>


</style>
