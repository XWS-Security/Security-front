<template>
  <div class="row">
    <div class="col-4 main-screen">
      <ul class="list-group">
        <li class="list-group-item">
          <span class="custom-control-inline">
              <h4 class="m-auto">Conversations</h4>
              <button class="btn btn-outline-info rounded ml-3" v-on:click="onConversationSelected(null)">
                <b-icon-plus></b-icon-plus>
              </button>
          </span>
        </li>
        <li v-bind:class="selectedConversation === c ? selected : notSelected" v-for="(c, index) in conversations"
            v-bind:key="index" v-on:click="onConversationSelected(c)">
          <conversation-small v-bind:conversation="c" v-bind:selected="selectedConversation === c"></conversation-small>
        </li>
      </ul>
    </div>
    <div class="col-6">
      <new-conversation v-if="selectedConversation === null"></new-conversation>
      <conversation-view v-if="selectedConversation !== null" v-bind:conversation="selectedConversation"></conversation-view>
    </div>
  </div>
</template>

<script>
import NewConversation from "@/components/Messages/NewConversation";
import ConversationView from "@/components/Messages/ConversationView";
import ConversationSmall from "@/components/Messages/ConversationSmall";

export default {
  name: "Conversations",
  components: {ConversationSmall, ConversationView, NewConversation},
  data() {
    return {
      conversations: [],
      selectedConversation: null,
      selected: "list-group-item bg-info text-light",
      notSelected: "list-group-item bg-light text-dark"
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_MESSAGING_URL + 'conversations/')
        .then(response => {
          this.conversations = response.data
        })
  },
  methods: {
    onConversationSelected(conversation) {
      this.selectedConversation = conversation
    }
  }
}
</script>

<style scoped>
.main-screen {
  height: 90vh
}
</style>