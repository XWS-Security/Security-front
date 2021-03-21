<template>
  <div>
    <b-jumbotron>
      <div class="form-group">
        <label for="CertificateAlias">Certificate alias</label>
        <input type="text" v-model="certificateName" class="form-control" id="CertificateAlias"
               aria-describedby="emailHelp"
               placeholder="Enter alias (certificate name)">
      </div>
      <div class="form-group">
        <label for="ValidFrom">Valid from</label>
        <input type="date" v-model="validFrom" class="form-control" id="ValidFrom">
      </div>
      <div class="form-group">
        <label for="ValidTo">Valid to</label>
        <input type="date" v-model="validTo" class="form-control" id="ValidTo">
      </div>
      <div>
        <b-form-group label-align="left" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Root">Root
            certificate
          </b-form-radio>
          <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Intermediate">
            Intermediate certificate
          </b-form-radio>
          <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="EndEntity">
            End-entity
            certificate
          </b-form-radio>
        </b-form-group>
        <div v-if="selected === 'EndEntity' || selected === 'Intermediate'">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Valid from</th>
              <th scope="col">Valid to</th>
              <th scope="col">Issuer</th>
              <th scope="col">Type</th>
            </tr>
            </thead>
            <tbody v-for="(certificate, index) in CAcertificates" :key="index">
            <td>{{ certificate.certificateName }}</td>
            <td>{{ convertDate(certificate.startDate) }}</td>
            <td>{{ convertDate(certificate.endDate) }}</td>
            <td>{{ certificate.parentName }}</td>
            <td>{{ certificate.ca }}</td>
            <td>
              <button @click="chooseParentCertificate(certificate.certificateName)" :value="certificate.certificateName"
                      type="button"
                      class="btn btn-success">
                Choose certificate
              </button>
            </td>
            </tbody>
          </table>
        </div>
        <div class="mt-3">Certificate type: <strong>{{ selected }}</strong></div>
      </div>
      <button type="submit" @click="createCertificate" class="btn btn-primary">Submit</button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "CreateCertificate",
  data() {
    return {
      selected: '',
      CAcertificates: [],
      parentName: '',
      certificateName: '',
      validFrom: new Date(),
      validTo: new Date()
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    convertDate(data) {
      var ConvDate = new Date(data);
      return ConvDate.getDate() + "/" + ConvDate.getMonth() + "/" + ConvDate.getFullYear();
    },

    chooseParentCertificate(certificateName) {
      this.parentName = certificateName;
    },

    init() {
      this.$http
          .get('http://localhost:8080/certificate/getCA')
          .then(response => {
            this.CAcertificates = response.data;
          })
    },

    createCertificate() {
      this.$http.post('http://localhost:8080/certificate/createCertificate', {
        'certificateName': this.certificateName,
        'startDate': this.validFrom,
        'endDate': this.validTo,
        'parentName': this.parentName,
        'ca': this.selected
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
