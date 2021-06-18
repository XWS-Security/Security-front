<template>
  <div style="background-color: #2e2e2e;color: #e2e8f0">
    <div class="container-lg">
      <div class="row-cols-6">
        <div class="col-lg-1 float-right">
          <br>
          <b-button-close v-on:click="backToProfile"></b-button-close>
        </div>
        <div class="col-lg-2" v-on:click="backToProfile">
          <br>
          <img style="background-color: #2e2e2e" class="profileImage" v-bind:src="profileImage"/> {{ username }}
        </div>
      </div>
      <hr style="background-color: #e2e8f0">
      <div class="row-cols-12">
        <div class="col-lg-12">
          <b-carousel
              v-model="selected"
              id="carousel-1"
              controls
              indicators
              :interval=5000
              background="#2e2e2e"
              img-height="800"
              style="text-shadow: 1px 1px 2px #333">
            <b-carousel-slide v-for="(s, index) in storiesWithImages" v-bind:key="index" img-blank
                              img-alt="Blank image">

              <b-jumbotron id="report" v-if="reportVisible">
                <textarea class="form-control" type="text" placeholder="Report reason" v-model="reason"></textarea>
                <div class="input-group-append">
                  <button class="btn btn-danger" v-on:click="sendReport(s.story.id)">Send report</button>
                </div>
              </b-jumbotron>
              {{ formatDateWithHours(s.story.date) }} <span v-for="tag in s.story.tags" v-bind:key="tag"><a
                href="">{{ tag }} </a>
            </span> <span v-if="s.story.location!=null"> at <a href=""> {{ s.story.location.name }} </a></span>
              <button v-if="user === 'NistagramUser'" class="btn btn-danger mr-2" @click="setReportVisibility">Report</button>
              <button v-if="user === 'Administrator'" class="btn btn-danger mr-2" @click="removeStory(s.story.id)">Remove Post</button>
              <button v-if="user === 'Administrator'" class="btn btn-danger mr-2">Remove User</button>
              <img v-if="s.mediatype==='image/jpeg'" class="item" v-bind:src="s.url"/>
              <video controls v-else class="item" v-bind:src="s.url" autoplay loop v-bind:muted="index!=selected"/>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {_arrayBufferToBase64} from "@/assets/js/HellperFunctions";
import {formatDate} from "@/assets/js/HellperFunctions";

export default {
  name: "Story",
  data() {
    return {
      medias: {},
      stories: [],
      storiesWithImages: [],
      selected: 0,
      username: "",
      storiesType: "",
      profileImageName: null,
      profileImage: null,
      reportVisible: false,
      reason: ''
    }
  },
  computed: {
    linkForGettingStories: function () {
      if (this.storiesType === 'highlights') {
        return process.env.VUE_APP_CONTENT_URL + 'story/highlights/' + this.username;
      } else if (this.storiesType === 'my') {
        return process.env.VUE_APP_CONTENT_URL + 'story/my';
      } else if (this.storiesType === 'reported') {
        return process.env.VUE_APP_CONTENT_URL + 'report/story';
      } else {
        return process.env.VUE_APP_CONTENT_URL + 'story/' + this.username;
      }
    },
    user() {
      let user = this.$store.state.userType;
      return user;
    }
  },
  mounted() {
    this.getProfileData();
    this.getStories();
  },
  methods: {
    getStories() {
      this.$http
          .get(this.linkForGettingStories)
          .then(response => {
            this.stories = response.data
          }).then(this.getMedias)
    },
    getProfileData() {
      const urlParams = new URLSearchParams(window.location.search);
      this.username = urlParams.get('username');
      this.profileImageName = urlParams.get('profileImage');
      this.storiesType = urlParams.get('storiesType');
      if (this.storiesType === 'my') {
        this.getLoggedUserInfo();
      } else
        this.getProfilePicture();
    },
    getLoggedUserInfo() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'interaction/loggedUser')
          .then(response => {
            this.username = response.data.username;
            this.profileImageName = response.data.profileImg;
            this.getProfilePicture();
          })
    },
    getProfilePicture() {

      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'image/' + this.profileImageName, {
            responseType: 'arraybuffer'
          })
          .then(response => {
            let type = response.headers['content-type'];
            console.log(type)
            this.profileImage = _arrayBufferToBase64(response.data, type);
          })
    },
    getMedias() {
      this.stories.forEach(s =>
          this.$http
              .get(process.env.VUE_APP_CONTENT_URL + 'image/' + s.path, {
                responseType: 'arraybuffer'
              })
              .then(response => {
                let type = response.headers['content-type'];
                let story = {url: _arrayBufferToBase64(response.data, type), mediatype: type, story: s};
                this.storiesWithImages.push(story)
              })
      )
    },
    formatDateWithHours(date) {
      let d = new Date(date);
      return formatDate(date) + " at " + d.getHours() + ":" + d.getMinutes();
    },
    backToProfile() {
      this.$router.push('/nistagramprofile?id=' + this.username)
    },
    sendReport(id) {
      let reportData = {reason: this.reason, contentId: id, reportType: 'STORY'}

      this.$http.post(process.env.VUE_APP_CONTENT_URL + 'report/', reportData)
          .then(response => {
            alert(response.data)
          })
          .catch(err => (this.console.log(err.data)))
    },
    setReportVisibility() {
      this.reportVisible = !this.reportVisible;
    },
    removeStory(id) {
      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'story/remove/' + id)
          .then(response => {
            console.log(response.data)
          })
    }
  }
}
</script>

<style scoped>
.item {
  width: 99%;
  height: 99%;
}

.profileImage {
  border-color: #e2e8f0;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 3%;
}
</style>
