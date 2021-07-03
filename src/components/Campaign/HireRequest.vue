<template>
  <b-jumbotron bg-variant="info" text-variant="white">
    <h2>{{id}} by {{agentUsername}}</h2>
    <b-button variant="outline-light" @click="accept">ACCEPT</b-button> <b-button variant="danger" @click="reject">REJECT</b-button>
  </b-jumbotron>
</template>

<script>
export default {
name: "HireRequest",
  props:['id', 'agentUsername'],
  methods:{
    accept(){
      this.$http
          .put(process.env.VUE_APP_CAMPAIGN_URL + 'hireRequest/accept/' + this.id)
          .then(response => {
            alert(response.data);
          })
    },
    reject(){
      this.$http
          .put(process.env.VUE_APP_CAMPAIGN_URL + 'hireRequest/reject' + this.id)
          .then(response => {
            alert(response.data);
          })
    }
  }
}
</script>

<style scoped>

</style>
