<template>
  <div v-if="selected === 'EndEntity' || selected === 'Intermediate'">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Valid from</th>
        <th scope="col">Valid to</th>
        <th scope="col">Issuer</th>
        <th scope="col">Type</th>
        <th scope="col">Revoked</th>
      </tr>
      </thead>
      <tbody v-for="(certificate, index) in CAcertificates" :key="index">
      <td>{{ certificate.certificateName }}</td>
      <td>{{ convertDate(certificate.startDate) }}</td>
      <td>{{ convertDate(certificate.endDate) }}</td>
      <td>{{ certificate.parentName }}</td>
      <td>{{ certificate.ca }}</td>
      <td>{{ certificate.revoked }}</td>
      <td>
        <button @click="chooseParentCertificate(certificate.certificateName)" :value="certificate.certificateName"
                type="button"
                class="btn btn-success">
          Revoke
        </button>
      </td>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
name: "ViewCertificates",
  data() {
    return {
      selected: '',
      certificates: [],
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    init() {
      this.$http
          .get('http://localhost:8080/certificate/getAllCertificates')
          .then(response => {
            this.certificates = response.data;
          })
    },

    revokeCertificate() {
      this.$http.post('http://localhost:8080/certificate/revokeCertificate', {
        'certificateName': this.certificateName,
      }).then(response => {
        console.log(response.data);
        this.init();
      }).catch(err => {
        alert(err.response.data)
      });
    }
  }
}

</script>

<style scoped>

</style>