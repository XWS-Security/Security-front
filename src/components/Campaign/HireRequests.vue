<template>
  <div>
    <hire-request v-for="r in requests" v-bind:key="r.id" v-bind:id="r.id" v-bind:agent-username="r.agentUsername"></hire-request>
  </div>
</template>

<script>
import HireRequest from "@/components/Campaign/HireRequest";
export default {
  name: "HireRequests",
  components: {HireRequest},
  data() {
    return {
      requests:[]
    }
  },
  mounted() {
    this.getRequests();
  },
  methods: {
    getRequests() {
      this.$http
          .get(process.env.VUE_APP_CAMPAIGN_URL + 'hireRequest/')
          .then(response => {
            this.requests=response.data
          })
    }
  }
}
</script>

<style scoped>

</style>
