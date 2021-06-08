<template>
  <div id="app">
    <div class="container">

      <h1>Create new post!</h1>
      <hr>
      <!--UPLOAD-->
      <b-jumbotron>
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <div class="dropbox">
            <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
                   @change="upload($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                   accept="image/*, video/*" class="input-file">
            <h4 v-if="isInitial">
              Please choose videos/images to upload.
            </h4>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
          </div>
        </form>
      </b-jumbotron>
      <hr>
      <b-jumbotron>
        <div class="form-group">
          <label for="about">About</label>
          <textarea type="text" v-model="about" class="form-control" id="About"/>
        </div>

        <div>
          <label>Location</label>
          <select v-model="selectedLocation">
            <option v-bind:key="location.id" v-for="location in locations" :value="location.name">{{
                location.name
              }}
            </option>
          </select>
        </div>

        <hr>

        <select v-model="post">
          <option value="Story">Story</option>
          <option selected value="Post">Post</option>
        </select>

        <hr>

        <select v-model="closeFriends">
          <option value="Close">Close friends</option>
          <option selected value="All">All</option>
        </select>

        <hr>

        <select v-model="highlights">
          <option value="Highlights">Highlights</option>
          <option selected value="Normal">Normal</option>
        </select>

        <hr>

        <b-button @click="uploadContent()">Upload</b-button>

      </b-jumbotron>

      <!--SUCCESS-->
      <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="item in uploadedFiles" v-bind:key="item">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
      </div>

      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import {wait} from './utils'
import {upload} from './file-upload.service'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {

  name: 'app',
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      locations: [],
      selectedLocation: null,
      about: null,
      formData: null,
      post: "",
      closeFriends: false,
      highlights: ""
    }
  },

  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {

    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },

    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      console.log(formData);
      upload(formData)
          .then(wait(1500)) // DEV ONLY: wait for 1.5s
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
            this.formData = formData;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
    },

    upload(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

      // save it
      this.save(formData);
    },

    uploadContent() {

      console.log(this.post)

      if (this.post === "Post") {
        console.log("Post")
        let description = []
        let tags = []
        description = this.about.split(" ")

        for (let i = 0; i < description.length; i++) {
          if (description[i].includes("#")) {
            tags.push(description[i])
          }
        }

        console.log(this.selectedLocation)

        let data = {about: this.about, tags: tags, location: this.selectedLocation};

        this.formData.append("obj", new Blob([JSON.stringify(data)], {
          type: "application/json"
        }));

        this.$http
            .post(process.env.VUE_APP_CONTENT_URL + 'post/uploadContent', this.formData)
            .then(response => {
              console.log(response.data)
            })

      } else if (this.post === "Story") {

        let description = []
        let tags = []
        description = this.about.split(" ")
        let highlights = false;

        for (let i = 0; i < description.length; i++) {
          if (description[i].includes("#")) {
            tags.push(description[i])
          }
        }

        if (this.highlights == "Highlights") {
          highlights = true;
        }

        console.log(this.selectedLocation)

        let close = false;
        if (this.closeFriends === "All") {
          close = false;
        } else {
          close = true;
        }

        let data = {tags: tags, location: this.selectedLocation, closeFriends: close, highlights: highlights};

        this.formData.append("obj", new Blob([JSON.stringify(data)], {
          type: "application/json"
        }));

        this.$http
            .post(process.env.VUE_APP_CONTENT_URL + 'story/uploadContent', this.formData)
            .then(response => {
              console.log(response.data)
            })
      }
    },

    getLocations() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'post/locations')
          .then(response => {
            this.locations = response.data;
          })
    }
  },

  mounted() {
    this.reset();
    this.getLocations();
  },
}
</script>

<style>

</style>
