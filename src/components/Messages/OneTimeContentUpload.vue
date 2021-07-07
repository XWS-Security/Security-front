<template>
  <div class="container p-2">
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <div class="form-group">
        <label for="fileInput" class="mr-2 text-left">Choose images/videos</label>
        <input id="fileInput" type="file" multiple :name="uploadFieldName" :disabled="isSaving"
               @change="upload($event.target.name, $event.target.files); fileCount = $event.target.files.length"
               accept="image/*, video/*" class="input-file bg-light">
      </div>
    </form>

    <!--SUCCESS-->
    <div v-if="isSuccess">
      <p>
        <button class="btn btn-dark btn-upload-left" @click="reset()">
          <b-icon-arrow-repeat></b-icon-arrow-repeat>
        </button>
        <button class="btn btn-info btn-upload-right" @click="onSubmit()">
          <b-icon-envelope></b-icon-envelope>
        </button>
      </p>
      <div class="d-flex flex-row">
        <div class="p-2" v-for="(item, index) in uploadedFiles" v-bind:key="index">
          <img :src="item.url" class="img-responsive img-thumbnail img-uploaded" :alt="item.originalName">
        </div>
      </div>
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
</template>

<script>
import {upload} from "@/components/ContentUpload/file-upload.service";
import {wait} from "@/components/ContentUpload/utils";

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: "OneTimeContentUpload",
  props: ['conversationId'],
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: STATUS_INITIAL,
      uploadFieldName: 'photos',
      formData: null
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
    onSubmit() {
      let data = {conversationId: this.conversationId};
      this.formData.append("obj", new Blob([JSON.stringify(data)], {
        type: "application/json"
      }));

      this.$http
          .post(process.env.VUE_APP_MESSAGING_URL + 'messages/oneTime', this.formData)
          // eslint-disable-next-line no-unused-vars
          .then(response => (this.$emit('messageSent')))
          .catch(error => (alert(error.response.data)))
      this.reset()
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
      upload(formData)
          .then(wait(1500)) // DEV ONLY: wait for 1.5s
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
            this.formData = formData;
          })
          .catch(err => {
            this.uploadError = err.response.data;
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
    }
  }
}
</script>

<style scoped>
.img-uploaded {
  width: 15vw;
  height: 15vw;
  object-fit: cover;
}

.btn-upload-left {
  width: 48.5%;
  margin-left: 1%;
  margin-right: 0.5%;
}

.btn-upload-right {
  width: 48.5%;
  margin-left: 0.5%;
  margin-right: 1%;
}
</style>