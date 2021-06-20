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
          <b-select v-model="selectedLocation">
            <template #first>
              <b-form-select-option :value="null" disabled>Select location</b-form-select-option>
            </template>
            <option v-bind:key="location.id" v-for="location in locations" :value="location.name">{{
                location.name
              }}
            </option>
          </b-select>
        </div>

        <hr>

        <b-select v-model="post">
          <template #first>
            <b-form-select-option :value="''" disabled>Select content type</b-form-select-option>
          </template>
          <option value="Story">Story</option>
          <option selected value="Post">Post</option>
        </b-select>

        <hr>

        <b-select v-model="closeFriends" v-if="post === 'Story'">
          <template #first>
            <b-form-select-option :value="''" disabled>Select who will be able to see your story
            </b-form-select-option>
          </template>
          <option value="Close">Close friends</option>
          <option selected value="All">All</option>
        </b-select>

        <hr v-if="post === 'Story'">

        <b-select v-model="highlights" v-if="post === 'Story'">
          <template #first>
            <b-form-select-option :value="''" disabled>Select story type</b-form-select-option>
          </template>
          <option value="Highlights">Highlights</option>
          <option selected value="Normal">Normal</option>
        </b-select>

        <hr v-if="post === 'Story'">

        <b-select v-model="taggedUserSelected" v-on:input="onTaggedUserSelected">
          <template #first>
            <b-form-select-option disabled :value="null">
              Select user to tag
            </b-form-select-option>
          </template>
          <option v-for="(u, index) in taggedUserOptions" :value="u" v-bind:key="index">{{ u }}</option>
        </b-select>

        <div class="d-flex flex-row">
          <div class="p-2" v-for="(u, index) in taggedUsers" v-bind:key="index">
            <h4><span class="badge badge-pill badge-info">
              <div class="d-inline-flex justify-content-center flex-row m-auto">
                <div class="m-auto">{{ u }}</div>
                <div class="m-auto">
                  <button class="btn btn-link text-light m-auto" v-on:click="onTaggedUserUnselected(u)">
                  <b-icon-x></b-icon-x>
                </button>
                </div>
              </div>
            </span></h4>
          </div>
        </div>

        <b-button @click="uploadContent()">Upload</b-button>

      </b-jumbotron>

      <!--SUCCESS-->
      <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="(item, index) in uploadedFiles" v-bind:key="index">
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
      about: '',
      formData: null,
      post: '',
      closeFriends: '',
      highlights: '',
      taggedUserOptions: [],
      taggedUsers: [],
      taggedUserSelected: null,
      taggedUserDefaultOptionDisabled: true
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
      if (this.post === "Post") {
        let description = []
        let tags = []
        description = this.about.split(" ")

        for (let i = 0; i < description.length; i++) {
          if (description[i].includes("#")) {
            tags.push(description[i])
          }
        }

        let data = {about: this.about, tags: tags, location: this.selectedLocation, taggedUsers: this.taggedUsers};

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

        let close = false;
        if (this.closeFriends === "All") {
          close = false;
        } else {
          close = true;
        }

        let data = {
          tags: tags,
          location: this.selectedLocation,
          closeFriends: close,
          highlights: highlights,
          taggedUsers: this.taggedUsers
        };

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
    },

    getTaggedUserOptions() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'profile/getAllUsers')
          .then(response => {
            this.taggedUserOptions = response.data.map(u => u.username);

          }).catch(err => {
        console.log(err)
      });
    },

    onTaggedUserSelected() {
      if (this.taggedUserSelected === null) return
      if (this.taggedUsers.indexOf(this.taggedUserSelected) === -1) {
        this.taggedUsers.push(this.taggedUserSelected)
      }
      this.taggedUserSelected = null
    },

    onTaggedUserUnselected(user) {
      // eslint-disable-next-line no-unused-vars
      this.taggedUsers = this.taggedUsers.filter(function (value, index, arr) {
        return value !== user;
      });
    }
  },

  mounted() {
    this.reset();
    this.getLocations();
    this.getTaggedUserOptions();
  },
}
</script>

<style>

</style>
