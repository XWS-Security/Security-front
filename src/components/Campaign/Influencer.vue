<template>
  <b-jumbotron  bg-variant="info" text-variant="white" style="width: 50%; height: 2%;margin:5% 25%">
    <h4>Username: {{username}} </h4>
    <br>
    <br>
    <b-button v-if="status==='PUBLIC'||status==='FOLLOWING'" variant="warning" @click="hire">Hire</b-button>
    <b-button v-else-if="status==='NOT_FOLLOWING'" variant="warning" @click="follow">Follow</b-button>
    <h4 v-else-if="status==='REQUEST_SENT'" >Waiting for request approve</h4>
  </b-jumbotron>
</template>

<script>
export default {
name: "Influencer",
  props:['username', 'campaign'],
  data(){
    return{
      status:''
    }
  },
  mounted() {
    this.getStatus();
  },
  methods:{
    getStatus(){
      this.$http
          .get(process.env.VUE_APP_FOLLOWER_URL  + 'interactions/hire/' + this.username)
          .then(response => {
            this.status = response.data
          })
    },
    getFollowingStatus(){

    },
    follow(){

    },
    hire(){
      let dto = {influencerUsername:this.username, campaignId:this.campaign.id};
      this.$http
          .post(process.env.VUE_APP_CAMPAIGN_URL + 'hireRequest/',dto)
          .then(response => {
            alert(response.data)
          })
    }
  },
  watch:{
    contentId(val){
      this.contentId=val;
    }
  }
}
</script>

<style scoped>

</style>
