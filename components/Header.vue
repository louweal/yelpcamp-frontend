<template>
  <div class="w-100 shadow-sm d-flex justify-content-between align-items-center p-2">
    <div>
      <nuxt-link to="/campgrounds">Campgrounds</nuxt-link>
    </div>

    <div class="d-flex align-items-center gap-3">
      <template v-if="!$store.state.user">
        <nuxt-link to="/register">Register</nuxt-link> /
        <nuxt-link to="/login">Login</nuxt-link>
      </template>
      <nuxt-link v-else to="/logout" event="" @click.native="logout()">Logout</nuxt-link>

      <nuxt-link class="btn btn-primary" to="/campgrounds/new">Add campground</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      const response = await fetch("http://localhost:3001/logout");
      let res = await response.json();
      if (res.success) {
        this.$router.push("/campgrounds");
      }
    },
  },
};
</script>

<style></style>
