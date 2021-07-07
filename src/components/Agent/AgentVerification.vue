<template>
  <div>
    <b-jumbotron>
      <div class="px-5">
        <table class="table table-dark table-hover table-bordered">
          <thead>
          <th>Username</th>
          <th>Surname</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>About</th>
          <th></th>
          </thead>
          <tbody v-for="(a, index) in agents" v-bind:key="index">
            <tr>
              <td>{{a.username}}</td>
              <td>{{ a.surname }}</td>
              <td>{{ a.name }}</td>
              <td>{{ a.email }}</td>
              <td>{{ a.website }}</td>
              <td>{{ a.about }}</td>
              <td>
                <button class="btn btn-success" v-on:click="approve(a.username)">Approve agent</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "AgentVerification",
  data() {
    return {
      agents: []
    }
  },
  mounted() {
    this.getAll();
  },
  methods: {
    approve(a){
      this.$http
          .put(process.env.VUE_APP_BACKEND_URL + 'verification/approveAgent/' + a)
          .then(response => {
            response.data
            alert("Agent verified.")
            this.getAll();
          }).catch(err => {
        alert(err.response.data)
      });
    },
    getAll(){
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "verification/agentsAll/")
          .then(response => {
            this.agents = response.data;
          })
    }
  }
}
</script>

<style scoped>

</style>