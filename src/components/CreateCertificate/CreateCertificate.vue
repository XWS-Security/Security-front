<template>
  <div>
    <b-jumbotron>
      <form>
        <div class="form-group">
          <label for="CertificateAlias">Certificate alias</label>
          <input type="text" class="form-control" id="CertificateAlias" aria-describedby="emailHelp"
                 placeholder="Enter alias (certificate name)">
        </div>
        <div class="form-group">
          <label for="ValidFrom">Valid from</label>
          <input type="date" class="form-control" id="ValidFrom"
                 placeholder="Certificate valid from">
        </div>
        <div class="form-group">
          <label for="ValidTo">Valid to</label>
          <input type="date" class="form-control" id="ValidTo"
                 placeholder="Certificate valid to">
        </div>
        <div>
          <b-form-group label-align="left" v-slot="{ ariaDescribedby }">
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Root">Root
              certificate
            </b-form-radio>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Intermediate">
              Intermediate certificate
            </b-form-radio>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="EndEntity">End-entity
              certificate
            </b-form-radio>
          </b-form-group>
          <div v-if="selected === 'EndEntity' || selected === 'Intermediate'">
            <p>123</p>
          </div>
          <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "CreateCertificate",
  data() {
    return {
      selected: ''
    }
  }
}
</script>

<style scoped>

</style>
