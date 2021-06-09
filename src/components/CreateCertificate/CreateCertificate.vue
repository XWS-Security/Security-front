<template>
  <div>
    <b-jumbotron>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="CertificateAlias">Certificate alias</label>
            <input type="text" v-model="certificateName" class="form-control" id="CertificateAlias"
                   aria-describedby="emailHelp"
                   placeholder="Enter alias (certificate name)">
          </div>
          <div class="form-group" v-if="selected === 'Root'">
            <label for="ValidFrom">Valid from</label>
            <input type="date" v-model="validFrom" class="form-control" id="ValidFrom">
          </div>
          <div class="form-group" v-if="selected === 'Root'">
            <label for="ValidTo">Valid to</label>
            <input type="date" v-model="validTo" class="form-control" id="ValidTo">
          </div>
          <div>
            <b-form-group label-align="left" v-slot="{ ariaDescribedby }">
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Root">Root
                certificate
              </b-form-radio>
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios"
                            value="Intermediate">
                Intermediate certificate
              </b-form-radio>
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="EndEntity">
                End-entity
                certificate
              </b-form-radio>
            </b-form-group>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="n">Name</label>
            <input type="text" v-model="name" class="form-control" id="n"
                   placeholder="Enter name for certificate holder">
          </div>
          <div class="form-group">
            <label for="sn">Surname</label>
            <input type="text" v-model="surname" class="form-control" id="sn"
                   placeholder="Enter surname for certificate holder">
          </div>
          <div class="form-group">
            <label for="o">Organisation</label>
            <input type="text" v-model="organisation" class="form-control" id="o"
                   placeholder="Enter organisation for certificate holder">
          </div>
          <div class="form-group">
            <label for="ou">Organisation unit</label>
            <input type="text" v-model="organisationUnit" class="form-control" id="ou"
                   placeholder="Enter organisation unit for certificate holder">
          </div>
          <div class="form-group">
            <label for="c">Country code</label>
            <input type="text" v-model="countryCode" class="form-control" id="c"
                   placeholder="Enter country code for certificate holder">
          </div>
          <div class="form-group">
            <label for="e">Email</label>
            <input type="text" v-model="email" class="form-control" id="e"
                   placeholder="Enter email for certificate holder">
          </div>
        </div>
      </div>
      <div v-if="selected === 'EndEntity' || selected === 'Intermediate'" class="row">
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
          <tbody v-for="(certificate, index) in CAcertificates" :key="index">
          <td>{{ certificate.certificateName }}</td>
          <td>{{ convertDate(certificate.startDate) }}</td>
          <td>{{ convertDate(certificate.endDate) }}</td>
          <td>{{ certificate.parentName }}</td>
          <td>{{ certificate.ca }}</td>
          <td>{{ certificate.revoked }}</td>
          <td>{{ certificate.valid }}</td>
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
      <div class="row">
        <div class="col">
          <div class="mt-3 row">Certificate type: <strong>{{ selected }}</strong></div>
          <div class="mt-3 row">Parent: <strong>{{ parentName }}</strong></div>
        </div>
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
      validTo: new Date(),
      name: null,
      surname: null,
      organisation: null,
      organisationUnit: null,
      countryCode: null,
      email: null
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    convertDate(data) {
      let ConvDate = new Date(data);
      return ConvDate.getDate() + "/" + ConvDate.getMonth() + "/" + ConvDate.getFullYear();
    },

    chooseParentCertificate(certificateName) {
      this.parentName = certificateName;
    },

    init() {

      if (this.$store.state.userType !== 'Administrator') {
        this.$router.push("/")
        return
      }

      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'certificate/getCA')
          .then(response => {
            this.CAcertificates = response.data;
          })
    },

    createCertificate() {
      let data = this.createData()
      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'certificate/createCertificate', data).then(response => {
        console.log(response.data);
        this.init();
      }).catch(err => {
        alert(err.response.data)
      });
    },
    createData() {
      return {
        certificateName: this.certificateName,
        startDate: this.validFrom,
        endDate: this.validTo,
        parentName: this.parentName,
        ca: this.selected,
        subjectData: this.createSubjectData()
      }
    },
    createSubjectData() {
      return {
        name: this.name,
        surname: this.surname,
        organisation: this.organisation,
        organisationUnit: this.organisationUnit,
        countryCode: this.countryCode,
        email: this.email
      }
    }
  }
}
</script>

<style scoped>

</style>
