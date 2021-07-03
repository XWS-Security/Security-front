<template>
  <b-jumbotron  bg-variant="info" text-variant="white" style="width: 50%; height: 2%;margin:5% 25%">
    <h4>Username: {{username}} </h4>
    <br>
    <br>
    <b-button v-if="status==='PUBLIC'||status==='FOLLOWING'" variant="warning" @click="hire">Hire</b-button>
    <b-button v-else-if="status==='NOT_FOLLOWING'" variant="warning" @click="follow">Follow</b-button>
    <h4 v-else-if="status==='REQUEST_SENT'" >Waiting for friend request approve</h4>
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
    follow() {
      let data = {username: this.username}
      this.$http
          .post(process.env.VUE_APP_FOLLOWER_URL + 'interactions/', data)
          .then(response => {

            this.status= response.data;
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    },
    hire(){
      if(this.campaign===undefined || this.campaign===null || this.campaign===''){
        alert("You must chose campaign!")
        return
      }
      if(Object.keys(this.campaign).length===0){
        alert("You must chose campaign!")
        return
      }
      let dto = {influencerUsername:this.username, campaignId:this.campaign.id};
      this.$http
          .post(process.env.VUE_APP_CAMPAIGN_URL + 'hireRequest/',dto)
          .then(response => {
            alert(response.data);
          }).catch(err=>{alert(err.response.data)})
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
