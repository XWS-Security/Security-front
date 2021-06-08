<template>
  <li class="nav-item active">
    <router-link to="/story?&storiesType=my"><a class="nav-link" href="#">MyStories<span
        class="sr-only">(current)</span></a>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "MyStoriesLink",
}
</script>

<style scoped>
</style>
