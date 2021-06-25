<template>
  <div>
    <b-jumbotron style="margin: 2%">
      <h3>Update campaign with Id: {{selected.id}}</h3>
      <div v-if="selected.id!==null">
         <br>
        Max age: <input type="number" v-model="selected.maxAge"> <br><br>
        Min age : <input type="number" v-model="selected.minAge"> <br><br>
        Gender :  <b-form-select v-model="selected.gender" :options="options" style="width: 50%; height: 5%" ></b-form-select> <br><br>
        Link :  <input type="text" v-model="selected.link"> <br><br>
        <b-button variant="info" @click="update">Update</b-button> <b-button variant="danger" @click="remove()">Delete</b-button>
      </div>
      <hr>
      <br>
      <div class="container" >
        <div v-for="(c,index) in campaigns" class="row" v-bind:key="index">
          <hr>
          <div class="col">
            ID: {{c.id}}<br>
            Max age: {{c.maxAge}}<br>
            Min age: {{c.minAge}}<br>
            Gender: {{c.gender}}<br>
            Link: {{c.link}}<br>
            <b-button variant="info" @click="select(c)">Select</b-button><br>
            <hr>
          </div>
        </div>
      </div>

    </b-jumbotron>
  </div>
</template>

<script>
export default {
name: "UpdateCampaign",
  data(){
    return{
      selected:{id:null,maxAge:null, minAge: null, gender:null, link:null},
      campaigns:[],
      options: [
        {value: 'Male', text: 'Male'},
        {value: 'Female', text: 'Female'},
        {value: 'Both', text: 'Both'},
      ],
    }
  },
  mounted() {
    this.getCampaigns();
  },
  methods:{
    getCampaigns(){
      this.$http
          .get(process.env.VUE_APP_CAMPAIGN_URL + 'campaign/continuous')
          .then(response => {
            this.campaigns=response.data
          })
    },
    select(campaign){
      this.selected = Object.assign(this.selected, campaign);
      console.log(this.selected)
    },
    remove(){
      this.$http
          .delete(process.env.VUE_APP_CAMPAIGN_URL + 'campaign/delete/' + this.selected.id)
          .then(response => {
            alert(response.data);
            this.getCampaigns();
          })
    },
    update(){
      this.$http
          .put(process.env.VUE_APP_CAMPAIGN_URL + 'campaign/update',  this.selected)
          .then(response => {
            alert(response.data);
            this.getCampaigns();
          })
    },
  }
}
</script>

<style scoped>

</style>
