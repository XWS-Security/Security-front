<template>
  <div class="bg-light border-info p-5">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text m-auto">Select from followers</span>
      </div>
      <b-select v-model="selectedUser" v-on:input="onUserSelected" class="m-2">
        <template #first>
          <b-form-select-option disabled :value="null">
            Select a follower
          </b-form-select-option>
        </template>
        <option v-for="(u, index) in followers" :value="u" v-bind:key="index">{{ u.username }}</option>
      </b-select>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text m-auto">Input any username</span>
      </div>
      <input type="text" class="form-control" placeholder="Username" aria-label="Username" v-model="searchInput">
      <div class="input-group-append">
        <button class="btn btn-outline-info" v-on:click="onUserSearch">
          <b-icon-search></b-icon-search>
        </button>
      </div>
    </div>

    <div class="d-flex flex-row">
      <div class="p-2" v-for="(u, index) in selectedUsers" v-bind:key="index">
        <h4><span class="badge badge-pill badge-info">
              <div class="d-inline-flex justify-content-center flex-row m-auto">
                <div class="m-auto">{{ u.username }}</div>
                <div class="m-auto">
                  <button class="btn btn-link text-light m-auto" v-on:click="onUserUnselected(u)">
                  <b-icon-x></b-icon-x>
                </button>
                </div>
              </div>
            </span></h4>
      </div>
    </div>

    <button class="btn btn-info btn-block" v-on:click="onStartConversationClicked">Start conversation</button>
  </div>
</template>

<script>
export default {
  name: "NewConversation",
  data() {
    return {
      followers: [],
      selectedUser: null,
      selectedUsers: [],
      searchInput: ''
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_FOLLOWER_URL + "interactions/followers")
        .then(response => (this.followers = response.data))
  },
  methods: {
    onStartConversationClicked() {
      let data = this.selectedUsers.map(u => u.username)
      this.$http
          .post(process.env.VUE_APP_MESSAGING_URL + "conversations/", data)
          // eslint-disable-next-line no-unused-vars
          .then(response => (this.$emit('conversationStarted')))
          .catch(error => (alert(error.response.data)))
    },
    onUserSelected() {
      if (this.selectedUser === null) return
      this.addSelectedUser(this.selectedUser)
      this.selectedUser = null
    },
    onUserUnselected(user) {
      // eslint-disable-next-line no-unused-vars
      this.selectedUsers = this.selectedUsers.filter(function (value, index, arr) {
        return value !== user;
      });
    },
    onUserSearch() {
      this.$http
          .get(process.env.VUE_APP_MESSAGING_URL + "users/" + this.searchInput)
          .then(response => {
            let data = response.data
            if (data.success) this.addSelectedUser(data.user)
            else alert(data.message)
          })
    },
    addSelectedUser(user) {
      if (this.selectedUsers.indexOf(user) === -1) {
        this.selectedUsers.push(user)
      }
    }
  }
}
</script>

<style scoped>

</style>