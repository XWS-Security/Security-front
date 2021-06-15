<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Followers" active>
          <FollowRequests></FollowRequests>
        </b-tab>
        <b-tab title="Likes">
          <b-card-text>Likes and dislikes section</b-card-text>
          <p>Liked</p>
          <liked-posts></liked-posts>
          <hr>
          <p>Disliked</p>
          <disliked-posts></disliked-posts>
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
import LikedPosts from "@/components/Nistagram/Notifications/LikedPosts";
import DislikedPosts from "@/components/Nistagram/Notifications/DislikedPosts";

export default {
  name: "Notifications",
  components: {DislikedPosts, LikedPosts, FollowRequests}
}
</script>

<style scoped>

</style>
