<template>
  <div class="w-100 shadow-sm d-flex justify-content-between align-items-center p-2">
    <div>
      <nuxt-link to="/campgrounds">Campgrounds</nuxt-link>
    </div>

    <div class="d-flex align-items-center gap-3">
      <nuxt-link to="/register">Register</nuxt-link> /
      <nuxt-link to="/login">Login</nuxt-link>

      <nuxt-link class="btn btn-primary" to="/campgrounds/new">Add campground</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
