<template>
  <div class="container">
    <div class="main-body">
      <div class="row">
        <div class="col-lg-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin"
                     class="rounded-circle p-1 bg-primary" width="110">
                <div class="mt-3">
                  <h4>John Doe</h4>
                  <p class="text-secondary mb-1">Full Stack Developer</p>
                  <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Name</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" value="John Doe">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Surname</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" value="John Doe">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Email</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" value="john@example.com">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Phone</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" value="(239) 816-9029">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Address</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" value="Bay Area, San Francisco, CA">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">About</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <textarea type="text" class="form-control" value="John Doe"/>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Password</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="password" class="form-control" value="John Doe">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">New Password</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="password" class="form-control" value="John Doe">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Repeat new password</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="password" class="form-control" value="John Doe">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-9 text-secondary">
                  <input type="button" class="btn btn-primary px-4" value="Save Changes">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: function () {
    return {
      email: null,
      username: null,
      password: null,
      newPassword: '',
      name: null,
      surname: null,
      dateOfBirth: new Date(),
      phoneNumber: null,
      about: null
    }
  },
}
</script>

<style scoped>
body {
  margin-top: 20px;
  color: #1a202c;
  text-align: left;
  background-color: #e2e8f0;
}

.main-body {
  padding: 15px;
}

.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, .125);
  border-radius: .25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col, .gutters-sm > [class*=col-] {
  padding-right: 8px;
  padding-left: 8px;
}

.mb-3, .my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}

.h-100 {
  height: 100% !important;
}

.shadow-none {
  box-shadow: none !important;
}
</style>
