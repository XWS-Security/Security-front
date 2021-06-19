<template>
  <div>
    <verification-list-item v-for="id in requests" v-bind:id="id" v-bind:key="id" @reviewed="getRequests">

    </verification-list-item>
  </div>
</template>

<script>
import VerificationListItem from "@/components/Nistagram/Verification/VerificationListItem";

export default {
  name: "VerificationList",
  components: {VerificationListItem},
  data(){
    return{
      requests:[]
    }
  },
  mounted() {
    this.getRequests();
  },
  methods:{
    getRequests() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'verification/')
          .then(response => {
            this.requests = response.data;
          })
    }
  }
}
</script>

<style scoped>

</style>
