<template>
  <div>
    <b-jumbotron>
        <h3>Campaign</h3>
        <b-form-select v-model="selectedCampaign" :options="campains" style="width: 50%; height: 5%" ></b-form-select> <br><br>
        <label for="influencer" ><h3>Search influencer:</h3></label><br>
        <input id="influencer" type="text" style="width: 50%;" v-model="influencerUsername"><br><br>
        <b-button @click="findInfluencers()">Search</b-button>
        <influencer v-for="(i, index) in influencers" v-bind:key="index" v-bind:username="i" v-bind:campaign="selectedCampaign"></influencer>
    </b-jumbotron>
  </div>
</template>

<script>
import Influencer from "@/components/Campaign/Influencer";
export default {
  name: "SendHireRequest",
  components: {Influencer},
  data() {
    return {
      selectedCampaign:{},
      campains:[],
      influencerUsername:'',
      influencers:[],
    }
  },
  mounted() {
    this.getCampaigns();
  },
  methods:{
    findInfluencers(){
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'verification/influencers/' + this.influencerUsername)
          .then(response => {
            this.influencers=response.data
          })
    },
    getCampaigns(){
      this.$http
          .get(process.env.VUE_APP_CAMPAIGN_URL + 'campaign/')
          .then(response => {
            response.data.forEach(response=>{
              this.campains.push({value:response,text:response.id + ',     advertisement link: ' + response.link})
            })

          })
    }
  }
}
</script>

<style scoped>

</style>
