<template>
  <div class="row">
    <div class="col-4">
      <ul class="list-group">
        <li class="list-group-item">
          <span class="custom-control-inline">
              <h4 class="m-auto">Conversations</h4>
              <button class="btn btn-outline-info rounded ml-3">
                <b-icon-plus></b-icon-plus>
              </button>
          </span>
        </li>
        <li v-bind:class="selectedConversationId === c.id ? selected : notSelected" v-for="(c, index) in conversations"
            v-bind:key="index" v-on:click="onConversationSelected(c.id)">
          <conversation-small v-bind:id="c.id"></conversation-small>
        </li>
      </ul>
    </div>
    <div class="col-8">
      <new-conversation v-if="selectedConversationId === 0"></new-conversation>
      <conversation-view v-if="selectedConversationId !== 0" v-bind:id="selectedConversationId"></conversation-view>
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
      selectedConversationId: 0,
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
    onConversationSelected(id) {
      this.selectedConversationId = id
    }
  }
}
</script>

<style scoped>

</style>