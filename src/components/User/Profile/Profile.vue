<template>
  <div class="container">
    <div class="main-body">
      <div class="row">

        <div class="col-lg-4">

          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <ProfilePicture v-bind:image-name="this.userContent.profilePictureName">
                </ProfilePicture>
                <div class="mt-3">
                  <h4>{{ this.name + ' ' + this.surname }}</h4>
                </div>
                <div class="mt-3">
                  <h4>{{ this.dateOfBirth }}</h4>
                </div>
              </div>

              <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                <div class="dropbox">
                  <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
                         @change="upload($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                         accept="image/*" class="input-file">
                  <p v-if="isSaving">
                    Uploading {{ fileCount }} files...
                  </p>
                </div>
              </form>
              <hr>
              <b-button @click="uploadContent()">Upload photo!</b-button>
            </div>
          </div>
        </div>

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

        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Username</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="username">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Name</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="name">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Surname</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="surname">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Email</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="email">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Phone</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="phoneNumber">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">About</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <textarea type="text" class="form-control" v-model="about"/>
                </div>
              </div>
              <div>
                <input type="radio" id="private" value="true" v-model="profilePrivate">
                <label for="private">Private</label>
                <br>
                <input type="radio" id="public" value="false" v-model="profilePrivate">
                <label for="public">Public</label>
                <br>
              </div>
              <div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="messagesEnabled" v-model="messagesEnabled">
                  <label class="form-check-label" for="messagesEnabled">Receive messages from all users</label>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="tagsEnabled" v-model="tagsEnabled">
                  <label class="form-check-label" for="tagsEnabled">Allow users to tag you in their posts and
                    stories</label>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-9 text-secondary">
                  <input type="button" class="btn btn-primary px-4" value="Update info" v-on:click="updateBasicInfo">
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-9 text-secondary">
                  <input type="button" class="btn btn-primary px-4" value="Change password"
                         v-on:click="changePassword">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {upload} from "@/components/ContentUpload/file-upload.service";
import {wait} from "@/components/ContentUpload/utils";
import ProfilePicture from "@/components/Nistagram/Profile/ProfilePicture";

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: "Profile",
  components: {ProfilePicture},
  data: function () {
    return {
      email: null,
      username: null,
      newPassword: '',
      name: null,
      surname: null,
      dateOfBirth: new Date(),
      phoneNumber: null,
      about: null,
      profilePrivate: true,
      formData: null,
      uploadFieldName: 'photos',
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      profilePicture: null,
      userContent: {},
      messagesEnabled: false,
      tagsEnabled: false
    }
  },

  mounted() {
    this.getUserInfo();
    this.reset();
  },

  methods: {
    getUserInfo() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'profile/getUserInfo')
          .then(response => {
            this.email = response.data.email;
            this.username = response.data.username;
            this.name = response.data.name;
            this.surname = response.data.surname;
            this.dateOfBirth = this.convertDate(response.data.dateOfBirth);
            this.about = response.data.about;
            this.phoneNumber = response.data.phoneNumber;
            this.profilePrivate = response.data.profilePrivate;
            this.messagesEnabled = response.data.messagesEnabled
            this.tagsEnabled = response.data.tagsEnabled
            this.getUserInfoContent();
          }).catch(err => {
        alert(err.response.data)
      });
    },

    updateBasicInfo() {

      if (!this.AreInputsValid) {
        this.errorMessage = 'All fields must be filled and passwords must match!';
        return;
      }

      let basicInfo = {
        username: this.username,
        email: this.email,
        name: this.name,
        surname: this.surname,
        phoneNumber: this.phoneNumber,
        about: this.about,
        profilePrivate: this.profilePrivate,
        messagesEnabled: this.messagesEnabled,
        tagsEnabled: this.tagsEnabled
      }

      if (/[<>]/.test(this.email) || /[<>]/.test(this.name) || /[<>]/.test(this.surname) || /[<>]/.test(this.username)) {
        this.errorMessage = 'Fields can not contain less/greater than signs.';
        alert(this.errorMessage);
        return;
      }

      this.$http
          .put(process.env.VUE_APP_BACKEND_URL + 'profile/updateProfileInfo', basicInfo)
          .then(response => {
            alert(response.data);
            this.$store.dispatch('logOut');
            this.$router.push("/");
          }).catch(err => {
        alert(err.response.data)
      });
    },

    changePassword() {
      this.$router.push("/changePassword");
    },

    convertDate(data) {
      var ConvDate = new Date(data);
      console.log(ConvDate.getDate() + "/" + ConvDate.getMonth() + "/" + ConvDate.getFullYear());
      return ConvDate.getDate() + "/" + ConvDate.getMonth() + "/" + ConvDate.getFullYear();
    },

    uploadContent() {
      this.$http
          .post(process.env.VUE_APP_CONTENT_URL + 'profile/setPorfilePicture', this.formData)
          .then(response => {
            console.log(response.data)
          })
    },

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

    getUserInfoContent() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'profile/' + this.username)
          .then(response => {
            this.userContent = response.data
          })
    },
  },

  computed: {
    AreInputsValid() {
      return this.email !== '' && this.name !== '' && this.surname !== ''
          && this.username !== '' && this.dateOfBirth !== null && this.gender !== '';
    },

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
  }
}
</script>

<style scoped>
body {
  margin-top: 20px;
  color: #1a202c;
  text-align: left;
  background-color: #e2e8f0;
}

.main-body {
  padding: 15px;
}

.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, .125);
  border-radius: .25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col, .gutters-sm > [class*=col-] {
  padding-right: 8px;
  padding-left: 8px;
}

.mb-3, .my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}

.h-100 {
  height: 100% !important;
}

.shadow-none {
  box-shadow: none !important;
}
</style>
