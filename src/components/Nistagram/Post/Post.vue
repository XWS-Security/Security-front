<template>
  <div class="container" style="border:1px solid #cecece;">
    <div class="row">
      <div class="col" style="background-color: #2e2e2e">
        <slide-show v-bind:postId="id"></slide-show>
      </div>
      <div class="col">
        <div>
          <div>
            <profile-picture v-bind:image-name="profileImage" v-bind:username="username"
                             :stories="false"></profile-picture>
            <a v-bind:href="'nistagramprofile?id=' + username"><h4>{{ username }}</h4></a><br/><br/>
          </div>
          <small>
            {{ parseDate(post.date) }} <span v-if="post.location!==null">at <a
              href="">{{ post.location.name }}</a></span><br/>
            <a v-for="t in post.tags" v-bind:key="t" href="/">{{ t }} </a>
          </small>
          {{ post.about }}<br/>

          <button v-if="user === 'NistagramUser'" class="btn btn-success mr-2" v-on:click="onLike()">
            <b-icon-hand-thumbs-up></b-icon-hand-thumbs-up>
          </button>
          <button v-if="user === 'NistagramUser'" class="btn btn-danger" v-on:click="onDislike()">
            <b-icon-hand-thumbs-down></b-icon-hand-thumbs-down>
          </button>
          <br/>

          <a><b>{{ post.likes }}</b> likes</a> <a><b>{{ post.dislikes }}</b> dislikes</a>
        </div>
        <b-button @click="saveOrRemove" v-if="isSaveVisible">{{ favouritesButtonName }}</b-button>
        <hr>
        <button v-if="user === 'NistagramUser'" class="btn btn-danger mr-2" v-on:click="setReportVisibility">Report</button>
        <button v-if="user === 'Administrator'" class="btn btn-danger mr-2" v-on:click="removeContent">Remove Post</button>
        <button v-if="user === 'Administrator'" class="btn btn-danger mr-2">Remove User</button>
        <hr>
        <div v-if="user === 'NistagramUser'">
          <add-comment v-bind:post-id="id"></add-comment>
        </div>
        <div v-for="c in post.commentIds" v-bind:key="c">
          <br>
          <comment v-bind:id="c">
          </comment>
        </div>
      </div>
      <b-jumbotron id="report" v-if="reportVisible">
        <textarea class="form-control" type="text" placeholder="Report reason" v-model="reason"></textarea>
        <div class="input-group-append">
          <button class="btn btn-danger" v-on:click="sendReport">Send report</button>
        </div>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import SlideShow from "@/components/Nistagram/Post/SlideShow";
import ProfilePicture from "@/components/Nistagram/Profile/ProfilePicture";
import {formatDate} from "@/assets/js/HellperFunctions";
import Comment from "@/components/Nistagram/Post/Comment";
import AddComment from "@/components/Nistagram/Post/AddComment";

export default {
  name: "Post",
  components: {AddComment, Comment, ProfilePicture, SlideShow},
  data() {
    return {
      id: '',
      profileImage: '',
      username: '',
      post: {likes: 0, dislikes: 0, date: null, location: {name: null, id: null}, tags: [], commentIds: [], about: ""},
      isFavourite: false,
      isSaveVisible: false,
      reason: '',
      reportVisible: false
    }
  },
  mounted() {
    this.getQueryParams();
    this.getPostInfo();
    this.checkIsFavourite();
  },
  methods: {
    getQueryParams() {
      const urlParams = new URLSearchParams(window.location.search);
      this.id = urlParams.get('id');
      this.profileImage = urlParams.get('profileImg');
      this.username = urlParams.get('username');
    },
    getPostInfo() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'post/' + this.id)
          .then(response => {
            this.post = response.data
          })
    },
    parseDate(date) {
      return formatDate(date);
    },
    checkIsFavourite() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'favourites/' + this.id)
          .then(response => {
            this.isSaveVisible = true;
            this.isFavourite = response.data;
          }).catch(err => {
        console.log(err);
        this.isSaveVisible = false;
      });
    },
    saveOrRemove() {
      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'favourites/' + this.id)
          .then(response => {
            console.log(response.data)
            this.checkIsFavourite();
          })
    },
    onLike() {
      let data = {postId: this.id}
      this.$http.put(process.env.VUE_APP_CONTENT_URL + 'post/like', data)
          .then()
          .catch(err => (this.console.log(err.data)))
    },
    onDislike() {
      let data = {postId: this.id}
      this.$http.put(process.env.VUE_APP_CONTENT_URL + 'post/dislike', data)
          .then()
          .catch(err => (this.console.log(err.data)))
    },
    sendReport() {

      let reportData = {reason: this.reason, contentId: this.id}

      this.$http.post(process.env.VUE_APP_CONTENT_URL + 'report/', reportData)
          .then(response => {
            alert(response.data)
          })
          .catch(err => (this.console.log(err.data)))
    },

    setReportVisibility() {
      this.reportVisible = !this.reportVisible;
    },
    removeContent() {
      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'post/remove/' + this.id)
          .then(response => {
            console.log(response.data)
          })
    },
    removeUser() {
      this.$http
          .put(process.env.VUE_APP_CONTENT_URL + 'profile/remove' + this.id)
          .then(response => {
            console.log(response.data)
          })
    }
  },

  computed: {
    favouritesButtonName() {
      let buttonName = "";
      if (this.isFavourite == true)
        buttonName = "Remove from favourites"
      else {
        buttonName = "Save to favourites"
      }
      return buttonName;
    },

    user() {
      let user = this.$store.state.userType;
      return user;
    }
  }
}
</script>

<style scoped>

</style>
