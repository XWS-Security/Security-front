<template>
  <div style="margin: 1%">
    <div class="bg-dark row-cols-6" >
      <table style="color: #e2e8f0">
        <tr>
          <td>
            <profile-picture v-bind:imageName="user.profilePictureName"></profile-picture>
          </td>
          <td style="margin-left: 99%">
            {{user.about}}
          </td>
        </tr>
        <tr>
          <td>
            {{id}}
          </td>
        </tr>
      </table>
    </div>
    <hr>
    <div class="bg-dark row-cols-6">

    </div>
  </div>
</template>

<script>
import ProfilePicture from "@/components/Nistagram/Profile/ProfilePicture";
export default {
name: "NistagramProfile",
  components: {ProfilePicture},
  data(){
    return{
      user:{},
      id:""
    }
  },
  mounted() {
    this.getId();
    this.getUserInfo();
  },
  methods:{
    getId(){
      const urlParams = new URLSearchParams(window.location.search);
      this.id = urlParams.get('id');
    },
    getUserInfo() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'profile/' + this.id)
          .then(response => {
            this.user = response.data
          })
    },
  }
}
</script>

<style scoped>

</style>
