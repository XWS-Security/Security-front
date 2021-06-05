<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Followers" active>
          <FollowRequests></FollowRequests>
        </b-tab>
        <b-tab title="Likes">
          <b-card-text>Likes and dislikes section</b-card-text>
        </b-tab>
        <b-tab title="Comments">
          <b-card-text>Comments section</b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import FollowRequests from "@/components/Nistagram/Notifications/FollowRequests";

export default {
  name: "Notifications",
  components: {FollowRequests}
}
</script>

<style scoped>

</style>