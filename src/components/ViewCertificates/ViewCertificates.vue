<template>
  <div>
    <b-jumbotron>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Valid from</th>
          <th scope="col">Valid to</th>
          <th scope="col">Issuer</th>
          <th scope="col">Type</th>
          <th scope="col">Revoked</th>
          <th scope="col">Valid</th>
        </tr>
        </thead>
        <tbody v-for="(certificate, index) in certificates" :key="index">
        <td>{{ certificate.certificateName }}</td>
        <td>{{ convertDate(certificate.startDate) }}</td>
        <td>{{ convertDate(certificate.endDate) }}</td>
        <td>{{ certificate.parentName }}</td>
        <td>{{ certificate.ca }}</td>
        <td>{{ certificate.revoked }}</td>
        <td>{{ certificate.valid }}</td>
        <td v-if="certificate.revoked === false">
          <button @click="revokeCertificate(certificate.certificateName)" :value="certificate.certificateName"
                  type="button"
                  class="btn btn-danger">
            Revoke
          </button>
          <button @click="downloadCertificate(certificate.certificateName)" :value="certificate.certificateName"
                  type="button"
                  class="btn btn-success">
            Download
          </button>
        </td>
        </tbody>
      </table>
    </b-jumbotron>
    <b-jumbotron>
      <div>
        <label for="CertificateAlias">Keystore password</label>
        <input type="text" v-model="keystorePass" class="form-control" id="CertificateAlias"
               aria-describedby="emailHelp">
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "ViewCertificates",
  data() {
    return {
      selected: '',
      certificates: [],
      keystorePass: ''
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    init() {

      if (this.$store.state.userType !== 'Administrator') {
        this.$router.push("/")
        return
      }

      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'certificate/getAllCertificates')
          .then(response => {
            this.certificates = response.data;
          })
    },

    convertDate(data) {
      var ConvDate = new Date(data);
      return ConvDate.getDate() + "/" + ConvDate.getMonth() + "/" + ConvDate.getFullYear();
    },

    revokeCertificate(certificateName) {
      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'certificate/revoke', {
        'certificateName': certificateName,
      }).then(response => {
        console.log(response.data);
        this.init();
      }).catch(err => {
        alert(err.response.data)
      });
    },

    downloadCertificate(certificateName) {

      let downloadCertificate = { certificateName: certificateName, keystorePass: this.keystorePass }

      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'certificate/download/', downloadCertificate).then(response => {
        alert(response.data)
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
