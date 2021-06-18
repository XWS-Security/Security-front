<template>
  <li class="nav-item active">
    <router-link to="/story?&storiesType=reported"><a class="nav-link" href="#">Reported Stories<span
        class="sr-only">(current)</span></a>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "ReportedStoriesLink",
}
</script>

<style scoped>
</style>
