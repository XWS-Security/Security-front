<template>
  <div>
    <h1 v-if="verificationStatus==='VERIFIED'">PROFILE IS VERIFIED</h1>
    <h2 v-else-if="verificationStatus==='REQUESTED_VERIFICATION'">VERIFICATION REQUEST IS SENT TO ADMINISTRATORS</h2>
    <div v-else>
      <verification-form></verification-form>
    </div>
  </div>
</template>

<script>
import VerificationForm from "@/components/Nistagram/Verification/VerificationForm";
export default {
  name: "Verification",
  components: {VerificationForm},
  data() {
    return {
      verificationStatus:'',
      username:''
    }
  },
  mounted() {
    this.getUsername();
  },
  methods:{
    getUsername(){
        this.$http.get(process.env.VUE_APP_BACKEND_URL + 'profile/username')
            .then(response => {
              this.username = response.data;
              if(this.username===''){
                this.$router.push('/');
              }
              else{
                this.getVerificationStatus();
              }
            })
            .catch(err => (console.log(err.data)))
    },
    getVerificationStatus(){
      this.$http.get(process.env.VUE_APP_BACKEND_URL + 'verification/status/' + this.username)
          .then(response => {
            this.verificationStatus = response.data;
          })
          .catch(err => (console.log(err.data)))
    }
  }
}
</script>

<style scoped>

</style>
